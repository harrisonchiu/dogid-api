<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/harrisonchiu/dogid-api">
    <img src="images/dogid-logo.png" alt="Logo" width="128" height="128">
  </a>

  <h1 align="center">DogID API</h1>

  <p align="center">
    Node.js and Express RESTful API to store and manage dog images in PostgreSQL database
    <br />
    <br />
    <a href="https://dogid-api.herokuapp.com/">Heroku API Link</a>
    ·
    <a href="https://github.com/harrisonchiu/dogid-app">Parent Project</a>
  </p>
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

The purpose of this API is to allow anyone (although specifically targeted for DogID users)
to easily and voluntarily send different dog breed images along with the correct label.
This increases the size of the dataset that neural networks can train off of.
A large training dataset is essential for improving neural networks' accuracy.
It is made public for transparency on where data is sent and for anyone to use dataset

This is the backend of the [DogID project](https://github.com/harrisonchiu/DogID)

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
4. Create `environment.js` (or a `.env`) file to connect Node.js to the database. This file is not given for security reasons.
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







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
