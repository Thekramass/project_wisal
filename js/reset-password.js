document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resetForm");
  const passwordInput = document.getElementById("newPassword");
  const confirmInput = document.getElementById("confirmPassword");
  const strengthDiv = document.getElementById("passwordStrength");
  const messageBox = document.getElementById("messageBox");

  const email = localStorage.getItem("resetEmail");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    strengthDiv.textContent = strength.text;
    strengthDiv.style.color = strength.color;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (password !== confirmPassword) {
      showMessage("كلمة المرور غير متطابقة.", "error");
      return;
    }

    if (!isStrongPassword(password)) {
      showMessage("كلمة المرور ضعيفة. يرجى اختيار كلمة أقوى.", "error");
      return;
    }

    // هنا ممكن ترسليها للسيرفر
    showMessage("تم إعادة تعيين كلمة المرور بنجاح!", "success");
    localStorage.removeItem("resetEmail");

    setTimeout(() => {
      window.location.href = "login.htm";
    }, 2000);
  });

  function checkPasswordStrength(password) {
    if (password.length < 6) {
      return { text: "ضعيفة جدًا", color: "red" };
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { text: "متوسطة", color: "orange" };
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[a-z]/.test(password)
    ) {
      return { text: "قوية", color: "green" };
    }
    return { text: "ضعيفة", color: "gray" };
  }

  function isStrongPassword(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  }

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    messageBox.style.display = "block";
  }
});
