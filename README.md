# **To-Do List Application**

A simple and efficient To-Do List application built with **JavaScript** and **Node.js**, designed to help users manage their daily tasks.

---

## **Features**
- Add, edit, and delete tasks.  
- Mark tasks as completed or pending.  
- Filter tasks by status (e.g., completed, pending).  
- Save tasks persistently using a database or local file.  
- User-friendly and responsive design.  

---

## **Tech Stack**
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js with Express.js  
- **Database**: JSON file  
- **Tools**: npm, Git, dotenv (for environment variables)  

---

## **How to Run the Project Locally**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/todo-list-app.git
cd todo-list-app
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
- Create a `.env` file in the root directory.  
- Add the following:  
```plaintext
PORT=3000
DATABASE_URL=your_database_url
```

### **4. Run the Application**
```bash
npm start
```
- Open your browser and visit `http://localhost:3000`.  

---

## **Usage**
1. Open the application in your browser.  
2. Add a task by typing it into the input field and clicking the **"Add Task"** button.  
3. Click on a task to mark it as completed or pending.  
4. Use the filter options (e.g., "All", "Completed", "Pending") to view specific tasks.  

---

## **Project Structure**
```
todo-list-app/
├── public/           # Static files (CSS, JS, images)
│   ├── css/          # Stylesheets
│   ├── js/           # Frontend JavaScript files
│   └── images/       # Image assets
├── src/              # Application source code
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   └── models/       # Database schemas/models
├── views/            # HTML templates (e.g., EJS files)
│   ├── index.ejs
│   └── partials/
├── .env              # Environment variables
├── .gitignore        # Git ignored files and folders
├── package.json      # npm dependencies
├── README.md         # Documentation
├── server.js         # Main application entry point
```

---

## **Dependencies**
- **Express**: Web framework for Node.js.  
- **Body-parser**: Middleware to parse JSON and URL-encoded requests.  
- **dotenv**: For managing environment variables.  
  

---

## **Contributing**
Contributions are welcome! Follow these steps:

1. Fork this repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:  
   ```bash
   git commit -m "Describe your changes"
   ```
4. Push your branch:  
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.  

---

## **Contact**
- **Author**: [Andronica Maswanganye](https://github.com/Andro-crt-prog)  
- **Email**: maswanganyea30@gmail.com  
- **GitHub**: [Andro-crt-prog](https://github.com/Andro-crt-prog)  

---
