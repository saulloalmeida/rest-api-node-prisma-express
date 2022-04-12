import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: "teste2@teste2.com",
      name: "teste2"
    }
  })
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()