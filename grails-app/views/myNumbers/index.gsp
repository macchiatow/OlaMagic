<%@ page import="com.olamagic.Number" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main">
</head>

<body>
<div class="nav" role="navigation">


    <form name="buyNumberForm" action="buy" method="post">
        <g:select name="numbers"
                  from="${availableNumbers}" value="{$upid}"   />
        <input type="submit" value="Get">
    </form>

    %{--<g:each in="${numberList}" status="i" var="numberInstance">--}%
        %{--<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">--}%

            %{--<td><g:link action="show" id="${numberInstance.id}">${fieldValue(bean: numberInstance, field: "upid")}</g:link></td>--}%

        %{--</tr>--}%
    %{--</g:each>--}%

</div>
</body>
</html>
