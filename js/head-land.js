// عند النقر على الزرين يروح لهدول الصفحتين
let create = document.querySelector(".create");
let login = document.querySelector(".login");
create.onclick = () => window.open("../sign-up.htm", "_self");
login.onclick = () => window.open("../login.htm", "_self");

//له هذه السمات  active اسمه  class  يصير في
const links = document.querySelectorAll(".links li a");
const currentPage = window.location.pathname;
links.forEach((link) => {
  const linkHref = link.getAttribute("href");
  if (currentPage.includes(linkHref)) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// تحديث عرض شريط التقدم حسب البيانات
document.querySelectorAll(".progress-bar").forEach((bar) => {
  const collected = parseFloat(bar.getAttribute("data-collected"));
  const goal = parseFloat(bar.getAttribute("data-goal"));
  const percentage = Math.min((collected / goal) * 100, 100); // لضمان ألا يتجاوز 100%
  bar.querySelector(".progress").style.width = percentage + "%";
});

// إظهار البطاقات بحركة عند التمرير
const cards = document.querySelectorAll(".card");

const showCards = () => {
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (cardTop < windowHeight - 50) {
      card.classList.add("show");
    }
  });
};

// تشغيل الحركة عند التحميل وعند التمرير
window.addEventListener("scroll", showCards);
window.addEventListener("load", showCards);

const toggle = document.querySelector(".menu-toggle");
const linkss = document.querySelector(".links");

toggle.addEventListener("click", () => {
  linkss.classList.toggle("show");
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
  if (!toggle.contains(e.target) && !linkss.contains(e.target)) {
    linkss.classList.remove("show");
  }
});

// إغلاق القائمة عند الضغط على رابط
linkss.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    linkss.classList.remove("show");
  });
});

// قسم الاحصائيات

const counters = document.querySelectorAll(".number");
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const speed = 50; // كلما قلّ الرقم زاد السرعة
    const inc = Math.ceil(target / speed);
    if (count < target) {
      counter.innerText = count + inc;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});
