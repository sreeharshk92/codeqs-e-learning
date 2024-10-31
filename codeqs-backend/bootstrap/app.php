<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Register the middleware here by passing an array or directly setting them.
        return [
            HandleCors::class,  // Register the CORS middleware globally
            // Other middleware can be added here
        ];
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
