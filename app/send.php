<?php

  if(!isset($_POST['name']) and !isset($_POST['phone']) ) {
    header('Location: /');
    exit;
  }
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'] ?? 'Не указан';
  $quest = $_POST['quest'] ?? 'Не указан';
  $form = $_POST['form'];

  require 'phpmailer/Exception.php';
  require 'phpmailer/PHPMailer.php';
  require 'phpmailer/SMTP.php';

  $mail = new PHPMailer\PHPMailer\PHPMailer(true);

  try {
  
    $mail->SMTPDebug = 0;                  
    $mail->isSMTP();                         
    $mail->Host       = 'smtp.gmail.com';                 
    $mail->SMTPAuth   = true;                                 
    $mail->Username   = 'roshhaleksej@gmail.com';                    
    $mail->Password   = 'dkw9lKaC9UO139pYdeCX';                             
    $mail->SMTPSecure = 'ssl';        
    $mail->Port       = 465;                       

    //Recipients
    $mail->setFrom('roshhaleksej@gmail.com', 'Алексей');
    $mail->addAddress('roshh-aleksej2009@yandex.ru');     
    
    // Content
    $mail->isHTML(true);                                  
    $mail->Subject = 'Новое сообщение с сайта';
    $mail->Body    = "Пользователь оставил данные:<br> Имя: {$name}<br> Телефон: {$phone}<br> Email: {$email}<br> Вопрос: {$quest}<br>Форма, с которой отправлено сообщение: {$form}";
    $mail->AltBody = "Пользователь оставил данные:\r\n Имя: {$name}\r\n Телефон: {$phone}<br> Email: {$email}\r\n Вопрос: {$quest}\r\nФорма, с которой отправлено сообщение: {$form}";

    $mail->send();
    echo '1';   
  } catch (Exception $e) {
    echo '0';
  }