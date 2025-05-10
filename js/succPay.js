// عند الضغط على زر "التبرع مرة أخرى" يتم إرسال المستخدم إلى صفحة "المساعدات المتاحة" مرة أخرى
document.querySelector(".donate").addEventListener("click", () => {
  window.location.href = "../availabeHelp.htm"; // إعادة توجيه إلى صفحة التبرع
});

let modal = document.querySelector(".modal");
//   زر لاغلاق النافذة
const span = document.querySelector(".close");

document.querySelector(".share").onclick = function (event) {
  event.preventDefault();
  modal.style.display = "block";
};
//عند الضغط على زر X يتم إغلاق المودال
span.onclick = function () {
  modal.style.display = "none";
};
//إذا ضغط المستخدم خارج المودال، يتم إغلاقه
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// عند النقر على ازار المواقع لمشاركة الحالة مع الاصدقاء
document.addEventListener("DOMContentLoaded", function () {
  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("تفاصيل مساعدة مهمة! شاهدوها الآن 👇");

  // روابط المشاركة
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  const whatsappLink = `https://wa.me/?text=${shareText}%20${pageUrl}`;
  const xLink = `https://twitter.com/intent/tweet?text=${shareText}%20${pageUrl}`;

  // ضبط الروابط على الأيقونات
  document.querySelector(".icon.facebook").href = facebookLink;
  document.querySelector(".icon.whatsapp").href = whatsappLink;
  document.querySelector(".icon.x").href = xLink;
});

// يتغير تلقائيا الفقرة الثالثة التي تحت الصورة
// مثال على نوع المساعدة (ممكن تيجي من localStorage أو من API أو URL parameter)
try {
  const storedData = localStorage.getItem("cardsData");
  cardData = JSON.parse(storedData);
  if (!cardData) throw new Error();
} catch (e) {
  alert("حدث خطأ أثناء تحميل البيانات.");
  window.location.href = "availabeHelp.htm";
}

// نحط الجملة في الصفحة
document.querySelector(".detail-category").textContent =
  cardData["desc-after-pay"] ||
  "شكرًا لتبرعك الكريم، لقد كان له أثر عظيم في حياة المحتاجين.";
