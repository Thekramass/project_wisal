let selectedUserType = null; // نحدد نوع المستخدم (متبرع، محتاج، إداري)

// === جزء الأزرار (متبرع، محتاج، إداري) === //
document.querySelectorAll(".btns button").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".btns button")
      .forEach((btn) => btn.classList.remove("selected"));
    this.classList.add("selected");
    selectedUserType = this.id; // مثلاً: donor أو needy أو admin
  });
});

// الدالة لمعالجة التسجيل اليدوي
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // التحقق من الحقول الفارغة
  if (!name || !email || !password) {
    showToast("جميع الحقول مطلوبة!");
    return;
  }

  // التحقق من صحة البريد الإلكتروني
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    showToast("البريد الإلكتروني غير صالح");
    return;
  }

  // التحقق من كلمة المرور
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    showToast(
      "كلمة المرور يجب أن تحتوي على:\n- حرف كبير على الأقل\n- أحرف صغيرة\n- رقم\n- رمز خاص (!@#$...)\n- 8 أحرف على الأقل"
    );
    return;
  }

  // التحقق من اختيار نوع المستخدم
  if (!selectedUserType) {
    showToast("يجب اختيار نوع المستخدم");
    return;
  }

  // توليد كود عشوائي
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // نحفظ البريد مؤقتًا لاستخدامه في صفحة sure
  localStorage.setItem("tempEmail", email);

  // نحفظ نوع المستخدم (donor / needy / admin)
  localStorage.setItem("userType", selectedUserType); // تأكدي من وجود هذا المتغير لديك

  // نحدد أن المستخدم **ليس** في وضع "نسيت كلمة المرور"
  localStorage.setItem("resetMode", "false");

  // نحفظ رمز التحقق مؤقتًا للمقارنة لاحقًا
  localStorage.setItem("verificationCode", verificationCode); // هذا هو الكود الذي أرسلته بالإيميل

  // التوجيه لصفحة التحقق sure.html
  window.location.href = "sure.htm";
}

// === Google Sign-In === //
google.accounts.id.initialize({
  client_id:
    "896477613313-nftsj4o9gtc781tvuqqbog0ihilgfu5j.apps.googleusercontent.com",
  callback: handleCredentialResponse,
});

// عرض زر Google
google.accounts.id.renderButton(
  document.getElementById("google-button-container"),
  {
    theme: "outline",
    size: "large",
    type: "standard",
    text: "signin_with",
  }
);

// === عند تسجيل الدخول باستخدام Google === //
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  console.log("بيانات المستخدم من Google:", data);

  if (!selectedUserType) {
    showToast("يرجى اختيار نوع المستخدم قبل تسجيل الدخول");
    return;
  }

  // حفظ البريد الإلكتروني في localStorage لاستخدامه لاحقًا في صفحة التحقق
  localStorage.setItem("tempEmail", data.email);
  localStorage.setItem("userName", data.name);
  localStorage.setItem("userType", selectedUserType);
  localStorage.setItem("resetMode", "false");

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("verificationCode", verificationCode);

  // التوجيه لصفحة التحقق sure.html
  window.location.href = "sure.htm";
}

// === عرض رسالة للمستخدم بشكل مؤقت === //
function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast-pass");
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
