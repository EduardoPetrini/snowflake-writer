# Snowflake Writer

Snowflake Writer is a Node.js application that generates and inserts fake data into a Snowflake database table. It uses TypeScript and the Snowflake SDK to connect to and interact with the Snowflake database.

## Features

- Connects to a Snowflake database using environment variables
- Creates a table in Snowflake if it doesn't exist
- Generates 1000 fake records with titles and descriptions
- Inserts the generated data into the Snowflake table

## Prerequisites

- Node.js (version 12 or higher recommended)
- npm (comes with Node.js)
- A Snowflake account with the necessary credentials

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd snowflake-writer
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   SF_ACCOUNT=your_snowflake_account
   SF_DATABASE=your_database_name
   SF_WAREHOUSE=your_warehouse_name
   SF_USERNAME=your_username
   SF_PASSWORD=your_password
   SF_TABLE_NAME=your_table_name
   SF_TIMEOUT=300000
   ```
   Replace the values with your actual Snowflake credentials.

## Usage

To run the application, use the following command:

```
npx ts-node index.ts
```

This will execute the main script, which connects to Snowflake, creates the table if it doesn't exist, generates fake data, and inserts it into the table.

## Project Structure

- `index.ts`: The main entry point of the application. It sets up the Snowflake connection and initiates the data insertion process.
- `SfConn.ts`: Contains the `SfConn` class, which manages the Snowflake connection and provides methods for creating tables and executing SQL statements.
- `utils.ts`: Provides utility functions for generating fake titles and descriptions.
- `package.json`: Defines the project dependencies and scripts.

## Dependencies

- `snowflake-sdk`: SDK for connecting to and interacting with Snowflake
- `dotenv`: For loading environment variables from a .env file
- `typescript`: For TypeScript support
- `ts-node`: For running TypeScript files directly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
