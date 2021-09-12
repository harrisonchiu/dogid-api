const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')
const helmet = require('helmet')
const cors = require('cors')

const database = require('./queries')
const { Logger } = require('./log')

const app = express()
const port = (process.env.PORT || 3000)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 requests
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(limiter)

/**
 * TODO
 * Delete all rows
 * Set a limit x=50 of max images stored [x]
 * refactor code [x]
 * Make front page of api look better '/'
 * fix codes in queries
 * require key to (post?), put, delete
 */

// Send general information of this api at root
app.get('/', (request, response) => {
    Logger.info('API description requested at: /')
    database.getDescription(request, response)
})

// Send status of api app at main api path
app.get('/api', (request, response) => {
    Logger.info('API status requested at: /api')
    database.getStatus(request, response)
})

// Get all the breed images stored in database
app.get('/api/breed-images', (request, response) => {
    Logger.info('All images requested at: /api/breed-images')
    database.getAllImages(request, response)
})

// Get a breed image by id stored in database
app.get('/api/breed-images/:id', (request, response) => {
    const id = parseInt(request.params.id)
    Logger.info(`Image ${id} requested at: /api/breed-images/${id}`)
    database.getImageById(request, response)
})

// Add a breed image to the database
app.post(
    '/api/breed-images',
    [
        check('label').not().isEmpty().isLength({ min: 0, max: 40 }).trim(),
        check('image_base64').not().isEmpty().isLength({ min: 1, max: 120000 }).trim(),
    ],
    (request, response) => {
        Logger.info('Image requested to be added at: /api/breed-images')
        database.addImage(request, response)
    }
)

// Update a breed image in database by id
app.put(
    '/api/breed-images/:id',
    [
        check('label').not().isEmpty().isLength({ min: 0, max: 40 }).trim(),
        check('image_base64').not().isEmpty().isLength({ min: 1, max: 120000 }).trim(),
    ],
    (request, response) => {
        const id = parseInt(request.params.id)
        Logger.info(`Image ${id} requested to updated at: /api/breed-images/${id}`)
        database.updateImageById(request, response)
    }
)

// Delete a breed image entry in the database by id
app.delete('/api/breed-images/:id', (request, response) => {
    const id = parseInt(request.params.id)
    Logger.info(`Image ${id} requested to be deleted at: /api/breed-images/${id}`)
    database.deleteImageById(request, response)
})

// Start server
app.listen(port, () => {
    console.log(`API running on port ${port}...`)
})