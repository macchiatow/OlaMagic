<%@ page import="com.olamagic.Number" %>



<div class="fieldcontain ${hasErrors(bean: numberInstance, field: 'call', 'error')} ">
	<label for="call">
		<g:message code="number.call.label" default="Call" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${numberInstance?.call?}" var="c">
    <li><g:link controller="call" action="show" id="${c.id}">${c?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="call" action="create" params="['number.id': numberInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'call.label', default: 'Call')])}</g:link>
</li>
</ul>


</div>

<div class="fieldcontain ${hasErrors(bean: numberInstance, field: 'number', 'error')} required">
	<label for="number">
		<g:message code="number.number.label" default="Number" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="number" required="" value="${numberInstance?.number}"/>

</div>

