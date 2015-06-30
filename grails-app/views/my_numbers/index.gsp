<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main">
</head>

<body>
<div class="nav" role="navigation">
    Welcome to Dashboard!

    <g:each in="${Number.getAllAvailableNumbers()}" status="i" var="numberInstance">
        <tr class="${(i % 2) == 0 ? 'even' : 'odd'}">

            <td><g:link action="show" id="${numberInstance.id}">${fieldValue(bean: numberInstance, field: "upid")}</g:link></td>

        </tr>
    </g:each>

</div>
</body>
</html>
