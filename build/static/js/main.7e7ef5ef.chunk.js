(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(1),c=t.n(a),s=t(15),r=t.n(s),o=t(3),u=t(4),i=t(0),l=function(e){var n=e.search,t=e.handleSearchChange;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addName,t=e.newName,a=e.newNumber,c=e.handleNameChange,s=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:c})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:a,onChange:s})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.persons,t=e.search,a=e.deletePerson,c=n;return t&&(c=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}))),Object(i.jsx)("div",{children:c.map((function(e){return Object(i.jsxs)("div",{children:[" ",e.name," ",e.number," ",Object(i.jsx)("button",{onClick:function(){return a(e.id)},children:"delete"})]},e.name)}))})},h=t(5),b=t.n(h),j="/api/persons",f=function(){return b.a.get(j).then((function(e){return e.data}))},g=function(e){return b.a.post(j,e).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},v=function(e,n){return b.a.delete("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},p=(t(39),function(e){return null===e.message.message?null:"success"===e.message.result?Object(i.jsx)("div",{className:"success",children:e.message.message}):"fail"===e.message.result?Object(i.jsx)("div",{className:"error",children:e.message.message}):null}),x=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],s=Object(a.useState)(""),r=Object(u.a)(s,2),h=r[0],b=r[1],j=Object(a.useState)(""),x=Object(u.a)(j,2),w=x[0],N=x[1],C=Object(a.useState)(""),S=Object(u.a)(C,2),k=S[0],P=S[1],y=Object(a.useState)({message:null,result:null}),T=Object(u.a)(y,2),E=T[0],D=T[1];Object(a.useEffect)((function(){f().then((function(e){c(e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(p,{message:E}),Object(i.jsx)(l,{search:k,handleSearchChange:function(e){P(e.target.value)}}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(d,{addName:function(e){if(e.preventDefault(),t.find((function(e){return e.name===h}))){if(window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===h})).id,a={name:h,number:w};O(n,a).then((function(e){var a=t.map((function(t){return t.id!==n?t:e}));c(a);var s={message:"Updated ".concat(e.name),result:"success"};D(s),setTimeout((function(){D(Object(o.a)(Object(o.a)({},E),{},{message:null}))}),5e3)})).catch((function(e){console.log("error updating user: ".concat(e));var n={message:"Information of ".concat(a.name," has already been removed from the server"),result:"fail"};D(n),setTimeout((function(){D(Object(o.a)(Object(o.a)({},E),{},{message:null}))}),5e3)}))}}else if(h.length<3){console.log("name gotta be more than 3 char length");var s={message:"Person validation failed: name: Path `name` (`".concat(h,"`) is shorter than the minimum allowed length (3)."),result:"fail"};D(s),setTimeout((function(){D(Object(o.a)(Object(o.a)({},E),{},{message:null}))}),5e3)}else if(w.length<8){console.log("number gotta have at least 8 digits");var r={message:"Person validation failed: number: Path `number` (`".concat(w,"`) must have at least 8 digits."),result:"fail"};D(r),setTimeout((function(){D(Object(o.a)(Object(o.a)({},E),{},{message:null}))}),5e3)}else{g({name:h,number:w}).then((function(e){c(t.concat(e)),b(""),N("");var n={message:"Added ".concat(e.name),result:"success"};D(n),setTimeout((function(){D(Object(o.a)(Object(o.a)({},E),{},{message:null}))}),5e3)})).catch((function(e){return console.log("error posting: ".concat(e))}))}},newName:h,newNumber:w,handleNameChange:function(e){return b(e.target.value)},handleNumberChange:function(e){return N(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(m,{persons:t,search:k,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&v(e).then((function(a){console.log("deleted ".concat(n.name," successfully")),c(t.filter((function(n){return n.id!==e})))})).catch((function(e){console.log("Error deleting: ".concat(e))}))}})]})};r.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(x,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.7e7ef5ef.chunk.js.map