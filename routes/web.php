<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArchitectAddressController;
use App\Http\Controllers\ArchitectController;
use App\Http\Controllers\ArchitectSpecifierController;
use App\Http\Controllers\MarketSegmentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\RoleOverrideController;
use App\Http\Controllers\SpecifierAddressController;
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

    Route::resources([
        'projects' => ProjectController::class,
        'architects' => ArchitectController::class,
        'quotes' => QuoteController::class
    ]);

    Route::resource('architects.addresses', ArchitectAddressController::class);
    Route::resource('architects.specifiers', ArchitectSpecifierController::class);
    Route::resource('specifiers.address', SpecifierAddressController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/dashboards.php';
