<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $usertype = Auth::user()->usertype;
            return view('dashboard', compact('usertype'));
        }
    }
    
    
}
