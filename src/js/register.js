document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const successMessage = document.getElementById("successMessage");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
      name: name,
      email: email,
      password: password,
    };

    sessionStorage.setItem("user", JSON.stringify(user));
    successMessage.style.display = "block";

    Swal.fire({
      title: "Registro exitoso",
      text: "¡Bienvenido!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      willClose: () => {
        window.location.href = "login.html";
      },
    });
  });
});
