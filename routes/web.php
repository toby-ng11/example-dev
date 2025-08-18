<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Architect\ArchitectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MarketSegmentController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Quote\QuoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::controller(DashboardController::class)->group(function () {
        Route::prefix('dashboard')->group(function () {
            Route::name('dashboard.')->group(function () {
                Route::get('/home', 'home')->name('home');
                Route::get('/admin', 'admin')->name('admin');
                Route::get('/opportunity', 'opportunity')->name('opportunity');
                Route::get('/project', 'project')->name('project');
                Route::get('/architect', 'architect')->name('architect');
                Route::get('/quote', 'quote')->name('quote');
                Route::get('/approval', 'approval')->name('approval');
                Route::get('/quoted-items', 'quotedItem')->name('quotedItem');

                Route::prefix('/quoted-items')->group(function () {
                    Route::name('quotedItem.')->group(function () {
                        Route::get('/items', 'quotedItemTable')->name('items');
                    });
                });
            });
        });
    });



    Route::middleware('admin')->group(function () {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/projects', [AdminController::class, 'projects'])->name('admin.projects');

        Route::resources([
            'market-segments' => MarketSegmentController::class
        ]);

        Route::get('/check-exist/projects', [MarketSegmentController::class, 'checkIfProjectExists']);
    });

    Route::resource('projects', ProjectController::class);
    Route::resource('architects', ArchitectController::class);
    Route::resource('quotes', QuoteController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
