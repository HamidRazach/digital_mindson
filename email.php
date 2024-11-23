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
if ($valid_email=='')
{
    echo json_encode("Message could not be sent. Enter email address");die;
}
if (!filter_var($valid_email, FILTER_VALIDATE_EMAIL))
{
    echo json_encode("Invalid email address");die;
}

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
// $captcha = trim(@$_POST['g-recaptcha-response']);
// if ($captcha=='')
// {
// 	echo json_encode("Recaptcha Required");die;
// }
// $secretKey = "6Lcp7sIkAAAAAAUWhI020D2saYRIvcwy_K0wufeq";
// $ip = $_SERVER['REMOTE_ADDR'];
// // post request to server
// $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) . '&response=' . urlencode($captcha);
// $response = file_get_contents($url);
// $responseKeys = json_decode($response, true);

// if ($responseKeys["success"])
// {
	try
	{
		//Server settings
		// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
		$mail->isSMTP(); //Send using SMTP
		//$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
		$mail->Host = 'smtp.gmail.com'; //Set the SMTP server to send through
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
		$mail->SMTPAuth = true; //Enable SMTP authentication
		$mail->Username = 'hamidraza7614@gmail.com'; //SMTP username
		$mail->Password = 'Hamid@7645'; //SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
		$mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
		

		//Recipients
		$mail->setFrom('hamidraza7614@gmail.com', 'Digital Mindson Website');
		$mail->addAddress('info@digitalmindson.com');
		$mail->addBCC('muhammedahmadraza72@gmail.com');
		if(trim(@$_POST['con_email'])!='')
			$mail->addReplyTo(trim($_POST['con_email']), ' '.$_POST['con_name']);

		//$mail->AddCC('');$mail->addBCC('');            

		//Content
		$mail->isHTML(true); //Set email format to HTML
		$mail->Subject = 'Digital Mindson Website: Contact Form';
		$mail->Body = 'Name: <b>' . $_POST['con_name'] . '</b><br />Email: <b>' . $_POST['con_email'] . '</b><br />Mobile Number: <b>'.$_POST['phone'].'</b><br />Message: ' . $_POST['con_message'];
		$mail->AltBody = $_POST['con_name'] . ' ' . $_POST['con_email'] . ' '.$_POST['phone'].' ' . $_POST['con_message'];

		$mail->send();
		echo json_encode('Message has been sent');die;
	}
	catch(Exception $e)
	{
		echo json_encode('Message could not be sent');die;
	}
// }
// else
// {
	
// 	echo json_encode("Fill Recaptcha Properly");die;
// }