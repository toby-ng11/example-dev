<?php

namespace App\Providers;

use App\Models\MarketSegment;
use App\Models\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict();

        Inertia::share('userRole', function () {
            $user = Auth::user();
            return $user?->p21User?->p2q_system_role ?? null;
        });

        Inertia::share([
            'projectStatus' => Status::select('id', 'status_desc')->orderBy('status_desc')->get(),
            'marketSegment' => MarketSegment::select('id', 'market_segment_desc')->orderBy('market_segment_desc')->get(),
        ]);
    }
}
