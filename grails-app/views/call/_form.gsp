<%@ page import="com.olamagic.Call" %>



<div class="fieldcontain ${hasErrors(bean: callInstance, field: 'aimed', 'error')} ">
	<label for="aimed">
		<g:message code="call.aimed.label" default="Aimed" />
		
	</label>
	<g:checkBox name="aimed" value="${callInstance?.aimed}" />

</div>

<div class="fieldcontain ${hasErrors(bean: callInstance, field: 'date', 'error')} required">
	<label for="date">
		<g:message code="call.date.label" default="Date" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="date" precision="day"  value="${callInstance?.date}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: callInstance, field: 'duration', 'error')} required">
	<label for="duration">
		<g:message code="call.duration.label" default="Duration" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="duration" type="number" value="${callInstance.duration}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: callInstance, field: 'number', 'error')} required">
	<label for="number">
		<g:message code="call.number.label" default="Number" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="number" name="number.id" from="${com.olamagic.Number.list()}" optionKey="id" required="" value="${callInstance?.number?.id}" class="many-to-one"/>

</div>

