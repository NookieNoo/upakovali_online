<?php

namespace App\Policies;

use App\Models\Parthner;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParthnerPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->isAdmin() || $user->isManager() || $user->isMaster();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Parthner  $parthner
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Parthner $parthner)
    {
        return $user->isAdmin() || $user->isManager();
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Parthner  $parthner
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Parthner $parthner)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Parthner  $parthner
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Parthner $parthner)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Parthner  $parthner
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Parthner $parthner)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Parthner  $parthner
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Parthner $parthner)
    {
        //
    }
}
