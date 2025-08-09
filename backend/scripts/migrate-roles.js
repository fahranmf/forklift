// scripts/migrate-roles.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const mapSlug = (raw) => {
  const s = String(raw || '').trim().toLowerCase()
  if (['admin', 'administrator'].includes(s)) return 'admin'
  if (['supervisor', 'spv'].includes(s)) return 'supervisor'
  if (['teknisi', 'technician'].includes(s)) return 'teknisi'
  if (['manajer operasional', 'manager operasional', 'ops manager', 'mo'].includes(s)) return 'manajer_operasional'
  // default paling aman (boleh diubah)
  return 'supervisor'
}

async function run() {
  const roles = await prisma.role.findMany()
  const bySlug = Object.fromEntries(roles.map((r) => [r.slug, r]))

  // pastikan kolom legacy `role` masih ada di model User untuk migrasi ini
  const users = await prisma.user.findMany({ select: { id: true, role: true } })

  for (const u of users) {
    const slug = mapSlug(u.role)
    const role = bySlug[slug]
    if (!role) continue

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: u.id, roleId: role.id } },
      update: {},
      create: { userId: u.id, roleId: role.id },
    })
  }

  console.log('✅ Migrasi role -> user_roles selesai')
}

run()
  .catch((e) => {
    console.error('❌ Error migrasi:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
