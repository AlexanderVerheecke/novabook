# Requirements

Make sure you have the following installed:

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

# How to run the project

## 1. **Clone the repository**

First, clone the repository to your local machine.

```bash
git clone https://github.com/AlexanderVerheecke/novabook
```

## 2. **Install dependencies**

Navigate into the project `cd novabook` and run the following command to install all the required depenencies.
`npm install`

## 3. **Run the development sever**

`npm run dev`
This will start the server at http://localhost:3000 where you can see the app in action.

## 4. **Build the project and run**

If you want to build the project for production, use the following command:
`npm run build`
You can then use `npm run start` to run it.

# Functionality

The core functionality is split into three parts:

## Ingest Transaction

The Ingest Transaction functionality allows users to record transactions related to sales and tax payments. This feature ensures that every event is recorded accurately for later processing.

Key Features:

- Record Sales: The ability to record sales transactions including item details, cost, and tax rate.
- Event Types: Sales and tax payment events are handled separately but stored under the same transaction history for easy retrieval.
- Form Validation: Ensures that all fields are filled and valid before submission.

Usage:

- User chooses between recording 'Sales' or 'Tax payment'
- Depending on the chosen event, different inputs are required.
- Multiple items can can be recorded at one time under the 'Sales' option.

## Tax Position Query

The Tax Position Query functionality enables users to query the current tax position based on historical transactions. It calculates the tax position at any given date, considering all sales and tax payments up until that date.

Key Features:

- Date Selection: Users can select a date to calculate the tax position up until that point.
- Tax Position Calculation: Based on sales (tax collected) and tax payments, the system calculates the net tax position.

Usage:

- Users enter a desired date and click the "Calculate Tax Position" button.
- The system returns the net tax position, which is the difference between collected sales tax and paid tax.

## Sales amendment

The Sales Amendment functionality allows users to amend or correct details of previously recorded sales transactions. If a mistake is made, users can update the invoice, item details, cost, or tax rate. If not record for a sales transaction is found, a sales transaction will be created.

Key Features:

- Form Validation: Ensures that all fields are filled and valid before submission.
- Amendment Processing: Updates existing sales records or creates new records if necessary.
- Real-time Backend Sync: The frontend communicates with the backend API to update sales data.

Usage:

- Select a date
- Input Sale Details: Provide Invoice ID, Item ID, Cost, and Tax Rate.
- Submit Amendment: After validation, submit the amendment to update or create a sale record.

# Frontend Code Overview

Each feature (Ingest Transaction, Tax Position Query, Sales Amendment) has its own React component with separate forms and state management. Below is a breakdown of the core components.

## Ingest Transaction (Recording Sales and Tax Payments)

- Form to input transaction details such as item ID, cost, and tax rate.
- Uses useState for managing form inputs and useEffect for validation.
- Data is submitted to the backend via a POST request to record the transaction.

## Tax Position Query (Querying Tax Position)

- Input Date: Users select a date to calculate the tax position.
- Sends a GET request to fetch the tax position based on sales and tax payments up to the selected date.
- Displays the calculated tax position as a result.

## Sales Amendment (Amending Sale Details)

- Input Form to provide details for amending a sale transaction.
- Validation ensures that all required fields are filled before submission.
- A PATCH request is sent to the backend to update the transaction, either modifying an existing sale or adding a new item if it doesn't exist.

# Backend Code Overview

The backend API endpoints process the data submitted from the frontend and update the store accordingly.

1. Ingest Transaction API (POST):
   Handles incoming transactions by recording sales or tax payments. This data is added to the transaction store, ensuring it is available for tax calculations and reporting.

2. Tax Position Query API (GET):
   Calculates and returns the net tax position for the selected date by summing up all sales and tax payments.

3. Sales Amendment API (PATCH):
   Accepts an amendment request for an existing sale. If the sale exists, it updates the item’s details; if not, it creates a new sale event.
