<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Views\P21User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use LdapRecord\Laravel\Auth\HasLdapUser;
use LdapRecord\Laravel\Auth\LdapAuthenticatable;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;

use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements LdapAuthenticatable
{
    /**
     * @use HasFactory<\Database\Factories\UserFactory>
     * @use HasApiTokens<\Laravel\Sanctum\Contracts\HasAbilities>
     */
    use HasApiTokens, HasFactory, Notifiable, AuthenticatesWithLdap, HasLdapUser;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    #[\Override]
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function p21User(): HasOne
    {
        return $this->hasOne(P21User::class, 'id', 'username');
    }

    public function ownProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'owner_id', 'username');
    }

    public function sharedProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'shared_id', 'username');
    }

    public function lastMaintainedProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'last_maintained_by', 'username');
    }
}
