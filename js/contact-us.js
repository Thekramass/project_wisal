document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("msg").value.trim();

  if (!name || !email || !message) {
    showToast("يرجى تعبئة جميع الحقول", "red");
    return;
  }

  (function () {
    emailjs.init("GyVdDSW7-SF2q6mja"); // استبدليه بالـ User ID من لوحة التحكم
  })();

  emailjs
    .send("service_6qe8zsv", "template_uum71tr", {
      name: name,
      email: email,
      message: message,
    })
    .then(
      function (response) {
        showToast("✅ تم إرسال الرسالة بنجاح", "green");
        document.querySelector("form").reset();
      },
      function (error) {
        showToast("❌ حدث خطأ أثناء الإرسال. حاول لاحقاً.", "red");
      }
    );
});

function showToast(msg, color) {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: color,
      borderRadius: "6px",
    },
  }).showToast();
}
