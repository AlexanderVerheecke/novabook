// Allows a user to send sales and tax payment events to our service

// Method: POSTRequest path: /transactions
// Request JSON Body: One of the following

// Sale Event
// {
// 	“eventType”: “SALES”,
// 	“date”: string - Date and time ISO 8601
// “invoiceId”: string,
// “items”: [{
//  		“itemId”: string,
//  		“cost”: number - amount in pennies,
//  		“taxRate”: number
// }]
// }

// Sale Event Example
// {
// 	“eventType”: “SALES”,
// 	“date”: “2024-02-22T17:29:39Z”,
// “invoiceId”: “3419027d-960f-4e8f-b8b7-f7b2b4791824”,
//   	“items”: [{
// 	“itemId”: “02db47b6-fe68-4005-a827-24c6e962f3df”,
// 	“cost”: 1099, // This is £10.99
// “taxRate”: 0.2
// }]
// }

// Tax Payment Event
// {
// 	“eventType”: “TAX_PAYMENT”,
// 	“date”: string - Date and time ISO 8601,
// 	“amount”: number - amount in pennies
// }


// Tax Payment Event Example
// {
// 	“eventType”: “TAX_PAYMENT”,
// 	“date”: “2024-02-22T17:29:39Z”,
// 	“amount”: 74901 // £749.01
// }

// Successful response
// Status code: 202
// No body
