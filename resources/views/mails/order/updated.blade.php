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
<table>
    <tr>
        <th>Название поля</th>
        <th>Было</th>
        <th>Стало</th>
    </tr>
</table>
@foreach($changedModels as $changedModel)
    @foreach($changedModel['new'] as $key => $value)
        <tr>
            <td>{{$key}}</td>
            <td>{{$changedModel['old'][$key]}}</td>
            <td>{{$value}}</td>
        </tr>
    @endforeach
@endforeach
</body>
</html>
