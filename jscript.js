document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", function () {
        const passwordField = this.previousElementSibling; // Get the input field before the icon

        if (passwordField.type === "password") {
            passwordField.type = "text"; // Show password
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash"); // Change to eye-slash icon
        } else {
            passwordField.type = "password"; // Hide password
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye"); // Change back to eye icon
        }
    });
});

