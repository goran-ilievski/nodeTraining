# Node.js Tutorial Manager

> **Powered by GitHub Copilot** 🚀

A full-stack application for managing tutorials built with Node.js, Express, PostgreSQL, and React with Material-UI.

## 📋 Features

- **RESTful API** for CRUD operations on tutorials
- **PostgreSQL database** with connection pooling
- **React frontend** with Material-UI components
- **Responsive data table** to display tutorials
- **Error handling** and loading states
- **CORS enabled** for cross-origin requests

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **PostgreSQL** - Relational database
- **pg 8.16.3** - PostgreSQL client for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend

- **React 19.2.0** - UI library
- **Material-UI 7.3.5** - React component library
- **Axios 1.13.2** - HTTP client
- **Emotion** - CSS-in-JS library

### Development Tools

- **Concurrently 9.2.1** - Run multiple commands concurrently
- **Yarn** - Package manager

## 📁 Project Structure

```
NodeTraining/
├── app/
│   ├── Server/
│   │   ├── config/
│   │   │   └── db.config.js          # Database configuration
│   │   ├── models/
│   │   │   ├── index.js              # Database connection pool
│   │   │   └── tutorial.model.js     # Tutorial model with CRUD methods
│   │   ├── controllers/
│   │   │   └── tutorial.controller.js # Request handlers
│   │   └── routes/
│   │       └── tutorial.routes.js    # API endpoints
│   └── Client/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   └── TutorialList.js   # Tutorial table component
│       │   ├── App.js                # Main app component
│       │   └── index.js              # React entry point
│       └── package.json
├── server.js                          # Express server entry point
└── package.json                       # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **Yarn** package manager

### Database Setup

1. Install PostgreSQL if not already installed

2. Create a database named `test`:

   ```sql
   CREATE DATABASE test;
   ```

3. Create the `tutorials` table:

   ```sql
   CREATE TABLE tutorials (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     published BOOLEAN DEFAULT false
   );
   ```

4. (Optional) Insert sample data:

   ```sql
   INSERT INTO tutorials (title, description, published) VALUES
   ('Node.js Basics', 'Learn the fundamentals of Node.js', true),
   ('Express Framework', 'Build web apps with Express', true),
   ('PostgreSQL Guide', 'Master PostgreSQL database', false);
   ```

5. Update database credentials in `app/Server/config/db.config.js`:
   ```javascript
   module.exports = {
     HOST: "localhost",
     USER: "postgres",
     PASSWORD: "your_password",
     DB: "test",
     PORT: 5432,
   };
   ```

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd NodeTraining
   ```

2. Install root dependencies:

   ```bash
   yarn install
   ```

3. Install client dependencies:
   ```bash
   cd app/Client
   yarn install
   cd ../..
   ```

### Running the Application

#### Option 1: Start both server and client together (Recommended)

```bash
yarn start:app
```

This command will:

- Clean any existing Node.js processes
- Start the Express server on port 8080
- Start the React development server on port 5000

#### Option 2: Start server and client separately

**Terminal 1 - Start the backend:**

```bash
yarn start:server
```

Server will run on `http://localhost:8080`

**Terminal 2 - Start the frontend:**

```bash
yarn start:client
```

React app will run on `http://localhost:5000`

### Accessing the Application

- **Frontend:** Open your browser and navigate to `http://localhost:5000`
- **Backend API:** The API is available at `http://localhost:8080/api/tutorials`

## 📡 API Endpoints

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/api/tutorials`           | Retrieve all tutorials           |
| GET    | `/api/tutorials/:id`       | Retrieve a single tutorial by ID |
| POST   | `/api/tutorials`           | Create a new tutorial            |
| PUT    | `/api/tutorials/:id`       | Update a tutorial by ID          |
| DELETE | `/api/tutorials/:id`       | Delete a tutorial by ID          |
| DELETE | `/api/tutorials`           | Delete all tutorials             |
| GET    | `/api/tutorials/published` | Retrieve all published tutorials |

### Example API Requests

**Create a tutorial:**

```bash
curl -X POST http://localhost:8080/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title": "New Tutorial", "description": "Tutorial description", "published": true}'
```

**Get all tutorials:**

```bash
curl http://localhost:8080/api/tutorials
```

## 🎨 Using the Frontend

1. Open the application at `http://localhost:5000`
2. Click the **"Get All Tutorials"** button to fetch tutorials from the database
3. View tutorials in a responsive Material-UI table with:
   - ID
   - Title
   - Description
   - Published status

## 🧹 Available Scripts

- `yarn start:app` - Start both server and client concurrently
- `yarn start:server` - Start only the Express server
- `yarn start:client` - Start only the React development server
- `yarn clean` - Kill all running Node.js processes

## 🤝 Contributing

This project was built as a training exercise with assistance from **GitHub Copilot**.

## 📝 License

This project is for educational purposes.

---

**Built with ❤️ using GitHub Copilot**
