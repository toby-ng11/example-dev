<?php

namespace App\Http\Controllers;

use App\Models\Views\P21User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $pattern = trim((string) ($request->get('pattern') ?? ''));
        $limit   = (int) ($request->get('limit') ?? 10);

        if ($pattern === '' || mb_strlen($pattern) < 1) {
            return response()->json([]);
        }

        $query = P21User::query();


        $results = $query->select(['id', 'name', 'p2q_system_role'])
            ->where('id', 'LIKE', '%' . $request->get('pattern') . '%')
            ->orWhere('name', 'LIKE', '%' . $request->get('pattern') . '%')
            ->orderBy('id')
            ->limit($limit)
            ->get();

        return response()->json($results);
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
    public function show(P21User $p21User)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, P21User $p21User)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(P21User $p21User)
    {
        //
    }
}
