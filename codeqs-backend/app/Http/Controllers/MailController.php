<?php

namespace App\Http\Controllers;

use App\Mail\PaymentEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    function sendEmail()
    {
        $to="";
        $msg="";
        $subject="Payment verification";

        Mail::to($to)->send(new PaymentEmail($msg, $subject));
    }
}
