<?php

namespace App\Http\Controllers;

use App\Models\Architect;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ArchitectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $pattern = trim((string) ($request->get('pattern') ?? ''));
        $limit   = (int) ($request->get('limit') ?? 10);

        /** @var User $user */
        $user = $request->user();
        $p21User = $user->p21User;

        if (!$p21User) {
            return response()->json(['User must have P21 account to search.']);
        }

        if ($pattern === '' || mb_strlen($pattern) < 1) {
            return response()->json([]);
        }

        $query = Architect::query()->select(['id', 'architect_name', 'architect_rep_id', 'company_id', 'class_id']);

        if ($p21User->p2q_system_role !== 'admin' && $p21User->p2q_system_role !== 'manager') {
            $query->where('architect_rep_id', $p21User->id);
        }

        $results = $query->where('architect_name', 'LIKE', '%' . $request->get('pattern') . '%')
            ->orderBy('architect_name')
            ->limit($limit)
            ->get();

        return response()->json($results);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
