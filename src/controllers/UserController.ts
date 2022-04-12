import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()

export default {
  async findAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany()
      return res.json(users)
    } catch (error) {
      return res.json({ error })
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body
      const ifUser = await prisma.user.findUnique({ where: { email } })
      if (ifUser) {
        return res.status(400).json({ error: 'User already exists' })
      }
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      })
      return res.json(user)
    } catch (error) {
      return res.json({ error })
    }
  },
  async find(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      return res.json(user)
    } catch (error) {
      return res.json({ error })
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, email } = req.body

      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
      })
      return res.json(updatedUser)
    } catch (error) {
      return res.json({ error })
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) },
      })
      return res.json(deletedUser)
    } catch (error) {
      return res.json({ error })
    }
  }
}