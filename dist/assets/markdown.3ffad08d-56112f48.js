function v(o,k){for(var n=0;n<k.length;n++){const l=k[n];if(typeof l!="string"&&!Array.isArray(l)){for(const a in l)if(a!=="default"&&!(a in o)){const s=Object.getOwnPropertyDescriptor(l,a);s&&Object.defineProperty(o,a,s.get?s:{enumerable:!0,get:()=>l[a]})}}}return Object.freeze(Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}))}var m,_;function w(){if(_)return m;_=1,m=o,o.displayName="markdown",o.aliases=["md"];function o(k){(function(n){var l=/(?:\\.|[^\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))/.source;function a(e,t){return e=e.replace(/<inner>/g,l),t&&(e=e+"|"+e.replace(/_/g,"\\*")),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+e+")")}var s=/(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,p=/\|?__(?:\|__)+\|?(?:(?:\r?\n|\r)|$)/.source.replace(/__/g,s),b=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\r?\n|\r)/.source;n.languages.markdown=n.languages.extend("markup",{}),n.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+p+b+"(?:"+p+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+p+b+")(?:"+p+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(s),inside:n.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+p+")"+b+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+p+"$"),inside:{"table-header":{pattern:RegExp(s),alias:"important",inside:n.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,lookbehind:!0,alias:"keyword"},{pattern:/``.+?``|`[^`\r\n]+`/,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:a(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:a(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:a(/(~~?)(?:(?!~)<inner>)+?\2/.source,!1),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},url:{pattern:a(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source,!1),lookbehind:!0,greedy:!0,inside:{variable:{pattern:/(\[)[^\]]+(?=\]$)/,lookbehind:!0},content:{pattern:/(^!?\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),["url","bold","italic","strike"].forEach(function(e){["url","bold","italic","strike"].forEach(function(t){e!==t&&(n.languages.markdown[e].inside.content.inside[t]=n.languages.markdown[t])})}),n.hooks.add("after-tokenize",function(e){if(e.language!=="markdown"&&e.language!=="md")return;function t(i){if(!(!i||typeof i=="string"))for(var g=0,f=i.length;g<f;g++){var u=i[g];if(u.type!=="code"){t(u.content);continue}var d=u.content[1],r=u.content[3];if(d&&r&&d.type==="code-language"&&r.type==="code-block"&&typeof d.content=="string"){var c="language-"+d.content.trim().split(/\s+/)[0].toLowerCase();r.alias?typeof r.alias=="string"?r.alias=[r.alias,c]:r.alias.push(c):r.alias=[c]}}}t(e.tokens)}),n.hooks.add("wrap",function(e){if(e.type==="code-block"){for(var t="",i=0,g=e.classes.length;i<g;i++){var f=e.classes[i],u=/language-(.+)/.exec(f);if(u){t=u[1];break}}var d=n.languages[t];if(d){var r=e.content.value.replace(/&lt;/g,"<").replace(/&amp;/g,"&");e.content=n.highlight(r,d,t)}else if(t&&t!=="none"&&n.plugins.autoloader){var c="md-"+new Date().valueOf()+"-"+Math.floor(Math.random()*1e16);e.attributes.id=c,n.plugins.autoloader.loadLanguages(t,function(){var h=document.getElementById(c);h&&(h.innerHTML=n.highlight(h.textContent,n.languages[t],t))})}}}),n.languages.md=n.languages.markdown})(k)}return m}var y=w();const $=v({__proto__:null,default:y},[y]);export{$ as m};
