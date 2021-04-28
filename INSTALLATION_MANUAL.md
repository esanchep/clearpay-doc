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

<span style="font-size: 12px;">NOTE: Checkout Mongodb 🠈🠊 Spring Data compatibility matrix [here](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#compatibility.matrix)
(Spring Boot version used in the BE project: 2.4.5)</span>

### Docker and docker-compose

- docker v19.03.0+
- docker-compose v1.29

<span style="font-size: 12px;">NOTE: if you want to use other versions remember to change the `version` property on the [`docker-compose.yml`](docker/docker-compose.yml) to the corresponding one</span>

<br/>

## Product versions used

  | Product | | Version |
  |---|---|:-:|
  | MongoDB | | 4.2-bionic
  | Java | | 8 |
  | Spring Boot | | 2.4.5 |
  | Angular | | 11 |

<br/>

## Installation

<span style="font-size: 12px;">NOTE: for product versions [see Product versions used](#product-versions-used) section</span>

<span style="font-size: 12px;">NOTE: Provided in this repo you will find a [`docker-compose.yml`](docker/docker-compose.yml) file with all the necessary parameters to set up the different containers.</span>

### Database component installation

#### Without docker and docker-compose

- Manually install and configure MongoDB on your system

#### With docker and docker-compose

1. Setup your environment with the necessary mapped directories to store the database collections and database scripts
2. Configure docker-compose.yml to reflect this configuration
3. (Optional) change `docker-compose.yml` **MONGO_INITDB_ROOT_USERNAME** and **MONGO_INITDB_ROOT_PASSWORD** if you want another user to be used as root user
4. Download the database image with `$ sudo docker-compose pull mongodb` (replace **mongodb** by the **image_name** you configured in the `docker-compose.yml`)
5. Once downloaded, pull up the database image with `$ sudo docker-compose up -d mongodb` (replace **mongodb** by the **image_name** you configured in the `docker-compose.yml`)
6. Verify the container is up and ready by reviewing the logs with `$ sudo docker-compose logs -f --tail=100 mongodb` (replace **mongodb** by the **image_name** you configured in the `docker-compose.yml`)

### Backend component installation

1. Configure `docker-compose.yml` with the desired options (exposed port, database connection parameters in the **command** property...)
2. Download the backend image with `$ sudo docker-compose pull clearpay-be` (replace **clearpay-be** by the **image_name** you configured in the `docker-compose.yml`)
3. Once downloaded, pull up the backend image with `$ sudo docker-compose up -d clearpay-be` (replace **clearpay-be** by the **image_name** you configured in the `docker-compose.yml`)
4. Verify the container is up and ready by reviewing the logs with `$ sudo docker-compose logs -f --tail=100 clearpay-fe` (replace **clearpay-fe** by the **image_name** you configured in the `docker-compose.yml`)

### Frontend component installation

1. Configure `docker-compose.yml` with the desired options
2. Download the frontend image with `$ sudo docker-compose pull clearpay-fe` (replace **clearpay-fe** by the **image_name** you configured in the `docker-compose.yml`)
3. Once downloaded, pull up the frontend image with `$ sudo docker-compose up -d clearpay-fe` (replace **clearpay-fe** by the **image_name** you configured in the `docker-compose.yml`)
4. Verify the container is up and ready by reviewing the logs with `$ sudo docker-compose logs -f --tail=100 clearpay-be` (replace **clearpay-be** by the **image_name** you configured in the `docker-compose.yml`)

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
  - Add multi-language support
  - Add search button on the users section to be able to manually search (see [Known issues](#known-issues) section)
- Backend
  - Add multiple CRUD endpoints for users and wallets
  - Add Spring Security to add a permissions protection at endpoint level
  - Use ServerRequest / ServerResponse approach in controllers
  - Use the functional and router approach with the controllers

<br/>

## Known issues

- Frontend
  - ISSUE: if and error occurs while recovering the list of users
  - SOLUTION: add a search button (see [Wishlist](#wishlist) section)