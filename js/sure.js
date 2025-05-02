// تهيئة EmailJS
window.onload = function () {
  emailjs.init("f3KryF0v-LG0MvQz2");

  const email =
    localStorage.getItem("resetMode") === "true"
      ? localStorage.getItem("userEmail") // من "نسيت كلمة المرور"
      : localStorage.getItem("tempEmail"); // من "تسجيل حساب جديد"

  if (!email) {
    document.getElementById("result").textContent =
      "حدث خطأ في جلب البريد الإلكتروني!";
    document.getElementById("result").style.color = "red";
    return;
  }

  const code = localStorage.getItem("verificationCode");
  // localStorage.setItem("verificationCode", code);
  sendOTP(email, code);
};

// دالة توليد رمز عشوائي مكون من 6 أرقام
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// دالة إرسال الرمز عبر EmailJS
function sendOTP(email, code) {
  const params = {
    email: email,
    code: code,
  };
  if (localStorage.getItem("resetMode") === "false") {
    emailjs.send("service_2t19v1h", "template_pu1gq5p", params).then(
      function (response) {
        console.log("تم إرسال الرمز بنجاح", response.status, response.text);
      },
      function (error) {
        console.error("فشل في إرسال الرمز", error);
      }
    );
  }
}

// التحقق من الرمز المدخل من المستخدم
function verifyOTP() {
  const inputs = document.querySelectorAll(".otp-box input");
  let enteredCode = "";

  inputs.forEach((input) => {
    enteredCode += input.value.trim();
  });

  const expectedCode = localStorage.getItem("verificationCode");
  const result = document.getElementById("result");
  if (enteredCode === "") {
    result.textContent = "يرجى إدخال رمز التحقق.";
    return;
  }

  if (enteredCode === expectedCode) {
    localStorage.removeItem("verificationCode");

    const isReset = localStorage.getItem("resetMode");
    const email =
      isReset === "true"
        ? localStorage.getItem("userEmail")
        : localStorage.getItem("tempEmail");

    if (isReset === "true") {
      // من "نسيت كلمة المرور"
      localStorage.setItem("resetEmail", email);
      localStorage.removeItem("userEmail");
      localStorage.removeItem("resetMode");
      window.location.href = "reset-password.html";
    } else {
      // من "تسجيل حساب جديد"
      const userType = localStorage.getItem("userType");
      localStorage.removeItem("tempEmail");

      if (userType === "donor") {
        window.location.href = "giveHelp.htm";
      } else if (userType === "needy") {
        window.location.href = "reqHelp.htm";
      } else if (userType === "admin") {
        window.location.href = "landing.htm";
      } else {
        result.textContent = "نوع المستخدم غير معروف!";
        result.style.color = "red";
        return;
      }
    }
  } else {
    result.textContent = "رمز غير صحيح ❌";
    result.style.color = "red";
  }
}

// دالة التنقل بين الخانات تلقائيًا
function moveToNext(input, index) {
  const inputs = document.querySelectorAll(".otp-box input");

  // التنقل للخانة التالية عند الكتابة
  if (input.value && index < inputs.length - 1) {
    inputs[index + 1].focus();
  }

  // التنقل للخلف عند الضغط على Backspace في خانة فارغة
  input.onkeydown = (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  };

  // إذا وصلنا إلى آخر خانة وتمت التعبئة → تحقق تلقائي
  if (index === inputs.length - 1 && input.value) {
    verifyOTP();
  }
}

// دالة إعادة إرسال الكود
function resendOTP() {
  const email =
    localStorage.getItem("resetMode") === "true"
      ? localStorage.getItem("userEmail")
      : localStorage.getItem("tempEmail");

  if (!email) {
    const result = document.getElementById("result");
    result.innerText = "لم يتم العثور على البريد الإلكتروني!";
    result.style.color = "red";
    // alert("لم يتم العثور على البريد الإلكتروني!");
    return;
  }

  const newCode = generateOTP();
  localStorage.setItem("verificationCode", newCode);
  sendOTP(email, newCode);

  const result = document.getElementById("result");
  result.innerText = "تم إرسال رمز جديد إلى بريدك ✅";
  result.style.color = "green";

  setTimeout(() => {
    result.innerText = "";
  }, 4000);
}

// زر الرجوع إلى صفحة تسجيل الدخول
document.getElementById("backBtn").onclick = function () {
  if (localStorage.getItem("resetMode")) {
    window.location.href = "login.htm";
  } else {
    window.location.href = "sign-up.htm";
  }
};
