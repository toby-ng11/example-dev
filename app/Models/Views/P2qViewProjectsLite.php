<?php

namespace App\Models\Views;

use Illuminate\Database\Eloquent\Model;

class P2qViewProjectsLite extends Model
{
    protected $table = 'p2q_view_projects_lite';

    protected $primaryKey = 'id';

    public $incrementing = false;

    public $timestamps = false;
}
