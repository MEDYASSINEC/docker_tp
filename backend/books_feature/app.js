const express = require('express') 
const cors = require('cors');

const app = express() 

app.use(cors());
app.use(express.json());

// connection au base de données
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expressJS'
})

connection.connect(err => {
    if (err){
        console.log('Erreur connexion au DB: ', err);
        return ;
    }
    console.log('connecté à la base de donné MySQL.');
})

const books = [];

app.get('/books', (req, res) => {
    connection.query("SELECT * FROM books", (err, rows) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    })
});

app.get('/books/:ISBN', (req, res) => {
    const ISBN = req.params.ISBN;
    connection.query(`SELECT * FROM books WHERE ISBN = ${ISBN}`, (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    })
});

app.post('/books', (req, res) => {
    const { ISBN, titre, auteur, annee } = req.body;
    if (!ISBN || !titre || !auteur || !annee) {
        return res.status(400).send('Champs manquants');
    }
    connection.query(
        "INSERT INTO books (ISBN, titre, auteur, anne) VALUES (?, ?, ?, ?)",
        [ ISBN, titre, auteur, annee],
        (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY'){
                return res.status(409).send('Livre déjà exictant');
            }
            return res.status(500).send(err);  
        } 
        res.status(201).send('Livre ajouté avec succés');
    })
});

app.patch('/books/:ISBN', (req, res) => {
    const { ISBN } = req.params;
    const { newISBN, titre, auteur, annee } = req.body;

    if (!newISBN && !titre && !auteur && !annee) {
        return res.status(400).send('Aucun champ à modifier');
    }
    if (newISBN) {
        connection.query(
            'SELECT ISBN FROM books WHERE ISBN = ?',
            [newISBN],
            (err, rows) => {
                if (err) return res.status(500).send(err);
                if (rows.length > 0) {
                    return res.status(409).send('ISBN déjà existant');
                }
                updateBook();
            }
        );
    } else {
        updateBook();
    }

    function updateBook() {
        connection.query(
            `
            UPDATE books SET
                ISBN = COALESCE(?, ISBN),
                titre = COALESCE(?, titre),
                auteur = COALESCE(?, auteur),
                anne = COALESCE(?, anne)
            WHERE ISBN = ?
            `,
            [newISBN, titre, auteur, annee, ISBN],
            (err, result) => {
                if (err) return res.status(500).send(err);
                if (result.affectedRows === 0) {
                    return res.status(404).send('Livre introuvable');
                }
                res.status(200).send('Livre modifié avec succès');
            }
        );
    }
});


app.delete('/books/:ISBN', (req, res) => {
    const { ISBN } = req.params;
    connection.query(
        "DELETE FROM books WHERE ISBN = ? ",
        [ISBN],
        (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0){
                return res.status(404).send('livre introvable');
            }
            return res.status(200).send('Livre Supprimé avec succés')
        }
    )
});

app.listen(2000, () => {
    console.log('serveur lancé sur http://localhost:2000');
});