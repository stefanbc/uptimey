<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Uptimey - Beautiful Server Uptime Monitor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="description" content="Monitor your Linux server through a simple web dashboard. Open source and free!">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link href='http://fonts.googleapis.com/css?family=Raleway:400,300' rel='stylesheet' type='text/css'>
        <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="css/normalize.css" rel="stylesheet" type="text/css">
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <!--[if lt IE 9]>
          <script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    <body>
        <div class="container">
            <div class="quote"></div>
            <div class="notice">
                <h1><span class="fa fa-clock-o"></span>Your server's uptime until now...</h1>
                <section class="uptime"></section>
            </div>
        </div>
		<footer id="copy"></footer>
		<!-- Javascript-->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="script/base.js" type="text/javascript"></script>
    </body>
</html>