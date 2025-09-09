# Simple Course Management System

---

## 🖋 Features

### User-Friendly course Management
- **Create, Read, Update, Delete course (CRUD)**: Effortlessly manage course using intuitive APIs.   

### Role-Based Access Control
- **Admin**: Full access to manage course and perform administrative tasks.  
- **Users**: Limited access to their own course entries.  
### Error Handling
- **Centralized Error Management**: Handle `ValidationError`, `CastError`, `Duplicate Key Errors`, and more effectively.  
- **Zod Validation**: Strong schema validation to ensure data integrity.  

---

## 🚀 Technology Stack

- **Backend**: TypeScript, Node.js, Express.js  
- **Database**: MongoDB with Mongoose ORM  
- **Validation**: Zod for schema validation  
- **Authentication**: Token-based authentication using JSON Web Tokens (JWT)  
- **Error Handling**: Custom error classes and centralized error middleware  

---

## 📂 Project Structure

```plaintext
src/  
├── app/ 
│   ├── config/
│   │   └── index.ts
│   ├── errors
│   │   ├── AppError.ts
│   │   ├── HandleCastError.ts
│   │   ├── HandleDuplicateError.ts
│   │   ├── HandleValidationError.ts
│   │   └── HandleZodError.ts
│   ├── interface
│   │   ├── error.ts
│   │   └── index.d.ts
│   ├── middlewares
│   │   ├── authGuard.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   ├── module
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.utils.ts
│   │   │   └── auth.validation.ts
│   │   ├── course
│   │   │   ├── course.controller.ts
│   │   │   ├── course.interface.ts
│   │   │   ├── course.model.ts
│   │   │   ├── course.routes.ts
│   │   │   ├── course.service.ts
│   │   │   └── course.validation.ts
│   │   ├── purchase
│   │   │   ├── purchase.controller.ts
│   │   │   ├── purchase.interface.ts
│   │   │   ├── purchase.model.ts
│   │   │   ├── purchase.routes.ts
│   │   │   ├── purchase.service.ts
│   │   │   └── purchase.validation.ts
│   │   └── user
│   │       ├── user.constant.ts
│   │       ├── user.controller.ts
│   │       ├── user.interface.ts
│   │       ├── user.model.ts
│   │       └── user.service.ts
│   ├── routes
│   │   └── index.ts 
│   └── utils
│       ├── catchAsync.ts
│       ├── sendResponse.ts
│       └── validateRequest.ts
└── server.ts 

```

---

## 📋 Installation and Setup (Locally)

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/dear-mahmud-bd/simple-course-management.git  
   cd simple-course-management  
   ```  

2. **Install Dependencies**  
   ```bash
   npm install  
   ```  

3. **Environment Configuration**  
   Create a `.env` file in the root directory:  
   ```plaintext
   NODE_ENV=development  
   PORT= provide your port number  
   DATABASE_URL= your MongoDB url (like: mongodb+srv://YOUR_SECRET_PROJECT:YOUR_SECRET+PASS@cluster0.1plyg.mongodb.net/blogs-data?retryWrites=true&w=majority&appName=YOUR_CLUSTER)
   BCRYPT_SALT_ROUNDS=your_bcrypt_secret  
   JWT_ACCESS_TOKEN=your_jwt_secret
   JWT_ACCESS_TOKEN_EXPIRES=your_recomended_time (must in formate)
   JWT_REFRESH_TOKEN=your_jwt_secret
   JWT_REFRESH_TOKEN_EXPIRES=your_recomended_time (must in formate)
   ```  

4. **Run the Application**  
   ```bash
   npm run start:dev
   ```  

5. **Visit the Application**  
   Open your Browser or Postman and navigate to: `http://localhost:5000`  

---

## 📊 API Endpoints

### **User Management**

#### Create a Admin

- Method: **POST** `/api/auth/create-admin`
- Instruction: Just Hit the API to create Admin and get default credential and follow the response instruction

---

#### Register a User

- Method: **POST** `/api/auth/register`
- Request Body Example:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

---

#### Login a User

- Method: **POST** `/api/auth/login`
- Request Body Example:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- after valied request it will return a **accessToken**

---

#### Get User Profile Details

- Method: **POST** `/api/auth/my-profile`
- Request Header : **Authorization : Bearer <token>**

---

#### Change User Password

- Method: **PATCH** `/api/auth/change-password`
- Request Header : **Authorization : Bearer <token>**
- Request Body Example:
  ```json
  {
    "email": "dear.example@gmail.com",
    "oldPassword": "old_password",
    "newPassword": "new_password"
  }
  ```
---
#### Logout a User

- Method: **POST** `/api/auth/logout`
- just hit the api after login it will removed **refreshToken** from cookies

---

### **Course Management**

#### Create a Course

- Method: **POST** `/api/course/create`
- Request Header (use admin accessToken) : **Authorization : Bearer <token>**
- Request Body Example:
  ```json
  {
    "title": "Full Stack Web Development",
    "description": "A comprehensive course covering frontend, backend, and database development using modern technologies.",
    "price": 299,
    "instructor": "John Doe"
  }
  ```
---

#### Update a Course

- Method: **PUT** `/api/course/:id`
- Request Header (use admin accessToken) : **Authorization : Bearer <token>**
- Request Body Example:
  ```json
  {
    "title": "Full Stack Web Development",
    "description": "A comprehensive course covering frontend, backend, and database development using modern technologies.",
    "price": 299,
    "instructor": "John Doe"
  }
  ```
---

#### Delete Course

- Method: **DELETE** ` /api/course/:id`
- Request Header (use admin accessToken): **Authorization : Bearer <token>**

---

### Get All Course

- **Method:** **GET** `/api/course`
- Request Header : **Authorization : Bearer <token>**

---

### Get a Single Course

- **Method:** **GET** `/api/course/:courseId`
- Request Header : **Authorization : Bearer <token>**

### **Purchase System**

#### Buy a Course

- Method: **POST** `/api/purchase/buy`
- Request Header (Only User accessToken): **Authorization : Bearer <token>**
- Request Body Example:
  ```json
  {
    "courseId": "68bf4fbc43e9487c9d55e490",
    "pay": 500
  }
  ```

---

#### My Purchasing Courses

- Method: **GET** `/api/purchase/my`
- Request Header (Only User accessToken) : **Authorization : Bearer <token>**

---

#### All Purchasing Courses From Admin

- Method: **GET** `/api/purchase/all-purchase`
- Request Header (Only Admin accessToken) : **Authorization : Bearer <token>**

---

