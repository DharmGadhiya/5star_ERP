⭐ 5-STAR ERP SYSTEM

📌 Project Overview

The **5-STAR ERP System** is a simplified Enterprise Resource Planning (ERP) web application designed to demonstrate the workflow of a manufacturing company.

The system simulates how different departments collaborate to process a **customer order from inquiry to dispatch and financial settlement**.

This project demonstrates key ERP concepts including:

* Sales Management
* Production Planning
* Inventory Control
* Purchase Management
* Dispatch & Logistics
* Financial Tracking
* HR Payroll Management

The goal of this project is to **clearly demonstrate ERP workflow concepts** rather than replicate the complexity of large enterprise ERP systems such as SAP or Oracle ERP.

This project is suitable for:

* Academic demonstrations
* Hackathon submissions
* ERP workflow learning
* Full-stack system design practice

---

 🎯 Project Objective

The main objective of this project is to demonstrate how different departments within a manufacturing company interact through a centralized ERP system.

The project shows the **complete lifecycle of a manufacturing order**:

Customer Inquiry → Sales → Production Planning → Purchase → Inventory → Dispatch → Finance → HR Payroll

The system highlights how ERP software improves:

* Business workflow automation
* Department collaboration
* Data transparency
* Operational efficiency

---

🛠 Technology Stack

Frontend

* React (Vite)
* TailwindCSS
* React Router
* Axios

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose ORM
* JWT Authentication

Architecture

* REST API Architecture
* Modular MVC Backend Structure
* Role-Based Access Control
* Separate Frontend and Backend Applications

---

 🏗 System Architecture

The application follows a **modular full-stack architecture**.

The backend provides **REST APIs**, and the React frontend consumes these APIs to display and manage ERP data.

This architecture ensures:

* Scalability
* Maintainability
* Clean code organization
* Separation of concerns

---

📂 Project Folder Structure

backend/
controllers/
models/
routes/
middleware/
config/
utils/

frontend/
src/
pages/
components/
services/
layouts/
hooks/

---

👤 User Roles

The system simplifies ERP access into **three major roles**.

1. **Product Person**
2. **Financial Person**
3. **Admin Person**

---

🧑‍💼 Product Person

The **Product Person** handles operational activities related to products and order fulfillment.

Responsibilities

* Manage customer inquiries
* Create quotations
* Generate sale orders
* Check product inventory
* Plan production when stock is insufficient
* Request raw materials
* Create purchase orders
* Manage inventory updates
* Dispatch finished goods

Modules Accessible

* Sales Management
* Production Planning
* Purchase Management
* Inventory Management
* Dispatch & Logistics

---

💰 Financial Person

The **Financial Person** manages financial and accounting operations.

Responsibilities

* Generate invoices after dispatch
* Track customer payments
* Manage vendor payments
* Generate financial reports
* Manage payroll
* Maintain HR records

Modules Accessible

* Finance Management
* HR Management
* Financial Reporting

---

🛡 Admin Person

The **Admin Person** has full system access.

Responsibilities

* Access all modules
* Create employee accounts
* Assign roles to employees
* Provide login credentials
* Monitor system operations

---

🔄 Core ERP Workflow

The system demonstrates the **complete lifecycle of a manufacturing order**.

Step 1 – Customer Inquiry

Customer requests a quotation for products.

Step 2 – Quotation Generation

Sales module generates the quotation.

Step 3 – Sale Order Creation

If approved, a sale order is created.

Step 4 – Inventory Check

System checks finished goods availability.

Step 5 – Production Planning

If stock is insufficient, production requirements are calculated using **Bill of Materials (BOM)**.

Step 6 – Purchase Request

Raw material purchase requests are generated.

Step 7 – Purchase Order

Purchase orders are sent to vendors.

Step 8 – Inventory Update

Materials are received and inventory is updated.

Step 9 – Production Completion

Manufacturing produces finished goods.

Step 10 – Dispatch

Products are shipped to the customer.

Step 11 – Invoice Generation

Finance module generates invoices.

Step 12 – Payment & Accounting

Customer and vendor payments are recorded.

Step 13 – HR Payroll

Employee salaries and attendance are processed.

---

🧩 Major Modules

Authentication Module

Handles secure login using **JWT authentication**.

Master Data Module

Stores core data including:

* Customers
* Vendors
* Products
* Raw Materials
* Employees
* Departments

Sales Management Module

Handles inquiries, quotations, and sale orders.

