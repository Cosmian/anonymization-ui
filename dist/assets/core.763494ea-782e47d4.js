import{J as Z}from"./index-8bf279cf.js";import{a as gn}from"./markup.51a4456b-38fa7fb3.js";import{a as dn}from"./css.44f4a048-58405350.js";import{a as fn}from"./clike.6b294fc8-d6f06379.js";import{a as mn}from"./javascript.3596b647-1bc02f3d.js";function hn(e,n){for(var r=0;r<n.length;r++){const l=n[r];if(typeof l!="string"&&!Array.isArray(l)){for(const u in l)if(u!=="default"&&!(u in e)){const c=Object.getOwnPropertyDescriptor(l,u);c&&Object.defineProperty(e,u,c.get?c:{enumerable:!0,get:()=>l[u]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var ze={exports:{}},xn=yn,vn=Object.prototype.hasOwnProperty;function yn(){for(var e={},n=0;n<arguments.length;n++){var r=arguments[n];for(var l in r)vn.call(r,l)&&(e[l]=r[l])}return e}var We=Ge,pe=Ge.prototype;pe.space=null;pe.normal={};pe.property={};function Ge(e,n,r){this.property=e,this.normal=n,r&&(this.space=r)}var Se=xn,bn=We,Cn=An;function An(e){for(var n=e.length,r=[],l=[],u=-1,c,o;++u<n;)c=e[u],r.push(c.property),l.push(c.normal),o=c.space;return new bn(Se.apply(null,r),Se.apply(null,l),o)}var ge=wn;function wn(e){return e.toLowerCase()}var Ve=Ke,I=Ke.prototype;I.space=null;I.attribute=null;I.property=null;I.boolean=!1;I.booleanish=!1;I.overloadedBoolean=!1;I.number=!1;I.commaSeparated=!1;I.spaceSeparated=!1;I.commaOrSpaceSeparated=!1;I.mustUseProperty=!1;I.defined=!1;function Ke(e,n){this.property=e,this.attribute=n}var q={},kn=0;q.boolean=$();q.booleanish=$();q.overloadedBoolean=$();q.number=$();q.spaceSeparated=$();q.commaSeparated=$();q.commaOrSpaceSeparated=$();function $(){return Math.pow(2,++kn)}var _e=Ve,Ee=q,$e=de;de.prototype=new _e;de.prototype.defined=!0;var Je=["boolean","booleanish","overloadedBoolean","number","commaSeparated","spaceSeparated","commaOrSpaceSeparated"],Sn=Je.length;function de(e,n,r,l){var u=-1,c;for(Pe(this,"space",l),_e.call(this,e,n);++u<Sn;)c=Je[u],Pe(this,c,(r&Ee[c])===Ee[c])}function Pe(e,n,r){r&&(e[n]=r)}var Oe=ge,En=We,Pn=$e,re=On;function On(e){var n=e.space,r=e.mustUseProperty||[],l=e.attributes||{},u=e.properties,c=e.transform,o={},h={},d,a;for(d in u)a=new Pn(d,c(l,d),u[d],n),r.indexOf(d)!==-1&&(a.mustUseProperty=!0),o[d]=a,h[Oe(d)]=d,h[Oe(a.attribute)]=d;return new En(o,h,n)}var Dn=re,Ln=Dn({space:"xlink",transform:Nn,properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}});function Nn(e,n){return"xlink:"+n.slice(5).toLowerCase()}var Bn=re,Fn=Bn({space:"xml",transform:Mn,properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function Mn(e,n){return"xml:"+n.slice(3).toLowerCase()}var jn=Tn;function Tn(e,n){return n in e?e[n]:n}var In=jn,Xe=Un;function Un(e,n){return In(e,n.toLowerCase())}var Rn=re,Hn=Xe,qn=Rn({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:Hn,properties:{xmlns:null,xmlnsXLink:null}}),fe=q,zn=re,N=fe.booleanish,T=fe.number,_=fe.spaceSeparated,Wn=zn({transform:Gn,properties:{ariaActiveDescendant:null,ariaAtomic:N,ariaAutoComplete:null,ariaBusy:N,ariaChecked:N,ariaColCount:T,ariaColIndex:T,ariaColSpan:T,ariaControls:_,ariaCurrent:null,ariaDescribedBy:_,ariaDetails:null,ariaDisabled:N,ariaDropEffect:_,ariaErrorMessage:null,ariaExpanded:N,ariaFlowTo:_,ariaGrabbed:N,ariaHasPopup:null,ariaHidden:N,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:_,ariaLevel:T,ariaLive:null,ariaModal:N,ariaMultiLine:N,ariaMultiSelectable:N,ariaOrientation:null,ariaOwns:_,ariaPlaceholder:null,ariaPosInSet:T,ariaPressed:N,ariaReadOnly:N,ariaRelevant:null,ariaRequired:N,ariaRoleDescription:_,ariaRowCount:T,ariaRowIndex:T,ariaRowSpan:T,ariaSelected:N,ariaSetSize:T,ariaSort:null,ariaValueMax:T,ariaValueMin:T,ariaValueNow:T,ariaValueText:null,role:null}});function Gn(e,n){return n==="role"?n:"aria-"+n.slice(4).toLowerCase()}var Q=q,Vn=re,Kn=Xe,f=Q.boolean,_n=Q.overloadedBoolean,ee=Q.booleanish,b=Q.number,O=Q.spaceSeparated,ae=Q.commaSeparated,$n=Vn({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:Kn,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:ae,acceptCharset:O,accessKey:O,action:null,allow:null,allowFullScreen:f,allowPaymentRequest:f,allowUserMedia:f,alt:null,as:null,async:f,autoCapitalize:null,autoComplete:O,autoFocus:f,autoPlay:f,capture:f,charSet:null,checked:f,cite:null,className:O,cols:b,colSpan:null,content:null,contentEditable:ee,controls:f,controlsList:O,coords:b|ae,crossOrigin:null,data:null,dateTime:null,decoding:null,default:f,defer:f,dir:null,dirName:null,disabled:f,download:_n,draggable:ee,encType:null,enterKeyHint:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:f,formTarget:null,headers:O,height:b,hidden:f,high:b,href:null,hrefLang:null,htmlFor:O,httpEquiv:O,id:null,imageSizes:null,imageSrcSet:ae,inputMode:null,integrity:null,is:null,isMap:f,itemId:null,itemProp:O,itemRef:O,itemScope:f,itemType:O,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:f,low:b,manifest:null,max:null,maxLength:b,media:null,method:null,min:null,minLength:b,multiple:f,muted:f,name:null,nonce:null,noModule:f,noValidate:f,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforePrint:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextMenu:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:f,optimum:b,pattern:null,ping:O,placeholder:null,playsInline:f,poster:null,preload:null,readOnly:f,referrerPolicy:null,rel:O,required:f,reversed:f,rows:b,rowSpan:b,sandbox:O,scope:null,scoped:f,seamless:f,selected:f,shape:null,size:b,sizes:null,slot:null,span:b,spellCheck:ee,src:null,srcDoc:null,srcLang:null,srcSet:ae,start:b,step:null,style:null,tabIndex:b,target:null,title:null,translate:null,type:null,typeMustMatch:f,useMap:null,value:ee,width:b,wrap:null,align:null,aLink:null,archive:O,axis:null,background:null,bgColor:null,border:b,borderColor:null,bottomMargin:b,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:f,declare:f,event:null,face:null,frame:null,frameBorder:null,hSpace:b,leftMargin:b,link:null,longDesc:null,lowSrc:null,marginHeight:b,marginWidth:b,noResize:f,noHref:f,noShade:f,noWrap:f,object:null,profile:null,prompt:null,rev:null,rightMargin:b,rules:null,scheme:null,scrolling:ee,standby:null,summary:null,text:null,topMargin:b,valueType:null,version:null,vAlign:null,vLink:null,vSpace:b,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:f,disableRemotePlayback:f,prefix:null,property:null,results:b,security:null,unselectable:null}}),Jn=Cn,Xn=Ln,Yn=Fn,Zn=qn,Qn=Wn,er=$n,nr=Jn([Yn,Xn,Zn,Qn,er]),rr=ge,lr=$e,ar=Ve,me="data",tr=ur,or=/^data[-\w.:]+$/i,Ye=/-[a-z]/g,ir=/[A-Z]/g;function ur(e,n){var r=rr(n),l=n,u=ar;return r in e.normal?e.property[e.normal[r]]:(r.length>4&&r.slice(0,4)===me&&or.test(n)&&(n.charAt(4)==="-"?l=sr(n):n=cr(n),u=lr),new u(l,n))}function sr(e){var n=e.slice(5).replace(Ye,gr);return me+n.charAt(0).toUpperCase()+n.slice(1)}function cr(e){var n=e.slice(4);return Ye.test(n)?e:(n=n.replace(ir,pr),n.charAt(0)!=="-"&&(n="-"+n),me+n)}function pr(e){return"-"+e.toLowerCase()}function gr(e){return e.charAt(1).toUpperCase()}var dr=fr,De=/[#.]/g;function fr(e,n){for(var r=e||"",l=n||"div",u={},c=0,o,h,d;c<r.length;)De.lastIndex=c,d=De.exec(r),o=r.slice(c,d?d.index:r.length),o&&(h?h==="#"?u.id=o:u.className?u.className.push(o):u.className=[o]:l=o,c+=o.length),d&&(h=d[0],c++);return{type:"element",tagName:l,properties:u,children:[]}}var he={};he.parse=xr;he.stringify=vr;var Le="",mr=" ",hr=/[ \t\n\r\f]+/g;function xr(e){var n=String(e||Le).trim();return n===Le?[]:n.split(hr)}function vr(e){return e.join(mr).trim()}var xe={};xe.parse=yr;xe.stringify=br;var se=",",Ne=" ",ne="";function yr(e){for(var n=[],r=String(e||ne),l=r.indexOf(se),u=0,c=!1,o;!c;)l===-1&&(l=r.length,c=!0),o=r.slice(u,l).trim(),(o||!c)&&n.push(o),u=l+1,l=r.indexOf(se,u);return n}function br(e,n){var r=n||{},l=r.padLeft===!1?ne:Ne,u=r.padRight?Ne:ne;return e[e.length-1]===ne&&(e=e.concat(ne)),e.join(u+se+l).trim()}var Cr=tr,Be=ge,Ar=dr,Fe=he.parse,Me=xe.parse,wr=Sr,kr={}.hasOwnProperty;function Sr(e,n,r){var l=r?Lr(r):null;return u;function u(o,h){var d=Ar(o,n),a=Array.prototype.slice.call(arguments,2),i=d.tagName.toLowerCase(),t;if(d.tagName=l&&kr.call(l,i)?l[i]:i,h&&Er(h,d)&&(a.unshift(h),h=null),h)for(t in h)c(d.properties,t,h[t]);return Ze(d.children,a),d.tagName==="template"&&(d.content={type:"root",children:d.children},d.children=[]),d}function c(o,h,d){var a,i,t;d==null||d!==d||(a=Cr(e,h),i=a.property,t=d,typeof t=="string"&&(a.spaceSeparated?t=Fe(t):a.commaSeparated?t=Me(t):a.commaOrSpaceSeparated&&(t=Fe(Me(t).join(" ")))),i==="style"&&typeof d!="string"&&(t=Dr(t)),i==="className"&&o.className&&(t=o.className.concat(t)),o[i]=Or(a,i,t))}}function Er(e,n){return typeof e=="string"||"length"in e||Pr(n.tagName,e)}function Pr(e,n){var r=n.type;return e==="input"||!r||typeof r!="string"?!1:typeof n.children=="object"&&"length"in n.children?!0:(r=r.toLowerCase(),e==="button"?r!=="menu"&&r!=="submit"&&r!=="reset"&&r!=="button":"value"in n)}function Ze(e,n){var r,l;if(typeof n=="string"||typeof n=="number"){e.push({type:"text",value:String(n)});return}if(typeof n=="object"&&"length"in n){for(r=-1,l=n.length;++r<l;)Ze(e,n[r]);return}if(typeof n!="object"||!("type"in n))throw new Error("Expected node, nodes, or string, got `"+n+"`");e.push(n)}function Or(e,n,r){var l,u,c;if(typeof r!="object"||!("length"in r))return je(e,n,r);for(u=r.length,l=-1,c=[];++l<u;)c[l]=je(e,n,r[l]);return c}function je(e,n,r){var l=r;return e.number||e.positiveNumber?!isNaN(l)&&l!==""&&(l=Number(l)):(e.boolean||e.overloadedBoolean)&&typeof l=="string"&&(l===""||Be(r)===Be(n))&&(l=!0),l}function Dr(e){var n=[],r;for(r in e)n.push([r,e[r]].join(": "));return n.join("; ")}function Lr(e){for(var n=e.length,r=-1,l={},u;++r<n;)u=e[r],l[u.toLowerCase()]=u;return l}var Nr=nr,Br=wr,Qe=Br(Nr,"div");Qe.displayName="html";var Fr=Qe;(function(e){e.exports=Fr})(ze);const Mr="Æ",jr="&",Tr="Á",Ir="Â",Ur="À",Rr="Å",Hr="Ã",qr="Ä",zr="©",Wr="Ç",Gr="Ð",Vr="É",Kr="Ê",_r="È",$r="Ë",Jr=">",Xr="Í",Yr="Î",Zr="Ì",Qr="Ï",el="<",nl="Ñ",rl="Ó",ll="Ô",al="Ò",tl="Ø",ol="Õ",il="Ö",ul='"',sl="®",cl="Þ",pl="Ú",gl="Û",dl="Ù",fl="Ü",ml="Ý",hl="á",xl="â",vl="´",yl="æ",bl="à",Cl="&",Al="å",wl="ã",kl="ä",Sl="¦",El="ç",Pl="¸",Ol="¢",Dl="©",Ll="¤",Nl="°",Bl="÷",Fl="é",Ml="ê",jl="è",Tl="ð",Il="ë",Ul="½",Rl="¼",Hl="¾",ql=">",zl="í",Wl="î",Gl="¡",Vl="ì",Kl="¿",_l="ï",$l="«",Jl="<",Xl="¯",Yl="µ",Zl="·",Ql=" ",ea="¬",na="ñ",ra="ó",la="ô",aa="ò",ta="ª",oa="º",ia="ø",ua="õ",sa="ö",ca="¶",pa="±",ga="£",da='"',fa="»",ma="®",ha="§",xa="­",va="¹",ya="²",ba="³",Ca="ß",Aa="þ",wa="×",ka="ú",Sa="û",Ea="ù",Pa="¨",Oa="ü",Da="ý",La="¥",Na="ÿ",Ba={AElig:Mr,AMP:jr,Aacute:Tr,Acirc:Ir,Agrave:Ur,Aring:Rr,Atilde:Hr,Auml:qr,COPY:zr,Ccedil:Wr,ETH:Gr,Eacute:Vr,Ecirc:Kr,Egrave:_r,Euml:$r,GT:Jr,Iacute:Xr,Icirc:Yr,Igrave:Zr,Iuml:Qr,LT:el,Ntilde:nl,Oacute:rl,Ocirc:ll,Ograve:al,Oslash:tl,Otilde:ol,Ouml:il,QUOT:ul,REG:sl,THORN:cl,Uacute:pl,Ucirc:gl,Ugrave:dl,Uuml:fl,Yacute:ml,aacute:hl,acirc:xl,acute:vl,aelig:yl,agrave:bl,amp:Cl,aring:Al,atilde:wl,auml:kl,brvbar:Sl,ccedil:El,cedil:Pl,cent:Ol,copy:Dl,curren:Ll,deg:Nl,divide:Bl,eacute:Fl,ecirc:Ml,egrave:jl,eth:Tl,euml:Il,frac12:Ul,frac14:Rl,frac34:Hl,gt:ql,iacute:zl,icirc:Wl,iexcl:Gl,igrave:Vl,iquest:Kl,iuml:_l,laquo:$l,lt:Jl,macr:Xl,micro:Yl,middot:Zl,nbsp:Ql,not:ea,ntilde:na,oacute:ra,ocirc:la,ograve:aa,ordf:ta,ordm:oa,oslash:ia,otilde:ua,ouml:sa,para:ca,plusmn:pa,pound:ga,quot:da,raquo:fa,reg:ma,sect:ha,shy:xa,sup1:va,sup2:ya,sup3:ba,szlig:Ca,thorn:Aa,times:wa,uacute:ka,ucirc:Sa,ugrave:Ea,uml:Pa,uuml:Oa,yacute:Da,yen:La,yuml:Na},Fa={0:"�",128:"€",130:"‚",131:"ƒ",132:"„",133:"…",134:"†",135:"‡",136:"ˆ",137:"‰",138:"Š",139:"‹",140:"Œ",142:"Ž",145:"‘",146:"’",147:"“",148:"”",149:"•",150:"–",151:"—",152:"˜",153:"™",154:"š",155:"›",156:"œ",158:"ž",159:"Ÿ"};var en=Ma;function Ma(e){var n=typeof e=="string"?e.charCodeAt(0):e;return n>=48&&n<=57}var ja=Ta;function Ta(e){var n=typeof e=="string"?e.charCodeAt(0):e;return n>=97&&n<=102||n>=65&&n<=70||n>=48&&n<=57}var Ia=Ua;function Ua(e){var n=typeof e=="string"?e.charCodeAt(0):e;return n>=97&&n<=122||n>=65&&n<=90}var Ra=Ia,Ha=en,qa=za;function za(e){return Ra(e)||Ha(e)}var te,Wa=59,Ga=Va;function Va(e){var n="&"+e+";",r;return te=te||document.createElement("i"),te.innerHTML=n,r=te.textContent,r.charCodeAt(r.length-1)===Wa&&e!=="semi"||r===n?!1:r}var Te=Ba,Ie=Fa,Ka=en,_a=ja,nn=qa,$a=Ga,Ja=ut,Xa={}.hasOwnProperty,X=String.fromCharCode,Ya=Function.prototype,Ue={warning:null,reference:null,text:null,warningContext:null,referenceContext:null,textContext:null,position:{},additional:null,attribute:!1,nonTerminated:!0},Za=9,Re=10,Qa=12,et=32,He=38,nt=59,rt=60,lt=61,at=35,tt=88,ot=120,it=65533,Y="named",ve="hexadecimal",ye="decimal",be={};be[ve]=16;be[ye]=10;var oe={};oe[Y]=nn;oe[ye]=Ka;oe[ve]=_a;var rn=1,ln=2,an=3,tn=4,on=5,ce=6,un=7,V={};V[rn]="Named character references must be terminated by a semicolon";V[ln]="Numeric character references must be terminated by a semicolon";V[an]="Named character references cannot be empty";V[tn]="Numeric character references cannot be empty";V[on]="Named character references must be known";V[ce]="Numeric character references cannot be disallowed";V[un]="Numeric character references cannot be outside the permissible Unicode range";function ut(e,n){var r={},l,u;n||(n={});for(u in Ue)l=n[u],r[u]=l??Ue[u];return(r.position.indent||r.position.start)&&(r.indent=r.position.indent||[],r.position=r.position.start),st(e,r)}function st(e,n){var r=n.additional,l=n.nonTerminated,u=n.text,c=n.reference,o=n.warning,h=n.textContext,d=n.referenceContext,a=n.warningContext,i=n.position,t=n.indent||[],s=e.length,p=0,m=-1,x=i.column||1,g=i.line||1,y="",B=[],v,J,R,P,j,S,w,C,F,z,D,U,W,M,K,A,G,L,k;for(typeof r=="string"&&(r=r.charCodeAt(0)),A=H(),C=o?ie:Ya,p--,s++;++p<s;)if(j===Re&&(x=t[m]||1),j=e.charCodeAt(p),j===He){if(w=e.charCodeAt(p+1),w===Za||w===Re||w===Qa||w===et||w===He||w===rt||w!==w||r&&w===r){y+=X(j),x++;continue}for(W=p+1,U=W,k=W,w===at?(k=++U,w=e.charCodeAt(k),w===tt||w===ot?(M=ve,k=++U):M=ye):M=Y,v="",D="",P="",K=oe[M],k--;++k<s&&(w=e.charCodeAt(k),!!K(w));)P+=X(w),M===Y&&Xa.call(Te,P)&&(v=P,D=Te[P]);R=e.charCodeAt(k)===nt,R&&(k++,J=M===Y?$a(P):!1,J&&(v=P,D=J)),L=1+k-W,!R&&!l||(P?M===Y?(R&&!D?C(on,1):(v!==P&&(k=U+v.length,L=1+k-U,R=!1),R||(F=v?rn:an,n.attribute?(w=e.charCodeAt(k),w===lt?(C(F,L),D=null):nn(w)?D=null:C(F,L)):C(F,L))),S=D):(R||C(ln,L),S=parseInt(P,be[M]),ct(S)?(C(un,L),S=X(it)):S in Ie?(C(ce,L),S=Ie[S]):(z="",pt(S)&&C(ce,L),S>65535&&(S-=65536,z+=X(S>>>10|55296),S=56320|S&1023),S=z+X(S))):M!==Y&&C(tn,L)),S?(Ae(),A=H(),p=k-1,x+=k-W+1,B.push(S),G=H(),G.offset++,c&&c.call(d,S,{start:A,end:G},e.slice(W-1,k)),A=G):(P=e.slice(W-1,k),y+=P,x+=P.length,p=k-1)}else j===10&&(g++,m++,x=0),j===j?(y+=X(j),x++):Ae();return B.join("");function H(){return{line:g,column:x,offset:p+(i.offset||0)}}function ie(we,ke){var ue=H();ue.column+=ke,ue.offset+=ke,o.call(a,V[we],ue,we)}function Ae(){y&&(B.push(y),u&&u.call(h,y,{start:A,end:H()}),y="")}}function ct(e){return e>=55296&&e<=57343||e>1114111}function pt(e){return e>=1&&e<=8||e===11||e>=13&&e<=31||e>=127&&e<=159||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534}var sn={exports:{}};(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{},r=function(l){var u=/\blang(?:uage)?-([\w-]+)\b/i,c=0,o={manual:l.Prism&&l.Prism.manual,disableWorkerMessageHandler:l.Prism&&l.Prism.disableWorkerMessageHandler,util:{encode:function(a){return a instanceof h?new h(a.type,o.util.encode(a.content),a.alias):Array.isArray(a)?a.map(o.util.encode):a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).slice(8,-1)},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++c}),a.__id},clone:function a(i,t){var s,p,m=o.util.type(i);switch(t=t||{},m){case"Object":if(p=o.util.objId(i),t[p])return t[p];s={},t[p]=s;for(var x in i)i.hasOwnProperty(x)&&(s[x]=a(i[x],t));return s;case"Array":return p=o.util.objId(i),t[p]?t[p]:(s=[],t[p]=s,i.forEach(function(g,y){s[y]=a(g,t)}),s);default:return i}}},languages:{extend:function(a,i){var t=o.util.clone(o.languages[a]);for(var s in i)t[s]=i[s];return t},insertBefore:function(a,i,t,s){s=s||o.languages;var p=s[a],m={};for(var x in p)if(p.hasOwnProperty(x)){if(x==i)for(var g in t)t.hasOwnProperty(g)&&(m[g]=t[g]);t.hasOwnProperty(x)||(m[x]=p[x])}var y=s[a];return s[a]=m,o.languages.DFS(o.languages,function(B,v){v===y&&B!=a&&(this[B]=m)}),m},DFS:function a(i,t,s,p){p=p||{};var m=o.util.objId;for(var x in i)if(i.hasOwnProperty(x)){t.call(i,x,i[x],s||x);var g=i[x],y=o.util.type(g);y==="Object"&&!p[m(g)]?(p[m(g)]=!0,a(g,t,null,p)):y==="Array"&&!p[m(g)]&&(p[m(g)]=!0,a(g,t,x,p))}}},plugins:{},highlightAll:function(a,i){o.highlightAllUnder(document,a,i)},highlightAllUnder:function(a,i,t){var s={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",s);for(var p=a.querySelectorAll(s.selector),m=0,x;x=p[m++];)o.highlightElement(x,i===!0,s.callback)},highlightElement:function(a,i,t){for(var s="none",p,m=a;m&&!u.test(m.className);)m=m.parentNode;m&&(s=(m.className.match(u)||[,"none"])[1].toLowerCase(),p=o.languages[s]),a.className=a.className.replace(u,"").replace(/\s+/g," ")+" language-"+s,a.parentNode&&(m=a.parentNode,/pre/i.test(m.nodeName)&&(m.className=m.className.replace(u,"").replace(/\s+/g," ")+" language-"+s));var x=a.textContent,g={element:a,language:s,grammar:p,code:x},y=function(v){g.highlightedCode=v,o.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,o.hooks.run("after-highlight",g),o.hooks.run("complete",g),t&&t.call(g.element)};if(o.hooks.run("before-sanity-check",g),!g.code){o.hooks.run("complete",g);return}if(o.hooks.run("before-highlight",g),!g.grammar){y(o.util.encode(g.code));return}if(i&&l.Worker){var B=new Worker(o.filename);B.onmessage=function(v){y(v.data)},B.postMessage(JSON.stringify({language:g.language,code:g.code,immediateClose:!0}))}else y(o.highlight(g.code,g.grammar,g.language))},highlight:function(a,i,t){var s={code:a,grammar:i,language:t};return o.hooks.run("before-tokenize",s),s.tokens=o.tokenize(s.code,s.grammar),o.hooks.run("after-tokenize",s),h.stringify(o.util.encode(s.tokens),s.language)},matchGrammar:function(a,i,t,s,p,m,x){for(var g in t)if(!(!t.hasOwnProperty(g)||!t[g])){if(g==x)return;var y=t[g];y=o.util.type(y)==="Array"?y:[y];for(var B=0;B<y.length;++B){var v=y[B],J=v.inside,R=!!v.lookbehind,P=!!v.greedy,j=0,S=v.alias;if(P&&!v.pattern.global){var w=v.pattern.toString().match(/[imuy]*$/)[0];v.pattern=RegExp(v.pattern.source,w+"g")}v=v.pattern||v;for(var C=s,F=p;C<i.length;F+=i[C].length,++C){var z=i[C];if(i.length>a.length)return;if(!(z instanceof h)){if(P&&C!=i.length-1){v.lastIndex=F;var A=v.exec(a);if(!A)break;for(var K=A.index+(R?A[1].length:0),G=A.index+A[0].length,D=C,U=F,W=i.length;D<W&&(U<G||!i[D].type&&!i[D-1].greedy);++D)U+=i[D].length,K>=U&&(++C,F=U);if(i[C]instanceof h)continue;M=D-C,z=a.slice(F,U),A.index-=F}else{v.lastIndex=0;var A=v.exec(z),M=1}if(!A){if(m)break;continue}R&&(j=A[1]?A[1].length:0);var K=A.index+j,A=A[0].slice(j),G=K+A.length,L=z.slice(0,K),k=z.slice(G),H=[C,M];L&&(++C,F+=L.length,H.push(L));var ie=new h(g,J?o.tokenize(A,J):A,S,A,P);if(H.push(ie),k&&H.push(k),Array.prototype.splice.apply(i,H),M!=1&&o.matchGrammar(a,i,t,C,F,!0,g),m)break}}}}},tokenize:function(a,i){var t=[a],s=i.rest;if(s){for(var p in s)i[p]=s[p];delete i.rest}return o.matchGrammar(a,t,i,0,0,!1),t},hooks:{all:{},add:function(a,i){var t=o.hooks.all;t[a]=t[a]||[],t[a].push(i)},run:function(a,i){var t=o.hooks.all[a];if(!(!t||!t.length))for(var s=0,p;p=t[s++];)p(i)}},Token:h};l.Prism=o;function h(a,i,t,s,p){this.type=a,this.content=i,this.alias=t,this.length=(s||"").length|0,this.greedy=!!p}if(h.stringify=function(a,i){if(typeof a=="string")return a;if(Array.isArray(a))return a.map(function(m){return h.stringify(m,i)}).join("");var t={type:a.type,content:h.stringify(a.content,i),tag:"span",classes:["token",a.type],attributes:{},language:i};if(a.alias){var s=Array.isArray(a.alias)?a.alias:[a.alias];Array.prototype.push.apply(t.classes,s)}o.hooks.run("wrap",t);var p=Object.keys(t.attributes).map(function(m){return m+'="'+(t.attributes[m]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+t.tag+' class="'+t.classes.join(" ")+'"'+(p?" "+p:"")+">"+t.content+"</"+t.tag+">"},!l.document)return l.addEventListener&&(o.disableWorkerMessageHandler||l.addEventListener("message",function(a){var i=JSON.parse(a.data),t=i.language,s=i.code,p=i.immediateClose;l.postMessage(o.highlight(s,o.languages[t],t)),p&&l.close()},!1)),o;var d=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return d&&(o.filename=d.src,!o.manual&&!d.hasAttribute("data-manual")&&(document.readyState!=="loading"?window.requestAnimationFrame?window.requestAnimationFrame(o.highlightAll):window.setTimeout(o.highlightAll,16):document.addEventListener("DOMContentLoaded",o.highlightAll))),o}(n);e.exports&&(e.exports=r),typeof Z<"u"&&(Z.Prism=r)})(sn);var gt=Ot(),dt=typeof window>"u"?typeof self>"u"?{}:self:window;dt.Prism={manual:!0,disableWorkerMessageHandler:!0};var ft=ze.exports,mt=Ja,cn=sn.exports,ht=gn,xt=dn,vt=fn,yt=mn;gt();var Ce={}.hasOwnProperty;function pn(){}pn.prototype=cn;var E=new pn,qe=E;E.highlight=Ct;E.register=le;E.alias=bt;E.registered=At;E.listLanguages=wt;le(ht);le(xt);le(vt);le(yt);E.util.encode=Et;E.Token.stringify=kt;function le(e){if(typeof e!="function"||!e.displayName)throw new Error("Expected `function` for `grammar`, got `"+e+"`");E.languages[e.displayName]===void 0&&e(E)}function bt(e,n){var r=E.languages,l=e,u,c,o,h;n&&(l={},l[e]=n);for(u in l)for(c=l[u],c=typeof c=="string"?[c]:c,o=c.length,h=-1;++h<o;)r[c[h]]=r[u]}function Ct(e,n){var r=cn.highlight,l;if(typeof e!="string")throw new Error("Expected `string` for `value`, got `"+e+"`");if(E.util.type(n)==="Object")l=n,n=null;else{if(typeof n!="string")throw new Error("Expected `string` for `name`, got `"+n+"`");if(Ce.call(E.languages,n))l=E.languages[n];else throw new Error("Unknown language: `"+n+"` is not registered")}return r.call(this,e,l,n)}function At(e){if(typeof e!="string")throw new Error("Expected `string` for `language`, got `"+e+"`");return Ce.call(E.languages,e)}function wt(){var e=E.languages,n=[],r;for(r in e)Ce.call(e,r)&&typeof e[r]=="object"&&n.push(r);return n}function kt(e,n,r){var l;return typeof e=="string"?{type:"text",value:e}:E.util.type(e)==="Array"?St(e,n):(l={type:e.type,content:E.Token.stringify(e.content,n,r),tag:"span",classes:["token",e.type],attributes:{},language:n,parent:r},e.alias&&(l.classes=l.classes.concat(e.alias)),E.hooks.run("wrap",l),ft(l.tag+"."+l.classes.join("."),Pt(l.attributes),l.content))}function St(e,n){for(var r=[],l=e.length,u=-1,c;++u<l;)c=e[u],c!==""&&c!==null&&c!==void 0&&r.push(c);for(u=-1,l=r.length;++u<l;)c=r[u],r[u]=E.Token.stringify(c,n,r);return r}function Et(e){return e}function Pt(e){var n;for(n in e)e[n]=mt(e[n]);return e}function Ot(){var e="Prism"in Z,n=e?Z.Prism:void 0;return r;function r(){e?Z.Prism=n:delete Z.Prism,e=void 0,n=void 0}}const Mt=hn({__proto__:null,default:qe},[qe]);export{Mt as c};
