<?php

namespace App\Models\Views;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $name
 * @property string|null $default_company
 * @property string|null $default_location_id
 * @property string|null $default_branch
 * @property int $role_uid
 * @property string|null $email_address
 * @property string $delete_flag
 * @property string|null $role
 * @property string|null $branch_description
 * @property string $first_name
 * @property string $last_name
 * @property string|null $p2q_system_role
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereBranchDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereDefaultBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereDefaultCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereDefaultLocationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereDeleteFlag($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereEmailAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereP2qSystemRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|P21User whereRoleUid($value)
 * @mixin \Eloquent
 */
class P21User extends Model
{
    public $incrementing = false;

    public $timestamps = false;

    protected $keyType = 'string';
}
