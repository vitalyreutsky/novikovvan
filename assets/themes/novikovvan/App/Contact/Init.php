<?php

namespace App\Contact;

final class Init
{
    public function __construct()
    {
        add_action('wp_ajax_send_feedback', [self::class, 'send_feedback_callback']);
        add_action('wp_ajax_nopriv_send_feedback', [self::class, 'send_feedback_callback']);
    }

    public static function send_feedback_callback()
    {
        $data = $_POST['data'];
        $data = json_decode(stripcslashes($data));
        if (!$data->name) die(json_encode(array('result' => false, 'name' => 'name')));
        if (!$data->email || !is_email($data->email)) die(json_encode(array('result' => false, 'name' => 'email')));

        $to = "vreutsky77@mail.ru";
        $subject = 'Заявка с сайта ' . $_SERVER['SERVER_NAME'];

        $message = '
	<h3>' . $subject . '</h3><br>
	Name: <b>' . $data->name . '</b><br>
	Email: <b>' . $data->email . '</b><br>
	Message: <b>' . $data->message . '</b><br>';
        $headers = array(
            "Content-type: text/html; charset=utf-8",
            "From: " . $_SERVER['SERVER_NAME'] . " <no-reply@" . $_SERVER['SERVER_NAME'] . ">",
            "Reply-To: " . $data->name . " <" . $data->email . ">"
        );

        $result = wp_mail($to, $subject, $message, $headers);

        if (!$result) die(json_encode(array('result' => $result, 'message' => 'There was an error. Please try again.')));

        die(json_encode(array('result' => $result, 'message' => 'Thank you, the letter has been sent.')));
    }
}
