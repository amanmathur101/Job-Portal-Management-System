# Job Portal Management System

A simple, realistic, and interview-safe Full Stack project built with **Java (Spring Boot)** and **React.js**. 
Designed to demonstrate core CRUD operations, authentication, and role-based access control without over-engineering.

## 🚀 Tech Stack

**Backend**
- Java 17
- Spring Boot 3
- Spring Data JPA (Hibernate)
- Spring Security + JWT
- MySQL Database

**Frontend**
- React.js (Vite)
- Axios (API Integration)
- React Router DOM
- CSS Modules (Vanilla CSS)

## ✨ Features

### Public/Job Seeker
- **Register & Login** (with JWT).
- **View Jobs**: Browse available job listings.
- **Apply for Jobs**: Submit applications to job postings.
- **My Applications**: View history of applied jobs.

### Admin
- **Manage Jobs**: Create, Edit, and Delete job postings.
- **View Applications**: See who applied to which jobs.

## 🛠️ Setup Instructions

### Prerequisites
- Java 17+ installed.
- Node.js & npm installed.
- MySQL installed and running.
- Maven (optional, wrapper included in standard projects).

### 1. Database Setup
Create a MySQL database named `jobportal`.
```sql
CREATE DATABASE jobportal;
```
Configure credentials in `backend/src/main/resources/application.yml` if your root password is not `root`.

### 2. Backend Setup
Navigate to the `backend` folder.
```bash
cd backend
mvn spring-boot:run
```
Server will start on `http://localhost:8080`.

### 3. Frontend Setup
Navigate to the `frontend` folder.
```bash
cd frontend
npm install
npm run dev
```
Client will start on `http://localhost:5173`.

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
| I | I | I | I |
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login & get Token | Public |
| GET | `/api/jobs` | Get all jobs | Public |
| GET | `/api/jobs/{id}` | Get job details | Public |
| POST | `/api/jobs` | Create job | **ADMIN** |
| PUT | `/api/jobs/{id}` | Update job | **ADMIN** |
| DELETE | `/api/jobs/{id}` | Delete job | **ADMIN** |
| POST | `/api/applications/apply/{id}` | Apply for job | **JOB_SEEKER** |
| GET | `/api/applications/my-applications` | Get user's apps | **JOB_SEEKER** |
| GET | `/api/applications` | Get all apps | **ADMIN** |

## 🎤 Interview Preparation (Q&A)

**Q: Why did you use JWT instead of Session?**
A: JWT allows the backend to be stateless and scalable. It works well with decoupled frontends like React and is standard for modern REST APIs.

**Q: How do you handle passwords?**
A: Passwords are hashed using `BCryptPasswordEncoder` before saving to the database to ensure security.

**Q: Explain the flow of "Apply for Job".**
A: 
1. The frontend sends a POST request with the Job ID and the User's JWT.
2. The Backend validates the JWT via `JwtAuthenticationFilter`.
3. `JobApplicationController` extracts the User ID from the token.
4. `JobApplicationService` checks if an application already exists.
5. If not, it creates a new `JobApplication` entity linking the User and the Job and saves it.

**Q: How do you handle Data Validation?**
A: I use `Jakarta Validation` annotations like `@NotBlank` and `@Email` in my Entity classes. The Controller uses `@Valid` to trigger these checks, and a `GlobalExceptionHandler` catches errors to return clean JSON responses.

## 🤝 Contribution
Feel free to fork this repository and extend it!

---
*Created for Interview Preparation & Portfolio Building.*
