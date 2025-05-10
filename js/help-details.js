let cardData;

// استلام البيانات من الكرت عند الضغط عليه
// اما باستخدام

//1-  استخراج البيانات من URL

// const urlParams = new URLSearchParams(window.location.search);

// try {
//   cardData = JSON.parse(urlParams.get("cardData"));
//   if (!cardData) throw new Error();
// } catch (e) {
//   alert("حدث خطأ أثناء تحميل البيانات.");
//   window.location.href = "availabeHelp.htm";
// }

//2-  By localStorage او باستخدام
try {
  const storedData = localStorage.getItem("cardsData");
  cardData = JSON.parse(storedData);
  if (!cardData) throw new Error();
} catch (e) {
  alert("حدث خطأ أثناء تحميل البيانات.");
  window.location.href = "availabeHelp.htm";
}

// *********** تعبئة البيانات في الصفحة  ***********

// تعبئة الصورة
if (cardData.img) {
  document.getElementById("detail-img").src = cardData.img;
} else {
  document.getElementById("detail-img").alt = "صورة غير متوفرة";
}

// تعبئة العنوان
document.getElementById("detail-title").textContent =
  cardData["card-title"] || "عنوان غير متوفر";

// تعبئة الشارة
const badge = document.getElementById("help-badge");
badge.textContent = cardData.name || "غير محدد";
badge.classList.add(cardData.type || "default-type");

// العنوان والوصف
document.getElementById("detail-desc").textContent =
  cardData["card-longDesc"] || "وصف غير متوفر";
document.getElementById("detail-date").textContent =
  cardData["date"] || "تاريخ غير متوفر";
document.getElementById("detail-category").textContent =
  cardData["card-category"] || "فئة غير محددة";

// نسبة التبرع
const fill = document.getElementById("detail-progress-bar");
const progress =
  cardData.goal && cardData.collected
    ? Math.min((cardData.collected / cardData.goal) * 100, 100)
    : 0;
fill.style.width = progress + "%";

// دالة للتنسيق

const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "0";
  return amount < 1000 ? `${amount}` : `${amount.toLocaleString("en-US")}`;
};

document.getElementById(
  "detail-progress-text"
).textContent = `تم جمع ${formatCurrency(
  cardData.collected || 0
)}$ من أصل ${formatCurrency(cardData.goal || 0)}$`;

// عند الضغط على زر التبرع يتم إرسال المستخدم إلى صفحة التبرع
document.querySelector(".btn-donate").addEventListener("click", () => {
  window.location.href = "donationPage.html"; // إعادة توجيه إلى صفحة التبرع
});

// 3. عرض ملفات الإثبات (إن وجدت)
const proofContainer = document.querySelector(".proof-files");
if (cardData.proofFiles?.length > 0) {
  cardData.proofFiles.forEach((file) => {
    if (file.url && file.name) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
      proofContainer.appendChild(li);
    } else {
      const li = document.createElement("li");
      li.textContent = "ملف إثبات غير صالح.";
      proofContainer.appendChild(li);
    }
  });
} else {
  const li = document.createElement("li");
  li.textContent = "لم يتم إرفاق ملفات إثبات.";
  li.classList.add("empty-message");
  proofContainer.appendChild(li);
}

// عند النقر على "تفاصيل اضافية" بيصير
function toggleExtraDetails() {
  const content = document.getElementById("extra-content");
  const arrow = document.getElementById("arrow");
  const isVisible = content.style.display === "block";

  content.style.display = isVisible ? "none" : "block";
  arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
}

// عرض التفاصيل الإضافية
function renderExtraDetails(extraData) {
  const extraList = document.getElementById("extra-list");
  extraList.innerHTML = "";

  if (extraData && typeof extraData === "object") {
    for (let key in extraData) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${key}:</strong> ${extraData[key]}`;
      extraList.appendChild(li);
    }
  } else {
    const li = document.createElement("li");
    li.textContent = "لا توجد تفاصيل إضافية متوفرة.";
    li.classList.add("empty-message");
    extraList.appendChild(li);
  }
}

renderExtraDetails(cardData.extra);

// لقسم المساهمين
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "ثانية", seconds: 1 },
    { label: "دقيقة", seconds: 60 },
    { label: "ساعة", seconds: 3600 },
    { label: "يوم", seconds: 86400 },
    { label: "شهر", seconds: 2592000 },
    { label: "سنة", seconds: 31536000 },
  ];

  let counter;
  for (let i = intervals.length - 1; i >= 0; i--) {
    counter = Math.floor(seconds / intervals[i].seconds);
    if (counter >= 1) {
      const label = intervals[i].label;
      return `قبل ${arabicPlural(counter, label)}`;
    }
  }

  return "الآن";
}

function arabicPlural(count, label) {
  if (count === 1) return `${label}`;
  if (count === 2) {
    if (label === "يوم") return "يومين";
    if (label === "ساعة") return "ساعتين";
    if (label === "دقيقة") return "دقيقتين";
    if (label === "ثانية") return "ثانيتين";
    if (label === "شهر") return "شهرين";
    if (label === "سنة") return "سنتين";
  }
  if (count >= 3 && count <= 10) {
    if (label === "يوم") return `${count} أيام`;
    if (label === "ساعة") return `${count} ساعات`;
    if (label === "دقيقة") return `${count} دقائق`;
    if (label === "ثانية") return `${count} ثوانٍ`;
    if (label === "شهر") return `${count} أشهر`;
    if (label === "سنة") return `${count} سنوات`;
  }
  // 11 وفوق نرجعها "قبل 11 يوم"
  return `${count} ${label}`;
}

// عرض المساهمينdonate
const donorsContainer = document.querySelector(".donors ul");
donorsContainer.innerHTML = "";

if (cardData.donors && cardData.donors.length > 0) {
  cardData.donors.forEach((donor) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${donor.name}</span>
        <span>$${donor.amount}</span>
        <span>${timeAgo(donor.date)}</span>
      `;
    donorsContainer.appendChild(li);
  });
} else {
  const li = document.createElement("li");
  li.textContent = "لا توجد مساهمات حتى الآن.";
  li.classList.add("empty-message");
  donorsContainer.appendChild(li);
}

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
