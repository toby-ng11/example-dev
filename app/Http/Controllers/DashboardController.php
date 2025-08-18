<?php

namespace App\Http\Controllers;

use App\Models\Views\P2qViewQuoteItemsFull;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('dashboard/home');
    }

    public function admin(): Response
    {
        return Inertia::render('dashboard/admin');
    }

    public function opportunity(): Response
    {
        return Inertia::render('dashboard/opportunity');
    }

    public function project(): Response
    {
        return Inertia::render('dashboard/project');
    }

    public function architect(): Response
    {
        return Inertia::render('dashboard/architect');
    }

    public function quote(): Response
    {
        return Inertia::render('dashboard/quote');
    }

    public function approval(): Response
    {
        return Inertia::render('dashboard/approval');
    }

    public function quotedItem(): Response
    {
        return Inertia::render('dashboard/quoted-item');
    }

    public function quotedItemTable(): JsonResponse {
        $marketSegments = P2qViewQuoteItemsFull::all();

        return response()->json($marketSegments->toArray());
    }
}
