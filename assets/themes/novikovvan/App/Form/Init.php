<?php

namespace App\Form;

final class Init
{
    public function __construct()
    {
        add_action('wp_ajax_send_feedback', [self::class, 'send_feedback_callback']);
        add_action('wp_ajax_nopriv_send_feedback', [self::class, 'send_feedback_callback']);
    }

    public static function send_feedback_callback()
    {
        $data = json_decode(stripcslashes($_POST['data']));
        if (!$data->name) die(json_encode(array('result' => false, 'message' => 'Произошла ошибка. Попробуйте снова.')));
        if (!$data->email || !is_email($data->email)) die(json_encode(array('result' => false, 'message' => 'Произошла ошибка. Попробуйте снова.')));

        $to = "vreutsky77@mail.ru";
        $subject = 'Заявка с сайта ' . $_SERVER['SERVER_NAME'];
        $subjectSecond = 'У вас новое сообщение от  ' . $data->name . ' с вашего сайта';

        $message = '
	<h3>' . $subjectSecond . '</h3><br>
	Имя: <b>' . $data->name . '</b><br>
	Email: <b>' . $data->email . '</b><br>
	Сообщение: <b>' . $data->message . '</b><br>';
        $headers = array(
            "Content-type: text/html; charset=utf-8",
            "From: " . $_SERVER['SERVER_NAME'] . " <no-reply@" . $_SERVER['SERVER_NAME'] . ">",
            "Reply-To: " . $data->name . " <" . $data->email . ">"
        );

        $result = wp_mail($to, $subject, $message, $headers);

        if (!$result) {
            $return = array('result' => $result, 'message' => 'Произошла ошибка. Попробуйте снова.');
        } else {
            $return =  array('result' => $result, 'message' => 'Спасибо! Я свяжусь с вами в ближайшее время.');
        }

        wp_send_json($return);
    }
}
