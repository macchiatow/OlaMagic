<%@ page import="com.olamagic.Number" %>



<div class="fieldcontain ${hasErrors(bean: numberInstance, field: 'call', 'error')} ">
	<label for="call">
		<g:message code="number.call.label" default="Call" />
		
	</label>



</div>

<div class="fieldcontain ${hasErrors(bean: numberInstance, field: 'upid', 'error')} required">
	<label for="upid">
		<g:message code="number.upid.label" default="Upid" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="upid" required="" value="${numberInstance?.upid}"/>

</div>

