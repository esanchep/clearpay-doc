# ClearPay Code Challenge - Installation Manual

## Table of contents

- [Requisites](#requisites)
  - [Database](#database)
  - [Docker and docker-compose](#docker-and-docker-compose)
- [Product versions used](#product-versions-used)
- [Installation](#installation)
  - [Database component installation](#database-component-installation)
  - [Backend component installation](#backend-component-installation)
- [Language support](#language-support)
- [Wishlist](#wishlist)
- [Known issues](#known-issues)

<br/>

## Requisites

### Database

- MongoDB v4.2-bionic

<span style="font-size: 12px; color: gray;">NOTE: Checkout Mongodb 🠈🠊 Spring Data compatibility matrix [here](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#compatibility.matrix)
(Spring Boot version used in the BE project: 2.4.5)</span>

### Docker and docker-compose

- docker v19.03.0+
- docker-compose v1.29

<span style="font-size: 12px; color: gray;">NOTE: if you want to use other versions remember to change the **version** property on the [`docker-compose.yml`](docker/docker-compose.yml) to the corresponding one</span>

<br/>

## Product versions used

  | Product | | Version |
  |---|---|:-:|
  | MongoDB | | 4.2-bionic
  | Maven | | 3.6.3 |
  | Java | | 8 |
  | Spring Boot | | 2.4.5 |
  | node | | 15.14.0 |
  | npm | | 7.9.0 |
  | Angular | | 11 |

<br/>

## Installation

<span style="font-size: 12px; color: gray;">NOTE: for product versions [see Product versions used](#product-versions-used) section</span>

<span style="font-size: 12px; color: gray;">NOTE: Provided in this repo you will find a [`docker-compose.yml`](docker/docker-compose.yml) file with all the necessary parameters to set up the different images.</span>

<br/>

### Database component installation

#### Without docker

1. Manually install and configure MongoDB on your system
2. Follow the [Common steps](#common-steps)

#### With docker and docker-compose

1. Setup your environment with the necessary mapped directories to store the database collections and database scripts
2. Configure docker-compose.yml to reflect this configuration
3. (Optional) change `docker-compose.yml` **MONGO_INITDB_ROOT_USERNAME** and **MONGO_INITDB_ROOT_PASSWORD** if you want another user to be used as root user
4. Download the database image with (replace **mongodb** by the **container_name** you configured in the `docker-compose.yml`)

```console
$ sudo docker-compose pull mongodb
```

5. Once downloaded, pull up the database image with (replace **mongodb** by the **container_name** you configured in the `docker-compose.yml`)

```console
$ sudo docker-compose up -d mongodb
```

6. Verify the container is up and ready by reviewing the logs with (replace **mongodb** by the **container_name** you configured in the `docker-compose.yml`)

```console
$ sudo docker-compose logs -f --tail=100 mongodb
```

7. Enter to the bash console of the image with (replace **mongodb** by the **container_name** you configured in the `docker-compose.yml`)

```console
$ sudo docker exec -it mongodb bash
```

8. Follow the [Common steps](#common-steps)

#### Common steps

1. Enter the mongo shell with the configured root credentials (change *root* for the user and password for the root user)

```console
$ mongo -u root -p root
```

2. Create an user with read/write rights for the application database. IE:

```javascript
db.createUser({user: "clearpayAdmin", pwd: "h6rU2xWjT@=StU+s", roles : [{role: "readWrite", db: "clearpay"}]});
```

3. Launch the [`00-schema.js`](/scripts/00-schema.js) script to create collections and indexes <span style="font-size: 12px; color: gray;">NOTE: change the user, password and database variables if needed</span>
4. Launch the [`01-load_data.js`](/scripts/01-load_data.js) script to generate some data to start with (this is needed because there is no possibility to create users and wallets - see [Wishlist](#wishlist) section)

<br/>

### Backend component installation

<span style="font-size: 12px; color: gray;">NOTE: the frontend Angular application is integrated within the Spring Boot project</span>

#### Without docker

1. Download the source code from the GitHub repo [here](https://github.com/esanchep/clearpay-be).
2. Open a terminal and navigate to the root of the project (where the `pom-xml` is located)
3. Execute the following command to build the Spring Boot project:

```console
$ mvn clean install
```

4. Execute the following command to build the Angular application in production mode and publish all the needed files to the **/public/** directory:

```console
$ mvn package
```

5. Run the following command th run the jar:

```console
java  -jar target/clearpay-1.0.0.jar
```

5. (bis) Alternatively you can just run the application from your favorite IDE

#### With docker and docker-compose

1. Configure `docker-compose.yml` with the desired options (exposed port, database connection parameters in the **command** property...)
2. Download the backend image with (replace **clearpay-be** by the **container_name** you configured in the `docker-compose.yml`)

``` console
$ sudo docker-compose pull clearpay-be
```

3. Once downloaded, pull up the backend image with (replace **clearpay-be** by the **container_name** you configured in the `docker-compose.yml`)

```console
$ sudo docker-compose up -d clearpay-be
```

4. Verify the container is up and ready by reviewing the logs with (replace **clearpay-fe** by the **container_name** you configured in the `docker-compose.yml`)

```console
$ sudo docker-compose logs -f --tail=100 clearpay-be
```

<br/>

## Language support

Even though an i18n system has been implemented in the frontend application, no component for changing language is implemented nor language file translations besides **en.json** were created thus the only supported language is **English** (see [Wishlist](#wishlist) section).

<br/>

## Wishlist

Following there are listed several items that were not possible to implement due to lack of time but would have been nice to have to improve the application security and UX.

- Frontend
  - Add features:
    - Add/Modify operations for users
    - Add/Modify operations for wallets
    - Create and SVG icon with the ClearPay icon logo and use it in substitution of the dollar sign in the transactions table
    - Configure material theme to not use the primary color (light greenish ClearPay color) on form items when focused
    - Implement some Unit Tests
    - Implement some Integration Tests
  - Add multi-language support (i18n + Translate is implemented but no select language nor xx.json files a part from default en.js were added)
  - Add search button on the users section to be able to manually search (see [Known issues](#known-issues) section)
- Backend
  - Add multiple CRUD endpoints for users and wallets
  - Add Spring Security to add a permissions protection at endpoint level
  - Use ServerRequest / ServerResponse approach in controllers
  - Use the functional and router approach with the controllers

<br/>

## Known issues

- Frontend
  - ISSUE: if and error occurs while recovering the list of users the user needs to refresh the browser in order to try again the users search
  - SOLUTION: add a search button in the users section (see [Wishlist](#wishlist) section)
