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
        Schema::create('project', function (Blueprint $table) {
            $table->id('project_id');
            $table->string('project_id_ext', 50)->nullable();
            $table->string('project_name', 255)->nullable();
            $table->string('project_address', 255)->nullable();
            $table->string('centura_location_id', 50)->nullable();
            $table->string('owner_id', 50)->nullable();
            $table->string('shared_id', 50)->nullable();
            $table->integer('status')->nullable();
            $table->string('reed', 50)->nullable();
            $table->integer('market_segment_id')->nullable();
            $table->integer('specifier_id')->nullable();
            $table->decimal('general_contractor_id', 19, 0)->nullable();
            $table->decimal('awarded_contractor_id', 19, 0)->nullable();
            $table->dateTime('require_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->string('last_maintained_by', 50)->nullable();
            $table->char('delete_flag', 1)->nullable();
            $table->integer('architect_id')->nullable();
            $table->integer('architect_address_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project');
    }
};
