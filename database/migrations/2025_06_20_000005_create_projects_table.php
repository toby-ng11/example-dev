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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_id_ext', 50)->nullable();
            $table->string('project_name', 255)->nullable();
            $table->string('project_address', 255)->nullable();
            $table->string('centura_location_id', 50)->nullable();
            $table->string('owner_id', 50)->nullable();
            $table->string('shared_id', 50)->nullable();
            $table->foreignId('status_id')->constrained();
            $table->string('reed', 50)->nullable();
            $table->foreignId('market_segment_id')->constrained();
            $table->foreignId('specifier_id')->constrained();
            $table->decimal('general_contractor_id', 19, 0)->nullable();
            $table->decimal('awarded_contractor_id', 19, 0)->nullable();
            $table->dateTime('require_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->string('last_maintained_by', 50)->nullable();
            $table->foreignId('architect_id')->constrained();
            $table->unsignedBigInteger('architect_address_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
