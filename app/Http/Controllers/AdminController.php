<?php

namespace App\Http\Controllers;

use App\Models\Views\P2qViewProject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard');
    }

    public function projects()
    {
        $projects = P2qViewProject::select([
            'id',
            'project_id_ext',
            'project_name',
            'created_by',
            'shared_id',
            'created_at',
            'due_date',
            'architect_name',
            'market_segment_desc',
            'status_desc',
        ])
            ->orderByDesc('id')
            ->get();

        return response()->json($projects->toArray());
    }
}
