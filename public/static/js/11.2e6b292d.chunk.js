(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[11],{246:function(e,t,a){},283:function(e,t,a){"use strict";a.r(t);var n=a(6),c=a.n(n),r=a(10),u=a(3),s=a(0),i=a.n(s),l=a(21),o=a(18),p=a(13),b=a(15),m=a(8),j=a(5),f=a(16),v=a(32),d=a(4),h=a(17);a(246),a(83),a(84);t.default=function(){Object(s.useContext)(h.a);var e=Object(d.a)(),t=e.isLoading,a=e.error,n=e.sendRequest,E=e.clearError,N=Object(s.useState)(),O=Object(u.a)(N,2),x=O[0],k=O[1],S=Object(l.h)().sid,w=Object(l.g)(),y=Object(v.a)({subjectName:{value:"",isValid:!1}},!1),C=Object(u.a)(y,3),T=C[0],g=C[1],J=C[2];Object(s.useEffect)((function(){(function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n("".concat("https://upscarchive.com/api","/books/subject/").concat(S));case 3:t=e.sent,k(t.Subject),J({subjectName:{value:t.Subject.subjectName,isValid:!0}},!0),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}})()()}),[n,S,J]);var V=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,n("".concat("https://upscarchive.com/api","/books/updatesubject/").concat(S),"PATCH",JSON.stringify({subjectName:T.inputs.subjectName.value}),{"Content-Type":"application/json"});case 4:w.push("/"),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(1);case 9:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();return t?i.a.createElement("div",{className:"center"},i.a.createElement(m.a,null)):x||a?i.a.createElement(i.a.Fragment,null,i.a.createElement(j.a,{error:a,onClear:E}),!t&&x&&i.a.createElement("form",{className:"place-form",onSubmit:V},i.a.createElement(o.a,{id:"subjectName",element:"input",type:"text",label:"Subject Name",validators:[Object(f.b)(1)],errorText:"Please enter a valid Subject Name.",onInput:g,initialValue:x.subjectName,initialValid:!0}),i.a.createElement(p.a,{type:"submit"},"UPDATE SUBJECT"))):i.a.createElement("div",{className:"center"},i.a.createElement(b.a,null,i.a.createElement("h2",null,"Could not find place!")))}}}]);
//# sourceMappingURL=11.2e6b292d.chunk.js.map