<?php
// الاتصال بقاعدة البيانات
$host = "localhost"; 
$dbname = "wesal";
$username = "root";
$password = ""; // كلمة مرور قاعدة البيانات

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("فشل الاتصال بقاعدة البيانات: " . $e->getMessage());
}

// استقبال البيانات من النموذج
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"] ?? '';
    $newPassword = $_POST["newPassword"] ?? '';
    $confirmPassword = $_POST["confirmPassword"] ?? '';

    if (empty($email) || empty($newPassword) || empty($confirmPassword)) {
        echo "يرجى تعبئة جميع الحقول.";
        exit;
    }

    if ($newPassword !== $confirmPassword) {
        echo "كلمتا المرور غير متطابقتين.";
        exit;
    }

    // تشفير كلمة المرور (أفضل استخدام BCRYPT)
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    // تحديث كلمة المرور في قاعدة البيانات
    $stmt = $pdo->prepare("UPDATE users SET password = :password WHERE email = :email");
    $stmt->bindParam(":password", $hashedPassword);
    $stmt->bindParam(":email", $email);

    if ($stmt->execute()) {
        echo "تم إعادة تعيين كلمة المرور بنجاح.";
    } else {
        echo "حدث خطأ أثناء تحديث كلمة المرور.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>إعادة تعيين كلمة المرور - منصتنا</title>
  <!-- Normalize  File  -->
  <link rel="stylesheet" href="css/normalize.css">
  <!-- Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  
  <!-- CSS File -->
  <link rel="stylesheet" href="css/all.min.css">
  <link rel="stylesheet" href="css/header&footer.css">
  <link rel="stylesheet" href="css/reset-password.css" />
  <!-- Google Identity   -->
  <!-- تحميل مكتبة Google -->
  <script src="https://accounts.google.com/gsi/client" async defer></script>

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
            <li><a href="volunteer.html">تطوع معنا </a></li>
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
    <h2>إعادة تعيين كلمة المرور</h2>
    <form id="resetForm">
      <label for="newPassword">كلمة المرور الجديدة:</label>
      <input type="password" id="newPassword" name="newPassword" required />
      <div class="strength" id="passwordStrength"></div>

      <label for="confirmPassword">تأكيد كلمة المرور:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required />


      <div id="messageBox" class="message-box"></div>

      <button type="submit">حفظ</button>
    </form>
  </div>

  <script src="js/header.js"></script>
  <script src="js/reset-password.js"></script>
</body>
</html>
