const urlParams = new URLSearchParams(window.location.search);
const cardId = parseInt(urlParams.get("id")); // الرقم المرجعي للكرت

const allCards = JSON.parse(localStorage.getItem("cardsData") || "[]");
const data = allCards[cardId];

if (!data) {
  document.querySelector(".help-content").innerHTML =
    "<p>لم يتم العثور على البيانات المطلوبة.</p>";
} else {
  document.querySelector(".card-title").textContent = data["card-title"];
  document.querySelector(".card-desc").textContent = data["card-desc"];
  document.querySelector(".card-longDesc").textContent = data["card-longDesc"];
  document.querySelector(".progress-bar-fill").style.width = `${Math.min(
    (data.collected / data.goal) * 100,
    100
  )}%`;
  document.querySelector(
    ".progress-text"
  ).textContent = `$${data.collected} / $${data.goal} دولار`;

  // الملفات الثبوتية
  const filesList = document.querySelector(".proof-files ul");
  filesList.innerHTML = "";
  data.proofFiles.forEach((file) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
    filesList.appendChild(li);
  });

  // التفاصيل الإضافية
  const extraDetailsList = document.querySelector(".extra-details ul");
  extraDetailsList.innerHTML = "";
  for (const [key, value] of Object.entries(data.extra)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    extraDetailsList.appendChild(li);
  }

  // المتبرعين
  const donorsList = document.querySelector(".donors ul");
  donorsList.innerHTML = "";
  data.donors?.forEach((donor) => {
    const li = document.createElement("li");
    const date = new Date(donor.date).toLocaleDateString("ar-EG");
    li.textContent = `${donor.name} - $${donor.amount} - ${date}`;
    donorsList.appendChild(li);
  });
}
