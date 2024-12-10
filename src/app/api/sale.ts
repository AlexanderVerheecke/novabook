// Allows a user to modify an item within a sale at a specific point in time. The service must accept all amendments even if the sale or item does not yet exist. The sales event can be received by the service after the amendment.

// Method: PATCH
// Request path: /sale
// Request JSON Body 
// {
// 	“date”: Date and time ISO 8601,
// “invoiceId”: string,
// “itemId”: string,
// 	“cost”: number - amount in pennies,
//  	“taxRate”: number
// }
// Request JSON Example
// {
// “date”: “2024-02-22T17:29:39Z”,
// “invoiceId”: “3419027d-960f-4e8f-b8b7-f7b2b4791824”,
// “itemId”: “02db47b6-fe68-4005-a827-24c6e962f3df”,
// 	“cost”: 798 // £7.98,
//  	“taxRate”: 0.15
// }


// Successful response
// Status code: 202
// No body
