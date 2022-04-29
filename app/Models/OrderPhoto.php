<?php

namespace App\Models;

/**
 * App\Models\OrderPhoto
 *
 * @property int $id
 * @property string $path
 * @property int $order_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\OrderPhotoFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderPhoto whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class OrderPhoto extends BaseModel
{

    public function toArray()
    {
        return [
            'id' => $this->id,
            'abs_path' => asset($this->path),
            'src' => asset($this->path),
            'rel_path' => $this->path,
        ];
    }
}
