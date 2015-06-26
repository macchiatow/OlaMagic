
<%@ page import="com.olamagic.Call" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'call.label', default: 'Call')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-call" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-call" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list call">
			
				<g:if test="${callInstance?.aimed}">
				<li class="fieldcontain">
					<span id="aimed-label" class="property-label"><g:message code="call.aimed.label" default="Aimed" /></span>
					
						<span class="property-value" aria-labelledby="aimed-label"><g:formatBoolean boolean="${callInstance?.aimed}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${callInstance?.date}">
				<li class="fieldcontain">
					<span id="date-label" class="property-label"><g:message code="call.date.label" default="Date" /></span>
					
						<span class="property-value" aria-labelledby="date-label"><g:formatDate date="${callInstance?.date}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${callInstance?.duration}">
				<li class="fieldcontain">
					<span id="duration-label" class="property-label"><g:message code="call.duration.label" default="Duration" /></span>
					
						<span class="property-value" aria-labelledby="duration-label"><g:fieldValue bean="${callInstance}" field="duration"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${callInstance?.number}">
				<li class="fieldcontain">
					<span id="number-label" class="property-label"><g:message code="call.number.label" default="Number" /></span>
					
						<span class="property-value" aria-labelledby="number-label"><g:link controller="number" action="show" id="${callInstance?.number?.id}">${callInstance?.number?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:callInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${callInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
