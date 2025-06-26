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
        Schema::create('quote_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_code', 40);
            $table->foreignId('quote_id')->constrained()->onDelete('cascade');
            $table->decimal('quantity', 18, 0);
            $table->decimal('unit_price', 19, 2);
            $table->string('unit_of_measure', 8);
            $table->decimal('total_price', 19, 2);
            $table->string('note', 255)->nullable();
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
        Schema::dropIfExists('quote_items');
    }
};
