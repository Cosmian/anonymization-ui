import{i as l}from"./c.7b91e640-e4682926.js";function u(r,t){for(var e=0;e<t.length;e++){const n=t[e];if(typeof n!="string"&&!Array.isArray(n)){for(const o in n)if(o!=="default"&&!(o in r)){const i=Object.getOwnPropertyDescriptor(n,o);i&&Object.defineProperty(r,o,i.get?i:{enumerable:!0,get:()=>n[o]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}var a,s;function f(){if(s)return a;s=1;var r=l();a=t,t.displayName="objectivec",t.aliases=[];function t(e){e.register(r),e.languages.objectivec=e.languages.extend("c",{keyword:/\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,string:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,operator:/-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/}),delete e.languages.objectivec["class-name"]}return a}var c=f();const p=u({__proto__:null,default:c},[c]);export{p as o};
