import { db } from '../config/db.js'

const getAllServices = (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
}

export default getAllServices
