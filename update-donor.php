<?php
session_start();

// إعدادات قاعدة البيانات
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "wasal";

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    exit();
}

// جلب البيانات من الفورم
$donorName = trim($_POST['donorName'] ?? '');
$donorEmail = trim($_POST['donorEmail'] ?? '');
$donorPhone = trim($_POST['donorPhone'] ?? '');
$donorCity = trim($_POST['donorCity'] ?? '');

// تحقق من البيانات المطلوبة
if (empty($donorName) || empty($donorEmail) || empty($donorPhone)) {
    die("يرجى تعبئة الحقول المطلوبة.");
    exit();
}

// نفترض أن المستخدم مسجل الدخول وله معرف في الجلسة
$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
    die("يجب تسجيل الدخول لتحديث البيانات.");
    exit();
}

// تحديث بيانات المتبرع في قاعدة البيانات
$sql = "UPDATE donors SET name=?, email=?, phone=?, city=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $donorName, $donorEmail, $donorPhone, $donorCity, $userId);

if ($stmt->execute()) {
    echo "تم تحديث البيانات بنجاح.";
    exit();
} else {
    echo "حدث خطأ أثناء التحديث: " . $conn->error;
    exit();
}

$stmt->close();
$conn->close();
?>
