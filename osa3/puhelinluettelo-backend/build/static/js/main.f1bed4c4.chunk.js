(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var s=n(14),c=n.n(s),r=n(3),o=n(2),a=n(4),i=n.n(a),u="/api/persons",d=function(){return i.a.get(u)},l=function(e){return i.a.post(u,e)},j=function(e){i.a.delete("".concat(u,"/").concat(e))},b=function(e,t){return i.a.put("".concat(u,"/").concat(e),t)},f=n(0),h=function(e){var t=e.message,n=e.type;return null===t?null:Object(f.jsx)("div",{className:n,children:t})},p=function(e){var t=e.person,n=e.persons,s=e.setPersons,c=e.id,r=e.setMessage,o=e.setType;return Object(f.jsxs)("div",{children:[t.name," ",t.number,Object(f.jsx)("button",{onClick:function(){!function(e,t,n,s,c,r){window.confirm("Delete ".concat(s," ?"))&&(t(e.filter((function(e){return e._id!==n}))),j(n),c("Deleted ".concat(s)),r("added"),setTimeout((function(){c(null)}),5e3))}(n,s,c,t.name,r,o)},children:"delete"})]})},O=function(e){var t=e.haku,n=e.setSearch;return Object(f.jsx)("div",{children:Object(f.jsxs)("div",{children:["filter shown with ",Object(f.jsx)("input",{value:t,onChange:function(e){n(e.target.value)}})]})})},m=function(e){var t=e.persons,n=e.search,s=e.setPersons,c=e.setMessage,r=e.setType,o=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return Object(f.jsx)("div",{children:o.map((function(e){return Object(f.jsx)(p,{person:e,persons:t,setPersons:s,id:e._id,setMessage:c,setType:r},e._id)}))})},v=function(e){var t=e.persons,n=e.setPersons,s=e.setMessage,c=e.setType,a=Object(o.useState)(""),i=Object(r.a)(a,2),u=i[0],d=i[1],j=Object(o.useState)(""),h=Object(r.a)(j,2),p=h[0],O=h[1];return Object(f.jsx)("div",{children:Object(f.jsxs)("form",{onSubmit:function(e){!function(e,t,n,s,c,r,o,a,i){e.preventDefault();var u=!1;t.forEach((function(e){if(n===e.name){if(!window.confirm("".concat(n," is already added to phonebook, replace the old number with a new one?")))return u=!0,r(""),void o("");for(var d={name:n,number:s},l=0,j=0;j<t.length;j++)t[j].name===n&&(l=t[j]._id);b(l,d).then((function(e){c(t.map((function(t){return t._id!==l?t:e.data}))),r(""),o(""),a("Updated ".concat(n)),i("added"),setTimeout((function(){a(null)}),5e3)})).catch((function(e){a("Information of ".concat(n," has already been removed from server")),i("error"),c(t.filter((function(e){return e._id!==l}))),setTimeout((function(){a(null)}),5e3)})),u=!0}})),u||l({name:n,number:s}).then((function(e){c(t.concat(e.data)),r(""),o(""),a("Added ".concat(n)),i("added"),setTimeout((function(){a(null)}),5e3)})).catch((function(e){a(e.response.data.split("<pre>")[1].split("<br>")[0]),i("error"),setTimeout((function(){a(null)}),5e3)}))}(e,t,u,p,n,d,O,s,c)},children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:u,onChange:function(e){d(e.target.value)}})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{value:p,onChange:function(e){O(e.target.value)}})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})})},x=function(){var e=Object(o.useState)([]),t=Object(r.a)(e,2),n=t[0],s=t[1],c=Object(o.useState)(""),a=Object(r.a)(c,2),i=a[0],u=a[1],l=Object(o.useState)(null),j=Object(r.a)(l,2),b=j[0],p=j[1],x=Object(o.useState)(null),g=Object(r.a)(x,2),w=g[0],y=g[1];return Object(o.useEffect)((function(){d().then((function(e){s(e.data)}))}),[]),Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(h,{message:b,type:w}),Object(f.jsx)(O,{persons:n,search:i,setSearch:u}),Object(f.jsx)("h3",{children:"add a new"}),Object(f.jsx)(v,{persons:n,setPersons:s,setMessage:p,setType:y}),Object(f.jsx)("h3",{children:"Numbers"}),Object(f.jsx)(m,{persons:n,search:i,setPersons:s,setMessage:p,setType:y})]})};n(38);c.a.render(Object(f.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.f1bed4c4.chunk.js.map