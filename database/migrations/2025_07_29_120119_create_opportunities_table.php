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
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('opp_id_ext', 50)->nullable();
            $table->string('opp_name', 255)->nullable();
            $table->string('opp_address', 255)->nullable();
            $table->string('lead_source', 255)->nullable();
            $table->string('lead_source_id', 50)->nullable();
            $table->string('leed_certified_number', 50)->nullable();
            $table->string('centura_location_id', 50)->nullable();
            $table->decimal('project_value', 19, 2)->nullable();
            $table->text('project_description')->nullable();
            $table->text('project_link')->nullable();
            $table->string('project_owner', 255)->nullable();
            $table->boolean('sample_submitted')->default(false);
            $table->dateTime('start_date')->nullable();
            $table->dateTime('completion_date')->nullable();
            $table->dateTime('bid_date')->nullable();
            $table->foreignId('status_id')->constrained();
            $table->foreignId('market_segment_id')->constrained();
            $table->foreignId('specifier_id')->nullable()->constrained();
            $table->foreignId('architect_id')->nullable()->constrained();
            $table->foreignId('architect_address_id')->nullable()->constrained('addresses');
            $table->timestamps();
            $table->string('created_by', 30)->nullable();
            $table->string('updated_by', 30)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
