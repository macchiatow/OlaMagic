<%@ page import="com.olamagic.Campaign" %>



<div class="fieldcontain ${hasErrors(bean: campaignInstance, field: 'details', 'error')} required">
	<label for="details">
		<g:message code="campaign.details.label" default="Details" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="details" required="" value="${campaignInstance?.details}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: campaignInstance, field: 'name', 'error')} required">
	<label for="name">
		<g:message code="campaign.name.label" default="Name" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="name" required="" value="${campaignInstance?.name}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: campaignInstance, field: 'number', 'error')} ">
	<label for="number">
		<g:message code="campaign.number.label" default="Number" />
		
	</label>
	<g:select name="number" from="${com.olamagic.Number.list()}" multiple="multiple" optionKey="id" size="5" value="${campaignInstance?.number*.id}" class="many-to-many"/>

</div>

