<!DOCTYPE html>
<html>
<head>

    <title>olamagic · Resources | Heroku</title>
    <meta name="layout" content="dashboard">
</head>
<body class="ember-application">

    <div id="ember988" class="ember-view nav nav-tabs sub-nav app-nav">
        <div id="ember997" class="ember-view sub-nav-item"><a id="ember998" class="ember-view active"
                                                              href="/apps/olamagic/resources"><i
                    class="icon icon-sub-nav-resources-active"></i>
            <span>My Numbers</span>
        </a></div>

    </div>


    <div class="ember-view sticky-header" id="ember1060"><div class="group-header">
        <h5>Unassigned</h5>

        <div class="ember-view pull-right" id="ember1070"><button
                class="btn btn-sm btn-default edit-button edit-button" data-ember-action="1080" type="button">
            Edit
        </button>
        </div>
    </div>

        <div class="ember-view editable-table-component table-responsive" id="ember1079">
            <form>
                <table class="table editable-list collaborator-list">
                    <tbody>
                    <g:each in="${numberInstanceList}" status="i" var="numberInstance">
                        <tr class="ember-view collaborator-item editable-item item-persisted"
                            id="ember109${i}"><td class="avatar icon-cell">
                            <img src="https://gravatar.com/avatar/f94a08169caa7c95ee3f22c897854051?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fninja-avatar-48x48.png"
                                 class="ember-view gravatar-icon" id="ember109${i}" height="32px" width="32px">
                        </td>

                            <td class="collaborator-info  show-role">
                                <div class="email">${numberInstance.upid}</div>
                            </td>
                            <td class="action-cell"></td>

                        </tr>

                    </g:each>

                    </tbody>
                </table>
            </form>
        </div>

    </div>

</body>
</html>