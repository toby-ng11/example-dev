<?php

namespace App\Http\Middleware;

use App\Models\UserPreference;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $theme = 'system';

        if (Auth::check()) {
            // Try DB-based preference
            $theme = UserPreference::where('user_id', $request->user()->id)
                ->where('key', 'appearance')
                ->value('value') ?? $request->cookie('appearance') ?? 'system';
        } else {
            // Fallback to cookie for guests
            $theme = $request->cookie('appearance') ?? 'system';
        }

        View::share('appearance', $theme);

        return $next($request);
    }
}
