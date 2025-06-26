<?php

namespace App\Models;

use App\Models\Views\P21Contact;
use App\Models\Views\P21User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quote extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'quote_id_ext',
        'type_id',
        'contact_id',
        'expire_date',
        'ship_required_date',
        'approve_date',
        'lead_time_id',
        'note',
        'status_id',
        'po_no',
        'taker',
        'job_name',
        'prive_approve_id',
        'submit_by',
        'approved_by',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(QuoteType::class);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(P21Contact::class, 'contact_id');
    }

    public function leadTime(): BelongsTo
    {
        return $this->belongsTo(LeadTime::class);
    }

    public function priceApproveBy(): BelongsTo
    {
        return $this->belongsTo(P21User::class, 'price_approve_id');
    }

    public function submitBy(): BelongsTo
    {
        return $this->belongsTo(P21User::class, 'submit_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(P21User::class, 'approved_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(QuoteItem::class, 'quote_id');
    }

}
