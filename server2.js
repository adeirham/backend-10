const express = require('express');
const routerMhs = require('./routers/mahasiswa')
const routerMk = require('./routers/matakuliah');
const routerNilai = require('./routers/nilai');
const app = express();
const port = 8000;
const session = require('express-session')
const cors = require('cors');
const routerUser = require('./routers/user');


// Untuk menerima req.body
app.use(express.json());
app.use(cors({
    origin:'*'
}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(routerMhs)
app.use(routerMk)
app.use(routerNilai)
app.use(routerUser)
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});