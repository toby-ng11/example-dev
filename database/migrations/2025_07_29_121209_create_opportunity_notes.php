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
        Schema::create('opportunity_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('opportunity_id')->constrained()->onDelete('cascade');
            $table->text('title')->nullable();
            $table->text('content');
            $table->text('next_action')->nullable();
            $table->string('created_by', 30)->nullable();
            $table->string('updated_by', 30)->nullable();
            $table->timestamps();
            $table->timestamp('notified_at')->nullable();
            $table->boolean('is_notified')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunity_notes');
    }
};
