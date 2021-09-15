<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/harrisonchiu/dogid-api">
    <img src="docs/dogid-logo.png" alt="Logo" width="128" height="128">
  </a>

  <h1 align="center">DogID API</h1>

  <h3 align="center">
    Node.js and Express RESTful API to store and manage dog images in PostgreSQL database
    <br />
    <br />
    <a href="https://github.com/harrisonchiu/dogid-app">DogID App (Mobile App)</a>
    ·
    <a href="https://github.com/harrisonchiu/dogid-model">DogID Model (Neural Network Model)</a>
    ·
    <a href="https://dogid-api.herokuapp.com/">Heroku API Link</a>
  </h3>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-dogid-api">About DogID API</a>
      <ul>
        <li><a href="#restful-api-backend-built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#set-up-locally">Set Up Locally</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About DogID API

A CRUD RESTful API using Node.js and Express framework connected to a PostgreSQL database
to allow easy storage and retrieval of dog breed images.

It handles the 4 operations on resources (CRUD): Create, Read, Update, and Delete.

The most popular dog breed dataset is
[Stanford's Dog Dataset](http://vision.stanford.edu/aditya86/ImageNetDogs/)
with about 170 images for each 120 breeds.
170 images per class is arguably not enough to sufficiently train an accurate model.

The purpose of this API is to allow anyone (although specifically targeted for DogID users)
to easily and **voluntarily** send different dog breed images along with the correct label.
This helps expands the dog breed dataset and
increases the amount of training data that neural networks can train off of.
A large training dataset is essential for improving neural networks' accuracy.
It is made public for transparency on the data stored and to allow anyone to use image dataset,
therefore send POST/PUT requests to API cautiously!

The expanded dataset will help improve our dog breed neural network,
[DogID Model (https://github.com/harrisonchiu/dogid-model)](https://github.com/harrisonchiu/dogid-model).

The API host is [https://dogid-api.herokuapp.com/](https://dogid-api.herokuapp.com/)
and is the backend of the [DogID App](https://github.com/harrisonchiu/dogid-app)

### RESTful API Backend Built With
- Node.js
- Express.js framework
- PostgreSQL
- Heroku


<!-- GETTING STARTED -->
## Set Up Locally

To get a local copy up and running follow these simple steps.

1. Clone the repo
    ```sh
    git clone https://github.com/harrisonchiu/dogid-api.git
    ```
2. Install NPM packages
    ```sh
    yarn install
    ```
3. Set up local PostgreSQL database and create a table
4. Create `environment.js` (or a `.env`) file to connect Node.js to the database.
This file is not given for security reasons.
    ```js
    const NODE_ENV = 'development'
    const DB_USER = 'user'
    ...

    module.exports = {
        NODE_ENV,
        DB_USER,
        ...
    }
    ```
5. Build
    ```sh
    npm start
    ```
6. Test the API if it works using any `curl` commands
    ```sh
    curl http://localhost:<<port>>
    ```
    ```sh
    curl --data "label=test&image_base64=abcdefg" http://localhost:<<port>>
    ```



<!-- USAGE EXAMPLES -->
## Usage

Send a GET, POST, PUT, DELETE request to [https://dogid-api.herokuapp.com/](https://dogid-api.herokuapp.com/)
| Request | URL                                                                                                           | Parameters         |
|---------|---------------------------------------------------------------------------------------------------------------|--------------------|
| GET     | https://dogid-api.herokuapp.com/api/breed-images<br>https://dogid-api.herokuapp.com/api/breed-images/\<\<id>> |                    |
| POST    | https://dogid-api.herokuapp.com/api/breed-images                                                              | label image_base64 |
| PUT     | https://dogid-api.herokuapp.com/api/breed-images/\<\<id>>                                                     | label image_base64 |
| DELETE  | https://dogid-api.herokuapp.com/api/breed-images/\<\<id>>                                                     |                    |

Example POST Request:
```sh
{ label: 'Labrador Retriever', image_base64: 'BASE64IMAGESTRINGTHATREPRESENTSALABRADORRETRIEVER' }
```


<!-- ROADMAP -->
## Roadmap

- Make the front page of the [API](https://dogid-api.herokuapp.com) look better and more descriptive
    - Perhaps a functioning UI
- Require a key to do POST, PUT, DELETE requests
- Add possible request to reset table?
- Fix request codes
- Verify security implemented
    - Ensure the maximum rows limit works
    - Ensure `express-validator` works as intended

See the [open issues](https://github.com/harrisonchiu/dogid-api/issues) for a list of proposed features (and known issues).
