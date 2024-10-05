# File Upload Project

This project provides a simple API for user management and file upload, retrieval, and download using Node.js, Express, and Sequelize.

## Table of Contents

- [Project Structure](#project-structure)
- [Models](#models)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Create User](#create-user)
  - [Upload File](#upload-file)
  - [Get All Files](#get-all-files)
  - [Download File](#download-file)
- [Logging](#logging)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Project Structure

```
fileUpload
│   ├── .gitIgnore
|   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
└── src
    ├── config
    │   └── DbConfig.js
    ├── controller
    │   ├── FileUploadController.js
    │   └── UserController.js
    ├── models
    │   ├── FileModel.js
    │   └── UserModel.js
    ├── routes
    │   ├── FileRoutes.js
    │   └── UserRoutes.js
    └── util
        ├── ErrorHandlers.js
        └── Logging.js
```

## Models

### User Model

- **File:** `src/models/UserModel.js`
- **Structure:**
  - **email:**
    - Type: `STRING`
    - Constraints: Unique, Not Null
    - Validation: Must not be empty
  - **password:**
    - Type: `STRING`
    - Constraints: Not Null
    - Validation: Must not be empty
  - **Hooks:**
    - Before creating a user, the email is converted to lowercase.

### File Model

- **File:** `src/models/FileModel.js`
- **Structure:**
  - **fileName:**
    - Type: `STRING`
    - Constraints: Not Null
  - **file:**
    - Type: `BLOB (long)`
    - Constraints: Not Null
  - **fileType:**
    - Type: `STRING`
    - Constraints: Not Null
  - **email:**
    - Type: `STRING`
    - Constraints: Not Null


## Installation

<!-- 1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd fileUpload
   ``` -->

1. Install the required packages:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:

   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=file_server
   ```

3. Start your MySQL server.

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

- `DB_HOST`: The host where your MySQL server is running (default is `localhost`).
- `DB_USER`: The MySQL user (default is `root`).
- `DB_PASS`: The password for the MySQL user.
- `DB_NAME`: The name of the database to be created/used.

## API Endpoints

### Create User

- **Endpoint**: `POST /api/users`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  - **201 Created**: User created successfully.
  - **500 Internal Server Error**: Error creating user.

### Upload File

- **Endpoint**: `POST /api/files/upload`
- **Request Body**:
  - Form-data with file and email.
- **Response**:
  - **200 OK**: File saved successfully.
  - **400 Bad Request**: No file uploaded or file type is undefined.
  - **500 Internal Server Error**: Error saving file.

### Get All Files

- **Endpoint**: `GET /api/files`
- **Response**:
  - **200 OK**: List of files retrieved successfully.
  - **500 Internal Server Error**: Error retrieving files.

### Download File

- **Endpoint**: `GET /api/files/download/:id`
- **Response**:
  - **200 OK**: File downloaded successfully.
  - **404 Not Found**: File not found.
  - **500 Internal Server Error**: Error downloading file.

## Logging

All actions are logged to the console, providing information about successful operations, such as user creation and file uploads, as well as any errors that may occur.

## Error Handling

Errors are managed gracefully with appropriate status codes and messages returned to the client. Common errors are logged for debugging purposes.

## Contributing

Feel free to fork the repository and submit a pull request for any improvements or features you'd like to add!

---

For any further questions or issues, please feel free to reach out or create an issue in the repository.
