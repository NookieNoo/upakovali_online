<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Партнер ({{$partner->full_name}}) изменил статус заказа</title>
</head>
<body>
<h1>Партнер ({{$partner->full_name}}) изменил статус заказа</h1>
<p>Заказ №{{ $order->id }} переведен в статус: {{ $order->orderStatus->name }}</p>
</body>
</html>
