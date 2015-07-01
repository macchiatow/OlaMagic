<%@ page import="com.olamagic.Number" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main">
</head>

<body>
<div class="nav" role="navigation">


    <form name="buyNumberForm" action="buy" method="post" >
        <g:select name="numberInstance.id"
                  from="${availableNumbers}" optionValue="upid" optionKey="id" />
        <input type="submit" value="Get">
    </form>

    <g:each in="${myNumbers}" status="i" var="numberInstance">
        <g:form action="release" method="POST"  params="['numberInstance.id' : numberInstance.id]" >
            <td>${numberInstance.upid}
                <g:actionSubmit class="delete" action="release" value="release"/>
            </td>
        </g:form>
    </g:each>

</div>
</body>
</html>
