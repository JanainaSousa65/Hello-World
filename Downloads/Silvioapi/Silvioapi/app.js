//Import do módulo express para criar o servidor web.

const express = require('express');

//importa o modulo sqlite3 e ativa o modo verbose para obter mensagens detalhadas de depuração
const db = require('./database');

//Cria uma nova instância de aplicação express
const app= express();

//Define a porta onde o servidor vai escutar as requisições
const port = 3000;

//metodo para analisar o corpo das requisições como JSON
app.use(express.json());

//Rotas da tabela Disciplinas

//Rota para criação de tabelas
app.post('/disciplinas',(req, res) => {

   //definindo o corpo requisitado para a criação da linha da tabela
    const { nome} =req.body;

    //realizando a inserção de dados
    db.run("INSERT INTO disciplinas (nome) VALUES (?)", [nome], function(err){
      if(err) {
        return res.status(400).json({error: err.message});
      }  

      res.status(201).json({ id: this.lastID});
     });
});

//Rota para seleção detabela
app.get('/disciplinas',(req, res) => {

//Selecionando todas as linhas da tabela
  db.all("SELECT * FROM disciplinas", [],(err,rows)=>{
    //direcionando para que dê uma resposta em caso de erro
    if(err) {
      return res.status(400).json({error: err.message});
    }  

    res.json(rows);
   });
});
 
//Rota para seleção de um ID da tabela
app.get('/disciplinas/:id',(req,res)=>{

  //definindo os parametros
  const { id } = req.params;
  //executando a busca pelo ID requisitado
  db.get("SELECT * FROM disciplinas WHERE id = ?", [id],(err,row)=>{
    if(err){

      return res.status(400).json({error: err.message});
    }

    res.json(row);
  });
});

//Rota para atualizar uma linha por ID
app.put('/disciplinas/:id', (req,res)=>{

  //definindo os parametros
  const {id} = req.params;

  //definindo o corpo requisitado para a atualização da linha da tabela
  const {nome} = req.body;

  //Realizando a atualização
  db.run("UPDATE disciplinas SET nome = ? WHERE id = ?", [nome,id], function(err){
    if(err){
      return res.status(400).json({error: err.message});
    }

    res.json({updated: this.changes});
  });
});

//Rota para deletar uma linha por ID
app.delete('/disciplinas/:id', (req,res)=>{

  //definindo os parametros
  const {id} = req.params;
  
  //Realizando a exclusão por ID
  db.run("DELETE FROM disciplinas WHERE id = ?", [id], function(err){
    if(err){
      return res.status(400).json({error: err.message});
    }

    res.json({deleted: this.changes});
  });
});


//tabela para jogos

//Rota para criação de tabelas
app.post('/jogos',(req, res) => {

  //definindo o corpo requisitado para a criação da linha da tabela
  const { nome} =req.body;

  //realizando a inserção de dados
  db.run("INSERT INTO jogos (nome) VALUES (?)", [nome], function(err){
    if(err) {
      return res.status(400).json({error: err.message});
    }  

    res.status(201).json({ id: this.lastID});
   });
});

//Rota para seleção detabela
app.get('/jogos',(req, res) => {

//Selecionando todas as linhas da tabela
db.all("SELECT * FROM disciplinas", [],(err,rows)=>{
  //direcionando para que dê uma resposta em caso de erro
  if(err) {
    return res.status(400).json({error: err.message});
  }  

  res.json(rows);
 });
});

//Rota para seleção de um ID da tabela
app.get('/jogos/:id',(req,res)=>{

   //definindo os parametros
const { id } = req.params;

//executando a busca pelo ID requisitado
db.get("SELECT * FROM jogos WHERE id = ?", [id],(err,row)=>{
  if(err){

    return res.status(400).json({error: err.message});
  }

  res.json(row);
});
});


//Rota para Atualizar 
app.put('/jogos/:id', (req,res)=>{

const {id} = req.params;

const {nome} = req.body;

db.run("UPDATE jogos SET nome = ? WHERE id = ?", [nome,id], function(err){
  if(err){
    return res.status(400).json({error: err.message});
  }

  res.json({updated: this.changes});
});
});

//Rota para deletar
app.delete('/jogos/:id', (req,res)=>{

const {id} = req.params;

db.run("DELETE FROM jogos WHERE id = ?", [id], function(err){
  if(err){
    return res.status(400).json({error: err.message});
  }

  res.json({deleted: this.changes});
});
});

//table para usuario


//Rota para criação de tabelas
app.post('/usuario',(req, res) => {

  //definindo o corpo requisitado para a criação da linha da tabela
  const { nome,email,senha} =req.body;

  //realizando a inserção de dados
  db.run("INSERT INTO usuario (nome,email,senha) VALUES (?,?,?)", [nome,email,senha], function(err){
    if(err) {
      return res.status(400).json({error: err.message});
    }  

    res.status(201).json({ id: this.lastID});
   });
});
//Rota para seleção detabela
app.get('/usuario',(req, res) => {

//Selecionando todas as linhas da tabela
db.all("SELECT * FROM usuario", [],(err,rows)=>{
  //direcionando para que dê uma resposta em caso de erro
  if(err) {
    return res.status(400).json({error: err.message});
  }  

  res.json(rows);
 });
});

//rota para Selecionar por ID
app.get('/usuario/:id',(req,res)=>{

const { id } = req.params;

//executando a busca pelo ID requisitado
db.get("SELECT * FROM usuario WHERE id = ?", [id],(err,row)=>{
  if(err){

    return res.status(400).json({error: err.message});
  }

  res.json(row);
});
});

//Rota para atualizar por ID
app.put('/usuario/:id', (req,res)=>{

const {id} = req.params;

//Corpo da requisição 
const {nome,email,senha} = req.body;

//efetuando a atualização 
db.run("UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?", [nome,email,senha,id], function(err){
  if(err){
    return res.status(400).json({error: err.message});
  }

  res.json({updated: this.changes});
});
});

//rota para deletar 
app.delete('/usuario/:id', (req,res)=>{

const {id} = req.params;

//Deletando
db.run("DELETE FROM usuario WHERE id = ?", [id], function(err){
  if(err){
    return res.status(400).json({error: err.message});
  }

  res.json({deleted: this.changes});
});
});


app.listen(port, ()=>{

  console.log(`Servidor rodando em http://localhost:${port}`);
});