function c(e,n){for(var a=0;a<n.length;a++){const t=n[a];if(typeof t!="string"&&!Array.isArray(t)){for(const r in t)if(r!=="default"&&!(r in e)){const o=Object.getOwnPropertyDescriptor(t,r);o&&Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var i,s;function u(){if(s)return i;s=1,i=e,e.displayName="scheme",e.aliases=[];function e(n){n.languages.scheme={comment:/;.*/,string:{pattern:/"(?:[^"\\]|\\.)*"|'[^()#'\s]+/,greedy:!0},character:{pattern:/#\\(?:[ux][a-fA-F\d]+|[a-zA-Z]+|\S)/,alias:"string"},keyword:{pattern:/(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)(?=[()\s])/,lookbehind:!0},builtin:{pattern:/(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)(?=[()\s])/,lookbehind:!0},number:{pattern:/([\s()])[-+]?(?:\d+\/\d+|\d*\.?\d+(?:\s*[-+]\s*\d*\.?\d+i)?)\b/,lookbehind:!0},boolean:/#[tf]/,operator:{pattern:/(\()(?:[-+*%\/]|[<>]=?|=>?)(?=\s|$)/,lookbehind:!0},function:{pattern:/(\()[^()'\s]+(?=[()\s)]|$)/,lookbehind:!0},punctuation:/[()']/}}return i}var l=u();const d=c({__proto__:null,default:l},[l]);export{d as s};