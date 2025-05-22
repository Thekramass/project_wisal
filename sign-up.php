<?php
session_start();// بدء الجلسة

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['name'], $_POST['email'], $_POST['password'], $_POST['role'])) {
    $username = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // تشفير كلمة المرور
    $role = htmlspecialchars($_POST['role']);

    if (!$email) {
        $message = "<p style='color: red;'>البريد الإلكتروني غير صالح.</p>";
    } else {
        $conn = new mysqli('localhost', 'root', '', 'wesal');
        if ($conn->connect_error) {
            die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
        }

        // التأكد إن كان المستخدم موجودًا بالفعل
        $check = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $result = $check->get_result();

        if ($result->num_rows > 0) {
            $message = "<p style='color: red;'>البريد الإلكتروني مستخدم مسبقًا.</p>";
        } else {
            // إدخال المستخدم الجديد
            $stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $username, $email, $password, $role);
            if ($stmt->execute()) {
                $message = "<p style='color: green;'>تم إنشاء الحساب بنجاح!</p>";
                $_SESSION['username'] = $username;
            } else {
                $message = "<p style='color: red;'>حدث خطأ أثناء إنشاء الحساب.</p>";
            }
            $stmt->close();
        }
س
        $check->close();
        $conn->close();
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>انشاء حساب</title>
    <!-- Normalize  File  -->
    <link rel="stylesheet" href="css/normalize.css">
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
    <!-- CSS File -->
    <link rel="stylesheet" href="css/sign-up.css">
    <link rel="stylesheet" href="css/header&footer.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/headerBtns.css">

    <!-- Google Identity   -->
    <!-- تحميل مكتبة Google -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>

</head>
<body> 
    <header class="auth-header">
  <div class="logo-box">
    <a class="logo" href="">
            <img src="img/Group.png" alt="logo">
            <h3>وصال</h3>
    </a>
    <div class="top-buttons">
        <a href="landing.htm" class="main-btn">الرئيسية</a>
        <a href="login.htm" class="auth-btn">تسجيل الدخول</a>
        <a href="sign-up.htm" class="auth-btn secondary">إنشاء حساب</a>
    </div>
  </div>
  <div class="text">
    <h1 class="welcome-message">أهلًا بك في منصتنا الإنسانية 💙</h1>
    <p class="sub-message">نرافقك بخطوة بخطوة نحو الأمل</p>
  </div>
   
    </header>
    <!-- <div class="header">
        <a class="logo" href="">
            <img src="img/Group.png" alt="logo">
            <h3>وصال</h3>
        </a>
      <ul  class="links" id="main-nav">
      
    </ul>
        <div class="log-btn"></div> 
        <div class="menu-toggle">&#9776;</div>
    </div> -->
    <div class="container">
        <div class="con-logo">
            <div class="logo">
                <img src="img/Group.png" alt="logo">
            </div>
            <div class="text">
                <h2>وصال</h2>
                <p>جسر التواصل والمساعدة بين القلوب المحتاجة والمتبرعين</p>
            </div>
        </div>
        <div class="con-text">
            <p>إنشاء حساب جديد</p>
            <p>يسرنا وجودك معنا هنا في منصة وصال!</p>
        </div>
        <div class="btns">
            <button id="donor">متبرع</button>
            <button id="needy">محتاج</button>
            <button id="admin">إداري</button>
        </div>
        
        <div class="container-form">
            <form id="signupForm" action="" target="_blank" onsubmit="handleRegister(event)">
                <input type="text" id="name" name="name" placeholder="الاسم كاملا" required>
                <input type="email" id="email" name="email" placeholder="البريد الالكتروني" required>
                <input type="password" name="password" id="password" placeholder="كلمة المرور" required>
                <input type="submit" value="إنشاء الحساب ">
            <div class="other-way">
                <p>أو تسجيل الدخول باستخدام</p>
                <div id="google-button-container"></div>
            </div>
            </form>
            <div class="new-acount"> لديك حساب؟ <a href="login.htm"> قم بتسجيل الدخول </a></div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.min.js"></script> 
    <script src="js/sign-up.js"></script>
    <!-- <script src="js/header.js"></script> -->
</body>
</html>
 