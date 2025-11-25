# 🛍️ Dasho-Retails — Full-Stack MERN E-commerce Platform

Dasho-Retails is a full-stack **MERN-based e-commerce web application** designed for sellers to upload products, manage limited-time listings, and for customers to browse and purchase products seamlessly.  
The platform includes **seller dashboards**, **customer order management**, **secure authentication**, and **cloud-ready backend APIs**.

---

## 🚀 Features

### 🔒 Authentication & Authorization
- JWT-based login and signup  
- Role-based access: **Admin, Seller, Customer**  
- Protected routes on both frontend and backend  

### 🛒 E-commerce Core
- Product listing, searching, filtering  
- Sellers can add/edit/delete their products  
- Timed product availability  
- Customer cart & checkout workflow  
- Order creation and order history  

### 🖥️ Seller Dashboard
- Upload products with images  
- Track product status  
- Limited-time product visibility (auto-hide using cron logic)  

### ⚙️ Backend API
- Built using **Node.js + Express.js**  
- MongoDB / Mongoose models for Products, Customers, Sellers, Orders  
- Optimized REST APIs with validation & error handling  

### 🌐 Frontend
- Developed using **React + Vite**  
- Responsive UI  
- Clean component structure  
- State management using Context API / Redux (if applicable)  

### ☁️ Cloud Deployment (Optional)
- Works on **AWS EC2**, Load Balancer, S3 Static Hosting  
- PM2 for backend production  
- Supports CORS and environment variables  

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)  
- JavaScript / JSX  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  

### **Tools**
- PM2  
- Git & GitHub  

---

## 📁 Project Structure

Dasho-Retails/
│
├── backend/
│ ├── server.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── middleware/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Dasho-Retails.git
cd Dasho-Retails
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file:

ini
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_secret_key
Run the backend:

bash
Copy code
npm start
3️⃣ Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm run dev
▶️ Running the Project
Backend runs at:

arduino
Copy code
http://localhost:3000
Frontend runs at:

arduino
Copy code
http://localhost:5173
Make sure the frontend .env includes:

ini
Copy code
VITE_BACKEND_URL=http://localhost:3000
📦 Build for Production (Frontend)
bash
Copy code
npm run build
Upload the dist/ folder to a server or S3 bucket.

🔗 API Endpoints (Examples)
Products
bash
Copy code
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
Auth
bash
Copy code
POST /api/auth/register
POST /api/auth/login
Orders
bash
Copy code
POST /api/orders
GET  /api/orders/:customerId
📸 Screenshots (Add here later)
You may include:

Home page

Seller dashboard

Product upload UI

Orders page

(If you send screenshots, I can format them.)

🧑‍💻 Author
Akhilesh Kumar
B.Tech IT — MERN Stack Developer
NIT Srinagar

⭐ Show Your Support!
If you like this project, consider giving it a ⭐ star on GitHub.
Feel free to open issues or contribute!

yaml
Copy code
