const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const toast = document.getElementById("toast-pass");

// دالة عرض الرسالة المنبثقة (Toast)
function showToast(message) {
  toast.textContent = message;
  // toast.className = "toast show";
  // setTimeout(() => {
  //   toast.className = toast.className.replace("show", "");
  // }, 3000);
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// حدث عند الضغط على زر تسجيل الدخول
form.addEventListener("submit", function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  //التحقق إذا الحقول فاضية
  if (!email || !password) {
    showToast("⚠️ الرجاء تعبئة جميع الحقول");
    return;
  }

  //التحقق من تنسيق البريد الإلكتروني (بس بشكل بسيط)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("⚠️ البريد الإلكتروني غير صالح");
    return;
  }

  //إرسال البيانات للباك اند
  fetch("https://your-backend-url.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("فشل في تسجيل الدخول");
      }
      return response.json();
    })
    .then((data) => {
      const userType = data.userType;

      // ✅ توجيه المستخدم حسب نوعه
      if (userType === "donor") {
        window.location.href = "../giveHelp.htm";
      } else if (userType === "needy") {
        window.location.href = "../reqHelp.htm";
      } else if (userType === "admin") {
        window.location.href = "../landing.htm";
      } else {
        showToast("⚠️ نوع المستخدم غير معروف.");
      }
    })
    .catch((error) => {
      console.error("خطأ:", error);
      showToast("⚠️ فشل في تسجيل الدخول. تأكد من صحة البيانات.");
    });
});

// ربط التسجيل بجوجل
window.onload = function () {
  google.accounts.id.initialize({
    // لتهيئة Google Sign-In
    client_id:
      "896477613313-nftsj4o9gtc781tvuqqbog0ihilgfu5j.apps.googleusercontent.com",
    callback: handleGoogleLogin,
  });

  google.accounts.id.renderButton(
    // لعرض الزر داخل google-button-container
    document.getElementById("google-button-container"),
    { theme: "outline", size: "large", text: "signin_with" }
  );
};

function handleGoogleLogin(response) {
  // بتنادي تلقائيًا لما المستخدم يسجّل دخول بجوجل
  const jwt = response.credential;

  // فك تشفير التوكن لجلب معلومات المستخدم
  const userData = parseJwt(jwt);
  const email = userData.email;

  // إرسال البريد للباك-إند لتسجيل الدخول
  fetch("https://your-backend-url.com/api/login-google", {
    // بيبعت التوكن للباك للتأكد من المستخدم وتسجيل دخوله
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("فشل تسجيل الدخول بجوجل");
      }
      return res.json();
    })
    .then((data) => {
      const userType = data.userType;

      // توجيه حسب نوع المستخدم
      if (userType === "donor") {
        window.location.href = "../giveHelp.htm";
      } else if (userType === "needy") {
        window.location.href = "../reqHelp.htm";
      } else if (userType === "admin") {
        window.location.href = "../landing.htm";
      } else {
        showToast("⚠️ نوع المستخدم غير معروف.");
      }
    })
    .catch((err) => {
      console.error("تفاصيل الخطأ:", err);
      showToast("⚠️ فشل تسجيل الدخول باستخدام جوجل.");
    });
}

// دالة لفك التوكن
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
}
