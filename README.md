# Final-Year-Project-API

Intelligent Vision Based Pipeline Monitoring and Control API

## Routes

### Baseurl: https://final-year-project-api-topaz.vercel.app/api/command/

### 1. Login

- **Login Path: /login**

* Request method: POST
* Request body: { role: "not available", accessCode: "contact admin for access code" }

### 2. Get all users

- **/getUsers**

* Request method: GET
* Request body: none

### 3. Get current command (hardware usage only)

- **/getCommand**

* Request method: GET
* Request body: none

### 4. Get send feedback (hardware usage only)

- **/postFeedback**

* Request method: POST
* Request body:

### 5. Send Command

- **/postCommand**

* Request method: POST
* Request body: { command: "forward" || "backward" || "high" || "mid" || "low" || "stop" }

### 6. Get Feedback

- **/getFeedback**

* Request method: GET
* Request body: none

### 7. Refresh

- **/refresh**

* Request method: GET
* Request body: none
