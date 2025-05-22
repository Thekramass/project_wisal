<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'wesal');
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$donation_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$case = [];
if ($donation_id > 0) {
    $stmt = $conn->prepare("SELECT title, collected_amount, goal_amount, image_path, status FROM donations WHERE id = ?");
    $stmt->bind_param("i", $donation_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $case = [
            'title' => $row['title'],
            'collected' => $row['collected_amount'],
            'goal' => $row['goal_amount'],
            'image' => $row['image_path'],
            'status' => $row['status'],
        ];
    } else {
        die("لم يتم العثور على هذه الحالة.");
    }
    $stmt->close();
} else {
    die("معرّف الحالة غير صالح.");
}

$donationAmount = 0;
$paymentMethod = '';
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $donationAmount = floatval($_POST['donation_amount'] ?? 0);
    $paymentMethod = $_POST['payment_method'] ?? '';
    $user_id = $_SESSION['user_id'] ?? null;

    if ($donationAmount <= 0) {
        $message = "يرجى إدخال مبلغ تبرع صالح أكبر من صفر.";
    } elseif (empty($paymentMethod)) {
        $message = "يرجى اختيار طريقة دفع.";
    } else {
        $stmt = $conn->prepare("INSERT INTO donation_records (donation_id, user_id, amount, payment_method) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iids", $donation_id, $user_id, $donationAmount, $paymentMethod);
        
        if ($stmt->execute()) {
            $update = $conn->prepare("UPDATE donations SET collected_amount = collected_amount + ? WHERE id = ?");
            $update->bind_param("di", $donationAmount, $donation_id);
            $update->execute();

            $message = "شكرًا لتبرعك بمبلغ $" . number_format($donationAmount, 2) . " عبر " . htmlspecialchars($paymentMethod) . ". سيتم معالجة التبرع قريبًا.";

            $donationAmount = 0;
            $paymentMethod = '';
        } else {
            $message = "حدث خطأ أثناء معالجة التبرع. حاول مرة أخرى.";
        }

        $stmt->close();
        $update->close();
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>صفحة الدفع - وصال</title>
  <link rel="stylesheet" href="css/normalize.css" />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/all.min.css" />
  <link rel="stylesheet" href="css/donationPage.css" />
</head>
<body>
<div class="header">
  <a class="logo" href="landing.htm">
    <img src="img/Group.png" alt="logo" />
    <h3>وصال</h3>
  </a>
</div>

<div class="container">
  <div class="title">
    <i class="fa-solid fa-arrow-right" onclick="window.history.back()"></i>
    الدفع
  </div>
  <div class="header-don">
    <div class="case-details">
      <img src="<?php echo htmlspecialchars($case['image']); ?>" alt="صورة الحالة" />
      <div>
        <div class="case-title"><?php echo htmlspecialchars($case['title']); ?></div>
        <div class="progress-bar">
          <?php
            $progressPercent = min(100, ($case['collected'] / $case['goal']) * 100);
          ?>
          <div class="progress" style="width: <?php echo $progressPercent; ?>%;"></div>
        </div>
        <div class="collected">$<?php echo number_format($case['collected'], 2); ?> تم جمعه من أصل $<?php echo number_format($case['goal'], 2); ?></div>
      </div>
    </div>
    <div class="status-badge"><?php echo htmlspecialchars($case['status']); ?></div>
  </div>

  <form method="post" action="">
    <div class="donation-amount">
      <label for="donation_amount">اختر المبلغ الذي ترغب في التبرع به، مهما كان بسيطًا، سيصنع فرقًا كبيرًا!</label>
      <input type="number" id="donation_amount" name="donation_amount" min="1" step="0.01" placeholder="$" value="<?php echo htmlspecialchars($donationAmount); ?>" required>
    </div>

    <div class="payment-methods">
      <h3>طرق الدفع المتاحة</h3>
      <?php
      $paymentOptions = [
        'visa' => ['img' => 'img/visa-logo-png-2020.png', 'label' => 'Visa'],
        'mastercard' => ['img' => 'img/Mastercard-logo.png', 'label' => 'Mastercard'],
        'bank' => ['img' => 'img/icons8-bank-50.png', 'label' => 'تحويل بنكي'],
        'paypal' => ['img' => 'img/paypal_PNG10.png', 'label' => 'Paypal'],
        'cash' => ['img' => 'img/icons8-money-48.png', 'label' => 'نقدًا'],
      ];
      foreach ($paymentOptions as $key => $option) {
          $checked = ($paymentMethod === $key) ? 'checked' : '';
          echo '<label class="payment-option">';
          echo "<input type='radio' name='payment_method' value='$key' $checked required>";
          echo "<img src='" . htmlspecialchars($option['img']) . "' alt='" . htmlspecialchars($option['label']) . "'>";
          echo "<span>" . htmlspecialchars($option['label']) . "</span>";
          echo '</label>';
      }
      ?>
    </div>

    <div class="payment-summary">
      <h3>تفاصيل الدفع</h3>
      <div class="row"><span>تبرعك</span><span>$<span id="donation-value"><?php echo number_format($donationAmount, 2); ?></span></span></div>
      <div class="row total"><span>إجمالي الفاتورة</span><span>$<span id="total-value"><?php echo number_format($donationAmount, 2); ?></span></span></div>
    </div>

    <div class="donate-final">
      <p class="note">نضمن لك أن تبرعك يصل بأمان وشفافية تامة.</p>
      <button class="donate-btn" type="submit" id="donate-btn">تبرع الآن</button>
    </div>

    <?php if ($message): ?>
      <div class="donation-message" style="color: red; margin-top: 10px;"><?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>
  </form>
</div>

<div class="footer">
  <!-- يمكنك وضع فوتر الموقع هنا -->
</div>

<script src="js/donationPage.js"></script>
</body>
</html>
<?php $conn->close(); ?>
