<?php

namespace App\Models;

use App\Models\Views\P21User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RoleOverride extends Model
{
    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'user_id';

    protected $keyType = 'string';

    protected $fillable = [
        'override_role',
    ];

    public function P21User(): HasOne
    {
        return $this->hasOne(P21User::class, 'id', 'user_id');
    }
}
