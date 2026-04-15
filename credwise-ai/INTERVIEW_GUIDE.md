# CredWise AI - Interview Explanation Guide

## 1. Project Overview

**CredWise AI** is a premium AI-powered credit risk and loan decision platform for lenders.

The goal of the project is to help banks, NBFCs, and lending teams evaluate loan applications faster using automated risk scoring, fraud flag detection, and readable AI-style explanations.

**Tagline:** Smarter Credit Decisions. Faster Approvals.

In simple words, a lender enters borrower details such as salary, credit score, existing loans, missed EMIs, and requested loan amount. The system calculates a risk score, gives a decision such as `APPROVED`, `REVIEW`, or `REJECTED`, shows reasons, detects possible fraud patterns, and stores the application history.

## 2. Main Features

- Secure login and registration flow.
- Default admin login:
  - Username: `vishnu`
  - Password: `vishnu@123456`
- New users can register as analysts.
- Dashboard with application summary and risk metrics.
- New loan application form with personal, employment, financial, and loan request sections.
- Risk score calculation engine.
- Fraud detection engine.
- AI explanation service using mock deterministic logic.
- Result page with score meter, decision badge, reasons, fraud flags, and suggested actions.
- History page with searchable and filterable application table.
- Extra recruiter-impressive pages:
  - Analytics
  - Fraud Center
  - Portfolio Health
  - Settings
- Responsive premium fintech-style UI.

## 3. Tech Stack

### Frontend

- **React 18** for UI.
- **TypeScript** for type safety.
- **Vite** for fast development and production builds.
- **Tailwind CSS** for styling.
- **React Router DOM** for routing.
- **Fetch API** for backend integration.
- **LocalStorage** for storing logged-in user session in the demo.

### Backend

- **Java 17**
- **Spring Boot 3**
- **Spring Web** for REST APIs.
- **Spring Data JPA** for database access.
- **Hibernate** as the ORM.
- **H2 in-memory database** for local demo persistence.
- **Jakarta Validation** for request validation.
- **Maven** for build and dependency management.

### Database

- H2 in-memory database.
- Tables:
  - `loan_applications`
  - `application_reasons`
  - `application_fraud_flags`
  - `user_accounts`

For a production version, H2 should be replaced with PostgreSQL or MySQL.

## 4. Project Structure

```text
credwise-ai/
  backend/
    src/main/java/com/credwiseai/credwiseai/
      config/
      controller/
      dto/
      entity/
      exception/
      repository/
      service/
      CredwiseAiApplication.java
    src/main/resources/
      application.yml
      schema.sql
    pom.xml

  frontend/
    src/
      auth/
      pages/
      api.ts
      App.tsx
      main.tsx
      styles.css
      types.ts
    package.json
    tailwind.config.js
    vite.config.ts
```

The backend follows a clean layered architecture:

- **Controller:** receives HTTP requests.
- **DTO:** defines request and response objects.
- **Service:** contains business logic.
- **Repository:** communicates with the database.
- **Entity:** represents database tables.
- **Config:** contains CORS configuration.
- **Exception:** handles errors globally.

## 5. Backend Explanation

### Entry Point

`CredwiseAiApplication.java` starts the Spring Boot application.

```java
@SpringBootApplication
public class CredwiseAiApplication {
    public static void main(String[] args) {
        SpringApplication.run(CredwiseAiApplication.class, args);
    }
}
```

### Health API

Endpoint:

```text
GET /api/health
```

Response:

```json
{
  "status": "UP",
  "service": "CredWise AI"
}
```

This is used to verify that the backend is running.

### Dashboard Summary API

Endpoint:

```text
GET /api/dashboard/summary
```

Returns mock dashboard metrics:

```json
{
  "totalApplications": 120,
  "approved": 72,
  "review": 28,
  "rejected": 20,
  "fraudAlerts": 5,
  "avgRiskScore": 74
}
```

### Application APIs

```text
GET /api/applications
POST /api/applications
```

`GET /applications` returns all saved loan applications.

`POST /applications` accepts borrower and loan details, calculates risk, detects fraud, generates explanation, saves the result, and returns the final decision.

### Auth APIs

```text
POST /api/auth/login
POST /api/auth/register
```

Login validates username and password against the `user_accounts` table.

Default user is seeded automatically:

```text
username: vishnu
password: vishnu@123456
role: ADMIN
```

New registered users are created with role:

```text
ANALYST
```

For the demo, passwords are stored plainly. In production, they must be hashed using BCrypt and protected by Spring Security/JWT.

