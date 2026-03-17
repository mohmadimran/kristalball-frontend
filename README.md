# 🪖 Military Assets Management System

A full-stack **MERN (MongoDB, Express, React, Node.js)** application designed to manage and monitor military assets efficiently.  
It provides secure access control for Admins and Officers to register, assign, and track assets using a centralized dashboard.
 project Link [Military Assets Managment](https://militry-assets-managment-frontend.vercel.app/).
---

## 1. Project Overview

### Description
The **Military Assets Management System** is built to streamline the process of handling defense equipment, vehicles, and supplies.  
It ensures data consistency, real-time updates, and restricted access to authorized users only.

### Key Features
- Role-based authentication (Admin / Officer)
- Dashboard to view total assets, assigned/unassigned items
- Asset creation, assignment, and tracking
- Secure JWT-based login system
- RESTful APIs for data communication
- Centralized error handling and validation
- Responsive frontend dashboard using **React + Bootstrap**

### Assumptions
- Each user belongs to either **Admin** or **Officer** role.
- Assets are created and assigned only by Admins.
- Officers can view and update assigned assets.
- Backend APIs are deployed on **Render**, frontend on **Vercel**.

### Limitations
- Offline access not supported yet.
- Currently supports a limited number of roles (Admin, Officer).
- File upload for asset documents not implemented in this version.

---

##  2. Tech Stack & Architecture

### Frontend
- **React.js** with functional components and hooks  
- **React Router DOM** for routing  
- **Axios** for API communication  
- **Bootstrap 5** for responsive UI  

### Backend
- **Node.js** with **Express.js**  
- **Mongoose** for MongoDB ORM  
- **JWT Authentication** for secure login  
- **Bcrypt.js** for password hashing  
- **CORS** and **dotenv** for configuration

### Database
- **MongoDB Atlas** (cloud-hosted NoSQL DB)
- Data organized into collections: `users`, `assets`, and `assignments`

### Deployment

Frontend:[ Deployed on Vercel](https://militry-assets-managment-frontend.vercel.app/)
Backend:[  Hosted on Render](https://militry-assets-managment.onrender.com)
Database: MongoDB Atlas (Cloud)