
<%@ page import="com.olamagic.Call" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'call.label', default: 'Call')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-call" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-call" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="aimed" title="${message(code: 'call.aimed.label', default: 'Aimed')}" />
					
						<g:sortableColumn property="date" title="${message(code: 'call.date.label', default: 'Date')}" />
					
						<g:sortableColumn property="duration" title="${message(code: 'call.duration.label', default: 'Duration')}" />
					
						<th><g:message code="call.number.label" default="Number" /></th>
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${callInstanceList}" status="i" var="callInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${callInstance.id}">${fieldValue(bean: callInstance, field: "aimed")}</g:link></td>
					
						<td><g:formatDate date="${callInstance.date}" /></td>
					
						<td>${fieldValue(bean: callInstance, field: "duration")}</td>
					
						<td>${fieldValue(bean: callInstance, field: "number")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${callInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
