# Sportspulse API

Sportspulse is a simple API built with Node.js, Express, and MongoDB for managing functions.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/urbantech/sportspulse.git
    cd sportspulse
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    MONGO_URI=mongodb://localhost:27017/sportspulse
    PORT=5000
    ```

4. Start the development server:
    ```bash
    npm start
    ```

### Running Tests

To run the test suite, use the following command:
```bash
npm test