## 6. Risk Engine Logic

The risk engine is implemented in:

```text
backend/src/main/java/com/credwiseai/credwiseai/service/RiskScoringService.java
```

Inputs:

- `salary`
- `creditScore`
- `existingLoans`
- `missedEmi`
- `requestedAmount`

Output:

- `riskScore`
- `decision`
- `reasons`
- `fraudFlags`
- `explanation`

The risk score starts from a base score and adjusts based on borrower signals.

Examples:

- High credit score increases score.
- Low credit score decreases score.
- Reasonable loan-to-income ratio increases score.
- High requested amount compared to salary decreases score.
- Too many existing loans decreases score.
- Missed EMIs decrease score.
- Fraud flags reduce score further.

Decision rules:

```text
APPROVED: high score and no fraud flags
REVIEW: medium score or some fraud flags
REJECTED: low score or too many fraud flags
```

## 7. Fraud Detection Logic

Fraud detection is implemented in:

```text
FraudDetectionService.java
```

It detects:

- High requested amount compared to salary.
- Too many existing loans.
- Repeated EMI defaults.
- Low credit score combined with high requested amount.

This is rule-based fraud detection. It is simple, explainable, and easy to extend.

In a real system, this could be replaced or enhanced with:

- ML fraud models.
- Device fingerprinting.
- KYC verification.
- Bank statement analysis.
- Transaction anomaly detection.

## 8. AI Explanation Service

Implemented in:

```text
AiExplanationService.java
```

This service generates a readable explanation for the decision.

Example:

```text
CredWise AI assigned a risk score of 92 and marked the application as APPROVED.
The decision is primarily influenced by credit score, income affordability, and EMI behavior.
```

Currently it uses mock deterministic logic. It is structured so that later we can integrate an LLM such as GPT to generate more natural explanations.

## 9. Frontend Explanation

The frontend is built with React + TypeScript + Tailwind CSS.

Main files:

```text
frontend/src/App.tsx
frontend/src/api.ts
frontend/src/types.ts
frontend/src/auth/AuthContext.tsx
frontend/src/pages/
```

### Routing

Routing is handled in `App.tsx`.

Public routes:

```text
/
/login
/register
```

Protected routes:

```text
/dashboard
/analytics
/fraud
/portfolio
/new
/result
/history
/settings
```

Protected routes require a logged-in user. If no user exists in localStorage, the app redirects to `/login`.

### Authentication Context

Implemented in:

```text
frontend/src/auth/AuthContext.tsx
```

It stores:

- Current user
- Login function
- Register function
- Logout function

The user session is saved in localStorage for demo convenience.

### API Layer

Implemented in:

```text
frontend/src/api.ts
```

It centralizes backend calls:

- `login`
- `register`
- `getSummary`
- `getApplications`
- `createApplication`

The API base URL is configurable:

```ts
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';
```

This makes deployment easier because Netlify can use:

```text
VITE_API_BASE_URL=https://your-backend-url.com/api
```

## 10. UI Pages

### Landing Page

Purpose:

- Introduces CredWise AI.
- Shows product value.
- Provides sign-in and registration CTAs.
- Makes the project look like a real fintech SaaS product.

### Login Page

Purpose:

- Lets Vishnu or registered users sign in.
- Default credentials are prefilled for easy demo.

### Register Page

Purpose:

- Allows new analyst users to create an account.
- Shows that the system supports multiple users.

### Dashboard

Purpose:

- Shows portfolio-level summary:
  - Total applications
  - Approved
  - Review
  - Rejected
  - Fraud alerts
  - Average risk score
- Shows chart placeholders and recent applications.

### New Application

Purpose:

- Multi-section borrower intake form.
- Sections:
  - Personal
  - Employment
  - Financial
  - Loan Request

When submitted, it calls:

```text
POST /api/applications
```

Then it redirects to the result page.

### Result Page

Purpose:

- Displays final risk score.
- Shows decision badge.
- Shows reasons.
- Shows fraud flags.
- Shows suggested actions.

### History Page

Purpose:

- Displays all previous applications.
- Supports search and decision filtering.

### Analytics Page

Purpose:

- Shows risk distribution and model signal weights.
- Helps the project look like a lender intelligence dashboard.

### Fraud Center

Purpose:

- Shows fraud rule status.
- Explains each fraud detection rule.
- Looks like a risk operations center.

### Portfolio Page

Purpose:

- Shows approval velocity, expected loss, manual review load, and forecast visuals.

### Settings Page

Purpose:

