<div align="center">

# TRENDORA

### Modern E-Commerce Platform for Fashion Enthusiasts

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![AWS](https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/s3/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Trendora** is a full-stack e-commerce web application built with the **MERN stack**, designed for a modern clothing brand. Users can browse products, filter by category/size/price, manage their cart, and complete checkout with order confirmation emails.

[Demo](#) • [Features](#-features) • [Installation](#-installation--setup) • [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Authorization
- Secure user registration & login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### 👤 Admin Dashboard
- Product management system
- Add, edit, and delete products
- Image upload to AWS S3
- **Default Credentials:**
  - 📧 Email: `admin@gmail.com`
  - 🔑 Password: `admin123`

</td>
<td width="50%">

### 🛍️ Shopping Experience
- Advanced product search
- Filter by category, size, and price
- Dynamic product catalog
- Guest cart support
- Size selection for products

### 📦 Checkout & Orders
- Seamless checkout process
- Order management
- Email confirmation via Nodemailer
- Order history tracking

</td>
</tr>
</table>

---

## 🛠 Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Database & Storage
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

</div>

---

## 📋 Prerequisites

> Before you begin, ensure you have the following installed:

```bash
✓ Node.js (v14 or higher)
✓ MongoDB (local or MongoDB Atlas)
✓ npm or yarn
✓ AWS Account (for S3 image storage)
```

---

## 🚀 Installation & Setup

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/NKDMMadhusankha/Trendora.git
cd Trendora
```

### 2️⃣ **Install Dependencies**

<details>
<summary><b>Server Setup</b></summary>

```bash
cd Server
npm install
```
</details>

<details>
<summary><b>Client Setup</b></summary>

```bash
cd Client
npm install
```
</details>

### 3️⃣ **Environment Configuration**

Create a `.env` file in the `Server` directory:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 4️⃣ **Seed Database** *(Optional)*

```bash
cd Server

# Seed admin user
node config/seedAdmin.js

# Seed sample products
node config/seedProducts.js
```

### 5️⃣ **Run the Application**

<table>
<tr>
<td width="50%">

**Backend Server**
```bash
cd Server
npm start
```
🌐 Server runs on: `http://localhost:5000`

</td>
<td width="50%">

**Frontend Client**
```bash
cd Client
npm run dev
```
🌐 Client runs on: `http://localhost:5173`

</td>
</tr>
</table>

---

## 🔐 Admin Access

To access the admin dashboard:

1. Navigate to `/login` in your browser
2. Use the following credentials:

```
📧 Email: admin@gmail.com
🔑 Password: admin123
```

---

## 📁 Project Structure

```
Trendora/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── Components/    # Reusable components
│   │   ├── Pages/         # Page components
│   │   ├── Images/        # Static images
│   │   └── App.jsx        # Main app component
│   └── package.json
│
├── Server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── app.js           # Express app setup
│
└── README.md
```

---

<div align="center">

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

**Madhusankha**

- GitHub: [@NKDMMadhusankha](https://github.com/NKDMMadhusankha)

---

### ⭐ Don't forget to star this repo if you found it helpful!

</div>
