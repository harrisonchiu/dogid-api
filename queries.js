const { pool, environment } = require('./config')
const { currentTime } = require('./log')


// Sends a basic description and the purpose of this API
const getDescription = (request, response) => {
    response.json({
        info: 'DogID API handles server communications for the DogID app. ' +
        'Specifically handles users, their requests, and their image data ' + 
        'of which were only sent if the user wanted and chose to.'
    })
}

// If this code itself is running, the API is probably running too
const getStatus = (request, response) => {
    response.json({ status: 'API is running...'})
}


// Gets all images from the database
const getAllImages = (request, response) => {
    pool.query(
        'SELECT * FROM breed_images ORDER BY id ASC',
        (error, results) => {
            if (error) {
                response.status(500).json({
                    timestamp: currentTime(),
                    status: 500,
                    error: 'Internal Server Error',
                    detail: 'Failed to get all image resources from table'
                })
            }
            response.status(200).json(results.rows)
        }
    )
}


// Gets a singular image resource by id from the database
const getImageById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'SELECT * FROM breed_images WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                response.status(500).json({
                    timestamp: currentTime(),
                    status: 500,
                    error: 'Internal Server Error',
                    detail: 'Failed to get specific image resource from table'
                })
            }
            response.status(200).json(results.rows)
        }
    )
}


// Create a new image resource in the database
// Only contains the user's label and the user's taken image in base64 string
const addImage = (request, response) => {
    const { label, image_base64 } = request.body

    pool.query('SELECT COUNT(*) FROM breed_images', (error, results) => {
        if (error) {
            response.status(500).json({
                timestamp: currentTime(),
                status: 500,
                error: 'Internal Server Error',
                detail: 'Failed to count number of rows in table',
            })
        }

        const numberOfRows = parseInt(results.rows[0]["count"])
        const maxDatabaseImages = 50

        if (numberOfRows < maxDatabaseImages) {
            pool.query(
                'INSERT INTO breed_images (label, image_base64) VALUES ($1, $2)',
                [label, image_base64],
                (error, results) => {
                    if (error) {
                        response.status(500).json({
                            timestamp: currentTime(),
                            status: 500,
                            error: 'Internal Server Error',
                            detail: 'Failed to create new image resource'
                        })
                    }
                    response.status(201).send('Image added')
                }
            )
        } else {
            response.status(503).json({
                timestamp: currentTime(),
                status: 403,
                error: 'Service Unavailable',
                detail: 'Maximum limit of created image resources reached'
            })
        }
    })
}


// Updates an image's label and its base64 string (the data of image)
// from the database by id
const updateImageById = (request, response) => {
    const id = parseInt(request.params.id)
    const { label, image_base64 } = request.body

    pool.query(
        'UPDATE breed_images SET label = $1, image_base64 = $2 WHERE id = $3',
        [label, image_base64, id],
        (error, results) => {
            if (error) {
                response.status(500).json({
                    timestamp: currentTime(),
                    status: 500,
                    error: 'Internal Server Error',
                    detail: 'Failed to update image resource'
                })
            }
            response.status(200).send(`Image ${id} modified`)
        }
    )
}


// Deletes an image from the database by id
const deleteImageById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'DELETE FROM breed_images WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                response.status(500).json({
                    timestamp: currentTime(),
                    status: 500,
                    error: 'Internal Server Error',
                    detail: 'Failed to delete image resource'
                })
            }
            response.status(200).send(`Image ${id} deleted`)
        }
    )
}


module.exports = {
    getDescription,
    getStatus,
    getAllImages,
    getImageById,
    addImage,
    updateImageById,
    deleteImageById,
}