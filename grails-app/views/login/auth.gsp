<!DOCTYPE html><!--[if IE 7]><html class="ie lt-ie9 lt-ie8"><![endif]--><!--[if IE 8]><html class="ie lt-ie9"><![endif]--><!--[if IE 9]><html class="ie"><![endif]--><!--[if (gte IE 9)|!(IE)]<!-->
<html>
<!--<![endif]-->
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-type" />
    <title>OlaMagic | Login</title>
    <asset:stylesheet src="purple.css"/>
    <asset:javascript src="purple.js"/>
    <asset:javascript src="modernizr.min.js"/>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
</head>
<body>
<div class="page-wrap gradient-primary">
    <div class="container">
        <h1 class="logo"><a href="https://www.olamagic.com" title="OlaMagic">OlaMagic</a></h1>
        <div class="content">
            <div class="panel" id="login">
                <h3>Log in to your account</h3>
                <form action="${postUrl}" method="post" role="form" id="loginForm">
                    <div class="form-group">
                        <label for="uid">Email address</label>
                        <div class="input-icon icon-username"></div>
                        <input autofocus class="form-control" id="uid" name="j_username" placeholder="Email address" tabindex="1" type="email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-icon icon-password"></div>
                        <input autocomplete="off" class="form-control password" id="password" name="j_password" placeholder="Password" tabindex="2" type="password" />
                    </div>
                    <button class="btn btn-primary btn-lg btn-block" name="commit" tabindex="3" type="submit" value="Log In">Log In</button>
                </form>
                <a class="panel-footer" href="/signup/login">New to OlaMagic? &nbsp;<span>Sign Up</span></a></div>
            <a href="/account/password/reset">Forgot your password?</a></div>
    </div>
</div>
</body>
</html>
