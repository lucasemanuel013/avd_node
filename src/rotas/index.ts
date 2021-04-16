import { Router, Request, Response, NextFunction, json } from 'express'

const rotas = Router()

let avds = [
  {id: '1', diaDaSemana: 'quinta', dataDaAvd: '16/03/2000', disciplina: 'LPW', horario: '19:00', professor: 'thiaguinho'},
  {id: '2', diaDaSemana: 'segunda', dataDaAvd: '19/01/2000', disciplina: 'POO', horario: '19:00', professor: 'thiaguinho'}
]

function checarSeIdExiste(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params

  const procurarId = avds.find(avd => {
    return avd.id === id
  })

  if (procurarId === undefined) {
    return response.json({ message: 'Não existe data da prova com este id.' })
  }

  return next()
}

// B
rotas.get('/listar', (request, response) => {
  return response.json(avds)
})

// C
rotas.get('/listar/:id', checarSeIdExiste, (request, response) => {
  const { id } = request.params

  const procurarAvd = avds.find(avd => {
    return avd.id === id
  })

  return response.json(procurarAvd)
})

// D
rotas.post('/inserir', (request, response) => {
  const { diaDaSemana, dataDaAvd, disciplina, horario, professor} = request.body

  if (!diaDaSemana || !dataDaAvd || !disciplina || !horario || !professor) {
    return response.json({ message: 'O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição.'})
  }

  const id = `${avds.length + 2}`

  avds.push({
    id,
    diaDaSemana,
    dataDaAvd,
    disciplina,
    horario,
    professor
  })

  return response.json(avds)
})

// E
rotas.put('/atualizar/:id', checarSeIdExiste, (request, response) => {
  const { id } = request.params
  const { diaDaSemana, dataDaAvd, disciplina, horario, professor} = request.body

  if (!id || !diaDaSemana || !dataDaAvd || !disciplina || !horario || !professor) {
    return response.json({ message: 'O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição.'})
  }

  avds = avds.map((item) => {
    if (item.id === id) {
      item.diaDaSemana = diaDaSemana
      item.dataDaAvd = dataDaAvd
      item.disciplina = disciplina
      item.horario = horario
      item.professor = professor
    }

    return item
  })

  return response.json(avds)
})

// F
rotas.delete('/deletar/:id', checarSeIdExiste, (request, response) => {
  const { id } = request.params

  avds = avds.filter(item => {
    if (item.id === id) {
      console.log(item)
    }
    return item.id !== id
  })


  return response.json(avds)
})

// G
rotas.get('/professor', (request, response) => {
  const { nomeProfessor } = request.query

  const nomeProfessorFormatado = `${nomeProfessor}`

  const materiasDoProfessor = avds.filter(avd => {
    return avd.professor.toLowerCase() === nomeProfessorFormatado.toLowerCase()
  })

  if (materiasDoProfessor.length === 0) {
    return response.json({ message: 'Não existe data da avd para este professor.' })
  }

  const materiasDoProfessorFormatado = materiasDoProfessor.map(item => {
    const materia = {
      diaDaSemana: item.diaDaSemana,
      dataDaAvd: item.dataDaAvd,
      horario: item.horario,
      professor: item.professor
    }

    return materia
  })

  return response.json(materiasDoProfessorFormatado)
})

// H
rotas.get('/disciplina', (request, response) => {
  const { nomeDisciplina } = request.query

  const disciplinaFormatado = `${nomeDisciplina}`

  let disciplinas = [];

  disciplinas = avds.filter(avd => {
    return avd.disciplina.toLowerCase() === disciplinaFormatado.toLowerCase()
  })

  if (disciplinas.length === 0) {
    return response.json({ message: 'Não existe data da avd para esta disciplina. ' })
  }

  const disciplinasFormatado = disciplinas.map(item => {
    const materia = {
      diaDaSemana: item.diaDaSemana,
      dataDaAvd: item.dataDaAvd,
      horario: item.horario,
      professor: item.professor
    }

    return materia
  })

  return response.json(disciplinasFormatado)
})


export default rotas