const express = require('express');
const app = express();
const session = require('express-session')
const mysql = require("mysql2");
const port = 8000;

//untuk menerima req.body
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tugasbackend'
  });

  //open the mySql  connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Syccessfully connected to the database.");
  });

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Tidak Terautentikasi');
    }
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    connection.query(`INSERT INTO user VALUES ('${username}',PASSWORD('${password}'))`,
        (error, results) => {
            if (error) throw error;
            res.json({message: 'Data berhasil ditambahkan', id: results.insertId });
        })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.promise().query(`SELECT * FROM user WHERE username = '${username}'
                                AND password('${password}')`)
    .then((results) => {
        if (results.length > 0) {
            req.session.isAuthenticated = true;
            res.send({ message: 'Berhasil Login' });
        } else {
            res.status(401).send('username atau password salah');
        }
    })
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Logout');
        }
    })
})

app.get('/protected', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (GET)');
})

app.post('/protected', authenticate, (req, res) => {
    res.send('route terproteksi (POST)');
})
app.put('/protected', authenticate, (req, res) => {
    res.send('route terproteksi (PUT)');
})
app.delete('/protected', authenticate, (req, res) => {
    res.send('route terproteksi (DELETE)');
})

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});
