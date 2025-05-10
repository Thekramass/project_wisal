<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>رمز التحقق</title>
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
  <!-- style -->
  <link rel="stylesheet" href="css/all.min.css">
  <link rel="stylesheet" href="css/header&footer.css">
  <link rel="stylesheet" href="css/sure.css">
</head>
<body>
  <div class="header">
    <a class="logo" href="">
        <img src="img/Group.png" alt="logo">
        <h3>وصال</h3>
    </a>

    <ul class="links">
            <li><a href="landing.htm">الرئيسية</a></li>
            <!-- <li><a href="availabe.htm">المساعدات المتاحة</a></li> -->
            <li><a href="how.htm">كيف يعمل الموقع</a></li>
            <!-- <li><a href="giveHelp.htm">تقديم المساعدة</a></li>
            <li><a href="reqHelp.htm">طلب المساعدة</a></li> -->
            <li><a href="us.html">من نحن؟</a></li>
            <!-- بدنا يكون عليها active -->
            <li><a href="contact-us.htm">تواصل معنا</a></li>
    </ul>
    <div class="log-btn">
        <button id="create" class="create">إنشاء حساب</button>
        <button id="login" class="login">تسجيل الدخول</button>
    </div>
    <!-- زر القائمة (☰) -->
    <div class="menu-toggle">&#9776;</div>
</div>
  <div class="container">
    <div class="verification-box">
      <h2>رمز التحقق</h2>
      <p class="subtitle">أدخل رمز التحقق المُرسل إلى بريدك الإلكتروني</p>

      <div class="otp-box">
        <input type="text" maxlength="1" oninput="moveToNext(this, 0)" />
        <input type="text" maxlength="1" oninput="moveToNext(this, 1)" />
        <input type="text" maxlength="1" oninput="moveToNext(this, 2)" />
        <input type="text" maxlength="1" oninput="moveToNext(this, 3)" />
        <input type="text" maxlength="1" oninput="moveToNext(this, 4)" />
        <input type="text" maxlength="1" oninput="moveToNext(this, 5)" />
      </div>

      <p id="result" class="result"></p>

      <div class="buttons">
        <button onclick="resendOTP()">إعادة الإرسال</button>
        <button id="backBtn">رجوع</button>
      </div>
    </div>
  </div>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  <script src="js/header.js"></script>
  <script src="js/sure.js"></script>
</body>
</html>
<?php

$loginMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);  

    // الاتصال بقاعدة البيانات
    $conn = new mysqli('localhost', 'root', '', 'wesal');
    
    if ($conn->connect_error) {
        die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    }

    // استعلام للتحقق من وجود المستخدم باستخدام البريد الإلكتروني
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // التحقق إذا كان البريد الإلكتروني موجودًا في قاعدة البيانات
    if ($result->num_rows > 0) {
        // إذا كان البريد الإلكتروني موجودًا
        $user = $result->fetch_assoc();  // استرجاع بيانات المستخدم
        $loginMessage = "<p style='color: green;'>تم العثور على البريد الإلكتروني في قاعدة البيانات.</p>";
        
        // ارسال الرسالة إلى الـ front-end لتستكمل عملية ارسال OTP باستخدام EmailJS
        $_SESSION['email'] = $email;  // تخزين البريد الإلكتروني في الجلسة لاستخدامه لاحقًا
        
    } else {
        // إذا كان البريد الإلكتروني غير موجود في قاعدة البيانات
        $loginMessage = "<p style='color: red;'>البريد الإلكتروني غير مسجل.</p>";
    }

    // اغلاق الاستعلام والاتصال بقاعدة البيانات
    $stmt->close();
    $conn->close();
}

?>




