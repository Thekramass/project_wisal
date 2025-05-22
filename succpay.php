<?php
session_start();

// التحقق من وجود بيانات الدفع في POST (بعد الدفع)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // استلام بيانات الدفع من النموذج أو من بوابة الدفع
    $caseId = $_POST['caseId'] ?? null;
    $caseTitle = $_POST['caseTitle'] ?? 'عنوان الحالة غير معروف';
    $caseImage = $_POST['caseImage'] ?? 'img/default-case.png';
    $collectedAmount = floatval($_POST['collectedAmount'] ?? 0);
    $totalAmount = floatval($_POST['totalAmount'] ?? 1000);
    $donationAmount = floatval($_POST['donationAmount'] ?? 0);

    // حفظ البيانات في الجلسة لعرضها في الصفحة
    $_SESSION['payment_confirm'] = [
        'caseId' => $caseId,
        'caseTitle' => $caseTitle,
        'caseImage' => $caseImage,
        'collectedAmount' => $collectedAmount,
        'totalAmount' => $totalAmount,
        'donationAmount' => $donationAmount,
    ];

    // يمكنك هنا إضافة كود لتخزين الدفع في قاعدة بيانات أو التحقق من الدفع فعلياً
} 

// إذا لم توجد بيانات في الجلسة، إعادة توجيه للصفحة الرئيسية أو صفحة الدفع
if (!isset($_SESSION['payment_confirm'])) {
    header("Location: landing.htm");
    exit;
}

$data = $_SESSION['payment_confirm'];

// حساب النسبة المئوية للتقدم
$progressPercent = min(100, ($data['collectedAmount'] / $data['totalAmount']) * 100);
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>تأكيد الدفع - وصال</title>
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/all.min.css" />
  <link rel="stylesheet" href="css/header&footer.css" />
  <link rel="stylesheet" href="css/succPay.css" />
</head>
<body>
  <div class="header">
    <a class="logo" href="landing.htm">
      <img src="img/Group.png" alt="logo" />
      <h3>وصال</h3>
    </a>
    <ul class="links" id="main-nav">
      <!-- روابط تنضاف بواسطة JS -->
    </ul>
    <div class="log-btn"></div>
    <div class="menu-toggle">&#9776;</div>
  </div>

  <div class="container">
    <div class="title">تأكيد الدفع</div>

    <div class="header-don">
      <div class="case-details">
        <img src="<?php echo htmlspecialchars($data['caseImage']); ?>" alt="صورة الحالة" />
        <div>
          <div class="case-title"><?php echo htmlspecialchars($data['caseTitle']); ?></div>
          <div class="progress-bar">
            <div class="progress" style="width: <?php echo $progressPercent; ?>%;"></div>
          </div>
          <div class="collected">
            <?php echo number_format($data['collectedAmount']); ?> ريال من <?php echo number_format($data['totalAmount']); ?> ريال
          </div>
        </div>
      </div>
      <div class="status-badge">✅ تم إرسال تبرعك بنجاح</div>
    </div>

    <div class="succtext">
      <p>✅ تم إرسال تبرعك بنجاح</p>
      <p>شكرًا لك على مساهمتك 🙏</p>
      <p class="detail-category">
        شكرًا لتبرعك الكريم، لقد كان له أثر عظيم في حياة المحتاجين.
      </p>
      <p>مبلغ التبرع: <?php echo number_format($data['donationAmount']); ?> ريال</p>
    </div>

    <div class="action">
      <div class="btn donate" onclick="window.location.href='donationPage.htm'">تبرع مرة أخرى</div>
      <div class="btn share" id="shareBtn">شارك الحالة مع أصدقائك</div>
    </div>

    <div class="modal" id="shareModal" style="display:none;">
      <div class="share-icons">
        <span class="close" id="closeShare">&times;</span>
        <h3>شارك الآن</h3>
        <div class="share">
          <a href="#" class="icon facebook" title="شارك على فيسبوك" target="_blank"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a href="#" class="icon whatsapp" title="شارك على واتساب" target="_blank"
            ><i class="fab fa-whatsapp"></i
          ></a>
          <a href="#" class="icon x" title="شارك على X" target="_blank"
            ><i class="fab fa-x-twitter"></i
          ></a>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="text">
      <div class="logo">
        <img src="img/Group.png" alt="logo" />
        <h4>وصال</h4>
      </div>
      <div class="content">
        منصة إنسانية تهدف لربط المتبرعين بالعائلات المحتاجة بطريقة شفافة، سهلة، وآمنة.
        <br />
        نعمل على تسهيل إيصال التبرعات بمختلف أشكالها لمن هم في أمسّ الحاجة، ونؤمن أن كل
        مساعدة، مهما كانت بسيطة، قادرة على صناعة فرق حقيقي.
      </div>
    </div>
    <div class="links">
      <div class="box">
        <h4>الروابط السريعة</h4>
        <a href="landing.htm">الرئيسية</a>
        <a href="how.htm">كيف يعمل الموقع</a>
        <a href="volunteer.html">تطوع معنا</a>
        <a href="us.html">من نحن؟</a>
      </div>
      <div class="box">
        <h4>الشروط والسياسات</h4>
        <a href="">الشروط والأحكام</a>
        <a href="">سياسية الخصوصية</a>
        <a href="">سياسية ملفات تعريف الارتباط</a>
        <a href="commonQues.htm">الأسئلة الشائعة</a>
      </div>
      <div class="box">
        <h4>مواقع التواصل الاجتماعي</h4>
        <div class="social">
          <a href=""><i class="fa-brands fa-facebook-f"></i></a>
          <a href=""><i class="fa-brands fa-instagram"></i></a>
          <a href=""><i class="fa-brands fa-x-twitter"></i></a>
        </div>
      </div>
    </div>
    <div class="foot">جميع الحقوق محفوظة لمنصة وصال &copy; 2025</div>
  </div>

  <script>
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeShare = document.getElementById('closeShare');

    shareBtn.addEventListener('click', () => {
      shareModal.style.display = 'block';
    });

    closeShare.addEventListener('click', () => {
      shareModal.style.display = 'none';
    });

    window.onclick = function(event) {
      if (event.target === shareModal) {
        shareModal.style.display = 'none';
      }
    };

    // تحديث روابط المشاركة مع بيانات الحالة الحالية
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("تبرع لحالة: <?php echo htmlspecialchars($data['caseTitle']); ?>");
    document.querySelector('.facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.querySelector('.whatsapp').href = `https://api.whatsapp.com/send?text=${title} ${url}`;
    document.querySelector('.x').href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
  </script>
</body>
</html>
