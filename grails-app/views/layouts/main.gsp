<html><head>

    <title>olamagic · Resources | OlaMagic</title>

    <asset:stylesheet src="app.css"/>
    <asset:stylesheet src="vendor.css"/>

    <meta name="debugger" content="false">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Heroku">
    <link rel="apple-touch-icon" href="/images/static/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/images/static/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/images/static/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/static/apple-touch-icon-152x152.png">

<body class="ember-application">

<asset:javascript src="vendor.js"/>
<asset:javascript src="dashboard.js"/>


<div id="ember391" class="ember-view dashboard-wrapper protected-app-resources"><div class="app-wrapper ">
    <div id="ember427" class="ember-view alert alert-danger text-center offline-status"><p>There's a problem connecting…
        <button class="btn btn-link" data-ember-action="458">Refresh</button></p></div>

    <div id="ember438" class="ember-view flash-messages"></div>

    <div id="ember566" class="ember-view sidebar scrollable-container">
        <div id="sidebar" class="sidebar-wrapper">
            <div id="ember617" class="ember-view">
                <div class="sidebar-container property-switcher fixed-top allow-if-delinquent">
                    <a id="ember621" class="ember-view" href="/"><i class="icon icon-logo dashboard-logo"></i>
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
                                    <img id="ember653" class="ember-view gravatar-icon"
                                         src="https://gravatar.com/avatar/f94a08169caa7c95ee3f22c897854051?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png"
                                         height="32px" width="32px"></img>

                                    <div class="notification-badge "></div>
                                </span>

                                <div class="media-body sidebar-user-email">
                                    <h5 class="media-heading">cmeisters@gmail.com <i class="icon icon-caret"></i></h5>
                                </div>
                            </a>
                            <ul class="dropdown-menu user-menu list-group">
                                <li><a id="ember655" class="ember-view" href="/notifications">View Notifications</a>
                                </li>
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

                    <div class="personal-apps">
                        <ul class="sidebar-nav">
                            <li class="group-menu-item active">
                                <a id="ember667" class="ember-view sidebar-nav-heading org" href="/apps"><i
                                        class="icon icon-personal-apps"></i>
                                    Reports
                                </a>
                            </li>
                        </ul>
                        <ul class="sidebar-nav">
                            <li class="group-menu-item active">
                                <a id="ember669" class="ember-view sidebar-nav-heading org" href="/apps"><i
                                        class="icon icon-personal-apps"></i>
                                    PBX
                                </a>
                            </li>
                        </ul>
                        <ul class="sidebar-nav">
                            <li class="group-menu-item active">
                                <a id="ember670" class="ember-view sidebar-nav-heading org" href="/apps"><i
                                        class="icon icon-personal-apps"></i>
                                    Analytics
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>

    </div>

    <div class="main-panel scrollable-container container-fluid snap-main-panel">

        <div id="ember584" class="ember-view sms-nag-banner" style="display:none;"
             data-test-target="sms-nag-banner"><div class="global-notification is-warning">
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
                    <a id="ember957" class="ember-view back-link" href="/apps"><i class="icon icon-back"></i>
                        <span class="back-context">
                            Apps
                        </span>

                    </a>

                    <div class="app-name-container flex-grow-1">
                        <span class="app-name">olamagic</span>
                        <i id="ember958" class="ember-view icon favorite-item icon-favorite off"></i>
                    </div>

                    <div class="btn-group actions-button">
                        <button type="button" class="btn btn-link btn-xs dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">
                            <i class="icon icon-actions"></i>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li id="ember967" class="ember-view production-check-toggle"><a href="javascript:void(0);"
                                                                                            data-ember-action="977">
                                <span class="prod-context">Production</span> check
                            </a>
                            </li>
                            <li id="ember976" class="ember-view"><a href="javascript:void(0)"
                                                                    data-ember-action="978">Restart all dynos</a>
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

            <div class="ember-view nav nav-tabs sub-nav app-nav" id="ember851">

                <div class="ember-view sub-nav-item" id="ember860"><a href="numbers"
                                                                      class="ember-view ${params.controller == 'number' ? 'active' : ''}"
                                                                      id="ember861"><i
                            class="icon icon-sub-nav-resources"></i>
                    <span>Numbers</span>
                </a></div>


                <div class="ember-view sub-nav-item" id="ember977"><a href="users"
                                                                      class="ember-view ${params.controller == 'user' ? 'active' : ''}"
                                                                      id="ember978"><i
                            class="icon icon-sub-nav-access-active"></i>
                    <span>Access</span>
                </a></div>

            </div>

            <g:layoutBody/>

        </div>

    </div>

</div>

</div></body></html>