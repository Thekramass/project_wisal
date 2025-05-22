<?php
session_start();
$loginMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', '', 'wesal');
    if ($conn->connect_error) {
        die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            $loginMessage = "<p style='color: green;'>مرحبًا " . htmlspecialchars($user['username']) . "! تم تسجيل الدخول بنجاح.</p>";
            // header("Location: dashboard.php"); exit;
        } else {
            $loginMessage = "<p style='color: red;'>كلمة المرور غير صحيحة.</p>";
        }
    } else {
        $loginMessage = "<p style='color: red;'>البريد الإلكتروني غير مسجل.</p>";
    }

    $stmt->close();
   
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل دخول</title>
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
    <link rel="stylesheet" href="css/header&footer.css">
    <link rel="stylesheet" href="css/login.css">
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
            <p>تسجيل الدخول</p>
            <p>سعيدين بتواجدك مرة اخرى هنا!</p>
        </div>
        <div class="container-form">
        <?php if (!empty($loginMessage)) echo $loginMessage; ?>


            <form action="" method="POST" target="_self">

                <input type="email" id="email" name="email" placeholder="البريد الالكتروني">
                <input type="password" name="password" id="password" placeholder="كلمة المرور">
                <a class="forget" id="forget" href="">هل نسيت كلمة المرور؟</a>
                <input type="submit" value="تسجيل الدخول">
                 <!-- تبعه بدلا من يكتب الايميل وكلمة الرور يدويا google  يسجل دخول باستخدام حساب  . 
                جوجل بتتولى المصادقة (التوثيق)، وبتعطينا معلومات عن المستخدم.  -->
            <div class="other-way">
                <p>أو تسجيل الدخول باستخدام</p>
                <div id="google-button-container"></div>
            </div>
            </form>
            <div class="new-acount">ليس لديك حساب؟<a href="sign-up.htm"> قم بإنشاء حسابك الآن </a></div>
        </div>
    </div>
<!-- Modal for Forget Password -->
<div id="forgetModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h3>استعادة كلمة المرور</h3>
      <p>أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
      <input type="email" placeholder="البريد الإلكتروني" class="modal-input" required>
      <button class="modal-button">إرسال</button>
    </div>
</div>
<!-- End Model -->

<!-- Toast Message For Forget-->
<div id="toast-pass" class="toast-pass"></div>

<!--  مكتبة JavaScript الخاصة بـ EmailJS -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

<!-- ربط بعملية تسجيل الدخول -->
<script src="js/login.js"></script>
<script src="js/forgetpasss.js"></script>  
<script src="js/header.js"></script>
</body> 
</html>
<?php
 $conn->close();
?>

