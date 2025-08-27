<?php

namespace App\Http\Controllers;

use App\Models\MarketSegment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarketSegmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $marketSegments = MarketSegment::orderBy('market_segment_desc')->get();
        return response()->json($marketSegments->toArray());
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
    public function store(Request $request): JsonResponse
    {
        $segment = new MarketSegment;
        $segment->market_segment_desc = $request->market_segment_desc;
        $segment->save();
        return response()->json($segment);
    }

    /**
     * Display the specified resource.
     */
    public function show(MarketSegment $marketSegment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MarketSegment $marketSegment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MarketSegment $marketSegment): JsonResponse
    {
        $marketSegment->update($request->only('market_segment_desc'));
        return response()->json([
            'sucess' => true,
            'message' => 'Updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MarketSegment $marketSegment): JsonResponse
    {
        $exists = $marketSegment->projects()->exists();
        if ($exists) {
            return response()->json([
                'exists' => $exists,
            ]);
        }

        $marketSegment->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
