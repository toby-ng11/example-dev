<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained();
            $table->string('quote_id_ext', 50)->nullable();
            $table->foreignId('quote_type_id')->constrained();
            $table->unsignedBigInteger('contact_id');
            $table->timestamp('expire_date');
            $table->timestamp('ship_required_date');
            $table->timestamp('approve_date');
            $table->foreignId('lead_time_id')->constrained();
            $table->text('note')->nullable();
            $table->foreignId('status_id')->constrained();
            $table->string('po_no', 50)->nullable();
            $table->string('taker', 50)->nullable();
            $table->string('job_name', 40)->nullable();
            $table->string('price_approve_id', 50)->nullable();
            $table->string('submit_by', 50)->nullable();
            $table->string('approved_by', 50)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
