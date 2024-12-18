<?php
require 'vendor/autoload.php';

use Razorpay\Api\Api;

$api = new Api('rzp_test_ruOiF1gDsqblik', 'juKG5FB5gK8QKV9NTL0kQPmx');

try {
    $order = $api->order->create([
        'amount' => 100, // Test with 1 INR in paise
        'currency' => 'INR',
        'payment_capture' => 1,
    ]);

    echo 'Order created successfully: ' . $order->id;
} catch (\Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
