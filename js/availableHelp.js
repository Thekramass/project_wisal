// JSON ممكن نعملها لحالها في ملف
const cards = [
  {
    img: "../img/Photo (1).png",
    "card-title": "علاج طارئ لطفلة مريضة",
    "card-desc": "تعاني الطفلة من حالة صحية حرجة  تتطلب علاجا طارئا",
    "card-longDesc": `تعاني الطفلة رُبى  (6 سنوات) من حالة صحية حرجة تتطلب علاجًا طبيًا طارئًا لا يمكن تأجيله.
      الأسرة تمر بظروف صعبة ولا تملك القدرة على تغطية تكاليف العلاج`,
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 600,
    goal: 1000,
    proofFiles: [
      { name: "تقرير طبي.pdf", url: "uploads/report1.pdf" },
      { name: "صورة وصفة.jpg", url: "uploads/prescription1.jpg" },
    ],
    extra: {
      "تاريخ الحالة": "3 مايو 2025",
      "عدد أفراد الأسرة": "4",
      "أولوية الحالة": "عالية",
      "نوع السكن": "مخيم",
      "تم التحقق من الحالة؟": "نعم",
    },
    donors: [
      { name: " محمد", amount: 54, date: "2025-02-08T12:00:00Z" },
      { name: "علي سالم", amount: 105, date: "2025-04-07T15:30:00Z" },
      { name: "مجهول", amount: 108, date: "2025-05-05T09:00:00Z" },
      { name: "مجهول", amount: 108, date: "2025-05-08T06:40:00Z" },
    ],
  },
  {
    img: "images/medical1.jpg",
    "card-title": "أدوية لمرضى مزمنين",
    "card-desc": "مجموعة مرضى في مخيم يحتاجون الى ادوية لأمراض مزمنة ",
    "card-longDesc": `يعيش عدد من المرضى المزمنين داخل المخيم أوضاعًا صحية صعبة نتيجة نقص الأدوية الأساسية 
    مثل أدوية القلب والسكري والضغط. تتكرر معاناتهم يوميًا بسبب انقطاع العلاج وعدم توفر الإمكانيات.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 1500,
    goal: 3000,
    proofFiles: [
      { name: "كشف أسماء المرضى.pdf", url: "uploads/patients-list.pdf" },
      { name: "مستند احتياج دوائي.pdf", url: "uploads/medical-need.pdf" },
    ],
    extra: {
      "عدد المرضى المستفيدين": "12",
      "نوع الأدوية المطلوبة": "ضغط، سكري، قلب",
      المنطقة: "مخيم الشاطئ",
      "تم التحقق؟": "نعم",
      "جهة التوثيق": "اللجنة الطبية بالمخيم",
    },
    donors: [
      { name: " محمد", amount: 54, date: "2025-02-08T12:00:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
  },
  {
    img: "../img/Photo.png",
    "card-title": "مساعدة غذائية لعائلة نازحة وصلت حديثًا",
    "card-desc": "العائلة وصلت المخيم وتحتاج سلة غذائية أساسية بشكل عاجلا",
    "card-longDesc": `العائلة النازحة حديثًا فقدت منزلها نتيجة الأحداث الأخيرة. لا تملك مصدر دخل حالي،
    وتحتاج بشكل عاجل إلى سلة غذائية تكفي لأفرادها خلال الأسابيع القادمة.`,
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات غذائية",
    date: "20 مارس 2025",
    collected: 200,
    goal: 500,
    proofFiles: [
      { name: "شهادة نزوح.pdf", url: "uploads/displacement-cert.pdf" },
    ],
    extra: {
      "عدد أفراد الأسرة": "6",
      "وضع السكن": "خيمة مؤقتة",
      "نوع السلة المطلوبة": "سلة غذائية أسبوعية",
      "تاريخ الوصول": "10 مارس 2025",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "مجهول", amount: 108, date: "2025-05-08T06:40:00Z" },
      { name: "فاطمة أحمد", amount: 250, date: "2025-05-07T11:15:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
  },
  {
    img: "../img/Photo (3).png",
    "card-title": "مساعدة ملابس ودفء لطفل نازح",
    "card-desc": "طفل بحاجة لملابس شتوية تساعده على تحمل ظروف البرد",
    "card-longDesc": `الطفل كريم (8 سنوات) يعيش في خيمة مع أسرته بعد تهجيرهم مؤخرًا. لا يملك ما يكفي من الملابس 
    لتدفئته في ظل انخفاض درجات الحرارة ليلاً. الأسرة عاجزة عن شراء مستلزمات شتوية.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات ملابس",
    date: "20 مارس 2025",
    collected: 700,
    goal: 1000,
    proofFiles: [
      { name: "تقرير حالة اجتماعية.pdf", url: "uploads/social-case.pdf" },
    ],
    extra: {
      العمر: "8 سنوات",
      "نوع الملابس المطلوبة": "جاكيت شتوي، كنزة، طاقية، قفازات",
      "مكان الإقامة": "مخيم دير البلح",
      "تاريخ الطلب": "15 مارس 2025",
    },
    donors: [
      { name: "سارة خالد", amount: 65, date: "2025-05-03T16:20:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
  },
  {
    img: "../img/Photo (2).png",
    "card-title": "وجبات ساخنة لعائلة تقيم في الخيام",
    "card-desc": "العائلة تعيش في ظروف صعبة وتحتاج لوجبات غذائية يومية",
    "card-longDesc": `العائلة مكونة من أب وأم و3 أطفال يعيشون في خيمة بلا مطبخ أو وسيلة للطبخ.
    يعانون من نقص الطعام المطبوخ، ويعتمدون فقط على الخبز وبعض المعلبات.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات غذائية",
    date: "20 مارس 2025",
    collected: 300,
    goal: 1000,
    proofFiles: [
      { name: "كشف زيارة ميدانية.pdf", url: "uploads/field-visit.pdf" },
    ],
    extra: {
      "عدد الوجبات المطلوبة يوميًا": "3",
      "مدة التغطية المطلوبة": "أسبوعين",
      "نوع الطعام": "وجبات ساخنة جاهزة",
      "جهة المتابعة": "فريق الإغاثة المحلية",
    },
    donors: [
      { name: "سامي عبد الله", amount: 75, date: "2025-05-06T13:00:00Z" },
      { name: "مجهول", amount: 300, date: "2025-05-04T14:30:00Z" },
      { name: "سارة خالد", amount: 65, date: "2025-05-03T16:20:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
  },
  {
    img: "images/medical2.jpg",
    "card-title": "معدات طبية لغزة",
    "card-desc": "العائلة وصلت المخيم وتحتاج سلة غذائية أساسية بشكل عاجلا",
    "card-longDesc": `في ظل النقص الحاد في المعدات الطبية داخل قطاع غزة، هناك حاجة عاجلة لتوفير معدات حيوية مثل أجهزة قياس الضغط والسكر وأسرة طبية متنقلة لخدمة المرضى في المناطق المنكوبة.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 4000,
    goal: 10000,
    proofFiles: [
      { name: "طلب رسمي من مركز طبي.pdf", url: "uploads/clinic-request.pdf" },
      { name: "قائمة المعدات المطلوبة.pdf", url: "uploads/equipment-list.pdf" },
    ],
    extra: {
      "الجهة المستفيدة": "مركز رعاية أولية",
      "نوع المعدات": "أجهزة قياس ضغط وسكر، أسرة طبية، كراسي متحركة",
      "عدد المستفيدين المتوقع": "150 مريض شهريًا",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "إبراهيم يوسف", amount: 200, date: "2025-04-29T12:10:00Z" },
      { name: "زينب علي", amount: 150, date: "2025-04-28T17:00:00Z" },
      { name: "رنا فوزي", amount: 90, date: "2025-04-27T13:30:00Z" },
    ],
  },
  {
    img: "../img/Photo (6).png",
    "card-title": "توفير جهاز أكسجين لطفل مريض",
    "card-desc":
      "الطفل يعاني من مشاكل تنفسية مزمنة ويحتاج جهاز أكسجين منزلي بشكل عاجل",
    "card-longDesc": `الطفل أيهم (10 سنوات) يعاني من مرض رئوي مزمن، ويحتاج جهاز أكسجين للاستخدام المنزلي لتفادي أي تدهور في حالته الصحية، خصوصًا في أوقات الليل.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 800,
    goal: 1000,
    proofFiles: [
      { name: "تقرير طبي حديث.pdf", url: "uploads/oxygen-report.pdf" },
    ],
    extra: {
      العمر: "10 سنوات",
      "نوع الجهاز": "مولد أوكسجين منزلي",
      "استخدام الجهاز": "يومي، ساعات طويلة",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "رنا فوزي", amount: 90, date: "2025-04-27T13:30:00Z" },
      { name: "حسام سليم", amount: 80, date: "2025-04-26T18:40:00Z" },
      { name: "أحمد سعيد", amount: 130, date: "2025-04-25T14:50:00Z" },
    ],
  },
  {
    img: "images/clothes2.jpg",
    "card-title": "توزيع ملابس على الأسر المحتاجة",
    "card-desc": "العائلة وصلت المخيم وتحتاج سلة غذائية أساسية بشكل عاجلا",
    "card-longDesc": `تعيش عشرات العائلات في مخيم الشاطئ دون ملابس كافية لأطفالها، خصوصًا في ظل تغير الفصول.
    الحملة تهدف لتوفير ملابس مناسبة للرجال والنساء والأطفال المحتاجين.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات ملابس",
    date: "20 مارس 2025",
    collected: 1500,
    goal: 2000,
    proofFiles: [
      { name: "قائمة بالأسر المستفيدة.pdf", url: "uploads/family-list.pdf" },
    ],
    extra: {
      "عدد الأسر المستفيدة": "20",
      "نوع الملابس": "صيفية وشتوية حسب الحاجة",
      "مكان التوزيع": "مخيم الشاطئ",
      "جهة التوثيق": "متطوعي المنطقة",
    },
    donors: [
      { name: "مجهول", amount: 108, date: "2025-05-08T06:40:00Z" },
      { name: "فاطمة أحمد", amount: 250, date: "2025-05-07T11:15:00Z" },
      { name: "سامي عبد الله", amount: 75, date: "2025-05-06T13:00:00Z" },
    ],
  },
  {
    img: "../img/Photo (9).png",
    "card-title": "حليب أطفال ومستلزمات لرضيع",
    "card-desc": "رضيع يعاني من سوء تغذية بحاجة لحليب خاص وعلاجات مغذية",
    "card-longDesc": `الرضيع سامي (8 أشهر) يعاني من سوء تغذية حاد نتيجة غياب الحليب المناسب وعدم قدرة الأم على الإرضاع.
    الحالة تحتاج حليب خاص وبعض المكملات الغذائية الضرورية لنمو الطفل.`,
    type: "new",
    name: "حالة جديدة ",
    "card-category": "مساعدات غذائية",
    date: "20 مارس 2025",
    collected: 200,
    goal: 500,
    proofFiles: [
      { name: "تشخيص سوء تغذية.pdf", url: "uploads/malnutrition.pdf" },
    ],
    extra: {
      العمر: "8 أشهر",
      الاحتياج: "حليب خاص – تركيبة طبية للأطفال",
      "عدد العلب المطلوبة شهريًا": "12",
      "مدة التغطية": "شهر واحد",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "فاطمة أحمد", amount: 250, date: "2025-05-07T11:15:00Z" },
      { name: "نورة منصور", amount: 500, date: "2025-04-30T09:00:00Z" },
      { name: "إبراهيم يوسف", amount: 200, date: "2025-04-29T12:10:00Z" },
    ],
  },
  {
    img: "../img/Photo (5).png",
    "card-title": "أحذية وملابس شتوية لأطفال في الخيام",
    "card-desc": "الأطفال لا يملكون ما يقيهم برد الشتاء ويحتاجون أحذية ومعاطف",
    "card-longDesc": `عدد من الأطفال يعيشون في خيام بدون وسائل تدفئة ولا يمتلكون أحذية مناسبة أو معاطف،
    مما يعرضهم لخطر المرض مع اشتداد البرد. الحاجة ملحة لتوفير ملابس شتوية جيدة.`,
    type: "urgent",
    name: "عاجل",
    "card-category": "مساعدات ملابس",
    date: "20 مارس 2025",
    collected: 1000,
    goal: 1500,
    proofFiles: [
      { name: "صور من الخيام.pdf", url: "uploads/tent-photos.pdf" },
      { name: "تقرير لجنة الحماية.pdf", url: "uploads/protection-report.pdf" },
    ],
    extra: {
      "عدد الأطفال المستفيدين": "30",
      "نوع المستلزمات": "أحذية، معاطف، جوارب",
      "جهة التوزيع": "فريق المتطوعين",
      "تاريخ التنفيذ": "بداية ديسمبر 2025",
    },
    donors: [
      { name: "سامي عبد الله", amount: 75, date: "2025-05-06T13:00:00Z" },
      { name: "سارة خالد", amount: 65, date: "2025-05-03T16:20:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
      { name: "إبراهيم يوسف", amount: 200, date: "2025-04-29T12:10:00Z" },
    ],
  },
];

const container = document.getElementById("cards-container");

// لتنسيق المبلغ
function formatCurrency(amount) {
  if (amount < 1000) {
    return "$" + amount;
  } else {
    return "$" + amount.toLocaleString("en-US");
  }
}

// لانشاء الكارد
function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-category", data["card-category"]);

  card.innerHTML = `
    <img src="${data.img}" alt="${data["card-title"]}">
    <div class="badge ${data.type}">${data.name}</div>
    <div class="card-body">
      <div class="card-title">${data["card-title"]}</div>
      <div class="card-desc">${data["card-desc"]}</div>
      <div class="card-category">${data["card-category"]}</div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${Math.min(
          (data.collected / data.goal) * 100,
          100
        )}%;"></div>
      </div>
      // <div class="progress-text">${data.collected} / ${data.goal} دولار</div>
      <div class="progress-text">${formatCurrency(
        data.collected
      )} / ${formatCurrency(data.goal)} دولار</div>

    </div>
  `;

  card.addEventListener("click", () => {
    //`localStorage` تمرير البيانات عبر
    localStorage.setItem("cardsData", JSON.stringify(data));
    window.location.href = `help-details.html?id=${cards.indexOf(data)}`;

    // `URLSearchParams`  او باستخدام

    // const cardData = JSON.stringify(data);
    // window.location.href = `help-details.html?cardData=${encodeURIComponent(
    //   cardData
    // )}`;
  });

  container.appendChild(card);
}

// عرض جميع الكروت
cards.forEach((card) => createCard(card));

// دالة الفلترة
function filterCards(category) {
  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  // تحديث الزر النشط
  document
    .querySelectorAll(".filters button")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.filters button[onclick*="${category}"]`)
    .classList.add("active");
}

// عند النقر على زر تسجيل الخروج الذهاب الى صفحة تسجيل الدخول
let logout = document.querySelector(".logout");
logout.onclick = () => window.open("../login.htm", "_self");
