
<%@ page import="com.olamagic.Number" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'number.label', default: 'Number')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-number" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" url="${createLink(controller: "number")}/new"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-number" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="upid" title="${message(code: 'number.upid.label', default: 'Upid')}" />
					
					</tr>
				</thead>
				<tbody>
                <form name="buyNumberForm" action="buy" method="post" >
                    <g:select name="numberInstance.id"
                              from="${Number.all}" optionValue="upid" optionKey="upid" />
                    <input type="submit" value="Get">
                </form>

				<g:each in="${numberInstanceList}" status="i" var="numberInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">

						<td><g:link url="numbers/${numberInstance.upid}" id="${numberInstance.id}">${fieldValue(bean: numberInstance, field: "upid")}</g:link></td>

					</tr>
                    <g:form controller="number" method="DELETE"   url="${createLink(controller: 'number')}/${numberInstance.upid}">
                        <td>${numberInstance.upid}
                         <g:actionSubmit class="delete" value="release"/>
                        </td>
                    </g:form>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${numberInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