- Shows signed-in user details.
- Displays approval policy rules.

## 11. Data Flow

Application submission flow:

```text
User fills New Application form
        ↓
React sends POST /api/applications
        ↓
ApplicationController receives request
        ↓
ApplicationService calls RiskScoringService
        ↓
RiskScoringService calls FraudDetectionService
        ↓
RiskScoringService calls AiExplanationService
        ↓
ApplicationService saves LoanApplication using JPA
        ↓
Backend returns final result
        ↓
Frontend shows Result Page
```

Login flow:

```text
User enters username and password
        ↓
React sends POST /api/auth/login
        ↓
AuthController receives request
        ↓
AuthService validates user
        ↓
Backend returns user profile and demo token
        ↓
Frontend stores user in localStorage
        ↓
Protected pages become accessible
```

## 12. Why This Project Is Impressive

This project is not just a CRUD app. It includes:

- Full-stack architecture.
- Real REST API integration.
- Authentication and registration.
- Risk scoring business logic.
- Fraud detection logic.
- AI-style explanation service.
- Clean DTO/entity/service/repository separation.
- Responsive SaaS-style UI.
- Search, filters, charts, badges, and dashboards.
- Deployment-ready frontend configuration through environment variables.

## 13. Limitations and Production Improvements

Current demo limitations:

- Passwords are plain text.
- Auth token is a mock token.
- H2 database resets on restart.
- Risk scoring is rule-based, not ML-based.
- Charts are visual placeholders.

Production improvements:

- Use Spring Security.
- Hash passwords with BCrypt.
- Use JWT access tokens.
- Use PostgreSQL.
- Add role-based permissions.
- Add audit logs.
- Add real ML scoring model.
- Add real charting library like Recharts.
- Add unit and integration tests.
- Add Docker deployment.
- Add cloud deployment with Render/Railway/AWS.

## 14. Common Interview Questions and Answers

### Q1. What does CredWise AI do?

CredWise AI helps lenders evaluate loan applications faster. It calculates risk scores, detects fraud patterns, generates decision explanations, and stores application history.

### Q2. Why did you use Spring Boot?

Spring Boot is reliable for building REST APIs quickly. It gives built-in support for controllers, validation, dependency injection, JPA, configuration, and production-ready architecture.

### Q3. Why did you use React with TypeScript?

React is good for building interactive UIs, and TypeScript adds type safety. It reduces bugs by making API request and response structures clear.

### Q4. How is risk score calculated?

The backend uses rule-based scoring. It evaluates credit score, salary, requested amount, existing loans, missed EMIs, and fraud flags. Positive signals increase score, negative signals decrease score.

### Q5. How does fraud detection work?

Fraud detection uses rules such as high request compared to salary, too many active loans, repeated EMI defaults, and low credit score with high requested amount.

### Q6. Is this real AI?

The current version uses deterministic mock logic for explainability. The architecture has a separate `AiExplanationService`, so a real LLM can be integrated later without changing the whole system.

### Q7. How is frontend connected to backend?

The frontend uses a centralized `api.ts` file. It calls backend endpoints using the Fetch API. The API base URL can be changed using `VITE_API_BASE_URL`.

### Q8. How does authentication work?

The backend has login and register APIs. The default admin is seeded as `vishnu`. After login, the frontend stores the returned user in localStorage and protects internal routes.

### Q9. What would you improve for production?

I would add Spring Security, JWT, BCrypt password hashing, PostgreSQL, audit logging, unit tests, role-based access control, Docker, and real ML/LLM integration.

### Q10. Why did you add multiple UI pages?

Because a recruiter should see it as a complete SaaS product, not just a form. The dashboard, analytics, fraud center, portfolio, history, settings, and result pages show product thinking and full-stack capability.

## 15. How to Run Locally

Backend:

```bash
cd backend
mvn clean package -DskipTests
java -jar target/credwise-ai-backend-0.0.1-SNAPSHOT.jar
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

Backend API:

```text
http://localhost:8080/api
```

## 16. Demo Script

1. Open the landing page.
2. Explain the product: AI credit decision platform for lenders.
3. Click sign in.
4. Login with:
   - `vishnu`
   - `vishnu@123456`
5. Show the dashboard.
6. Show analytics and fraud center.
7. Go to New Application.
8. Submit a borrower application.
9. Explain the risk score, decision, reasons, fraud flags, and AI explanation.
10. Show the history page.
11. Show settings and user role.
12. Mention production improvements: Spring Security, JWT, BCrypt, PostgreSQL, ML model, LLM explanations.

