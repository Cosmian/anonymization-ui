function f(e,n){for(var a=0;a<n.length;a++){const r=n[a];if(typeof r!="string"&&!Array.isArray(r)){for(const t in r)if(t!=="default"&&!(t in e)){const i=Object.getOwnPropertyDescriptor(r,t);i&&Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>r[t]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var s,o;function u(){if(o)return s;o=1,s=e,e.displayName="csp",e.aliases=[];function e(n){n.languages.csp={directive:{pattern:/\b(?:(?:base-uri|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox) |(?:block-all-mixed-content|disown-opener|upgrade-insecure-requests)(?: |;)|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src )/i,alias:"keyword"},safe:{pattern:/'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=/]+)'/,alias:"selector"},unsafe:{pattern:/(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,alias:"function"}}}return s}var c=u();const l=f({__proto__:null,default:c},[c]);export{l as c};
