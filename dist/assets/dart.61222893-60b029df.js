function c(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const a in r)if(a!=="default"&&!(a in e)){const i=Object.getOwnPropertyDescriptor(r,a);i&&Object.defineProperty(e,a,i.get?i:{enumerable:!0,get:()=>r[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var s,o;function d(){if(o)return s;o=1,s=e,e.displayName="dart",e.aliases=[];function e(t){t.languages.dart=t.languages.extend("clike",{string:[{pattern:/r?("""|''')[\s\S]*?\1/,greedy:!0},{pattern:/r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0}],keyword:[/\b(?:async|sync|yield)\*/,/\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|default|deferred|do|dynamic|else|enum|export|external|extends|factory|final|finally|for|get|if|implements|import|in|library|new|null|operator|part|rethrow|return|set|static|super|switch|this|throw|try|typedef|var|void|while|with|yield)\b/],operator:/\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/}),t.languages.insertBefore("dart","function",{metadata:{pattern:/@\w+/,alias:"symbol"}})}return s}var l=d();const f=c({__proto__:null,default:l},[l]);export{f as d};