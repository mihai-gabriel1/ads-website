<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
    
        if(auth()->check()) {
            return $next($request);
        }

        if($request->expectsJson()) {
            return response()->json(['message' => 'asdasdad'], 500);
        }

        return redirect()->route('login');
    }
}
