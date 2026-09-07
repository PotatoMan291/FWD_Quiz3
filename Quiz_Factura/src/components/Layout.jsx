import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
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
              className={({
                isActive,
              }) =>
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
              className={({
                isActive,
              }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Dashboard
            </NavLink>
          </nav>

          <div className="user-menu">
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
              onClick={
                handleLogout
              }
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