(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(2),u=n(14),r=n.n(u),a=n(3),s=(n(19),n(0)),o=function(e){var t=e.onChange,n=e.value;return Object(s.jsxs)("div",{children:["filter shown with",Object(s.jsx)("input",{onChange:t,value:n})]})},i=function(e){var t=e.onSubmit,n=e.onChangeName,c=e.valueName,u=e.onChangeNumber,r=e.valueNumber;return Object(s.jsxs)("form",{onSubmit:t,children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{onChange:n,value:c})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{onChange:u,value:r})]})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var t=e.name,n=e.number,c=e.id,u=e.onDelete;return Object(s.jsxs)("li",{children:[t," ",n," ",Object(s.jsx)("button",{onClick:function(){return u(c,t)},children:"delete"})]})},l=function(e){var t=e.persons,n=e.filter,c=e.onDelete;return Object(s.jsx)("div",{children:Object(s.jsx)("ul",{children:t.filter((function(e){return""===n||e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return Object(s.jsx)(j,{id:e.id,name:e.name,number:e.number,onDelete:c},e.id)}))})})},b=function(e){var t=e.message,n=e.type;return""===t||"successful"!==n&&"unsuccessful"!==n?null:Object(s.jsx)("div",{className:n,children:Object(s.jsx)("p",{children:t})})},f=n(4),d=n.n(f),m="/api/persons",h={getAll:function(){return d.a.get(m).then((function(e){return e.data}))},create:function(e){return d.a.post(m,e).then((function(e){return e.data}))},remove:function(e){return d.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},update:function(e,t){return d.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))}},O=function(){var e=Object(c.useState)([]),t=Object(a.a)(e,2),n=t[0],u=t[1],r=Object(c.useState)(""),j=Object(a.a)(r,2),f=j[0],d=j[1],m=Object(c.useState)(""),O=Object(a.a)(m,2),p=O[0],v=O[1],g=Object(c.useState)(""),x=Object(a.a)(g,2),y=x[0],C=x[1],N=Object(c.useState)({message:"",type:""}),w=Object(a.a)(N,2),S=w[0],D=w[1];Object(c.useEffect)((function(){h.getAll().then((function(e){return u(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(o,{onChange:function(e){C(e.target.value)},value:y}),Object(s.jsx)("h2",{children:"Add a new"}),Object(s.jsx)(i,{onSubmit:function(e){e.preventDefault();var t={name:f,number:p};if(n.some((function(e){return e.name===f}))){var c=n.filter((function(e){return e.name===f})),r=Object(a.a)(c,1)[0];h.update(r.id,t).then((function(e){u((function(t){return t.map((function(t){return t.id===e.id?e:t}))})),D({message:"Person ".concat(f," updated"),type:"successful"}),setTimeout((function(){D({message:"",type:""})}),5e3),d(""),v("")}))}else h.create(t).then((function(e){u((function(t){return t.concat(e)})),D({message:"Aded ".concat(e.name),type:"successful"}),setTimeout((function(){D({message:"",type:""})}),5e3),d(""),v("")}))},onChangeName:function(e){d(e.target.value)},valueName:f,onChangeNumber:function(e){v(e.target.value)},valueNumber:p}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(b,{message:S.message,type:S.type}),Object(s.jsx)(l,{persons:n,filter:y,onDelete:function(e,t){window.confirm("Delete ".concat(t,"?"))&&h.remove(e).then((function(){u((function(t){return t.filter((function(t){return t.id!==e}))})),D({message:"Deleted ".concat(t),type:"successful"}),setTimeout((function(){D({message:"",type:""})}),5e3)}))}})]})};r.a.render(Object(s.jsx)(O,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.01b05525.chunk.js.map