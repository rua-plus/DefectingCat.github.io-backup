"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[460],{9460:function(a,b,c){c.r(b);var d=c(5893),e=c(2684),f=c(8527),g=c(1951);b.default=function(a){var b,c=a.src,h=a.children,i=(0,g.Z)(c,"8px"),j=i.initSrc,k=i.blur,l=i.targetRef,m=function(a){if(Array.isArray(a))return a}(b=(0,e.ac)("(min-width: 640px)"))||function(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{d||null==h.return||h.return()}finally{if(e)throw f}}return c}(b,1)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}(),n=m[0];return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(f.oM,{filter:k,w:"100%",transitionDuration:"slower",ratio:n?16/9:4/3,children:(0,d.jsx)(f.xu,{as:"iframe",src:j,ref:l,borderRadius:"10px",overflow:"hidden",children:h})})})}},1951:function(a,b,c){var d=c(7294);b.Z=function(a,b){var c=(0,d.useRef)(null),e=(0,d.useState)("blur(".concat(void 0===b?"10px":b,")")),f=e[0],g=e[1],h=(0,d.useState)("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),i=h[0],j=h[1],k=function(){g("unset")},l=(0,d.useCallback)(function(b,d){b.forEach(function(b){b.isIntersecting&&c.current&&(j(a),d.unobserve(c.current),c.current.addEventListener("load",k))})},[a]);return(0,d.useEffect)(function(){var a=new IntersectionObserver(l);c.current&&a.observe(c.current);var b=c.current;return function(){b&&b.removeEventListener("load",k)}},[l,a]),{initSrc:i,blur:f,targetRef:c}}}}])