<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard/admin', function () {
        return Inertia::render('dashboard/admin');
    })->name('admin-dashboard');

    Route::get('dashboard/project', function () {
        return Inertia::render('dashboard/project');
    })->name('project-dashboard');

    Route::get('dashboard/architect', function () {
        return Inertia::render('dashboard/architect');
    })->name('architect-dashboard');

    Route::get('dashboard/quote', function () {
        return Inertia::render('dashboard/quote');
    })->name('quote-dashboard');

});
