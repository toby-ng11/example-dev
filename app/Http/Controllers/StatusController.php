<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Status::query();

        if ($request->has('type')) {
            $query->where($request->get('type') . '_flag', 'Y');
        }

        $statuses = $query->orderBy('status_desc')->get();

        return response()->json($statuses);
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
        $status = new Status();
        $status['status_desc'] = $request->status_desc;
        $status['project_flag'] = $request->project_flag;
        $status['quote_flag'] = $request->quote_flag;
        $status->save();

        return redirect()->back()->with('success', 'Added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $status)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Status $status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Status $status): JsonResponse
    {
        if ($request->project_flag === 'N' && $status->projects()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update. There are projects still having this status.'
            ]);
        }

        if ($request->quote_flag === 'N' && $status->quotes()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update. There are quotes still having this status.'
            ]);
        }

        $status->update($request->only('status_desc', 'project_flag', 'quote_flag'));
        return response()->json([
            'success' => true,
            'message' => 'Updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Status $status): JsonResponse
    {
        $exists = $status->projects()->exists() || $status->quotes()->exists();
        if ($exists) {
            return response()->json([
                'exists' => $exists,
            ]);
        }

        $status->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
