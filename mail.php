<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(strip_tags(trim($_POST["name"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags(trim($_POST["phone"])));
    $service = htmlspecialchars(strip_tags(trim($_POST["service"])));
    $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        header("Location: contact.html?status=error");
        exit;
    }

    $to = "info@xpresspowdercoating.co.za";
    $subject = "New Quote Request from $name";

    $body = "New quote request received:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Service: $service\n";
    $body .= "Message:\n$message\n";

    $headers = "From: noreply@xpresspowdercoating.co.za\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: contact.html?status=sent");
    } else {
        header("Location: contact.html?status=error");
    }
    exit;
} else {
    header("Location: contact.html");
    exit;
}
?>