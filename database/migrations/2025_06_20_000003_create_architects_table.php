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
        Schema::create('architects', function (Blueprint $table) {
            $table->id();
            $table->string('architect_name');
            $table->string('architect_rep_id', 30);
            $table->string('company_id', 10);
            $table->foreignId('architect_type_id')->constrained();
            $table->string('class_id', 5)->nullable();
            $table->integer('legacy_id')->nullable();
            $table->string('created_by', 30);
            $table->string('updated_by', 30);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('architects');
    }
};
