(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[22],{292:function(e,t,a){"use strict";a.r(t);var n=a(6),i=a.n(n),r=a(10),l=a(3),c=a(0),s=a.n(c),o=a(21),u=a(18),p=a(13),m=a(15),d=a(8),v=a(5),b=a(16),f=a(32),E=a(4),O=a(17);a(85),a(83),a(84);t.default=function(){Object(c.useContext)(O.a);var e=Object(E.a)(),t=e.isLoading,a=e.error,n=e.sendRequest,g=e.clearError,j=Object(c.useState)(),V=Object(l.a)(j,2),h=V[0],x=V[1],D=Object(o.h)().pid,N=Object(o.g)(),P=Object(f.a)({urlName:{value:"",isValid:!1},title:{value:"",isValid:!1},description:{value:"",isValid:!1},metaDescription:{value:"",isValid:!1}},!1),w=Object(l.a)(P,3),y=w[0],k=w[1],T=w[2];Object(c.useEffect)((function(){(function(){var e=Object(r.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n("".concat("http://ec2-18-221-78-47.us-east-2.compute.amazonaws.com/api","/pages/pageData/").concat(D));case 3:t=e.sent,x(t.Page),T({urlName:{value:t.Page.urlName,isValid:!0},title:{value:t.Page.title,isValid:!0},description:{value:t.Page.description,isValid:!0},metaDescription:{value:t.Page.metaDescription,isValid:!0}},!0),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}})()()}),[n,D,T]),console.log(h);var C=function(){var e=Object(r.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,n("".concat("http://ec2-18-221-78-47.us-east-2.compute.amazonaws.com/api","/pages/updatepage/").concat(D),"PATCH",JSON.stringify({urlName:y.inputs.urlName.value,title:y.inputs.title.value,description:y.inputs.description.value,metaDescription:y.inputs.metaDescription.value}),{"Content-Type":"application/json"});case 4:N.push("/pages"),window.location.reload(!1),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return t?s.a.createElement("div",{className:"center"},s.a.createElement(d.a,null)):h||a?s.a.createElement(s.a.Fragment,null,s.a.createElement(v.a,{error:a,onClear:g}),!t&&h&&s.a.createElement("form",{className:"place-form",onSubmit:C},s.a.createElement("h3",null,"Edit Page"),s.a.createElement(u.a,{id:"urlName",element:"input",type:"text",label:"Url Name",validators:[Object(b.b)(1)],errorText:"Please enter a valid url Name.",onInput:k,initialValue:h.urlName,initialValid:!0}),s.a.createElement(u.a,{id:"title",element:"",type:"text",label:"title",validators:[Object(b.b)(1)],errorText:"Please enter a valid  title.",onInput:k,initialValue:h.title,initialValid:!0}),s.a.createElement(u.a,{id:"description",element:"",type:"text",label:"Description",validators:[Object(b.b)(1)],errorText:"Please enter a valid  description.",onInput:k,initialValue:h.description,initialValid:!0}),s.a.createElement(u.a,{id:"metaDescription",element:"",type:"text",label:"meta Description",validators:[Object(b.b)(1)],errorText:"Please enter a valid  metaDescription.",onInput:k,initialValue:h.metaDescription,initialValid:!0}),s.a.createElement(p.a,{type:"submit"},"UPDATE BLOCK"))):s.a.createElement("div",{className:"center"},s.a.createElement(m.a,null,s.a.createElement("h2",null,"Could not find block!")))}}}]);
//# sourceMappingURL=22.d59832b6.chunk.js.map