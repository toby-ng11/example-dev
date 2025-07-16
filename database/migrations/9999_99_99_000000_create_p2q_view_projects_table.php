<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //TODO: Put view query here
        DB::statement("
       CREATE VIEW p2q_view_projects AS
SELECT
    p.id,
    p.project_id_ext,
    p.project_name,
    p.project_address,
    p.centura_location_id,
    p.created_by,
    owner.email AS owner_email,
    p.shared_id,
    shared.email AS shared_email,
    p.status_id,
    s.status_desc,
    p.reed,
    p.market_segment_id,
    ms.market_segment_desc,
    p.specifier_id,
    CONCAT(sp.first_name, ' ', sp.last_name) AS specifier_name,
    sp.job_title AS specifier_job_title,
    p.general_contractor_id,
    p.awarded_contractor_id,
    p.require_date,
    p.due_date,
    p.last_maintained_by,
    p.architect_id,
    a.architect_name,
    p.architect_address_id,
    aa.phys_address1 AS architect_address_line1,
    aa.phys_city AS architect_city,
    aa.phys_state AS architect_state,
    aa.phys_postal_code AS architect_postal,
    aa.phys_country AS architect_country,
    p.created_at,
    p.updated_at,
    p.deleted_at
FROM projects p
LEFT JOIN statuses s ON s.id = p.status_id
LEFT JOIN market_segments ms ON ms.id = p.market_segment_id
LEFT JOIN specifiers sp ON sp.id = p.specifier_id
LEFT JOIN architects a ON a.id = p.architect_id
LEFT JOIN addresses aa ON aa.id = p.architect_address_id
LEFT JOIN users owner ON owner.username = p.created_by
LEFT JOIN users shared ON shared.username = p.shared_id
WHERE p.deleted_at IS NULL;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS p2q_view_projects");
    }
};
