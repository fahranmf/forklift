// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// helper private
const issueJwt = (user) => {
  const roles = (user.roles || []).map((ur) => ur.role.slug);
  const payload = { sub: user.id, email: user.email, roles };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });
};

module.exports = {
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
        return res
          .status(400)
          .json({
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

  /** ====== SSO (stub sementara) ====== **/
  googleRedirect: async (_req, res) => {
    // TODO: implement OIDC auth url (openid-client) → res.redirect(url)
    return res.status(501).json({ msg: "Google SSO belum dikonfigurasi" });
  },

  googleCallback: async (_req, res) => {
    // TODO: tukar code → verif ID token → strict linking → set cookie → redirect FE
    const appUrl = process.env.APP_URL || "http://localhost:5173";
    return res.redirect(
      `${appUrl}/login?error=${encodeURIComponent("Google SSO belum aktif")}`
    );
  },

  microsoftRedirect: async (_req, res) => {
    // TODO: implement OIDC auth url
    return res.status(501).json({ msg: "Microsoft SSO belum dikonfigurasi" });
  },

  microsoftCallback: async (_req, res) => {
    // TODO: tukar code → verif ID token → strict linking → set cookie → redirect FE
    const appUrl = process.env.APP_URL || "http://localhost:5173";
    return res.redirect(
      `${appUrl}/login?error=${encodeURIComponent("Microsoft SSO belum aktif")}`
    );
  },
};
