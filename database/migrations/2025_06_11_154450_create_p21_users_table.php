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
        Schema::create('p21_users', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('name', 40);
            $table->string('default_company', 8)->nullable();
            $table->decimal('default_location_id', 19, 0)->nullable();
            $table->string('default_branch', 8)->nullable();
            $table->integer('role_uid');
            $table->string('email_address', 255)->nullable();
            $table->char('delete_flag', 1);
            $table->string('role', 128);
            $table->string('branch_description', 40)->nullable();
            $table->string('first_name', 20);
            $table->string('last_name', 24);
            $table->string('p2q_system_role', 20)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p21_users');
    }
};
