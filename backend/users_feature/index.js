const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'booksManagerUsers'
})

connection.connect(err => {
    if (err){
        console.log('Erreur connexion au DB: ', err);
        return ;
    }
    console.log('connecté à la base de donné MySQL.');
})

app.post('/login', (req, res)=> {
    const {user, psw} = req.body;
    if (!user.trim() || !psw.trim()){
        return res.status(400).send('champs manquants');
    }

    connection.query(
        "select passwordhached from users where userName = ?",
        [user],
        (err, rows) => {
            if (err) return res.status(500).send(err);

            if (rows.length > 0) {
                
            }else return res.status(400).send('user non exist');
                
        }
    )
})



app.listen(PORT, ()=> {
    console.log('serveur lancé sur http://localhost:', PORT);
})