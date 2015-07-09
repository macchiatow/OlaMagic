<html><head>


    <title>olamagic · Resources | Heroku</title>

    <link rel="stylesheet" href="https://d1ic07fwm32hlr.cloudfront.net/assets/vendor-1a910d405448ffb460488efb31563600.css">
    <link rel="stylesheet" href="https://d1ic07fwm32hlr.cloudfront.net/assets/app-c1ff7d1b783dd67d22354e0fa5c82c2d.css">

    <meta name="app/config/environment" content="{&quot;modulePrefix&quot;:&quot;app&quot;,&quot;environment&quot;:&quot;production&quot;,&quot;baseURL&quot;:&quot;/&quot;,&quot;locationType&quot;:&quot;auto&quot;,&quot;EmberENV&quot;:{&quot;FEATURES&quot;:{}},&quot;APP&quot;:{}}">

    <meta name="debugger" content="false">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Heroku">
    <meta name="csrf" content="XPIkUYet-Q6_RUaWYZSpM77kLEtUdEuRK9DQ">
    <link href="https://d1ic07fwm32hlr.cloudfront.net/images/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="/images/static/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/images/static/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/images/static/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/static/apple-touch-icon-152x152.png">

<body class="ember-application">


<script src="https://d1ic07fwm32hlr.cloudfront.net/assets/vendor-689036e16f221dcd9fef86d0a2103f92.js"></script>
<script src="https://d1ic07fwm32hlr.cloudfront.net/assets/dashboard-6257ad31e1347e0e14bd56f7271555f2.js"></script>

