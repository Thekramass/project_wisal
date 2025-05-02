// // // reset-password.js

// // // التأكد من وجود بريد مخزن
// // const email = localStorage.getItem("resetEmail");
// // if (!email) {
// //   alert("لا يوجد بريد إلكتروني لإعادة تعيين كلمة المرور.");
// //   window.location.href = "forgot-password.html";
// // }

// // // عند الضغط على زر "تحديث كلمة المرور"
// // document.getElementById("reset-btn").addEventListener("click", function (e) {
// //   e.preventDefault();

// //   const password = document.getElementById("password").value.trim();
// //   const confirmPassword = document
// //     .getElementById("confirm-password")
// //     .value.trim();

// //   // تحقق من قوة كلمة المرور
// //   const passwordStrengthRegex =
// //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// //   if (!passwordStrengthRegex.test(password)) {
// //     alert(
// //       "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص."
// //     );
// //     return;
// //   }

// //   if (password !== confirmPassword) {
// //     alert("كلمتا المرور غير متطابقتين.");
// //     return;
// //   }

// //   // هنا تضع الكود الذي يرسل كلمة المرور الجديدة إلى الخادم (لاحقاً)

// //   // حالياً نحاكي النجاح:
// //   alert("تم إعادة تعيين كلمة المرور بنجاح! الرجاء تسجيل الدخول.");
// //   localStorage.removeItem("resetEmail"); // نمسح الإيميل بعد نجاح العملية
// //   window.location.href = "login.html";
// // });

// const form = document.getElementById("resetPasswordForm");
// const newPasswordInput = document.getElementById("newPassword");
// const confirmPasswordInput = document.getElementById("confirmPassword");
// const passwordStrengthDiv = document.getElementById("passwordStrength");

// function checkPasswordStrength(password) {
//   let strength = 0;
//   if (password.length >= 8) strength++;
//   if (/[A-Z]/.test(password)) strength++;
//   if (/[a-z]/.test(password)) strength++;
//   if (/[0-9]/.test(password)) strength++;
//   if (/[^A-Za-z0-9]/.test(password)) strength++;

//   switch (strength) {
//     case 5:
//       passwordStrengthDiv.textContent = "قوي جداً 🔊";
//       passwordStrengthDiv.style.color = "green";
//       break;
//     case 4:
//       passwordStrengthDiv.textContent = "قوي 🔊";
//       passwordStrengthDiv.style.color = "green";
//       break;
//     case 3:
//       passwordStrengthDiv.textContent = "متوسط 🔊";
//       passwordStrengthDiv.style.color = "orange";
//       break;
//     default:
//       passwordStrengthDiv.textContent = "ضعيف 🔊";
//       passwordStrengthDiv.style.color = "red";
//       break;
//   }
// }

// newPasswordInput.addEventListener("input", (e) => {
//   checkPasswordStrength(e.target.value);
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newPassword = newPasswordInput.value;
//   const confirmPassword = confirmPasswordInput.value;

//   if (newPassword !== confirmPassword) {
//     alert("كلمتا المرور غير متطابقتين!");
//     return;
//   }

//   if (passwordStrengthDiv.textContent.includes("\u0636\u0639\u064a\u0641")) {
//     alert("يجب ان تكون كلمة المرور اقوى");
//     return;
//   }

//   // تخزين كلمة المرور الجديدة مؤقتًا (localStorage)
//   localStorage.setItem("resetPassword", newPassword);

//   alert("تم حفظ كلمة المرور بنجاح!");

//   // بعد الحفظ نوديه للتسجيل الدخول login.html
//   window.location.href = "login.htm";
// });
// document
//   .getElementById("resetForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const newPassword = document.getElementById("newPassword").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//     if (newPassword !== confirmPassword) {
//       document.getElementById("result").innerText =
//         "كلمة المرور غير متطابقة ❌";
//       document.getElementById("result").style.color = "red";
//       return;
//     }

//     // حفظ كلمة المرور الجديدة في الذاكرة أو إرسالها للخادم
//     localStorage.setItem("userPassword", newPassword);
//     document.getElementById("result").innerText =
//       "تم إعادة تعيين كلمة المرور بنجاح ✅";
//     document.getElementById("result").style.color = "green";

//     // توجيه المستخدم إلى الصفحة الرئيسية أو صفحة تسجيل الدخول
//     setTimeout(() => {
//       window.location.href = "login.htm";
//     }, 1500);
//   });

// الثاني
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("resetForm");
//   const passwordInput = document.getElementById("newPassword");
//   const confirmInput = document.getElementById("confirmPassword");
//   const strengthDiv = document.getElementById("passwordStrength");

//   const email = localStorage.getItem("resetEmail");
//   if (!email) {
//     alert("حدث خطأ، يرجى إعادة المحاولة.");
//     window.location.href = "login.html";
//     return;
//   }

//   passwordInput.addEventListener("input", () => {
//     const password = passwordInput.value;
//     const strength = checkPasswordStrength(password);
//     strengthDiv.textContent = strength.text;
//     strengthDiv.style.color = strength.color;
//   });

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const password = passwordInput.value;
//     const confirmPassword = confirmInput.value;

//     if (password !== confirmPassword) {
//       alert("كلمة المرور غير متطابقة.");
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       alert("كلمة المرور ضعيفة. يرجى اختيار كلمة أقوى.");
//       return;
//     }

//     // هنا ممكن ترسليها للسيرفر
//     alert("تم إعادة تعيين كلمة المرور بنجاح!");
//     localStorage.removeItem("resetEmail");
//     window.location.href = "login.htm";
//   });

//   function checkPasswordStrength(password) {
//     if (password.length < 6) {
//       return { text: "ضعيفة جدًا", color: "red" };
//     } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
//       return { text: "متوسطة", color: "orange" };
//     } else if (
//       password.length >= 8 &&
//       /[A-Z]/.test(password) &&
//       /[0-9]/.test(password) &&
//       /[a-z]/.test(password)
//     ) {
//       return { text: "قوية", color: "green" };
//     }
//     return { text: "ضعيفة", color: "gray" };
//   }

//   function isStrongPassword(password) {
//     return (
//       password.length >= 8 &&
//       /[A-Z]/.test(password) &&
//       /[a-z]/.test(password) &&
//       /[0-9]/.test(password)
//     );
//   }
// });

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
