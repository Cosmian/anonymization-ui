function f(e,n){for(var a=0;a<n.length;a++){const t=n[a];if(typeof t!="string"&&!Array.isArray(t)){for(const r in t)if(r!=="default"&&!(r in e)){const o=Object.getOwnPropertyDescriptor(t,r);o&&Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var i,s;function u(){if(s)return i;s=1,i=e,e.displayName="hsts",e.aliases=[];function e(n){n.languages.hsts={directive:{pattern:/\b(?:max-age=|includeSubDomains|preload)/,alias:"keyword"},safe:{pattern:/\d{8,}/,alias:"selector"},unsafe:{pattern:/\d{1,7}/,alias:"function"}}}return i}var l=u();const c=f({__proto__:null,default:l},[l]);export{c as h};