<div id="ember391" class="ember-view dashboard-wrapper protected-app-resources"><div class="app-wrapper ">
    <div id="ember427" class="ember-view alert alert-danger text-center offline-status"><p>There's a problem connecting…
        <button class="btn btn-link" data-ember-action="458">Refresh</button></p></div>
    <div id="ember438" class="ember-view flash-messages"></div>
    <div id="ember566" class="ember-view sidebar scrollable-container">
        <div id="sidebar" class="sidebar-wrapper">
            <div id="ember617" class="ember-view">
                <div class="sidebar-container property-switcher fixed-top allow-if-delinquent">
                    <a id="ember621" class="ember-view" href="/">      <i class="icon icon-logo dashboard-logo"></i>
                        <h4 class="dashboard-logo-text">Dashboard</h4>
                    </a>
                    <div id="ember630" class="ember-view navigator-toggle icon icon-navigator-toggle"></div>
                    <div id="property-navigator" class="dropdown-menu">

                        <ul>
                            <li class="active">
                                <a href="/">
                                    <i class="icon icon-property-dashboard-active"></i>
                                    <span class="icon-label">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://postgres.heroku.com/databases">
                                    <i class="icon icon-property-databases"></i>
                                    <span class="icon-label">Databases</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://dataclips.heroku.com/">
                                    <i class="icon icon-property-dataclips"></i>
                                    <span class="icon-label">Dataclips</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://elements.heroku.com/addons">
                                    <i class="icon icon-property-addons"></i>
                                    <span class="icon-label">Add-ons</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://devcenter.heroku.com">
                                    <i class="icon icon-property-docs"></i>
                                    <span class="icon-label">Docs</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://help.heroku.com">
                                    <i class="icon icon-property-support"></i>
                                    <span class="icon-label">Support</span>
                                </a>
                            </li>
                        </ul>

                    </div>


                </div>

                <div class="account allow-if-delinquent">
                    <div class="sidebar-container">
                        <div class="sidebar-user-section media dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <span class="avatar">
                                    <img id="ember653" class="ember-view gravatar-icon" src="https://gravatar.com/avatar/f94a08169caa7c95ee3f22c897854051?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" height="32px" width="32px"></img>
                                    <div class="notification-badge "></div>
                                </span>
                                <div class="media-body sidebar-user-email">
                                    <h5 class="media-heading">cmeisters@gmail.com <i class="icon icon-caret"></i></h5>
                                </div>
                            </a>
                            <ul class="dropdown-menu user-menu list-group">
                                <li><a id="ember655" class="ember-view" href="/notifications">View Notifications</a></li>
                                <li><a id="ember656" class="ember-view" href="/account">Manage Account</a></li>


                                <li role="presentation" class="divider"></li>
                                <li>
                                    <a id="ember657" class="ember-view" href="/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="sidebar-container scrollable-content">
                    <div class="shortcuts">
                        <h6>Favorites</h6>

                        <div class="well text-center empty">
                            <small><i class="icon icon-favorite-placeholder"></i>Favorite any app to pin it here in the sidebar</small>
                        </div>

                    </div>

                    <div class="personal-apps">
                        <ul class="sidebar-nav">
                            <li class="group-menu-item active">
                                <a id="ember667" class="ember-view sidebar-nav-heading org" href="/apps">
                                    <i class="icon icon-personal-apps"></i>
                                    Personal Apps
                                </a>
                            </li>
                            <li class="group-menu-item">
                                <a id="ember668" class="ember-view sidebar-nav-heading" href="/apps">
                                    <i class="icon icon-personal-apps"></i>
                                    PАBX
                                </a>
                            </li>
                            <li class="group-menu-item">
                                <a id="ember669" class="ember-view sidebar-nav-heading" href="/apps">
                                    <i class="icon icon-personal-apps"></i>
                                    Analytics
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div class="broadcast-area fixed-bottom allow-if-delinquent">
                    <div class="broadcast">
                        <i class="broadcast-icon icon icon-announcement"></i>
                        <div class="broadcast-content">
                            <h6>
                                Latest from the Blog
                            </h6>
                            <p>
                                <a target="_blank" href="http://blog.heroku.com/archives/2015/7/7/go_support_now_official_on_heroku">
                                    Go support now official on Heroku
                                </a>
                            </p>
                        </div>
                        <a class="broadcast-dismiss" href="javascript:void(0)" data-ember-action="724">
                            <i class="icon icon-close"></i>
                        </a>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <div class="main-panel scrollable-container container-fluid snap-main-panel">


        <div id="ember584" class="ember-view sms-nag-banner" style="display:none;" data-test-target="sms-nag-banner"><div class="global-notification is-warning">
            <p class="pull-left">
                <i class="icon icon-2fa-sms"></i>
                We recommend you add a backup phone number for account recovery purposes.
            </p>

            <div class="notification-actions pull-right">
                <button class="btn btn-default btn-warning btn-xs notification-hide" data-ember-action="725">
                    Skip
                </button>

                <button class="btn btn-warning btn-xs notification-action" data-ember-action="726">
                    Add Phone Number
                </button>
            </div>
        </div>
        </div>

        <div class="top-nav">
            <a class="sidebar-toggle visible-sm visible-xs" data-ember-action="594">
                <i class="icon-hamburger icon"></i>
            </a>

            <div class="section-content ">
                <div class="app-header flex-grow-1 flex">
                    <a id="ember957" class="ember-view back-link" href="/apps">      <i class="icon icon-back"></i>
                        <span class="back-context">
                            Apps
                        </span>

                    </a>
                    <div class="app-name-container flex-grow-1">
                        <span class="app-name">olamagic</span>
                        <i id="ember958" class="ember-view icon favorite-item icon-favorite off"></i>
                    </div>

                    <div class="btn-group actions-button">
                        <button type="button" class="btn btn-link btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <i class="icon icon-actions"></i>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li id="ember967" class="ember-view production-check-toggle"><a href="javascript:void(0);" data-ember-action="977">
                                <span class="prod-context">Production</span> check
                            </a>
                            </li>
                            <li id="ember976" class="ember-view"><a href="javascript:void(0)" data-ember-action="978">Restart all dynos</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a title="Open Application" target="_blank" href="https://olamagic.herokuapp.com/">
                                    Open app
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>


        </div>

        <div class="main-content">

            <div id="ember988" class="ember-view nav nav-tabs sub-nav app-nav">
                <div id="ember997" class="ember-view sub-nav-item"><a id="ember998" class="ember-view active" href="/apps/olamagic/resources">  <i class="icon icon-sub-nav-resources-active"></i>
                    <span>My Numbers</span>
                </a></div>

            </div>
            <div class="formation-section ">
                <div id="ember4320" class="ember-view sticky-header">    <div class="group-header">
                    <h5>
                        <span class="dyno-tier-name">
                            hobby
                        </span>
                        dynos
                    </h5>

                    <div class="group-header-items hidden-sm hidden-xs">
                    </div>

                    <div id="ember4324" class="ember-view pull-right edit-dynos">  <button type="button" data-ember-action="4325" class="btn btn-sm btn-default edit-button edit-button">
                        Edit
                    </button>
                    </div>
                </div>


                    <hr class="no-margin">

                    <ul class="list-group formation-list">
                        <li class="list-group-item formation-item form-inline use-toggle">

                            <div class="row">
                                <div class="col-md-8 col-sm-8 col-xs-7">
                                    <p>web
                                        <code title="java $JAVA_OPTS -jar server/webapp-runner.jar --port $PORT target/*.war">
                                            java $JAVA_OPTS -jar server/webapp-runner.jar --port $PORT target/*.war
                                        </code>
                                    </p>
                                </div>
                                <div class="col-md-3 col-sm-3 col-xs-3">
                                    <div class="pull-right">
                                        <div id="ember4329" class="ember-view toggle-switch disabled"><input class="cmn-toggle cmn-toggle-round-flat" type="checkbox" id="checker-ember4329">
                                            <label for="checker-ember4329"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1 col-sm-1 col-xs-1 text-right">
                                    <span class="">
                                        $7.00
                                    </span>
                                </div>
                            </div>
                        </li>

                    </ul>

                    <hr class="no-margin">
                </div>
            </div>

            <div id="ember4319" class="ember-view"><div id="ember4332" class="ember-view sticky-header">  <div class="group-header">
                <h5>Add-ons</h5>
                <div class="group-header-items"></div>
                <div id="ember4333" class="ember-view pull-right edit-addons">  <button type="button" data-ember-action="4335" class="btn btn-sm btn-default edit-button edit-button">
                    Edit
                </button>
                </div>
            </div>
                <hr class="no-margin">


                <div id="ember4334" class="ember-view editable-table-component table-responsive"><form>
                    <table class="table editable-list addons-table">
                        <tbody>
                        <tr id="ember4337" class="ember-view editable-item item-persisted heroku-postgresql"><td class="addon-icon">
                            <img id="ember4339" class="ember-view addon-icon" src="https://addons.heroku.com/addons/heroku-postgresql/icons/catalog.png" height="28px" width="28px"></img>
                        </td>

                            <td class="addon-title">
                                <a target="_blank" href="https://postgres.heroku.com/discover?hid=resource10476135@heroku.com">Heroku Postgres :: Database</a>
                                <ul id="ember4341" class="ember-view addon-actions">  <li id="ember4342" class="ember-view addon-action-item"><a class="addon-action-link" data-ember-action="4343" href="http://dataclips-next.heroku.com/clips/new?heroku_resource_id=resource10476135%40heroku.com">Create Dataclip</a>
                                </li>
                                    <li id="ember4345" class="ember-view addon-action-item"><a class="addon-action-link" data-ember-action="4346" href="https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases">Upgrade Instructions</a>
                                    </li>
                                    <li id="ember4348" class="ember-view addon-action-item"><a class="addon-action-link" data-ember-action="4349" href="http://postgres.heroku.com/actions/capture_backup?heroku_resource_id=resource10476135%40heroku.com">Capture Backup</a>
                                    </li>
                                </ul>

                            </td>

                            <td class="addon-plan">
                                Hobby Dev
                            </td>

                            <td class="text-right addon-price ">
                                Free
                            </td>

                        </tr>


                        <tr class="get-more-addons">
                            <td class="addon-icon">
                                <button class="btn-link" data-ember-action="4353">
                                    <i class="icon icon-add-addon"></i>
                                </button>
                            </td>
                            <td colspan="3">
                                <a href="https://elements.heroku.com/addons">Find more add-ons…</a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </form>
                </div></div></div>

            <div class="app-resource-total-line-item">
                <small class="line-item-label">

                    Estimated Monthly Cost
                </small>

                <div class="line-item-values">
                    <span class="line-item-original-value ">
                        $7.00
                    </span>

                </div>
            </div>


        </div>

        <footer id="ember605" class="ember-view app-footer allow-if-delinquent"><div class="section-content">
            <ul class="list-inline">
                <li class="hidden-xs"><a href="http://heroku.com/home">heroku.com<span>/home</span></a></li>
                <li><a href="http://blog.heroku.com">Blog</a></li>
                <li><a href="http://jobs.heroku.com">Careers</a></li>
                <li><a href="https://www.heroku.com/policy/privacy">Privacy Policy</a></li>
                <li class="feedback-link"><a class="btn btn-default btn-xs" href="https://help.heroku.com/tickets/new?category=feedback&amp;query=dashboard+feedback" target="_blank" data-ember-action="888">Feedback</a></li>
            </ul>
        </div>
        </footer>
    </div>

</div>


</div>

<script type="text/javascript" id="">piAId="37622";piCId="30300";(function(){function a(){var b=document.createElement("script");b.type="text/javascript";b.src=("https:"==document.location.protocol?"https://pi":"http://cdn")+".pardot.com/pd.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)}window.attachEvent?window.attachEvent("onload",a):window.addEventListener("load",a,!1)})();</script>

</body></html>