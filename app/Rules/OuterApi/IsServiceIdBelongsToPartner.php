<?php

namespace App\Rules\OuterApi;

use App\Models\BaseModel;
use App\Models\Price;
use App\Models\Service;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Carbon;

class IsServiceIdBelongsToPartner implements Rule
{
    protected int $partnerId;
    protected int $serviceType;
    protected string $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(int $partnerId, int $serviceType,  string $message = 'Такой service_id не найден')
    {
        $this->partnerId = $partnerId;
        $this->serviceType = $serviceType;
        $this->message = $message;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $service = Service::join(Price::getTableName(), Service::getTableName() . '.price_id', '=', Price::getTableName() . '.id')
            ->where([Price::getTableName() . '.parthner_id' => $this->partnerId, Service::getTableName() . '.id' => $value])->first();
        if (!$service) {
            return false;
        }
        if ($service->price_id !== $this->serviceType) {
            $this->message = 'Некорректный ServiceType услуги';
            return false;
        }
        $nowDate = Carbon::now();
        $startDate = Carbon::createFromFormat(config('main.datetime_format'), $service->price->start);
        $endDate = Carbon::createFromFormat(config('main.datetime_format'), $service->price->end);
        if ($nowDate->lt($startDate)) {
            $this->message = "Невозможно использовать данную услугу т.к. время действия прайса не наступило. Дата начала действия прайса: " . $startDate->format(config('main.datetime_format'));;
            return false;
        }
        if ($nowDate->gt($endDate)) {
            $this->message = "Невозможно использовать данную услугу т.к. время действия прайса закончилось. Дата окончания действия прайса: " . $endDate->format(config('main.datetime_format'));;
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
