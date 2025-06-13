<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    public function show(Request $request, string $key)
    {
        $pref = UserPreference::where('user_id', $request->user()->id)
            ->where('key', $key)
            ->first();

        return response()->json($pref?->value ?? []);
    }

    public function update(Request $request, string $key)
    {
        $pref = UserPreference::updateOrCreate(
            ['user_id' => $request->user()->id, 'key' => $key],
            ['value' => $request->input('value')]
        );

        return response()->json(['success' => true]);
    }
}
