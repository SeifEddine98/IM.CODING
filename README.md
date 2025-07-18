# IM.CODING

A fullstack web application for managing a training center that includes user authentication, email notifications, and a modern front-end interface.

---------------------

## 🧰 Tech Stack

**Backend**  
- Java  
- Spring Boot  
- PostgreSQL  

**Frontend**  
- Angular (TypeScript)  
- HTML5 / SCSS

**Other**  
- Git & GitHub  
- Node.js (for frontend)  
- Maven (for backend)  

## 🛠 Backend Configuration (Spring Boot)

Before running the backend, make sure to configure the following in the `application.properties` file:

  ### 1. 🔧 Database Configuration
  
  spring.datasource.url=jdbc:mysql://localhost:3306/your_database
  spring.datasource.username=your_username
  spring.datasource.password=your_password
  
  ### 2. 📧 Java Mail Sender Configuration
  
  spring.mail.username=your_email@gmail.com
  spring.mail.password=your_email_password
  
  ☝️ Tip: For Gmail accounts, make sure to enable "less secure apps" or generate an App Password.

## 🎨 Frontend Setup (AngularTS)

After cloning the project, navigate to the frontend folder:
cd frontend
Then install the required dependencies:
npm install --legacy-peer-deps
Once installed, you can start the development server:
ng serve

📂 Project Structure
java
IM.CODING/
├── BACK-END/      → Spring Boot (Java)
├── FRONT-END/     → AngularTS (Typescript)
└── README.md

✅ Notes
This project is not fully containerized. You can add Docker support for deployment.

Make sure your backend is running before testing the frontend APIs.

📬 Contact
For questions or support, feel free to reach out via GitHub issues or email.
