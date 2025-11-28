# Node.js Tutorial Manager

> **Powered by GitHub Copilot** 🚀

A full-stack TypeScript application for managing tutorials built with Node.js, Express, PostgreSQL, and React with Material-UI.

## 📋 Features

- **RESTful API** for CRUD operations on tutorials
- **PostgreSQL database** with connection pooling
- **React frontend** with Material-UI components and TypeScript
- **Responsive data table** to display tutorials
- **User authentication** with JWT and bcrypt
- **Error handling** and loading states
- **CORS enabled** for cross-origin requests
- **Component-based architecture** with styled components

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Express 5.1.0** - Web application framework
- **PostgreSQL** - Relational database
- **pg 8.16.3** - PostgreSQL client for Node.js
- **JWT 9.0.2** - JSON Web Tokens for authentication
- **bcrypt 6.0.0** - Password hashing
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend

- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Material-UI 7.3.5** - React component library
- **React Router 6.22.0** - Client-side routing
- **TanStack Query 5.90.11** - Data fetching and state management
- **Emotion** - CSS-in-JS library
- **React Scripts 5.0.1** - Create React App build tooling

### Development Tools

- **Concurrently 9.2.1** - Run multiple commands concurrently
- **Nodemon 3.1.11** - Auto-restart server on changes
- **ts-node 10.9.2** - TypeScript execution for Node.js
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
│       │   ├── components/           # React components (TypeScript)
│       │   │   ├── CreateUser/
│       │   │   │   ├── CreateUser.tsx
│       │   │   │   ├── CreateUser.styled.css
│       │   │   │   └── index.ts
│       │   │   ├── ErrorBoundary/
│       │   │   ├── ErrorPopup/
│       │   │   ├── Header/
│       │   │   ├── LandingPage/
│       │   │   ├── LoadingSpinner/
│       │   │   ├── LogoutDialog/
│       │   │   ├── SuccessPopup/
│       │   │   ├── TutorialList/
│       │   │   ├── UserDetails/
│       │   │   └── UserPanel/
│       │   ├── context/
│       │   │   └── AuthContext.tsx   # Authentication context
│       │   ├── App.tsx               # Main app component
│       │   └── index.tsx             # React entry point
│       ├── package.json
│       └── tsconfig.json             # TypeScript configuration
├── server.js                          # Express server entry point
├── package.json                       # Root package configuration
└── tsconfig.json                      # Backend TypeScript config
```

### Component Architecture

Each component follows a consistent folder structure:

- `ComponentName.tsx` - Main component file with TypeScript types
- `ComponentName.styled.css` - Component-specific styles
- `index.ts` - Export barrel file

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** (v12 or higher)
- **Yarn** package manager (v1.22 or higher)

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

4. Create the `users` table (for authentication):

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. (Optional) Insert sample tutorial data:

   ```sql
   INSERT INTO tutorials (title, description, published) VALUES
   ('Node.js Basics', 'Learn the fundamentals of Node.js', true),
   ('Express Framework', 'Build web apps with Express', true),
   ('PostgreSQL Guide', 'Master PostgreSQL database', false),
   ('TypeScript Essentials', 'Type-safe JavaScript development', true);
   ```

6. Update database credentials in `app/Server/config/db.config.js`:
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
   git clone https://github.com/goran-ilievski/nodeTraining.git
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

#### ✅ Recommended: Start both server and client together

From the root directory, run:

```bash
yarn start:app
```

This single command will:

- ✅ Start the Express backend server on **port 8080**
- ✅ Start the React development server on **port 5000**
- ✅ Enable hot-reloading for both frontend and backend
- ✅ Display logs from both servers in the same terminal

**That's it!** Your application is now running.

#### Alternative: Start server and client separately

If you prefer to run them in separate terminals:

**Terminal 1 - Backend:**

```bash
yarn start:server
```

The backend API will run on `http://localhost:8080`

**Terminal 2 - Frontend:**

```bash
yarn start:client
```

The React app will run on `http://localhost:5000` and automatically open in your browser.

### Accessing the Application

Once both servers are running:

- **Frontend Application:** [http://localhost:5000](http://localhost:5000)
  - Main landing page with authentication
  - User registration and login
  - Tutorial management interface
- **Backend API:** [http://localhost:8080/api](http://localhost:8080/api)
  - RESTful API endpoints
  - Database connection status visible in terminal

### Troubleshooting

**Port already in use:**
If you see "Something is already running on port 5000" or "port 8080", you can:

```bash
# Kill all Node.js processes (Windows)
yarn clean

# Or manually kill the process using the port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**TypeScript errors:**
If you encounter TypeScript compilation errors, ensure all dependencies are installed:

```bash
cd app/Client
yarn install
cd ../..
yarn install
```

**Database connection failed:**
Verify your PostgreSQL is running and credentials in `app/Server/config/db.config.js` are correct.

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

The application provides a complete user interface with:

1. **Landing Page** (`/`)

   - Welcome screen with navigation to login/register

2. **User Registration** (`/create-user`)

   - Create new user accounts
   - Password encryption with bcrypt
   - Form validation

3. **User Login**

   - JWT-based authentication
   - Secure session management

4. **Tutorial Management**

   - View all tutorials in a responsive Material-UI table
   - Create, read, update, and delete tutorials
   - Filter published/unpublished tutorials
   - Real-time data updates with TanStack Query

5. **User Panel**
   - View user details
   - Logout functionality

### Component Features

- **Error Boundary**: Catches and displays runtime errors gracefully
- **Loading Spinner**: Provides visual feedback during data fetching
- **Success/Error Popups**: User-friendly notifications
- **Responsive Design**: Works on desktop and mobile devices

## 🧹 Available Scripts

### Root Directory

- `yarn start:app` - **Start both server and client concurrently** (recommended)
- `yarn start:server` - Start only the Express backend server with nodemon
- `yarn start:client` - Start only the React development server
- `yarn clean` - Kill all running Node.js processes (Windows)

### Client Directory (`app/Client/`)

- `yarn start` - Start the React development server
- `yarn build` - Create a production build
- `yarn test` - Run tests with Jest and React Testing Library
- `yarn eject` - Eject from Create React App (irreversible)

## 🤝 Contributing

This project was built as a training exercise with assistance from **GitHub Copilot**.

## 📝 License

This project is for educational purposes.

---

**Built with ❤️ using GitHub Copilot**
