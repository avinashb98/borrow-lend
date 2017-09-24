# borrow-lend
API for Borrowing and Lending

#API CALLS

**Register a User**
----
  Register a new user. The API handles the user according to its role.

* **URL**

  /register

* **Method:**

  `POST`


   **Required:**
 
   `name= String
    email=String
    password=String
    `

* **Data Params**

  The body must contain the required fields

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        message: "User Succesfully registered"
      }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

**Authenticate a User**
----
  Authenticate a user and send a JWT token

* **URL**

  /authenticate

* **Method:**

  `POST`


   **Required:**
 
   `email=String
    password=String
    role=String
    `

* **Data Params**

  The body must contain the required fields

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
          success: true,
          message: 'Enjoy your token!',
          token: token
        }`
           
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{
          success: false,
          message: 'Authentication failed. Wrong password.'
        }` 
  OR

  * **Code:** 401 <br />
    **Content:** `{
          success: false,
          message: 'Authentication failed. User not found.'
        }`

**Token is required for all requests that follow**
----
    The token may be sent after authenticated via the request header, request body or url queries

**Credit Request**
----
  Post for a credit request by borrower

* **URL**

  /request/:id

* **Method:**

  `POST`


   **Required:**
 
   `id=String
    amount=String
    dueDate=String
    `

* **Data Params**

  The body must contain the required fields

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
          succes: true,
          message: 'Succesfully Requested for credit'
        }`
           
 
* **Error Response:**

  * **Code:** 422 <br />
    **Content:** `{
        error: "Request amount exceeds credit limit"
      }` 

**List of Request**
----
  Get a list of requests corresponding to each user

* **URL**

  /my-requests

* **Method:**

  `GET`


   **Required:**
 
   `id=String
    amount=String
    dueDate=String`

* **Query Params**

  id of the borrower

* **Data Params**

  The body must contain the required fields

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
          succes: true,
          message: 'Succesfully Requested for credit'
        }`
           
 
* **Error Response:**

  * **Code:** 422 <br />
    **Content:** `{
        error: "Request amount exceeds credit limit"
      }`

**Repayment**
----
  Set the repayment flag of a credit request

* **URL**

  /paid/:id

* **Method:**

  `PUT`

   **Required:**
 
   `id=String`

* **Query Params**

  id of the credit request

* **Data Params**

  The body must contain the required fields

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        success: true,
        message: 'The credit is paid'
      }`
           
 
* **Error Response:**

  * **Code:** 422 <br />
    **Content:** `{
        error: "Bad Request"
      }`

**List of requests**
----
  Get the list of all credit requests

* **URL**

  /request-list

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `List of requests`
           
 
* **Error Response:**

  * **Code:** 422 <br />
    **Content:** `{
        error: "Bad Request"
      }`      

**Borrower List**
----
  Get the list of all Borrowers

* **URL**

  /borrower-list

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `List of all borrowers`
           
 
* **Error Response:**

  * **Code:** 422 <br />
    **Content:** `{
        error: "Bad Request"
      }`      