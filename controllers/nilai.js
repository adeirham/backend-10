const connection = require('../db/db')

module.exports = {
    getNilaiByNim : (req, res) => {
        const qstring = `SELECT matakuliah.kdMk, matakuliah.matakuliah, nilai.dosen,
                                matakuliah.sks, nilai.semester, nilai.nilai
                        FROM nilai
                        INNER JOIN matakuliah
                        ON nilai.kdMk = matakuliah.kdMk
                        WHERE nilai.nim = ${req.params.nim};`;
        connection.query(qstring, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat get data"
                });
            }
            else res.send(data)
        });
    },

    getNilaiByNimSemester : (req, res) => {
        const qstring = `SELECT matakuliah.kdMk, matakuliah.matakuliah, nilai.dosen,
                                matakuliah.sks, nilai.semester, nilai.nilai
                        FROM nilai
                        INNER JOIN matakuliah
                        ON nilai.kdMk = matakuliah.kdMk
                        WHERE nilai.nim = ${req.params.nim} AND nilai.semester = ${req.params.semester};`;
        connection.query(qstring, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat get data"
                });
            }
            else res.send(data)
        });
    },

    createNilai : (req, res) => {
        const {nim, kdMk, semester, dosen, nilai} = req.body
        const qstring = `INSERT INTO nilai (nim, kdMk, semester, dosen, nilai)
                        VALUES (?, ?, ?, ?, ?);`
        const values = [nim, kdMk, semester, dosen, nilai]
        connection.query(qstring, values, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat post data"
                });
            }
            else res.send(data)
        });
    },

    UpdateNilai : (req, res) => {
        const {nim, kdMk, semester, dosen, nilai} = req.body
        const qstring = `UPDATE nilai
                        SET dosen = ?, nilai = ?
                        WHERE nim = ? AND kdMk = ? AND semester = ?;`
        const values = [dosen, nilai, nim, kdMk, semester]
        connection.query(qstring, values, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat update data"
                });
            }
            else res.send(data)
        });        
    },

    DeleteNilai : (req, res) => {
        const {nim, kdMk, semester} = req.body
        const qstring = `DELETE FROM nilai WHERE nim = ? AND kdMk = ? AND semester = ?`
        const values = [nim, kdMk, semester]
        connection.query(qstring, values, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat delete data"
                });
            }
            else res.send(data)
        });
    }
}