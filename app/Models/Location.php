<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'P21_Location_x_Branch';

    protected $primaryKey = 'location_id';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'location_id' => 'integer',
    ];
}
