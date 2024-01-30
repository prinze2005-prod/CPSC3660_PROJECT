const express = require('express')
const app = express()
const port = 4000
const mysql = require("mysql2")
const cors = require('cors');



const db = mysql.createConnection({
    host: 'localhost',
    user: "dbStudent",
    password: "password",
    database: 'dbschema'
});

app.use(cors());
app.use(express.json());


app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});


app.post('/api/post', (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES(?, ?, ?)";
    res.send('Got a POST request')
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            return console.log(error);
        }
    });
});



app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ? ";
    res.send('Got a POST request')
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            return console.log(error);
        }
    });
});




app.get('/api/get/:id', (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});


app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`CRUD app listening on port ${port}`)
});
