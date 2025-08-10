// controllers/authController.js 
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { buildGoogleAuthUrl } from "../lib/googleOidc.js";
import issueJwt from "../utils/issueJwt.js";
import { PrismaClient, Provider } from "@prisma/client";
const prisma = new PrismaClient();

const COOKIE_BASE = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.COOKIE_SECURE === "true",
};
const makeRand = (len = 16) => randomBytes(len).toString("hex");

export const authController = {
  // PUBLIC (kalau mau admin-only, pindah ke route admin)
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(400).json({ msg: "Email sudah terdaftar" });

      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hash, isActive: true },
      });

      return res.status(201).json({
        msg: "Register berhasil",
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
  },

  // LOCAL LOGIN (password) — hormati SSO-only (password null)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        include: { roles: { include: { role: true } } },
      });
      if (!user) return res.status(400).json({ msg: "Email tidak terdaftar" });
      if (!user.isActive)
        return res
          .status(403)
          .json({ msg: "Akun dinonaktifkan. Hubungi admin." });

      // akun SSO-only (dibuat admin tanpa password)
      if (!user.password) {
        return res.status(400).json({
          msg: "Akun ini hanya bisa login via SSO (Google/Microsoft).",
        });
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ msg: "Password salah" });

      const token = issueJwt(user);

      // sarankan cookie httpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        msg: "Login berhasil",
        token, // opsional: boleh dihapus kalau full-cookie
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.map((r) => r.role.slug),
        },
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
  },

  logout: async (req, res) => {
    try {
      // hapus cookie token
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
      });
      return res.json({ msg: "Logout berhasil" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
  },

  // PROFILE dari JWT (cookie/Authorization)
  getMe: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.sub },
        include: { roles: { include: { role: true } } },
      });
      if (!user) return res.sendStatus(404);

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.map((r) => r.role.slug),
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
  },

  /** ====== Google SSO ====== **/
  googleRedirect: async (_req, res) => {
    try {
      const state = makeRand();
      const nonce = makeRand();

      res.cookie("g_state", state, { ...COOKIE_BASE, maxAge: 5 * 60 * 1000 });
      res.cookie("g_nonce", nonce, { ...COOKIE_BASE, maxAge: 5 * 60 * 1000 });

      const authUrl = buildGoogleAuthUrl({
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
        state,
        nonce,
      });

      return res.redirect(authUrl);
    } catch (e) {
      console.error("googleRedirect failed:", e);
      return res.status(500).json({ msg: "Gagal memulai Google SSO" });
    }
  },

  googleCallback: async (req, res) => {
    const appUrl = process.env.APP_URL || "http://localhost:5173";
    try {
      const { code, state } = req.query;
      const cookieState = req.cookies?.g_state;
      const cookieNonce = req.cookies?.g_nonce;

      if (!code || !state || !cookieState || state !== cookieState) {
        return res.redirect(
          `${appUrl}/login?error=${encodeURIComponent("State tidak valid")}`
        );
      }

      // 1) Tuker code -> tokens
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      if (!tokenRes.ok) {
        const text = await tokenRes.text();
        console.error("token endpoint error:", text);
        return res.redirect(
          `${appUrl}/login?error=${encodeURIComponent(
            "Gagal tukar code token"
          )}`
        );
      }

      const { id_token /*, access_token, refresh_token*/ } =
        await tokenRes.json();
      if (!id_token) {
        return res.redirect(
          `${appUrl}/login?error=${encodeURIComponent("ID token tidak ada")}`
        );
      }

      // 2) Verifikasi id_token (issuer, audience, NONCE)
      const JWKS = createRemoteJWKSet(
        new URL("https://www.googleapis.com/oauth2/v3/certs")
      );
      const { payload: claims } = await jwtVerify(id_token, JWKS, {
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: process.env.GOOGLE_CLIENT_ID,
        nonce: cookieNonce,
      });

      // claims: { sub, email, email_verified, name, picture, ... }
      if (!claims.email || !claims.email_verified) {
        return res.redirect(
          `${appUrl}/login?error=${encodeURIComponent(
            "Email Google tidak terverifikasi"
          )}`
        );
      }

      // 3) Find or create user via ExternalAccount
      // (pastikan di atas file: import { PrismaClient, Provider } from "@prisma/client";)
      let account = await prisma.externalAccount.findUnique({
        where: {
          provider_providerSub: {
            provider: Provider.google,
            providerSub: claims.sub,
          },
        },
        include: {
          user: { include: { roles: { include: { role: true } } } },
        },
      });

      let user;
      if (account) {
        user = account.user;
      } else {
        // belum ada link: coba cari user by email
        user = await prisma.user.findUnique({
          where: { email: claims.email },
          include: { roles: { include: { role: true } } },
        });

        if (!user) {
          // buat user SSO-only
          user = await prisma.user.create({
            data: {
              name: claims.name || claims.email.split("@")[0],
              email: claims.email,
              password: null,
              isActive: true,
              // roles: { create: { role: { connect: { slug: "user" } } } }, // opsional
            },
            include: { roles: { include: { role: true } } },
          });
        }

        // pasang ExternalAccount (link ke Google)
        account = await prisma.externalAccount.create({
          data: {
            userId: user.id,
            provider: Provider.google,
            providerSub: claims.sub,
            email: claims.email,
            emailVerified: !!claims.email_verified,
          },
        });
      }

      // 4) Issue JWT app sendiri + set cookie
      const token = issueJwt(user);
      res.clearCookie("g_state", COOKIE_BASE);
      res.clearCookie("g_nonce", COOKIE_BASE);
      res.cookie("token", token, {
        ...COOKIE_BASE,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.redirect(`${appUrl}/`);
    } catch (e) {
      console.error("googleCallback failed:", e);
      const appUrl = process.env.APP_URL || "http://localhost:5173";
      const msg = e?.message || "unknown";
      return res.redirect(`${appUrl}/login?error=${encodeURIComponent(msg)}`);
    }
  },

  microsoftRedirect: (_req, res) => {
    res.status(501).json({ msg: "Microsoft SSO belum dikonfigurasi" });
  },
  microsoftCallback: (_req, res) => {
    res.status(501).json({ msg: "Microsoft SSO belum dikonfigurasi" });
  },
};
