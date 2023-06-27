<?php

use App\Http\Controllers\ExampleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/create-ad', [ExampleController::class, 'storeAd']);
Route::get('/get-ads', [ExampleController::class, 'getAds'])->middleware(['rolepermission']);
Route::delete('/remove-ad/{id}', [ExampleController::class, 'removeAd']);
