import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import Swal from "sweetalert2";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Está seguro de que desea cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      reverseButtons: true,

      // Hace que SweetAlert también respete
      // el modo oscuro de la aplicación.
      background:
        theme === "dark"
          ? "#191b22"
          : "#ffffff",

      color:
        theme === "dark"
          ? "#f0f1f5"
          : "#20232d",

      confirmButtonColor: "#625bf6",
      cancelButtonColor:
        theme === "dark"
          ? "#30333d"
          : "#6f7280",
    });

    if (result.isConfirmed) {
      logout();

      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="navbar">
          <NavLink
            className="brand"
            to="/"
          >
            FacturaCR
          </NavLink>

          <nav className="navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
              end
            >
              Facturación
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Dashboard
            </NavLink>
          </nav>

          <div className="user-menu">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Activar modo claro"
                  : "Activar modo oscuro"
              }
              title={
                theme === "dark"
                  ? "Modo claro"
                  : "Modo oscuro"
              }
            >
              {theme === "dark"
                ? "☀"
                : "☾"}
            </button>

            <div className="user-info">
              <span>
                {user?.name ||
                  user?.username}
              </span>

              <small>
                Administrador
              </small>
            </div>

            <button
              type="button"
              className="button button-secondary logout-button"
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;