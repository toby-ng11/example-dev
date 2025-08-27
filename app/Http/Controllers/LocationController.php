<?php

namespace App\Http\Controllers;

use App\Models\Views\P21LocationxBranch;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = P21LocationxBranch::query();

        if ($request->has('type')) {
            if ($request->get('type') === 'companies') {
                $result = $query->select(['company_id', 'company_name'])
                    ->distinct()
                    ->orderBy('company_id')
                    ->get();
                return response()->json($result);
            }
        }

        $result = $query->orderBy('location_id')->get();

        return response()->json($result);
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
    public function show(P21LocationxBranch $p21LocationxBranch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, P21LocationxBranch $p21LocationxBranch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(P21LocationxBranch $p21LocationxBranch)
    {
        //
    }
}
