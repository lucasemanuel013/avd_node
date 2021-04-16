import express from 'express'
import rotas from './rotas'

const servidor = express()

servidor.use(express.json())
servidor.use(rotas)

servidor.listen(3333, () => {
  console.log('Servidor rodando na porta 3333')
})

export default servidor