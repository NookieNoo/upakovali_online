<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Успешно обновлен заказ</title>
</head>
<body>
<h1>Успешно обновлен заказ!</h1>
<a href="{{$link}}">
    <p>Заказ №{{ $order->id }}</p>
</a>
<p>Затронутые поля:</p>
@if($orderChanges->isNotEmpty())
    <table>
        <tr>
            <th>Название поля</th>
            <th>Было</th>
            <th>Стало</th>
        </tr>
        @foreach($orderChanges[0]->properties['attributes'] as $key => $value)
            <tr>
                <td>{{$key}}</td>
                <td>{{$orderChanges[0]->properties['old'][$key]}}</td>
                <td>{{$value}}</td>
            </tr>
        @endforeach
    </table>
@else
    <p>Нет изменений по заказу</p>
@endif

Подарки:
@if($giftChanges->isNotEmpty())
    @foreach($giftChanges as $giftChange)
        <p>{{$giftChange->description}}</p>
        @if($giftChange->event === 'deleted')
            @continue
        @endif
        <table>
            <tr>
                <th>Название поля</th>
                <th>Было</th>
                <th>Стало</th>
            </tr>
            @if($giftChange->event === 'created')
                @foreach($giftChange->properties['attributes'] as $key => $value)
                    <tr>
                        <td>{{$key}}</td>
                        <td>(Пусто)</td>
                        <td>{{$value}}</td>
                    </tr>
                @endforeach
            @elseif($giftChange->event === 'updated')
                @foreach($giftChange->properties['attributes'] as $key => $value)
                    <tr>
                        <td>{{$key}}</td>
                        <td>{{$giftChange->properties['old'][$key]}}</td>
                        <td>{{$value}}</td>
                    </tr>
                @endforeach
            @endif
        </table>
    @endforeach
@else
    <p>Нет изменений по подаркам</p>
@endif

{{--<table border="1">--}}
{{--    @if($additionalProductsChanges->isNotEmpty())--}}
{{--        @foreach($additionalProductsChanges['attributes'] as $key => $value)--}}
{{--            <tr>--}}
{{--                <td>{{$key}}</td>--}}
{{--                <td>{{$additionalProductsChanges[$loop->index]['old'][$key]}}</td>--}}
{{--                <td>{{$value}}</td>--}}
{{--            </tr>--}}
{{--        @endforeach--}}
{{--    @endif--}}
{{--</table>--}}
</body>
</html>
