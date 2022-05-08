<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * App\Models\AdditionalProduct
 *
 * @property int $id
 * @property string $name
 * @property float $price
 * @property int $order_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdditionalProduct whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class AdditionalProduct extends BaseModel
{
    use LogsActivity;

    protected $casts = [
        'price' => 'float',
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['order_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logUnguarded()
            ->logOnlyDirty()
            ->setDescriptionForEvent(function ($eventName) {
                return match ($eventName) {
                    "updated" => "Редактирование доп.товара №{$this->id}",
                    "created" => "Создание доп.товара №{$this->id}",
                    "deleted" => "Удаление доп.товара №{$this->id}",
                    default => "Другое действие с доп.товаром №{$this->id}",
                };
            });
    }
}
