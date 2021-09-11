const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (request, response) => {
    response.json({ status: 'dogid-api running...' })
})

app.get('/breed_images', (request, response) => {
    pool.query('SELECT * FROM breed_images ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.get('/breed_images/:id', (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM breed_images WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.post('/breed_images', (request, response) => {
    const { label, image_base64 } = request.body

    pool.query(
        'INSERT INTO breed_images (label, image_base64) VALUES ($1, $2)',
        [label, image_base64],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Image added')
        }
    )
})

app.put('/breed_images/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const { label, image_base64 } = request.body

    pool.query(
        'UPDATE breed_images SET label = $1, image_base64 = $2 WHERE id = $3',
        [label, image_base64, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Image ${id} modified`)
        }
    )
})


app.delete('/breed_images/:id', (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Image ${id} deleted`)
    })
})

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening...`)
})