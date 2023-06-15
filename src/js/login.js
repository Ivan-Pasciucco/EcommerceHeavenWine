document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (email === user.email && password === user.password) {
        sessionStorage.setItem("userLoggedIn", true);

        Swal.fire({
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000, 
          willClose: () => {
            window.location.href = "index.html"; 
          },
        });

        document.getElementById("authLinksContainer").style.display = "none";

        const logoutContainer = document.getElementById("logoutContainer");

        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Cerrar sesión";

        logoutButton.addEventListener("click", function () {
          sessionStorage.removeItem("userLoggedIn");

          window.location.href = "login.html";
        });

        logoutContainer.appendChild(logoutButton);
      } else {
        showError("Credenciales incorrectas. Por favor, intenta nuevamente.");
      }
    } else {
      showError("El usuario no existe. Por favor, regístrate primero.");
    }
  });

  function showError(message) {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
});
