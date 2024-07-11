const express = require('express');
const routerMhs = express.Router();
const ctrMhs = require("../controllers/mahasiswa")
const ctrUser = require("../controllers/user")

routerMhs.get('/mahasiswa', ctrUser.authenticate, ctrMhs.getMhs );
routerMhs.get('/mahasiswa/:nim', ctrMhs.getBynim );
routerMhs.post('/mahasiswa', ctrMhs.postMhs);
routerMhs.put('/mahasiswa/:nim', ctrMhs.updateMhs);
routerMhs.delete('/mahasiswa/:nim', ctrMhs.deleteMhs);

module.exports = routerMhs