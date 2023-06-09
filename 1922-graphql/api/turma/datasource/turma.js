const { SQLDataSource } = require('datasource-sql')
const DataLoader = require('dataloader')

class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig)
  }

  async getTurmas() {
    return this.db
      .select('*')
      .from('turmas')
  }

  async getTurma(id) {
    const turma = await this.db
      .select('*')
      .from('turmas')
      .where({ id: Number(id)})

    return turma[0]
  }

  async incluiTurma(novaTurma) {
    const novaTurmaId = await this.db
      .insert(novaTurma)
      .returning('id')
      .into('turmas')
      
    const turmaInserida = await this.getTurma(novaTurmaId[0])
    
    return ({ turmaInserida })
  }

  async atualizaTurma(novosDados) {
    await this.db
      .update({ ...novosDados.turma })
      .where({ id: Number(novosDados.id) })
      .into('turmas')
 
    const turmaAtualizada = await this.getTurma(novosDados.id)
    return ({
      ...turmaAtualizada
    })
  }

  async deletaTurma(id) {
    await this.db('turmas')
      .where({ id: id })
      .del()
 
    this.Resposta.mensagem = "registro deletado"

    console.log('Resposta 1 ', this.Resposta.mensagem)
    console.log('Resposta 2 ', this.Resposta)

    return this.Resposta
  }

  getTurmasCarregadas = new DataLoader(async idsTurmas => {
    const turmas = await this.db
      .select('*')
      .from('turmas')
      .whereIn('id', idsTurmas)
 
 
    return idsTurmas
      .map(id => turmas
        .find(turma => turma.id === id))
  })
}

module.exports = TurmasAPI