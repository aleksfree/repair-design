<?php

  $name = $_POST['name'] ?? '';
  $phone = $_POST['phone'] ?? '';
  $email = $_POST['email'] ?? 'Не указан';
  $quest = $_POST['quest'] ?? 'Не указан';

  require 'phpmailer/Exception.php';
  require 'phpmailer/PHPMailer.php';
  require 'phpmailer/SMTP.php';

  $mail = new PHPMailer\PHPMailer\PHPMailer(true);

  try {
      //Server settings
      $mail->SMTPDebug = 0;                      // Enable verbose debug output
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'roshhaleksej@gmail.com';                     // SMTP username
      $mail->Password   = 'dkw9lKaC9UO139pYdeCX';                               // SMTP password
      $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
      $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

      //Recipients
      $mail->setFrom('roshhaleksej@gmail.com', 'Алексей');
      $mail->addAddress('roshh-aleksej2009@yandex.ru');     // Add a recipient
      
      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Новое сообщение с сайта';
      $mail->Body    = "Пользователь оставил данные:<br> Имя: {$name}<br> Телефон: {$phone}<br> Email: {$email}<br> Вопрос: {$quest}";

      $mail->send();
        header('Location: success.html');
        exit;
      } catch (Exception $e) {
          echo "Сообщение не отправлено. Код ошибки: {$mail->ErrorInfo}";
      }