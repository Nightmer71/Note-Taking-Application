import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import UpdateNote from "./pages/UpdateNote";
import UpdateCategory from "./pages/UpdateCategory";
import ProtectedRoute from "./components/ProtectedRoute";
import { NotificationProvider } from "./components/NotificationProvider";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/notes/update/:id"
            element={
              <ProtectedRoute>
                <UpdateNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/update/:id"
            element={
              <ProtectedRoute>
                <UpdateCategory />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
