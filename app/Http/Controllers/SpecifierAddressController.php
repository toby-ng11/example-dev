<?php

namespace App\Http\Controllers;

use App\Models\Specifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SpecifierAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Specifier $specifier): JsonResponse
    {
        $address = $specifier->address()->get();
        return response()->json($address->toArray());
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
    public function show(Specifier $specifier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Specifier $specifier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Specifier $specifier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specifier $specifier)
    {
        //
    }
}
