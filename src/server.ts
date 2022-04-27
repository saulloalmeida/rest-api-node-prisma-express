import cors from 'cors'
import express, { Express } from 'express'
import { router } from './routes'
const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3030, () => { console.log('Servidor Iniciado. Porta: 3030') })