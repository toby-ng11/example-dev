<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\PreferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::get('preferences/{key}', [PreferenceController::class, 'show']);
    Route::post('preferences/{key}', [PreferenceController::class, 'update']);

    Route::apiResources([
        'branches' => LocationController::class,
    ]);
});
