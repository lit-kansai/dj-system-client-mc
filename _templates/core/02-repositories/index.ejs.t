---
to: core/02-repositories/<%= name %>/index.ts
---
<%
	repositoryName = h.inflection.capitalize(name) + 'Repository'
	interfaceName = `I${repositoryName}`
%>export interface <%= interfaceName %> {

}

export class <%= repositoryName %>Impl implements <%= interfaceName %> {

}
