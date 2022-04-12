import { Router } from 'express'
import UserController from './controllers/UserController'


const router = Router()

router.get('/users', UserController.findAll)
router.post('/user/', UserController.create)
router.get('/user/:id', UserController.find)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.delete)

export { router }

