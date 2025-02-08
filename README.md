# Budget Tracker Application

## Overview

The Budget Tracker is a web application designed to help users manage their finances by tracking income and expenses. It provides an admin panel for managing users and a user dashboard for tracking transactions. The application is built using Node.js, Express, and MongoDB, with a front-end powered by HTML, CSS, and JavaScript.

## Features

### User Features
- **User Registration and Login**: Users can register and log in to access their personal dashboard.
- **Transaction Management**: Users can add, view, and categorize their income and expenses.
- **Currency Conversion**: The app supports multiple currencies and provides real-time conversion rates.
- **Bitcoin Price Tracking**: Users can view the current Bitcoin price in their selected currency.

### Admin Features
- **User Management**: Admins can view, add, update, and delete users.
- **Admin Status Verification**: Admins can verify their status through a secure token-based system.
- **Admin username: arman, password: 12345678**

## External APIs

The application integrates with several external APIs to enhance its functionality:

- **Exchange Rate API**: Used to fetch real-time currency conversion rates. The API endpoint is `https://v6.exchangerate-api.com/v6/e574baa886db4517daba5e5a/latest/KZT`.
- **CoinPaprika API**: Used to fetch the current Bitcoin price. The API endpoints are `https://api.coinpaprika.com/v1/coins/btc-bitcoin` and `https://api.coinpaprika.com/v1/tickers/btc-bitcoin`.

## Project Structure

- **src/**: Contains the HTML files for the user interface, including `index.html`, `admin.html`, `login.html`, and `register.html`.
- **controllers/**: Contains the server-side logic for handling user and transaction operations.
- **routes/**: Defines the API endpoints for authentication, admin, and transaction operations.
- **databaseHandlers/**: Contains the database interaction logic for users and transactions.
- **.env**: Stores environment variables, including the MongoDB connection URI.
- **package.json**: Lists the project dependencies and scripts.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budget-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd budget-tracker
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables in a `.env` file:
   ```
   uri=your_mongodb_connection_uri
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- **User Dashboard**: After logging in, users can manage their transactions and view their financial summary.
- **Admin Panel**: Admins can manage user accounts and perform administrative tasks.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the ISC License.