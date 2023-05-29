# EatTrack API

Welcome to the official repository for the EatTrack API, serving as the reliable backbone of the EatTrack application. This API follows the principles of REST architecture and is developed using a tech stack that includes Node.js, Express, and Prisma.io. It is hosted on Amazon's cloud computing service AWS EC2 and employs an SQL database to manage and store information.

## 🚀 Getting Started

Here are the instructions to set up the EatTrack API in your local environment.

### 📥 Installation

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/VincentDub2/IG3ProjetFront.git
    ```

2. Install the necessary dependencies.

    ```bash
    npm install
    ```

3. Create a `.env` file in your root directory and fill it with your configuration settings. Here's an example:

    ```bash
    DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>?schema=<schema>"
    JWT_SECRET=<your_secret_key>
    ```

4. Execute the following command to generate the database tables:

    ```bash
    npx prisma migrate dev --name init
    ```

### 🏃‍♀️ Running the API

To start the application, use the following command:

    ```bash
    npm start
    ```

### 🏗️ Building the API

To build the application, use the following command:

    ```bash
    npm run build
    ```

## 🌐 Usage

The API is deployed at the following URL: https://api.eattrack.app:8080

Here is an overview of the available endpoints:

### 🔒 Authentication

- Register a new user: `POST /auth/register`
- User login: `POST /auth/login`

### 👥 Users

- Update a user: `POST /user/:id`
- Get the current user: `GET /user/actual`
- Get food items associated with a user: `GET /user/:id/foods`
- Delete a user: `DELETE /userDel/:id`

### 🍲 Foods

- Search for a food item: `GET /food/search`  
Example: https://api.eattrack.app:8080/food/search?query=apple
- Add a new food item: `POST /food/add`
- Update a food item: `PUT /food/:id`
- Delete a food item: `DELETE /food/:id`

### 🍽️ Meals

- Add a meal: `POST /meal/add`
- Get meals for a user on a specific date: `GET /meals/:userId/:date`

### 🏢 Brands

- Add a new brand: `POST /brands/add`
- Retrieve all brands: `GET /brands`

## 📦 Dependencies

This project relies on several packages, including:

- bcryptjs
- cors
- dotenv
- express
- jsonwebtoken
- mysql2
- prisma
- typescript

## 👨‍💻 Author

Vincent Dubuc

## 📄 License

This project was created for an engineering course at Polytech Montpellier and is licensed under the [MIT License](LICENSE).
