function b(e,n){for(var a=0;a<n.length;a++){const r=n[a];if(typeof r!="string"&&!Array.isArray(r)){for(const t in r)if(t!=="default"&&!(t in e)){const d=Object.getOwnPropertyDescriptor(r,t);d&&Object.defineProperty(e,t,d.get?d:{enumerable:!0,get:()=>r[t]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var o,i;function l(){if(i)return o;i=1,o=e,e.displayName="nasm",e.aliases=[];function e(n){n.languages.nasm={comment:/;.*$/m,string:/(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,label:{pattern:/(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,lookbehind:!0,alias:"function"},keyword:[/\[?BITS (?:16|32|64)\]?/,{pattern:/(^\s*)section\s*[a-zA-Z.]+:?/im,lookbehind:!0},/(?:extern|global)[^;\r\n]*/i,/(?:CPU|FLOAT|DEFAULT).*$/m],register:{pattern:/\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|sp|si|di)|[cdefgs]s)\b/i,alias:"variable"},number:/(?:\b|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|\d*\.?\d+(?:\.?e[+-]?\d+)?[dt]?)\b/i,operator:/[\[\]*+\-\/%<>=&|$!]/}}return o}var s=l();const f=b({__proto__:null,default:s},[s]);export{f as n};
