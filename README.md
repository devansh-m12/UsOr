

# USOR Backend - Simplifying Open Source Contributions

Backend server for USOR, USOR is a user-friendly application designed to help developers and enthusiasts find Y Combinator startups that are open source and open to contributions. By providing a centralized platform to filter, search, and explore these startups, Usor aims to foster collaboration and innovation within the tech community.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installing

Clone the repository:

```bash
git clone https://github.com/devansh-m12/UsOr-backend.git
cd usor-backend
```

Install dependencies:

```bash
npm install
```

### Running the Development Server

To start the server in development mode with automatic restart using nodemon:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

### Running the Production Server

To run the server in production mode:

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

## API Endpoints

- **GET `/api/v1/status`**: Check the status of the website.

### Authentication

- **POST `/api/v1/auth/register`**: Register a new user.
  - Request body parameters:
    - `fullName` (string): Full name of the user.
    - `email` (string): Email address of the user.
    - `password` (string): Password for the user account.
    - `avatar` (string, optional): URL or base64-encoded image for user avatar.


### Built With

- Node.js
- Express
- TypeScript
- MongoDB

### Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

### Authors

- Devansh - [devansh-m12](https://github.com/devansh-m12)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc.
