<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Grails"/></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${assetPath(src: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png')}">
  		<asset:stylesheet src="application.css"/>
		<asset:javascript src="application.js"/>
		<g:layoutHead/>
	</head>
	<body>
		<div id="grailsLogo" role="banner"><a href="http://grails.org"><asset:image src="grails_logo.png" alt="Grails"/></a></div>
		<g:layoutBody/>
		<div class="footer" role="contentinfo"></div>
		<div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/></div>
	</body>
</html>

<%@ page import="com.olamagic.Number" %>
<!DOCTYPE html>
<html><head>

    <title>Admin · Access | OlaMagic</title>
    <link rel="stylesheet" href="https://d1ic07fwm32hlr.cloudfront.net/assets/vendor-a2dcd6f4ae83c80bafad276f475492e0.css">
    <link rel="stylesheet" href="https://d1ic07fwm32hlr.cloudfront.net/assets/app-4024e909698d4167b58d47492b43d6aa.css">
    <meta name="app/config/environment" content="{&quot;modulePrefix&quot;:&quot;app&quot;,&quot;environment&quot;:&quot;production&quot;,&quot;baseURL&quot;:&quot;/&quot;,&quot;locationType&quot;:&quot;auto&quot;,&quot;EmberENV&quot;:{&quot;FEATURES&quot;:{}},&quot;APP&quot;:{}}">
    <meta name="debugger" content="false">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Heroku">
    <meta name="csrf" content="gMcFKcQF-F6BQ-trSPfJPMCzlVaIKazaXfF8">
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-touch-icon-152x152.png">

<body class="ember-application">
<asset:javascript src="vendor.js"/>
<asset:javascript src="dashboard.js"/>


<div class="ember-view dashboard-wrapper protected-app-access" id="ember542"><div class="app-wrapper ">
    <div class="ember-view alert alert-danger text-center offline-status" id="ember584"><p>There's a problem connecting…
        <button data-ember-action="608" class="btn btn-link">Refresh</button></p></div>
    <div class="ember-view flash-messages" id="ember595"></div>
    <div class="ember-view sidebar scrollable-container" id="ember619">
        <div class="sidebar-wrapper" id="sidebar">
            <div class="ember-view" id="ember669">
                <div class="sidebar-container property-switcher fixed-top allow-if-delinquent">
                    <a href="/" class="ember-view" id="ember673">      <i class="icon icon-logo dashboard-logo"></i>
                        <h4 class="dashboard-logo-text">Admin panel</h4>
                    </a>
                </div>

                <div class="account allow-if-delinquent">
                    <div class="sidebar-container">
                        <div class="sidebar-user-section media dropdown">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="avatar">
                                    <img src="https://gravatar.com/avatar/f94a08169caa7c95ee3f22c897854051?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fninja-avatar-48x48.png" class="ember-view gravatar-icon" id="ember700" height="32px" width="32px">
                                    <div class="notification-badge "></div>
                                </span>
                                <div class="media-body sidebar-user-email">
                                    <h5 class="media-heading">cmeisters@gmail.com <i class="icon icon-caret"></i></h5>
                                </div>
                            </a>
                            <ul class="dropdown-menu user-menu list-group">
                                <li>
                                    <a href="/logout" class="ember-view" id="ember704">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="sidebar-container scrollable-content">


                </div>

            </div>
        </div>

    </div>

    <div style="transition: all 0.3s ease 0s;" class="main-panel scrollable-container container-fluid snap-main-panel">


        <div data-test-target="sms-nag-banner" style="display:none;" class="ember-view sms-nag-banner" id="ember637"><div class="global-notification is-warning">
            <p class="pull-left">
                <i class="icon icon-2fa-sms"></i>
                We recommend you add a backup phone number for account recovery purposes.
            </p>

            <div class="notification-actions pull-right">
                <button data-ember-action="780" class="btn btn-default btn-warning btn-xs notification-hide">
                    Skip
                </button>

                <button data-ember-action="781" class="btn btn-warning btn-xs notification-action">
                    Add Phone Number
                </button>
            </div>
        </div>
        </div>

        <div class="top-nav">
            <a data-ember-action="647" class="sidebar-toggle visible-sm visible-xs">
                <i class="icon-hamburger icon"></i>
            </a>

            <div class="section-content ">
                <div class="app-header flex-grow-1 flex">

                    <div class="app-name-container flex-grow-1">
                        <span class="app-name">OlaMagic</span>
                    </div>

                    <div class="btn-group actions-button">

                    </div>
                </div>

            </div>


        </div>

        <div class="main-content">

            <div class="ember-view nav nav-tabs sub-nav app-nav" id="ember851">


                <div class="ember-view sub-nav-item" id="ember860"><a href="numbers" class="ember-view ${params.controller == 'number'?'active':''}" id="ember861">  <i class="icon icon-sub-nav-resources"></i>
                    <span>Numbers</span>
                </a></div>



                <div class="ember-view sub-nav-item" id="ember977"><a href="users" class="ember-view ${params.controller == 'user'?'active':''}" id="ember978">  <i class="icon icon-sub-nav-access-active"></i>
                    <span>Access</span>
                </a></div>

            </div>

            <g:layoutBody/>

        </div>


    </div>

</div>


</div></body></html>