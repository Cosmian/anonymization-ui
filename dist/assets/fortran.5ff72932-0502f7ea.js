function A(E,r){for(var N=0;N<r.length;N++){const e=r[N];if(typeof e!="string"&&!Array.isArray(e)){for(const T in e)if(T!=="default"&&!(T in E)){const t=Object.getOwnPropertyDescriptor(e,T);t&&Object.defineProperty(E,T,t.get?t:{enumerable:!0,get:()=>e[T]})}}}return Object.freeze(Object.defineProperty(E,Symbol.toStringTag,{value:"Module"}))}var L,n;function I(){if(n)return L;n=1,L=E,E.displayName="fortran",E.aliases=[];function E(r){r.languages.fortran={"quoted-number":{pattern:/[BOZ](['"])[A-F0-9]+\1/i,alias:"number"},string:{pattern:/(?:\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!\1).)*(?:\1|&)/,inside:{comment:{pattern:/(&(?:\r\n?|\n)\s*)!.*/,lookbehind:!0}}},comment:{pattern:/!.*/,greedy:!0},boolean:/\.(?:TRUE|FALSE)\.(?:_\w+)?/i,number:/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,keyword:[/\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i,/\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i,/\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i,/\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i],operator:[/\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i,{pattern:/(^|(?!\().)\/(?!\))/,lookbehind:!0}],punctuation:/\(\/|\/\)|[(),;:&]/}}return L}var O=I();const R=A({__proto__:null,default:O},[O]);export{R as f};
