<?php

namespace App\Http\Controllers;

use App\Mail\PaymentEmail;
use App\Models\Workshop;
use App\Models\WorkshopPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Razorpay\Api\Api;

class WorkshopPaymentController extends Controller
{
    private $razorpayId;
    private $razorpayKey;

    public function __construct()
    {
        $this->razorpayId = config('services.razorpay.key');
        $this->razorpayKey = config('services.razorpay.secret');
    }


    public function createOrder(Request $request)
    {
        $validated = $request->validate([
            'workshopId' => 'required',
            'userId' => 'required',
            'amount' => 'required|numeric|min:1',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string',

        ]);

       
            $amountInPaise = $validated['amount'] * 100; // Convert amount to paise
            $api = new Api($this->razorpayId, $this->razorpayKey);

            $order = $api->order->create([
                'receipt' => 'receipt_' . time(), // Unique receipt ID
                'amount' => $amountInPaise,
                'currency' => 'INR',
                'payment_capture' => 1
            ]);



            DB::table('workshop_payments')->insert([
                'workshop_id' => $validated['workshopId'],
                'order_id' => $order['id'],
                'user_id' => $validated['userId'],
                'amount' => $validated['amount'], // Store in rupees
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'status' => 'pending', // Set status to "paid"
                'created_at' => now(),
                'updated_at' => now(),
            ]);

           $workshop = Workshop::find($validated['workshopId']);
           $workshop->update(['subscribe' => 'free']);

            return response()->json([
                'order_id' => $order['id'],
                'amount' => $amountInPaise,
                'user_id' => $validated['userId'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'status' => 'paid',
            ]);
       
    }

  
    public function verifyPayment(Request $request)
    {
       

     
          
            
        $validated = $request->validate([
            'razorpay_order_id' => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature' => 'required|string',
            'amount' => 'required|numeric',
            'userId' => 'required',
            'name' => 'required|string',
            'email' => 'required|email',
            'workshopId' => 'required',
            'phone' => 'required'
        ]);

       


            $api = new Api($this->razorpayId, $this->razorpayKey);
    
          
            $generatedSignature = hash_hmac(
                'sha256',
                $validated['razorpay_order_id'] . '|' . $validated['razorpay_payment_id'],
                $this->razorpayKey
            );


            $existingPayment = WorkshopPayment::where('order_id', $validated['razorpay_order_id'])->first();

            if ($existingPayment) {
                if (empty($existingPayment->payment_id)) { // If payment_id is missing, update it
                    // Log::info("Updating Missing Payment ID for Order: " . $validated['razorpay_order_id']);
                    $existingPayment->update([
                        'payment_id' => $validated['razorpay_payment_id'],
                        'status' => 'paid'
                    ]);
                    return response()->json(['status' => 'Payment updated successfully']);
                }
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Payment already recorded'
                ], 400);
            }

           
            
    
            if ($generatedSignature === $validated['razorpay_signature']) {
                WorkshopPayment::create([
                    'order_id' => $validated['razorpay_order_id'],
                    'payment_id' => $validated['razorpay_payment_id'],
                    'status' => 'paid',
                    'amount' => $validated['amount'],
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'],
                    'workshop_id' => $validated['workshopId'],
                    'user_id' => $validated['userId'],

                ]);
                
                
    
            // Send confirmation email
            $message = "Hello {$validated['name']},\n\nYour payment of ₹{$validated['amount']} was successful. Thank you for your purchase!\n\nOrder ID: {$validated['razorpay_order_id']}\n\nRegards,\nCODEQS Team";
            $subject = "Payment Successful - CODEQS";
    
            Mail::to($validated['email'])->send(new PaymentEmail($message, $subject));

            
    
            return response()->json(['status' => 'Payment verified successfully']);
            }



            
        
    }
    


    public function getPayments()
    {
        $payments = WorkshopPayment::with('workshop')->get();
        return response()->json($payments);
    }
}
