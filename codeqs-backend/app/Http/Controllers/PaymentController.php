<?php

namespace App\Http\Controllers;

use App\Mail\PaymentEmail;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    private $razorpayId;
    private $razorpayKey;

    public function __construct()
{
    $this->razorpayId = config('services.razorpay.key');
    $this->razorpayKey = config('services.razorpay.secret');
}

public function paymentsList()
{
    $payments = Payment::latest()->get();
    return response()->json($payments);

}

public function createOrder(Request $request)
{
    $validated = $request->validate([
        'amount' => 'required|numeric|min:1',
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'phone' => 'required|string|max:15',
    ]);

    try {
        $amountInPaise = $validated['amount'] * 100; // Convert amount to paise
        $api = new Api($this->razorpayId, $this->razorpayKey);

        $order = $api->order->create([
            'amount' => $amountInPaise,
            'currency' => 'INR',
            'payment_capture' => 1
        ]);

        return response()->json([
            'order_id' => $order['id'],
            'amount' => $amountInPaise,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone']
        ]);
    } catch (\Exception $e) {
        Log::error("Razorpay Error: {$e->getMessage()}");
        return response()->json(['error' => 'Unable to create order'], 500);
    }
}

public function verifyPayment(Request $request)
{
    $validated = $request->validate([
        'razorpay_order_id' => 'required|string',
        'razorpay_payment_id' => 'required|string',
        'razorpay_signature' => 'required|string',
        'amount' => 'required|numeric',
        'name' => 'required|string',
        'email' => 'required|email',
        'phone' => 'required|string',
        'course_name' => 'required|string',

    ]);

    try {
        $api = new Api($this->razorpayId, $this->razorpayKey);

        $generatedSignature = hash_hmac(
            'sha256',
            $validated['razorpay_order_id'] . '|' . $validated['razorpay_payment_id'],
            $this->razorpayKey
        );

        if ($generatedSignature === $validated['razorpay_signature']) {
            Payment::create([
                'order_id' => $validated['razorpay_order_id'],
                'payment_id' => $validated['razorpay_payment_id'],
                'status' => 'paid',
                'amount' => $validated['amount'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'course_name' => $validated['course_name'],

            ]);
            
            // Send email after payment is verified
            $message = "Hello {$validated['name']},\n\nYour payment of ₹{$validated['amount']} for the course '{$validated['course_name']}' was successful. Thank you for your purchase!\n\nOrder ID: {$validated['razorpay_order_id']}\n\nRegards,\nCODEQS Team";
            $subject = "Payment Successful - CODEQS";

            Mail::to($validated['email'])->send(new PaymentEmail($message, $subject));

            return response()->json(['status' => 'Payment verified successfully']);
        } else {
            Log::error("Signature mismatch. Payment verification failed.");
            return response()->json(['status' => 'Payment verification failed'], 400);
        }
    } catch (\Exception $e) {
        Log::error("Payment verification error: {$e->getMessage()}");
        return response()->json(['status' => 'Verification error'], 500);
    }
}

}
