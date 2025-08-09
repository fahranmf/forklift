// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const roles = [
    { name: 'Admin', slug: 'admin' },
    { name: 'Supervisor', slug: 'supervisor' },
    { name: 'Teknisi', slug: 'teknisi' },
    { name: 'Manajer Operasional', slug: 'manajer_operasional' },
  ]

  for (const r of roles) {
    await prisma.role.upsert({
      where: { slug: r.slug },
      update: {},
      create: r,
    })
  }

  // Admin pertama (ubah email sesuai kebutuhan)
  const adminEmail = 'admin@contoh.co.id'
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { isActive: true, name: 'Super Admin' },
    create: { email: adminEmail, name: 'Super Admin', isActive: true },
  })

  const roleAdmin = await prisma.role.findUnique({ where: { slug: 'admin' } })
  if (roleAdmin) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: admin.id, roleId: roleAdmin.id } },
      update: {},
      create: { userId: admin.id, roleId: roleAdmin.id },
    })
  }

  console.log('✅ Seed done')
}

main().catch(e => {
  console.error('❌ Seed error', e)
  process.exit(1)
}).finally(() => prisma.$disconnect())
