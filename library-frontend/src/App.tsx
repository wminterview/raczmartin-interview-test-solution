//import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import HomePage from "./pages/index";
import BooksPage from "./pages/books/index";
import LoginPage from "./pages/auth/login";
import NewBookPage from "./pages/books/new";
import BookDetailsPage from "./pages/books/[id]";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import { useState } from "react";
import RegisterPage from "./pages/auth/register";
import EditBookPage from "./pages/books/edit";
import { AuthGate } from "./wrappers/AuthLoader";

//type Route = "/" | "/books" | string;

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const AppRoutes = () => {
    const nav = useNavigate();
    return (
      <Routes>
        <Route element={<AuthGate />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/new" element={<NewBookPage />} />
          <Route
            path="/books/:id"
            element={
              <BookDetailsWithParams navigate={(to: string) => nav(to)} />
            }
          />
          <Route path="/books/edit/:id" element={<EditBookPage />} />
        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/auth/register"
          element={<RegisterPage navigate={(to: string) => nav(to)} />}
        />
        <Route
          path="*"
          element={
            <div>
              <h2>Not Found</h2>
              <Link to="/">Go Home</Link>
            </div>
          }
        />
      </Routes>
    );
  };

  function BookDetailsWithParams({
    navigate,
  }: {
    navigate: (to: string) => void;
  }) {
    const params = useParams<{ id: string }>();
    return <BookDetailsPage id={params.id ?? ""} navigate={navigate} />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        <div className="flex flex-1">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex-1 bg-gray-100">
            <AppRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
