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
            $table->string('created_by', 30);
            $table->string('updated_by', 30);
            $table->foreignId('status_id')->constrained();
            $table->string('reed', 50)->nullable();
            $table->foreignId('market_segment_id')->constrained();
            $table->foreignId('specifier_id')->nullable()->constrained();
            $table->decimal('general_contractor_id', 19, 0)->nullable();
            $table->decimal('awarded_contractor_id', 19, 0)->nullable();
            $table->dateTime('require_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->foreignId('architect_id')->nullable()->constrained();
            $table->foreignId('architect_address_id')->nullable()->constrained('addresses');
            $table->timestamps();
            $table->softDeletes();
            $table->integer('legacy_id')->nullable();
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
