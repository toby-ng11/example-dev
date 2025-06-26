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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phys_address1')->nullable();
            $table->string('phys_address2')->nullable();
            $table->string('phys_city')->nullable();
            $table->string('phys_state')->nullable();
            $table->string('phys_postal_code')->nullable();
            $table->string('phys_country')->nullable();
            $table->string('central_phone_number')->nullable();
            $table->string('email_address')->nullable();
            $table->string('url')->nullable();
            $table->morphs('addressable');
            $table->string('created_by', 30);
            $table->string('updated_by', 30);
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
        Schema::dropIfExists('addresses');
    }
};
