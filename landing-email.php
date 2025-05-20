<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$valid_email = trim(@$_POST['con_email']);
if (!filter_var($valid_email, FILTER_VALIDATE_EMAIL))
{
    echo "<script>alert('Invalid email address.'); window.history.back();</script>";
    die;
}

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['form_submitted'])) {

    // CAPTCHA Check
    $correctAnswer = 7 + 4;
    $userAnswer = isset($_POST['captcha']) ? intval($_POST['captcha']) : 0;

    if ($userAnswer !== $correctAnswer) {
        
        echo "<script>alert('CAPTCHA failed. Please try again.'); window.history.back();</script>";
        exit;
    }

    // Sanitize and collect data
    $name = htmlspecialchars($_POST['con_name'] ? $_POST['con_name'] : '');
    $email = htmlspecialchars($_POST['con_email'] ? $_POST['con_email'] : '');
    $phone = htmlspecialchars($_POST['phone'] ? $_POST['phone'] : '');
    $message = htmlspecialchars($_POST['con_message'] ? $_POST['con_message'] : '');

    // Validate required fields
    if (empty($email) || empty($phone)) {
        echo "<script>alert('Please fill all required fields.'); window.history.back();</script>";
        exit;
    }

    $mail->isSMTP(); //Send using SMTP
    //$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->Host = 'smtp.gmail.com'; //Set the SMTP server to send through
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->SMTPAuth = true; //Enable SMTP authentication
    $mail->Username = 'muhammedahmadraza72@gmail.com'; //SMTP username
    $mail->Password = 'ezwdsrcywryiwjfa'; //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
    $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    

    //Recipients
    $mail->setFrom('muhammedahmadraza72@gmail.com', 'Digital Mindson Website');
    $mail->addAddress('muhammedahmadraza72@gmail.com');
    $mail->addBCC('mawaisraza628@gmail.com');
    if(trim(@$_POST['con_email'])!='')
        $mail->addReplyTo(trim($_POST['con_email']), ' '.$_POST['con_name']);

    //$mail->AddCC('');$mail->addBCC('');            

    //Content
    $mail->isHTML(true); //Set email format to HTML
    $mail->Subject = 'Digital Mindson Website: Contact Form';
    $mail->Body = 'Name: <b>' . $_POST['con_name'] . '</b><br />Email: <b>' . $_POST['con_email'] . '</b><br />Mobile Number: <b>'.$_POST['countryCode'].''.$_POST['phone'].'</b><br />Message: ' . $_POST['con_message'];
    $mail->AltBody = $_POST['con_name'] . ' ' . $_POST['con_email'] . ' '.$_POST['phone'].' ' . $_POST['con_message'];

    
    // Email Details
    // $to = "muhammedahmadraza72@gmail.com";  // Replace with your email
    // $subject = "New Contact Form Submission from Landing Page";
    // $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message";
    // $headers = "From: $email";

    if ($mail->send()) {
        echo "<script>alert('Message sent successfully.'); window.history.back();</script>";
    } else {
        echo "<script>alert('Failed to send email. Try again later.'); window.history.back();</script>";
    }
} else {
    echo 'll';
        exit();
    // Direct access protection
    header("Location: software-development-company.html");
    exit;
}
?>
