window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 200) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

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

let create = document.querySelector(".create");
let login = document.querySelector(".login");

create.onclick = () => window.open("../sign-up.htm", "_self");
login.onclick = () => window.open("../login.htm", "_self");
