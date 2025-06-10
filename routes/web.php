<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Architect\ArchitectController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Quote\QuoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware('admin')->group(function () {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    });

    Route::resource('projects', ProjectController::class);
    Route::resource('architects', ArchitectController::class);
    Route::resource('quotes', QuoteController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
