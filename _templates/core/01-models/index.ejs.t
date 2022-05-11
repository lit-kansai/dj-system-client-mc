---
to: core/01-models/<%= name %>/index.ts
---
<% 
	modelName = h.inflection.capitalize(name) + 'Model' 
	interfaceName = `I${modelName}` 
%>export interface <%= interfaceName %> {

}

export class <%= modelName %> implements <%= interfaceName %> {

}

export namespace <%= modelName %>NameSpace {

}
