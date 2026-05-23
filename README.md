# 🌍 Fairway Platform

A full-stack charity + subscription platform where users can subscribe, support charities, and contribute toward a shared prize pool system.

Built with modern web technologies including React, Node.js, Express, MongoDB, Tailwind CSS, JWT Authentication, and Razorpay Payment Gateway.



# ✨ Project Vision

GiveHope combines:

* 💳 Subscription-based payments
* ❤️ Charity donations
* 🏆 Shared reward/prize pool system
* 🔐 Secure authentication
* 📊 User dashboards

The goal is to create a platform where user subscriptions can simultaneously:

1. Support social causes
2. Fund a shared community reward system
3. Provide a transparent impact experience

---
<img width="1483" height="600" alt="Screenshot 2026-05-23 224335" src="https://github.com/user-attachments/assets/b81bda4e-04be-4a1a-8cb7-b85cd14ddde9" />

<img width="1898" height="865" alt="Screenshot 2026-05-23 221945" src="https://github.com/user-attachments/assets/9441d160-bd4a-4f53-8070-dd2816d29675" />
<img width="1896" height="863" alt="Screenshot 2026-05-23 222026" src="https://github.com/user-attachments/assets/0105d809-1363-47d8-b8ce-8d3793629d2b" />
<img width="1902" height="868" alt="Screenshot 2026-05-23 222112" src="https://github.com/user-attachments/assets/2978c601-0d00-49d6-9ea5-2be45eda94f5" />




# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* Razorpay Checkout

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Razorpay API
* Crypto (Payment Signature Verification)

---

# 🔐 Authentication Features

* User Signup
* Login System
* JWT Token Authentication
* Protected Routes
* Secure API Access
* Persistent Sessions

---

# 💳 Payment System

Integrated Razorpay Payment Gateway with:

* Order Creation
* Payment Verification
* Signature Validation
* Subscription Activation
* Prize Pool Distribution
* Charity Contribution Tracking

---

# ❤️ Charity System

Users can:

* Select charities
* Allocate donation percentages
* Track contributions
* Support causes through subscriptions

---

# 🏆 Prize Pool Logic

A portion of subscription payments goes into:

* Monthly prize pools
* Shared community rewards
* Transparent allocation system

---

# 📊 Dashboard Features

Users can:

* View subscription status
* Check payment activity
* Access charity information
* Track contribution breakdowns

---

# 📁 Project Structure

## Frontend
```
src/
│
├── components/
├── pages/
├── layouts/
├── services/
├── routes/
└── App.jsx
```
## Backend
```
backend/
│
├── controllers/
├── routes/
├── middleware/
├── models/
├── utils/
└── server.ts
```
---

# ⚙️ Environment Variables

Create a `.env` file inside backend:

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_KEY_SECRET=your_razorpay_secret

---

# 🧪 Installation

## Clone Repository

git clone https://github.com/tulsishuka/Fairway-Impact.git

cd givehope-platform

## Install Frontend

cd frontend

npm install

npm run dev

## Install Backend

cd backend

npm install

npm run dev

---

# 🔄 Payment Flow

1. User selects subscription plan
2. Backend creates Razorpay order
3. Razorpay checkout opens
4. Payment completes
5. Backend verifies payment signature
6. Subscription activates
7. Donation + prize pool updated

---

# 🔒 Security Features

* JWT-based authentication
* Protected backend routes
* Razorpay signature verification
* Secure token handling
* Backend validation checks

---

# 📌 Future Improvements

* Admin Dashboard
* Real Charity APIs
* Email Notifications
* Leaderboards
* Analytics Dashboard
* Referral System
* Monthly Winners Announcement
* WebSocket Live Updates

---


