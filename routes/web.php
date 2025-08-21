<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Architect\ArchitectController;
use App\Http\Controllers\MarketSegmentController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Quote\QuoteController;
use App\Http\Controllers\RoleOverrideController;
use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::middleware('admin')->group(function () {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/projects', [AdminController::class, 'projects'])->name('admin.projects');

        Route::resources([
            'market-segments' => MarketSegmentController::class,
            'statuses' => StatusController::class,
            'role-overrides' => RoleOverrideController::class,
        ]);
    });

    Route::resource('projects', ProjectController::class);
    Route::resource('architects', ArchitectController::class);
    Route::resource('quotes', QuoteController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/dashboards.php';
