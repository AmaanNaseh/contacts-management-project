# CONTACT MANAGEMENT PROJECT (BACKEND WEB DEVELOPMENT)

This project is based on Backend Web Development (Express.js, Node.js and MongoDB). I have used JWT authentication to build login signup functionalities for authorization. Users can register, log in and receive JWT auth token which they can use to access their contacts/phone numbers of known people (CRUD operations). I would like to thank Dipesh Malvia sir for inspiring me to build this project.This project is based on Backend Web Development (Express.js, Node.js and MongoDB). I have used JWT authentication to build login signup functionalities for authorization. Users can register, log in and receive JWT auth token which they can use to access their contacts/phone numbers of known people (CRUD operations). I would like to thank Dipesh Malvia sir for inspiring me to build this project.

## Tech Stack

![Image](https://github.com/user-attachments/assets/366ed64e-6dae-48bd-ba5f-1a98af681917)

## Steps to run the project

1. Clone the repository

```bash
git clone https://github.com/AmaanNaseh/contacts-management-project.git
```

2. Open project folder in your IDE or navigate to it

```bash
cd contacts-management-project
```

3. Install the dependencies

```bash
npm install
```

4. Add a .env file consisting your mongodb url (make sure to add your username, your password, and your database/collection name) i.e. MONGO_URL="your-url". Also add ACCESS_TOKEN_SECRET="your-custom-secret" & PORT=5000

```bash
touch .env
```

5. Start the development server

```bash
npx nodemon server.js
```

Access the routes & CRUD operations in POSTMAN or Thunder Client extension of VS Code. Make sure to register & login then access CRUD operations of contact

## Project Preview

![Image](https://github.com/user-attachments/assets/a88bf536-b9f7-408f-aa51-4d514f367b89)
