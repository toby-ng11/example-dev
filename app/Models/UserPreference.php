<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = ['user_id', 'key', 'value'];

    protected $casts = [
        'value' => 'array',
    ];
}
