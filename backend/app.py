import base64
import os
import pandas as pd
import pdfplumber
from flask import Flask,jsonify, request,json
from flask_cors import CORS
from gmail_auth import get_credentials
from googleapiclient.discovery import build
from datetime import datetime, timedelta


# setup server
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})



creds = get_credentials()
service = build('gmail', 'v1', credentials=creds)
current_dir = os.getcwd()
pdfs_dir = os.path.join(current_dir, 'pdfs')
csv_dir = os.path.join(current_dir, 'CSVs')

# extract pdfs from gmail.
if not os.path.exists(pdfs_dir):
    os.mkdir(pdfs_dir)

if not os.path.exists(csv_dir):
    os.mkdir(csv_dir)
results = service.users().messages().list(userId='me', q="Subject:'Bank Statement'").execute()
messages = results.get('messages', [])
table_data = []

for message in messages:
    msg = service.users().messages().get(userId='me', id=message['id']).execute()
    for part in msg['payload']['parts']:
        if part['filename']:
            attachment = service.users().messages().attachments().get(userId='me', messageId=message['id'], id=part['body']['attachmentId']).execute()
            data = attachment['data']
            file_data = base64.urlsafe_b64decode(data.encode('UTF-8'))
            file_path = os.path.join(pdfs_dir, part['filename'])
            with open(file_path, 'wb') as f:
                f.write(file_data)
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    tables = page.extract_tables()
                    df = pd.DataFrame(tables[0][2:])
                    df = df.drop(columns=[0,2,3,5,6,8,9,11,12,14])
                    df.columns = ["Date","Description","Credit","Debit","Balance"]
                    df['Date'] = pd.to_datetime(df['Date'], format='%d/%m/%Y')
                    table_data = df.to_json(orient='records')


# api 

# to get all the transactions
@app.route('/api/alltransactions', methods=['GET'])
def get_transactions():
    return json.loads(table_data)

# to get the list of transactions between different dates.
@app.route('/api/daterange', methods=['GET'])
def search_transactions():
    start_date = datetime.strptime(request.args.get('start'), '%Y-%m-%d')
    end_date = datetime.strptime(request.args.get('end'), '%Y-%m-%d')+ timedelta(days=1)
    transactions = [item for item in json.loads(table_data) if datetime.fromtimestamp(item['Date'] / 1000) >= start_date and datetime.fromtimestamp((item['Date']) / 1000) <= end_date ]
    return jsonify(transactions) 

# to get balance on a specified date
@app.route('/api/balance', methods=['GET'])
def get_balance():
    balance_date = datetime.strptime(request.args.get('date'), '%Y-%m-%d') + timedelta(days=1)
    balance = None
    for item in json.loads(table_data):
        item_date = datetime.fromtimestamp(item['Date'] / 1000)
        # Check if the item's date is on or before the specified balance_date
        if item_date <= balance_date:
            print(balance,item_date,balance_date)
            balance = item['Balance']
            item_date = max(balance_date,item_date)
    
    if balance is not None:
        return jsonify({'balance': balance})
    else:
        return jsonify({'error': 'Balance not found for the specified date'})
