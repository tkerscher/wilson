var O=Object.defineProperty;var j=(i,e,t)=>e in i?O(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var R=(i,e,t)=>(j(i,typeof e!="symbol"?e+"":e,t),t),S=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var n=(i,e,t)=>(S(i,e,"read from private field"),t?t.call(i):e.get(i)),p=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},h=(i,e,t,o)=>(S(i,e,"write to private field"),o?o.call(i,t):e.set(i,t),t);var a=(i,e,t)=>(S(i,e,"access private method"),t);import{P as T}from"./main-4653e2d8.js";import{t as v}from"./screenshot-30c1f04e.js";import"./openPlot-31eb4d43.js";function z(){return new Worker(""+new URL("script-1966d850.js",import.meta.url).href,{type:"module"})}var b,l,y,d,f,g,u,k,P,F,s,r;class A{constructor(e){p(this,s);p(this,b,void 0);p(this,l,void 0);R(this,"Ready");p(this,y,NaN);p(this,d,!0);p(this,f,!0);p(this,g,1);p(this,u,!0);p(this,k,[]);p(this,P,[]);p(this,F,[]);R(this,"screenshotFilename","");h(this,b,e);const t=new z;h(this,l,t);const o=this;function w(E){const m=E.data;switch(m.type){case"onAnimationLoop":n(o,k).forEach(c=>c());break;case"onFrameChanged":h(o,y,m.currentFrame),n(o,P).forEach(c=>c(m.currentFrame));break;case"onObjectPicked":n(o,F).forEach(c=>c(m.objectId));break}}this.Ready=new Promise(E=>{t.onmessage=c=>{t.onmessage=w;const C=c.data;h(o,y,C.currentFrame),h(o,d,C.isPlaying),h(o,f,C.isStatic),h(o,g,C.speedRatio),h(o,u,C.isGridEnabled),E()};const m=e.transferControlToOffscreen();t.postMessage({canvas:m},[m])})}get currentFrame(){return n(this,y)}get isPlaying(){return n(this,d)}get isStatic(){return n(this,f)}get speedRatio(){return n(this,g)}set speedRatio(e){h(this,g,e),a(this,s,r).call(this,{type:"setSpeedRatio",value:e})}load(e){var o;const t=T.encode(e).finish().buffer;a(this,s,r).call(this,{type:"load",data:t},[t]),this.screenshotFilename=(((o=e.meta)==null?void 0:o.name)??"Screenshot")+".png"}loadStage(e){a(this,s,r).call(this,{type:"loadStage",url:e})}removeStage(){a(this,s,r).call(this,{type:"removeStage"})}play(){h(this,d,!0),a(this,s,r).call(this,{type:"play"})}pause(){h(this,d,!1),a(this,s,r).call(this,{type:"pause"})}goToFrame(e){a(this,s,r).call(this,{type:"goToFrame",frame:e})}registerOnFrameChanged(e){n(this,P).push(e)}registerOnAnimationLoop(e){n(this,k).push(e)}resetCamera(){a(this,s,r).call(this,{type:"resetCamera"})}select(e){a(this,s,r).call(this,{type:"select",id:e})}target(e){a(this,s,r).call(this,{type:"target",id:e})}setObjectsEnabled(e,t){a(this,s,r).call(this,{type:"setObjectsEnabled",objectIds:e,enabled:t})}setPathEnabled(e,t,o){a(this,s,r).call(this,{type:"setPathEnabled",id:e,enabled:t,color:o})}registerOnObjectPicked(e){n(this,F).push(e)}get isGridEnabled(){return n(this,u)}setGridEnabled(e){h(this,u,e),a(this,s,r).call(this,{type:"setGridEnabled",enabled:e})}resize(e,t){a(this,s,r).call(this,{type:"resize",width:e,height:t})}setTheme(e){a(this,s,r).call(this,{type:"setTheme",theme:e})}dispose(){n(this,l).terminate()}screenshot(){v(n(this,b),this.screenshotFilename)}simulatePointerDown(e,t){a(this,s,r).call(this,{type:"pointerDown",x:e,y:t})}simulatePointerUp(e,t){a(this,s,r).call(this,{type:"pointerUp",x:e,y:t})}simulatePointerMove(e,t){a(this,s,r).call(this,{type:"pointermove",x:e,y:t})}panCamera(e,t){a(this,s,r).call(this,{type:"panCamera",dx:e,dy:t})}rotateCamera(e,t){a(this,s,r).call(this,{type:"rotateCamera",alpha:e,beta:t})}zoomCamera(e){a(this,s,r).call(this,{type:"zoom",delta:e})}setCameraTarget(e,t,o){a(this,s,r).call(this,{type:"setCameraTarget",x:e,y:t,z:o})}setCameraRotation(e,t){a(this,s,r).call(this,{type:"setCameraRotation",alpha:e,beta:t})}setCameraZoom(e){a(this,s,r).call(this,{type:"setCameraZoom",distance:e})}}b=new WeakMap,l=new WeakMap,y=new WeakMap,d=new WeakMap,f=new WeakMap,g=new WeakMap,u=new WeakMap,k=new WeakMap,P=new WeakMap,F=new WeakMap,s=new WeakSet,r=function(e,t){n(this,l).postMessage(e,t)};export{A as WorkerController};
