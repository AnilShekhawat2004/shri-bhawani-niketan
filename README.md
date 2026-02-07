# Shri Bhawani Niketan – College Website & Admin Management System

A full-stack **college website** with a powerful **admin portal** for managing academic content, media, achievements, and donations.  
Designed to reflect a **real-world educational institution** with secure authentication and scalable architecture.

🔗 **Live Website:** https://shri-bhawani-niketan.onrender.com/

---

## 🌐 Public College Website

The public-facing website represents the official online presence of **Shri Bhawani Niketan College**.  
It provides students, parents, and visitors easy access to academic and institutional information.

### ✨ Website Features

- 🏫 **College Overview**
  - About the institution
  - Vision & mission

- 📚 **Courses & Programs**
  - Dynamic course listings
  - Managed via admin panel

- 📰 **News & Announcements**
  - Latest college updates
  - Automatically fetched from backend

- 🎉 **Events**
  - College events and activities

- 🖼️ **Photo Gallery**
  - Campus images and event photos

- 🏆 **Achievements & Achievers**
  - Student and faculty achievements

- 💰 **Donations / Payments**
  - Public donation/payment section
  - Secure backend processing

- 📱 **Responsive Design**
  - Optimized for desktop, tablet, and mobile

---

## 🔐 Admin Portal (Content Management System)

A secure admin dashboard that allows authorized users to manage **every section of the website**.

### 🧑‍💻 Admin Features

- 🔑 **Authentication**
  - JWT-based authentication
  - Cookie-based session handling
  - Protected admin-only routes

- 📚 **Course Management**
  - Create, edit, and delete courses

- 📰 **News Management**
  - Add, update, delete, and list news

- 🎉 **Event Management**
  - Full CRUD operations for events

- 🖼️ **Gallery Management**
  - Upload and manage photos

- 🏆 **Achievements Management**
  - Manage achievements displayed on the website

- 💰 **Donation Management**
  - View all donation/payment records
  - Admin-only access

- 🧩 **Modular Architecture**
  - Independent modules
  - Clean API-based design

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Redux (state management)
- Axios
- Component-based UI architecture

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB (Mongoose ODM)

### Authentication
- JWT (JSON Web Tokens)
- Cookies for secure sessions

### Hosting
- Render
  - Frontend: Render
  - Backend: Render

--- ## 📂 Project Structure
```bash
shri-bhawani-niketan/
│
├── server/              # Backend (Node.js + Express)
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
│
├── src/                 # Frontend (React)
│   ├── components
│   ├── pages
│   ├── redux
│   ├── services
│   └── assets
│
├── package.json
├── app.js / index.js
└── README.md
```
---

## ⚙️ Installation & Setup

Follow the steps below to run the project locally.

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/shri-bhawani-niketan.git  
cd shri-bhawani-niketan
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Environment Variables

Create a `.env` file inside the **server** folder and add:
```bash
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret
```
### 4️⃣ Run the project
```bash
npm run dev
```
- Frontend: http://localhost:3000  
- Backend: http://localhost:4000

---

## 🔒 Security & Best Practices

- JWT-based authentication
- Cookie-based session management
- Protected admin routes
- Backend validation for critical operations
- Clean separation of frontend and backend logic

---

## 📈 Future Enhancements

- Role-based admin access (Super Admin / Editor)
- Admin dashboard analytics & insights
- Email notifications
- SEO optimization
- Performance and image optimization

---

## 👨‍💻 Author

Anil Singh Shekhawat  
Full-Stack Web Developer

Live Project: https://shri-bhawani-niketan.onrender.com/

---

## ⭐ Support

If you find this project useful, please ⭐ star the repository — it really helps!
