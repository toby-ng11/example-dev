<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class P21User extends Model
{
    public $incrementing = false;

    public $timestamps = false;

    protected $primaryKey = 'project_id';

    protected $keyType = 'string';
}
