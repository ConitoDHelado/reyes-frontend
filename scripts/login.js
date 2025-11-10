const API_URL = "https://reyes-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const messageBox = document.getElementById("authMessage");

  function showMessage(text, type = "info") {
    messageBox.textContent = text;
    messageBox.className = type;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      showMessage("Por favor ingresa usuario y contraseña", "error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(`Bienvenido ${data.username || data.user?.username}! 🎄`, "success");
        console.log("User logged in:", data);
      } else {
        showMessage(data.error || "Error en el inicio de sesión", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error al conectar con el servidor", "error");
    }
  });
});
