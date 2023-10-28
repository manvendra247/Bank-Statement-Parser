# Project Title: BANK STATEMENT PARSER

This project is about extracting PDFs from Gmail, specifically those with the subject 'Bank Statement', and then parsing the data from these PDFs. The parsed data is then exposed via APIs to fetch all transactions, transactions between specific dates, and balance on a specific date.
The project consists of the following directories and files:

## Backend

The project uses several Python libraries such as `pandas`, `pdfplumber`, `flask`, and `Google APIs` to read emails from Gmail, download and parse PDF attachments, and expose the parsed data via APIs. The APIs can be consumed by any client application, such as a web or mobile application, to display the transaction data to the end user.

## Installation

First, clone the repository

```bash
git clone https://github.com/manvendra247/Bank-Statement-Parser.git
cd Bank-Statement-Parser
```

This project requires `Python 3.6` or above. Check your Python version with:

```bash
python --version
```

If you don't have `Python 3.6` or above, you can install it from [here](https://www.python.org/downloads/).

### Create a Virtual Environment:

Run the following command to create a virtual environment. Replace `myenv` with your preferred environment name.

```bash
python -m venv myvenv
```

Activate the Virtual Environment

```bash
.\myvenv\Scripts\activate

```

Next, install the required dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### Setup GMAIL API on Google Cloud Console

To interact with Gmail and download the PDF attachments, we need to authenticate our application with Gmail. We do this by creating OAuth client ID credentials. These credentials are used to authenticate our application and authorize it to access Gmail on behalf of the user.

The `credentials.json` file contains the client ID and client secret, which are used in the OAuth 2.0 flow to authenticate our application.

### Generating OAuth client ID credentials

Follow these steps to create your OAuth client ID credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).

1. From the project drop-down, select an existing project, or create a new one by selecting 'New Project'.

1. In the sidebar on the left, select APIs & Services > Credentials.

1. Click on the 'Create Credentials' button and select 'OAuth client ID'.
1. If you have not configured the 'OAuth consent screen' before, you will be asked to do it now. Fill in the necessary details and save.
1. In the 'Create OAuth client ID' screen, select 'Desktop app' as the 'Application type'.
1. In the 'Name' field, type a name for the credential. This name is only shown in the Google Cloud console.
1. Click 'Create'. The 'OAuth client created' screen appears, showing your new Client ID and client secret.
1. Click 'OK'. The newly created credential appears under 'OAuth 2.0 Client IDs'.
1. Click the download button on the right side of your newly created OAuth 2.0 client ID. This will download the `credentials.json` file.

### Using the credentials.json file

Place the `credentials.json` file in the same directory as your main Python script (`app.py` and `gmail_auth.py` in this project). The script uses this file to authenticate with Gmail.

Please note that the `credentials.json` file contains sensitive data and should not be exposed publicly or committed to source control.

### Run the Backend

To run the application, use the command:

```bash
flask run
```

The application will start running at http://127.0.0.1:5000/.

## APIs

The application provides the following APIs:

- `/api/alltransactions`: This API returns all the transactions in the bank statements.
- `/api/daterange`: This API returns the list of transactions between different dates. The start and end dates should be provided as query parameters in the format `'YYYY-MM-DD'`.
- `/api/balance`: This API returns the balance on a specified date. The date should be provided as a query parameter in the format `'YYYY-MM-DD'`.

## Frontend

The application fetches transaction data from three different APIs: `/api/alltransactions`, `/api/daterange`, and `/api/balance`. The data is displayed in a tabular format, and users can filter transactions by date range and view balance on a specific date.

- `App.js`: This is the main file of the project where the routes are defined.
- `ShowTransactions.js`: This file fetches all transactions from the backend and displays them.
- `DateRangeTransaction.js`: This file fetches transactions within a specific date range from the backend and displays them.
- `ShowBalance.js`: This file fetches the balance on a specific date from the backend and displays it.

### Prequisites

Before you begin, ensure you have met the following requirements:

You have installed the latest version of `Node.js` and `npm`. Check your `Node.js` version with `node --version` and npm version with `npm --version`. If you don't have `Node.js` or `npm`, you need to install them first.

### Installation

```bash
npm install
```

### Run the Frontend

To run the application, use the command:

```bash
npm start
```

## ScreenShots

### All Transactions

![all_](https://github.com/manvendra247/Bank-Statement-Parser/blob/main/images/bank-statement-homepage.jpg?raw=true)

### Transactions between the specified Dates

![daterange](https://github.com/manvendra247/Bank-Statement-Parser/blob/main/images/bank-statement-daterange.jpg?raw=true)

### Balance on Particular Date

![Balance on Particular Date](https://github.com/manvendra247/Bank-Statement-Parser/blob/main/images/bank-statement-balance.jpg?raw=true)

## Support

For any issues or improvements, please open an issue in the GitHub repository. Please include as much information as possible for any issues, including the steps to reproduce the issue and any error messages.

## License

This project is open source and available under the MIT License.
