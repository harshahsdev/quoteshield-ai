<<<<<<< HEAD
# 🚀 QuoteShieldAI

**AI-Powered Procurement & Vendor Quotation Analysis Platform**

QuoteShieldAI is a full-stack MERN application that helps procurement teams analyze supplier quotations using AI. Users can upload PDF quotations, extract key procurement details, compare multiple vendors, and receive AI-powered recommendations for selecting the best supplier.

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes

### 📂 Job Management
- Create Procurement Jobs
- View Recent Jobs
- Delete Jobs
- Dashboard Overview

### 📄 Quotation Management
- Upload Vendor Quotation PDFs
- Automatic PDF Text Extraction
- Store Quotations in MongoDB

### 🤖 AI Analysis
- AI-powered quotation analysis using Google Gemini
- Extracts:
  - Vendor Name
  - Total Amount
  - GST
  - Currency
  - Payment Terms
  - Delivery Time
  - Warranty
  - Missing Information
  - Risk Score

### 📊 Vendor Comparison
- Compare multiple vendor quotations
- AI Recommendation
- Comparison Summary
- Vendor Weakness Analysis

### 🎨 Dashboard
- Statistics Cards
- Recent Jobs
- Smart Navigation
- Responsive UI

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- pdf-parse

## AI
- Google Gemini 2.5 Flash
- @google/genai

---

# 📁 Project Structure

```
QuoteShieldAI
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── context
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/QuoteShieldAI.git
```

```bash
cd QuoteShieldAI
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /api/users/register |
| POST | /api/users/login |
| GET | /api/users/token |

---

## Jobs

| Method | Endpoint |
|----------|---------------------------|
| POST | /api/job/createjob |
| GET | /api/job/dashboard |
| GET | /api/job/recent |
| DELETE | /api/job/:jobId |

---

## Quotations

| Method | Endpoint |
|----------|--------------------------------|
| POST | /api/job/:jobId/upload |
| GET | /api/job/:jobId/quotation |
| GET | /api/job/:jobId/compare |

---

# 📷 Screenshots

> Add screenshots here after deployment.

### Login

```
/screenshots/login.png
```

### Dashboard

```
/screenshots/dashboard.png
```

### Upload Quotation

```
/screenshots/upload.png
```

### AI Analysis

```
/screenshots/analysis.png
```

### Comparison

```
/screenshots/comparison.png
```

---

# 🔄 Application Workflow

```
Login/Register
        │
        ▼
Create Job
        │
        ▼
Upload Vendor PDF
        │
        ▼
Extract PDF Text
        │
        ▼
Gemini AI Analysis
        │
        ▼
Store Analysis
        │
        ▼
Single Analysis
        │
        ▼
Upload More Quotations
        │
        ▼
AI Comparison
        │
        ▼
Best Vendor Recommendation
```

---

# 🚀 Future Enhancements

- Export comparison reports as PDF
- Email AI reports
- Cloud storage (AWS S3 / Cloudinary)
- Vendor performance dashboard
- Search & filters
- Role-based access control
- Analytics and charts
- Procurement chatbot

---

# 💡 Challenges Solved

- JWT Authentication
- PDF Parsing
- AI Prompt Engineering
- JSON Response Validation
- Multi-vendor Comparison
- REST API Design
- React State Management

---

# 👨‍💻 Author

**Harsha H S**

- GitHub: https://github.com/YOUR_USERNAME
- LinkedIn: https://linkedin.com/in/YOUR_LINKEDIN

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
=======
# QuoteSheildAi
>>>>>>> 24814148a0881ac3f4390bb5ef937510a52bec4b
