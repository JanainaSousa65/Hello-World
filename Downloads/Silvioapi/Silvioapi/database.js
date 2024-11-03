//Importa o módulo sqlite3 e ativa o modo verbose para obter mensagens detalhadas 
const sqlite3 = require('sqlite3').verbose();


//Cria uma nova instância de banco de dados SQLite em arquivo físico 
//o arquivo vai ser criado na mesm pasta do script 
const db = new sqlite3.Database('/SILVIOAPI/database.db');

//Criando  as tabelas sequencialmente 
db.serialize(()=>{

    db.run(`CREATE TABLE IF NOT EXISTS disciplinas(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             nome TEXT NOT NULL
        )`
    );

    db.run(`
        CREATE TABLE IF NOT EXISTS usuario(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT NOT NULL,
          senha TEXT NOT NULL
          )`
    );

    db.run(`
        CREATE TABLE IF NOT EXISTS jogos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        id_dpn INTEGER,
        FOREIGN KEY (id_dpn) REFERENCES disciplinas (id)
        )`
    );

})


//exportando o banco de dados para ser utilizado em outros arquivos 
module.exports = db;