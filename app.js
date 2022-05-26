const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;
const app = express();
app.use(bodyParser.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Spoty'
});

app.get('/artistas', (req, res) => {
    const sql = 'Select * from artista'
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Not result');
        }
    });
});

app.get('/artistas/:id', (req, res) => {
    const { id } = req.params
    const sql = `Select * From artista where id = ${id}`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Not result');
        }
    });

});

app.post('/artistas/add', (req, res) => {
    const sql = `INSERT INTO artista SET ?`;
    const artistObject = {
        name: req.body.name,
        nacionality: req.body.nacionality
    }
    connection.query(sql, artistObject, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Artista Creado');
        }
    });

});
app.get('/artistas/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, nacionality } = req.body;
    const sql = `Update artista set name= '${name}', nacionality='${nacionality}' where id = ${id}`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Artista Actualizado');
        }
    });
});
app.delete('/artistas/delete/:id', (req, res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM artista where id= '${id}'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Artista Eliminado');
        }
    });
});

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});