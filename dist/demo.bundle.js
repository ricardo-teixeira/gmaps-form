!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=23)}({23:function(e,t,n){var r,o,a;!function(i,u){o=[n(24),n(26)],r=u,void 0!==(a="function"==typeof r?r.apply(t,o):r)&&(e.exports=a)}(0,function(e){"use strict";var t="AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8",n=document.getElementById("exampleForm"),r=document.getElementById("submitResultsLeft"),o=document.getElementById("submitResultsRight"),a=document.getElementById("addNewAddress"),i={rua:"Rua Mário Carnicelli",pais:"Brasil",estado:"São Paulo",cidade:"Campinas"},u=function(){c(i);var u=document.querySelector('[data-gmaps="find-google-address"]'),f=l(),d=s(f);findGoogleAddress({apiKey:t,initialValues:d},function(t,n){c(s(n,!0)),r.innerHTML="<pre><strong>Maps API values</strong>\n"+(0,e.syntaxHighlight)(n)+"</pre>"})(u),a.addEventListener("click",function(){var e=l(),n=s(e);findGoogleAddress({apiKey:t,initialValues:n},function(e,t){var n=s(t,!0);c(n)})(u)}),n.addEventListener("submit",function(t){t.preventDefault();var n=l();o.innerHTML="<pre><strong>Submit Values</strong>\n"+(0,e.syntaxHighlight)(n)+"</pre>"})};document.addEventListener("DOMContentLoaded",u);var s=function(e,t){var n={},r={pais:"country",estado:"state",cidade:"city",bairro:"neighborhood",rua:"street",cep:"postal_code",lat:"lat",lng:"lng"};return t?Object.keys(r).forEach(function(t){e[r[t]]&&(n[t]=e[r[t]])}):Object.keys(e).forEach(function(t){e[t]&&(n[r[t]]=e[t])}),n},c=function(e){Object.keys(e).forEach(function(t){n.elements[t].value=e[t]})},l=function(){var e={};return Array.prototype.forEach.call(n.elements,function(t){t.name&&(e[t.name]=t.value)}),e}})},24:function(e,t,n){var r,o,a;!function(i,u){o=[t,n(25)],r=u,void 0!==(a="function"==typeof r?r.apply(t,o):r)&&(e.exports=a)}(0,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(t).forEach(function(n){"default"!==n&&"__esModule"!==n&&Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})})},25:function(e,t,n){var r,o,a;!function(n,i){o=[t],r=i,void 0!==(a="function"==typeof r?r.apply(t,o):r)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e){return"string"!=typeof e&&(e=JSON.stringify(e,void 0,2)),e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"})};e.syntaxHighlight=t})},26:function(e,t){}});
//# sourceMappingURL=demo.bundle.js.map