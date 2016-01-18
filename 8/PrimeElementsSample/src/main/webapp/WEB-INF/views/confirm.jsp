<%@page contentType="text/html" pageEncoding="UTF-8" language="java"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Confirm Page</title>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>        
        <script type="text/javascript" src="../../shop/development/x-tag-core.min.js"></script>
        <script type="text/javascript" src="../../shop/development/primeui-3.0.0-min.js"></script>
        <script type="text/javascript" src="../../shop/development/primeelements-3.0.0.js"></script>

        <link type="text/css" href="../../Register/development/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>        
        <link type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">
        <link type="text/css" href="../../shop/development/primeui-3.0.0-min.css" rel="stylesheet">
        <link type="text/css" href="../../shop/development/themes/cruze/theme.css" rel="stylesheet"/>
        <style type="text/css">
            .ui-widget {
                font-family: Rockwell, 'Courier Bold', Courier, Georgia, Times, 'Times New Roman', serif;
                font-size: 12px;
                font-style: normal;
                font-variant: normal;
                font-weight: 400;
                line-height: 20px;                
            }           
        </style>
    </head>
    <body>
        <h1>Thank you for registering!</h1>        
    <p-panel title="Registration details" toggleable>
        Name: ${register.name}<br/>
        Password: ${register.security}<br/>
        Country: ${register.country}<br/>
        Card: ${register.card}<br/>
        Order: ${register.order}
    </p-panel>
</body>
</html>
