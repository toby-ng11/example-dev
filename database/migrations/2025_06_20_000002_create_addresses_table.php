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
            $table->string('phys_address1');
            $table->string('phys_address2');
            $table->string('phys_city');
            $table->string('phys_state');
            $table->string('phys_postal_code');
            $table->string('phys_country');
            $table->string('central_phone_number');
            $table->string('email_address');
            $table->string('url');
            $table->morphs('addressable');
            $table->timestamps();
            $table->softDeletes();
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
