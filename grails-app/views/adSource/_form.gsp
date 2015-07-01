<%@ page import="com.olamagic.AdSource" %>



<div class="fieldcontain ${hasErrors(bean: adSourceInstance, field: 'description', 'error')} required">
	<label for="description">
		<g:message code="adSource.description.label" default="Description" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="description" required="" value="${adSourceInstance?.description}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: adSourceInstance, field: 'name', 'error')} required">
	<label for="name">
		<g:message code="adSource.name.label" default="Name" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="name" required="" value="${adSourceInstance?.name}"/>

</div>
</div>


