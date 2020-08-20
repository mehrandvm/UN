<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Systana</title>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="container">
                <div id="login" csrf_token='{{csrf_token()}}' auth_message='{{ $message ?? '' }}'></div>
            </div>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>