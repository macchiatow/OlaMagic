
<%@ page import="com.olamagic.auth.SecUser" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'secUser.label', default: 'SecUser')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-secUser" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" url="new" ><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-secUser" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list secUser">
			</ol>
            <g:form url="${secUserInstance.uid}" method="PUT" >
                <g:hiddenField name="version" value="${secUserInstance?.version}" />
                <fieldset class="form">
                    <g:render template="form"/>
                </fieldset>
                <fieldset class="buttons">
                    <g:actionSubmit class="save" action="update" value="${message(code: 'default.button.update.label', default: 'Update')}" />
                </fieldset>
            </g:form>
			<g:form url="${secUserInstance.uid}" method="DELETE">
				<fieldset class="buttons">
					<input type="submit" class="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
