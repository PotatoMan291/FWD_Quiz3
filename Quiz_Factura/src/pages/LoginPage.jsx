import { useState } from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const {
    login,
    isAuthenticated,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (
        !username.trim() ||
        !password
      ) {
        setError(
          "Ingresa el usuario y la contraseña.",
        );

        return;
      }

      try {
        setLoading(true);
        setError("");

        await login(
          username.trim(),
          password,
        );

        const destination =
          location.state?.from
            ?.pathname || "/";

        navigate(destination, {
          replace: true,
        });
      } catch (requestError) {
        setError(
          requestError.message,
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="eyebrow">
            Administración
          </span>

          <h1>FacturaCR</h1>

          <p>
            Inicia sesión para acceder
            al sistema administrativo.
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="username">
              Usuario
            </label>

            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value,
                )
              }
              placeholder="admin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="button button-primary login-button"
            disabled={loading}
          >
            {loading
              ? "Ingresando..."
              : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;