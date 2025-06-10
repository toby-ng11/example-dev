<?php

namespace App\Models\Views;

use Illuminate\Database\Eloquent\Model;

class P21CustomersXAddressXContact extends Model
{
    protected $primaryKey = 'contact_id';

    public $incrementing = false;

    public $timestamps = false;

    protected $casts = [
        'customer_id' => 'integer',
        'contact_id' => 'integer',
    ];
}
