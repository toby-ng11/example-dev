<?php

namespace App\Http\Controllers;

use App\Models\RoleOverride;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoleOverrideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $roleOverrides = RoleOverride::all();
        return response()->json($roleOverrides->toArray());
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
    public function store(Request $request): RedirectResponse
    {
        if (RoleOverride::where('user_id', $request->user_id)->exists()) {
            return redirect()->back()->withErrors(['error' => 'User already exists in table.']);
        }

        $roleOverride = new RoleOverride();
        $roleOverride['user_id'] = $request->user_id;
        $roleOverride['override_role'] = $request->override_role;
        $roleOverride->save();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(RoleOverride $roleOverride)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoleOverride $roleOverride)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoleOverride $roleOverride)
    {
        $roleOverride->update($request->only('user_id', 'override_role'));
        return response()->json([
            'success' => true,
            'message' => 'Updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoleOverride $roleOverride): JsonResponse
    {
        $roleOverride->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
