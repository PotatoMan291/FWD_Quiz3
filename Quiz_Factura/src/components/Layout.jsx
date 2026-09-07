import {
  NavLink,
  Outlet,
} from "react-router-dom";

function Layout() {
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
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;