# Full Stack Notetaking Application

A secure, full-stack application for users to create, read, update, and delete their personal notes, complete with categorization and token-based authentication.

## Features

- **User Authentication:** Secure user registration and login using token-based authentication with JSON Web Tokens (JWT).
- **Note Management (CRUD):** Users can Create, Read, Update, and Delete their own notes, which include an optional content field and category.
- **Category Management (CRUD):** Users can create, list, update, and delete categories to better organize their notes.
- **Data Isolation:** Notes and categories are strictly tied to the creating user, ensuring privacy and segregation of user data.
- **Protected Routes:** All core application routes are protected, allowing access only to authenticated users, with built-in JWT refresh logic.
- **Informative Notifications:** Provides user feedback for successful operations and detailed error messages for failures (e.g., login failure, deletion errors).
- **Category Deletion Safety:** Prevents the deletion of a category if there are notes currently assigned to it, protecting data integrity.

## Technology Stack

The application is split into a Django REST Framework backend and a React frontend.

### Backend (API)

| Technology                | Purpose                        | Key Libraries                             |
| :------------------------ | :----------------------------- | :---------------------------------------- |
| **Django**                | Web Framework                  | `Django`, `python-dotenv`                 |
| **Django REST Framework** | Building the RESTful API       | `djangorestframework`                     |
| **Simple JWT**            | Token-based Authentication     | `djangorestframework-simplejwt`, `PyJWT`  |
| **Database**              | Development/Local Data Storage | SQLite3 (via `db.sqlite3` and `sqlparse`) |
| **CORS Headers**          | Handling Cross-Origin Requests | `django-cors-headers`                     |

### Frontend

| Technology           | Purpose                            | Key Libraries                  |
| :------------------- | :--------------------------------- | :----------------------------- |
| **React**            | User Interface Library             | `react`, `react-dom`           |
| **Vite**             | Frontend Tooling/Build Tool        | `vite`, `@vitejs/plugin-react` |
| **React Router DOM** | Client-side routing and navigation | `react-router-dom`             |
| **Axios**            | HTTP Client for API interaction    | `axios`                        |
| **JWT Decode**       | Client-side token inspection       | `jwt-decode`                   |

## API Endpoints

The backend API endpoints are crucial for the application's functionality. The base URL for the API is configured in the frontend as `http://127.0.0.1:8000/`.

| HTTP Method            | URL Path                      | Description                                            |
| :--------------------- | :---------------------------- | :----------------------------------------------------- |
| `POST`                 | `/api/user/register/`         | Register a new user.                                   |
| `POST`                 | `/api/token/`                 | Obtain JWT access and refresh tokens (Login).          |
| `POST`                 | `/api/token/refresh/`         | Refresh expired access token.                          |
| `GET`, `POST`          | `/api/notes/`                 | List all user's notes or create a new note.            |
| `GET`, `PUT`           | `/api/notes/<int:pk>/`        | Retrieve or update a specific note by ID.              |
| `DELETE`               | `/api/notes/delete/<int:pk>/` | Delete a specific note by ID.                          |
| `GET`, `POST`          | `/api/categories/`            | List all user's categories or create a new category.   |
| `GET`, `PUT`, `DELETE` | `/api/categories/<int:pk>/`   | Retrieve, update, or delete a specific category by ID. |

## Setup and Installation

### Prerequisites

- **Python 3.x** and `pip`
- **Node.js** (LTS version recommended) and `npm` or `yarn`

### 1. Backend Setup

1. **Navigate** to the `backend` directory:

      ```bash
      cd backend
      ```

2. **Install** the required Python dependencies:

      ```bash
      pip install -r requirements.txt
      ```

3. **Run** database migrations to set up the database schema:

      ```bash
      python manage.py migrate
      ```

4. **Start** the Django development server:
      ```bash
      python manage.py runserver
      # The API will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000)
      ```

### 2. Frontend Setup

1. **Navigate** back to the root of the project and then into the `frontend` directory:

      ```bash
      cd ../frontend
      ```

2. **Install** the Node.js dependencies:

      ```bash
      npm install
      # or
      yarn install
      ```

3. **Start** the React application in development mode:
      ```bash
      npm run dev
      # or
      yarn dev
      ```
      The application will typically open on a local host address (e.g., `http://localhost:5173`).

The application should now be fully operational. You can start by registering a new user at the `/register` route.
