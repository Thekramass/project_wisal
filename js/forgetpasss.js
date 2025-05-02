// تعريف المتغيرات
// الرسالة التي تظهر
const toast_pass = document.getElementById("toast-pass");
//   نافذة هل نسيت كلمة المرور
const modal = document.getElementById("forgetModal");
//   زر هل نسيت كلمة المرور
const btn = document.getElementById("forget");
//   زر لاغلاق النافذة
const span = document.querySelector(".close");
// زر الارسال
const sendBtn = document.querySelector(".modal-button");

//صيغة التحقق الدقيقة للإيميل (يجب أن يكون على شكل name@domain.com أو مشابه)
const emailPattern =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info)$/;

(function () {
  emailjs.init("f3KryF0v-LG0MvQz2"); //public_key مفتاحك العام من EmailJS
})();

//عند الضغط على "هل نسيت كلمة المرور؟" يظهر المودال
btn.onclick = function (event) {
  event.preventDefault();
  modal.style.display = "block";
};
//عند الضغط على زر X يتم إغلاق المودال
span.onclick = function () {
  modal.style.display = "none";
  document.querySelector(".modal-input").value = "";
};
//إذا ضغط المستخدم خارج المودال، يتم إغلاقه
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector(".modal-input").value = "";
  }
};

//عند الضغط على زر "إرسال" يحدث :
sendBtn.onclick = function () {
  const emailInput = document.querySelector(".modal-input");
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showToast("يرجى إدخال البريد الإلكتروني.", true);
    return;
  }

  //إذا الإيميل غير مطابق للنمط المطلوب
  if (!emailPattern.test(emailValue)) {
    showToast("يرجى إدخال بريد إلكتروني صالح مثل example@gmail.com", true);
    return;
  }
  //   //توليد رمز تحقق مكون من 6 أرقام
  const code = generateCode();
  //تخزين الكود والبريد لاستخدامهم لاحقاً في صفحة التحقق
  localStorage.setItem("verificationCode", code);
  localStorage.setItem("userEmail", emailValue);
  localStorage.setItem("resetMode", "true");

  emailjs
    .send("service_2t19v1h", "template_8iz1g1j", {
      email: emailValue,
      code: code,
    })
    .then(() => {
      setTimeout(() => {
        showToast("تم إرسال رمز التحقق إلى بريدك الإلكتروني.");
      }, 3000);

      modal.style.display = "none";
      email.value = "";
      window.location.href = "sure.htm";
    })
    .catch((error) => {
      console.error("فشل في إرسال البريد:", error);
      showToast("حدث خطأ أثناء إرسال الرمز.");
    });
};

// دالة توليد كود من 6 ارقام عشوائية
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
//دالة لعرض رسالة التوست (نجاح أو خطأ)
function showToast(message, isError = false) {
  toast_pass.textContent = message;
  toast_pass.style.backgroundColor = isError ? "#c0392b" : "#1A6C9E";
  toast_pass.classList.add("show");

  setTimeout(() => {
    toast_pass.classList.remove("show");
  }, 3000);
}