Production Planning Module

Calculates production requirements.

Purchase Management Module

Handles vendor procurement.

Inventory Management Module

Tracks raw materials, work-in-progress, and finished goods.

Dispatch & Logistics Module

Handles shipment and delivery.

Finance Module

Handles invoices, payments, revenue tracking, and profit analysis.

HR Management Module

Handles employee records, attendance, and payroll.

---

📊 Dashboard Design

Product Person Dashboard

Displays:

* Total Customers
* Total Products
* Total Sale Orders
* Low Stock Alerts
* Production Status
* Pending Dispatch Orders

Financial Person Dashboard

Displays:

* Total Revenue
* Pending Payments
* Vendor Payments
* Monthly Profit
* Salary Expenses

---

🗄 Database Collections

The system uses multiple MongoDB collections:

users
customers
vendors
products
sale_orders
quotations
purchase_orders
inventory
production_plans
dispatch_orders
invoices
payments
employees
payroll

These collections represent the **core ERP data entities**.

---

🚀 Installation Guide

Clone the Repository

To get a local copy of the project, clone the repository from GitHub and navigate into the project directory.

git clone https://github.com/DharmGadhiya/5star_ERP.git

cd 5star_ERP

---

Backend Setup

cd backend
npm install
npm run dev

---

Frontend Setup

cd frontend
npm install
npm run dev

---

📸 Screenshots
* Homepage
  <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e4c7092d-d768-4c71-81b6-dad9e7de5352" />
* Login Page
  <img width="1900" height="905" alt="image" src="https://github.com/user-attachments/assets/6c7ba931-fda9-4ec9-a81f-7747d8ccc97a" />
  <img width="1911" height="910" alt="image" src="https://github.com/user-attachments/assets/0b283e16-ce0a-42ae-89b6-5ac8ca9dc751" />
* Product Person Dashboard
  <img width="1913" height="904" alt="image" src="https://github.com/user-attachments/assets/64a0095b-1840-48e6-bc06-34084a0dee17" />
* Financial Dashboard
  <img width="1917" height="908" alt="image" src="https://github.com/user-attachments/assets/6aa76478-e3df-4ab3-ad58-3ca20fa65fde" />
* Sales Order 
  <img width="1912" height="913" alt="image" src="https://github.com/user-attachments/assets/13e140e8-e783-4c49-9612-702eb875cf20" />
* Inventory Module
  <img width="1912" height="906" alt="image" src="https://github.com/user-attachments/assets/59d4fa60-b7ce-4774-9fcb-cd7d0213432f" />
* Production Planning
  <img width="1917" height="914" alt="image" src="https://github.com/user-attachments/assets/1f04f820-76f5-4735-9b3e-db465f887dad" />
  <img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/ca798db9-8730-4efe-aa83-60e19a1e8348" />
* Finance Reports
  <img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/d867f26c-b241-49a5-915d-3db8d00b2723" />
  <img width="1547" height="767" alt="image" src="https://github.com/user-attachments/assets/d4f90051-7f2a-427c-baaf-c303219d8546" />
* HR Payroll System
  <img width="1912" height="881" alt="image" src="https://github.com/user-attachments/assets/52b96251-4271-45b5-9947-7a864bad50f5" />
* Credential Manager
  <img width="1914" height="907" alt="image" src="https://github.com/user-attachments/assets/1fe870e1-716d-4e19-8f3f-98e7653eb137" />
* Quotation Generator
  <img width="1911" height="904" alt="image" src="https://github.com/user-attachments/assets/d45fabf9-c5e6-4c9c-ab0f-cb68a9cf6c1b" />
  <img width="993" height="592" alt="image" src="https://github.com/user-attachments/assets/5c70c608-442c-4eb7-b94b-3963810eade6" />
---

👨‍💻 Team Members

1. Kanetiya Tanuj Bharatbhai
2. Tejani Veer Chiragkumar
3. Gadhiya Dharm Odhavjibhai
4. Pillai Anurag Mohananbhai

---

🎓 Project Usage

This project can be used for:

* ERP workflow demonstrations
* Hackathon projects
* Software engineering learning
* Full-stack architecture practice

---

🔮 Future Improvements

Possible future enhancements include:

* Real-time analytics dashboards
* AI-based demand forecasting
* Advanced production scheduling
* Mobile application support
* Cloud deployment
* Payment gateway integration

---

📄 License

This project is developed for **educational and demonstration purposes**.
