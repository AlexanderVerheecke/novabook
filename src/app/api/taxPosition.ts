// Query Tax Position Endpoint

// Allows a user to query their tax position at any given point in time. This should calculate the tax position from ingested events and any further user interaction

// Method: GET
// Request path: /tax-position
// Request query parameters:
// date: Date and time ISO 8601
// Mandatory
// Example: 2024-02-22T17:29:39Z
// No Request body

// Successful response
// Status code: 200
// Response JSON body:
// {
//   “date”: Date and time ISO 8601
//   “taxPosition”: number
// }

// Example body:
// {
//   “date”: “2024-02-22T17:29:39Z”,
//   “taxPosition”: 49 // £0.49
// }
