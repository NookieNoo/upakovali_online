<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\Contracts\Activity;

/**
 * App\Models\Gift
 *
 * @property int $id
 * @property int $order_id
 * @property int $service_id
 * @property string $weight
 * @property int $length
 * @property int $width
 * @property int $height
 * @property int $addressee_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Addressee $addressee
 * @property-read \App\Models\Service $service
 * @method static \Illuminate\Database\Eloquent\Builder|Gift newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Gift newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Gift query()
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereAddresseeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gift whereWidth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Activitylog\Models\Activity[] $activities
 * @property-read int|null $activities_count
 */
class Gift extends BaseModel
{
    use LogsActivity;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['order_id', 'addressee_id', 'service_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function addressee()
    {
        return $this->belongsTo(Addressee::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logUnguarded()
            ->logOnlyDirty()
            ->setDescriptionForEvent(function ($eventName) {
                return match ($eventName) {
                    "updated" => "Редактирование подарка №{$this->id}",
                    "created" => "Создание подарка №{$this->id}",
                    "deleted" => "Удаление подарка №{$this->id}",
                    default => "Другое действие с подарком №{$this->id}",
                };
            });
    }
}
