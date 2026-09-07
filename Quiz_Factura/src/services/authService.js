const USERS_URL = "http://localhost:3000/users";

export const login = async (username, password) => {
  const response = await fetch(
    `${USERS_URL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  );

  if (!response.ok) {
    throw new Error("No se pudo validar el usuario.");
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  const user = users[0];

  return {
    id: user.id,
    username: user.username,
    name: user.name,
  };
};