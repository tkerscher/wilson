import{A as Qi,a as tt,M as ne,L as H,D as Hn,T as w,O as Y,d as ji,R as kn,c as Xn,_ as m,s as T,K as Yn,V as A,C as It,P as _e,e as zn,f as rt,g as X,h as Wn,i as vt,j as Kn,k as ft,E as D,l as Oi,m as U,n as F,o as yi,B as ze,p as Qn,q as _t,r as jn,N as Ti,t as B,u as ee,v as qi,w as Ve,x as Zi,y as qn,z as gi,F as V,G as le,H as ke,J as Zn,Q as Ee,U as Ji,W as $i,X as Ht,Y as Jn,Z as Ri,$ as $n,a0 as y,a1 as k,a2 as Ne,a3 as ce,a4 as Et,a5 as es,a6 as gt,a7 as en,a8 as Oe,a9 as Ci,aa as xt,ab as ts,ac as is,ad as ns,ae as ss,af as C,ag as st,ah as Ke,ai as xe,aj as Pt,ak as Mt,al as be,am as x,an as P,ao as rs,ap as as,aq as os,ar as ls,as as bi,at as Dt,au as cs,av as fs,aw as Ft,ax as at,ay as hs,b as us,az as ds,aA as Li,aB as _s,aC as Es,aD as tn,I as ms,aE as ps,aF as As,aG as Ts,aH as gs,aI as Rs,aJ as Cs}from"./script.98c04870.js";import{SceneLoader as Pi}from"./sceneLoader.78e45944.js";class Ss extends Qi{}class Is{constructor(){this.rootNodes=[],this.skeletons=[],this.animationGroups=[]}}class vs extends Qi{constructor(e){super(),this._wasAddedToScene=!1,e=e||tt.LastCreatedScene,e&&(this.scene=e,this.sounds=[],this.effectLayers=[],this.layers=[],this.lensFlareSystems=[],this.proceduralTextures=[],this.reflectionProbes=[],e.onDisposeObservable.add(()=>{this._wasAddedToScene||this.dispose()}),this._onContextRestoredObserver=e.getEngine().onContextRestoredObservable.add(()=>{for(const t of this.geometries)t._rebuild();for(const t of this.meshes)t._rebuild();for(const t of this.particleSystems)t.rebuild();for(const t of this.textures)t._rebuild()}))}instantiateModelsToScene(e,t=!1,i){const n={},s={},r=new Is,o=[],l=[],c={doNotInstantiate:!0,...i};c.doNotInstantiate||(c.doNotInstantiate=d=>!!d.skeleton);const f=(d,E)=>{if(n[d.uniqueId]=E.uniqueId,s[E.uniqueId]=E,e&&(E.name=e(d.name)),E instanceof ne){const p=E;if(p.morphTargetManager){const g=d.morphTargetManager;p.morphTargetManager=g.clone();for(let R=0;R<g.numTargets;R++){const M=g.getTarget(R),b=p.morphTargetManager.getTarget(R);n[M.uniqueId]=b.uniqueId,s[b.uniqueId]=b}}}};this.transformNodes.forEach(d=>{if(!(c.predicate&&!c.predicate(d))&&!d.parent){const E=d.instantiateHierarchy(null,c,(p,g)=>{f(p,g)});E&&r.rootNodes.push(E)}});const u=this.meshes.some(d=>d.getClassName()==="InstancedMesh"),h=[],_=(d,E)=>{if(f(d,E),E.material){const p=E;if(p.material)if(t){const g=d.material;if(l.indexOf(g)===-1){let R=g.clone(e?e(g.name):"Clone of "+g.name);if(l.push(g),n[g.uniqueId]=R.uniqueId,s[R.uniqueId]=R,g.getClassName()==="MultiMaterial"){const M=g;for(const b of M.subMaterials)!b||(R=b.clone(e?e(b.name):"Clone of "+b.name),l.push(b),n[b.uniqueId]=R.uniqueId,s[R.uniqueId]=R);M.subMaterials=M.subMaterials.map(b=>b&&s[n[b.uniqueId]])}}p.getClassName()!=="InstancedMesh"&&(p.material=s[n[g.uniqueId]])}else p.material.getClassName()==="MultiMaterial"?this.scene.multiMaterials.indexOf(p.material)===-1&&this.scene.addMultiMaterial(p.material):this.scene.materials.indexOf(p.material)===-1&&this.scene.addMaterial(p.material)}};return this.meshes.forEach((d,E)=>{if(!(c.predicate&&!c.predicate(d))&&!d.parent){const p=d.getClassName()==="InstancedMesh";let g;if(p){const b=d.sourceMesh,O=this.meshes.indexOf(b);O!==-1&&h[O]&&(g=h[O])}const R=p?d.instantiateHierarchy(null,{...c,newSourcedMesh:g},_):d.instantiateHierarchy(null,c,_);R&&(u&&R.getClassName()!=="InstancedMesh"&&(h[E]=R),r.rootNodes.push(R))}}),this.skeletons.forEach(d=>{if(c.predicate&&!c.predicate(d))return;const E=d.clone(e?e(d.name):"Clone of "+d.name);for(const p of this.meshes)if(p.skeleton===d&&!p.isAnInstance){const g=s[n[p.uniqueId]];if(g.isAnInstance||(g.skeleton=E,o.indexOf(E)!==-1))continue;o.push(E);for(const R of E.bones)R._linkedTransformNode&&(R._linkedTransformNode=s[n[R._linkedTransformNode.uniqueId]])}r.skeletons.push(E)}),this.animationGroups.forEach(d=>{if(c.predicate&&!c.predicate(d))return;const E=d.clone(e?e(d.name):"Clone of "+d.name,p=>s[n[p.uniqueId]]||p);r.animationGroups.push(E)}),r}addAllToScene(){if(!this._wasAddedToScene){this._wasAddedToScene=!0,this.addToScene(null),this.environmentTexture&&(this.scene.environmentTexture=this.environmentTexture);for(const e of this.scene._serializableComponents)e.addFromContainer(this);this.scene.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver),this._onContextRestoredObserver=null}}addToScene(e=null){this.cameras.forEach(t=>{e&&!e(t)||this.scene.addCamera(t)}),this.lights.forEach(t=>{e&&!e(t)||this.scene.addLight(t)}),this.meshes.forEach(t=>{e&&!e(t)||this.scene.addMesh(t)}),this.skeletons.forEach(t=>{e&&!e(t)||this.scene.addSkeleton(t)}),this.animations.forEach(t=>{e&&!e(t)||this.scene.addAnimation(t)}),this.animationGroups.forEach(t=>{e&&!e(t)||this.scene.addAnimationGroup(t)}),this.multiMaterials.forEach(t=>{e&&!e(t)||this.scene.addMultiMaterial(t)}),this.materials.forEach(t=>{e&&!e(t)||this.scene.addMaterial(t)}),this.morphTargetManagers.forEach(t=>{e&&!e(t)||this.scene.addMorphTargetManager(t)}),this.geometries.forEach(t=>{e&&!e(t)||this.scene.addGeometry(t)}),this.transformNodes.forEach(t=>{e&&!e(t)||this.scene.addTransformNode(t)}),this.actionManagers.forEach(t=>{e&&!e(t)||this.scene.addActionManager(t)}),this.textures.forEach(t=>{e&&!e(t)||this.scene.addTexture(t)}),this.reflectionProbes.forEach(t=>{e&&!e(t)||this.scene.addReflectionProbe(t)})}removeAllFromScene(){this._wasAddedToScene=!1,this.removeFromScene(null),this.environmentTexture===this.scene.environmentTexture&&(this.scene.environmentTexture=null);for(const e of this.scene._serializableComponents)e.removeFromContainer(this)}removeFromScene(e=null){this.cameras.forEach(t=>{e&&!e(t)||this.scene.removeCamera(t)}),this.lights.forEach(t=>{e&&!e(t)||this.scene.removeLight(t)}),this.meshes.forEach(t=>{e&&!e(t)||this.scene.removeMesh(t)}),this.skeletons.forEach(t=>{e&&!e(t)||this.scene.removeSkeleton(t)}),this.animations.forEach(t=>{e&&!e(t)||this.scene.removeAnimation(t)}),this.animationGroups.forEach(t=>{e&&!e(t)||this.scene.removeAnimationGroup(t)}),this.multiMaterials.forEach(t=>{e&&!e(t)||this.scene.removeMultiMaterial(t)}),this.materials.forEach(t=>{e&&!e(t)||this.scene.removeMaterial(t)}),this.morphTargetManagers.forEach(t=>{e&&!e(t)||this.scene.removeMorphTargetManager(t)}),this.geometries.forEach(t=>{e&&!e(t)||this.scene.removeGeometry(t)}),this.transformNodes.forEach(t=>{e&&!e(t)||this.scene.removeTransformNode(t)}),this.actionManagers.forEach(t=>{e&&!e(t)||this.scene.removeActionManager(t)}),this.textures.forEach(t=>{e&&!e(t)||this.scene.removeTexture(t)}),this.reflectionProbes.forEach(t=>{e&&!e(t)||this.scene.removeReflectionProbe(t)})}dispose(){this.cameras.slice(0).forEach(e=>{e.dispose()}),this.cameras.length=0,this.lights.slice(0).forEach(e=>{e.dispose()}),this.lights.length=0,this.meshes.slice(0).forEach(e=>{e.dispose()}),this.meshes.length=0,this.skeletons.slice(0).forEach(e=>{e.dispose()}),this.skeletons.length=0,this.animationGroups.slice(0).forEach(e=>{e.dispose()}),this.animationGroups.length=0,this.multiMaterials.slice(0).forEach(e=>{e.dispose()}),this.multiMaterials.length=0,this.materials.slice(0).forEach(e=>{e.dispose()}),this.materials.length=0,this.geometries.slice(0).forEach(e=>{e.dispose()}),this.geometries.length=0,this.transformNodes.slice(0).forEach(e=>{e.dispose()}),this.transformNodes.length=0,this.actionManagers.slice(0).forEach(e=>{e.dispose()}),this.actionManagers.length=0,this.textures.slice(0).forEach(e=>{e.dispose()}),this.textures.length=0,this.reflectionProbes.slice(0).forEach(e=>{e.dispose()}),this.reflectionProbes.length=0,this.environmentTexture&&(this.environmentTexture.dispose(),this.environmentTexture=null);for(const e of this.scene._serializableComponents)e.removeFromContainer(this,!0);this._onContextRestoredObserver&&(this.scene.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver),this._onContextRestoredObserver=null)}_moveAssets(e,t,i){if(!(!e||!t))for(const n of e){let s=!0;if(i){for(const r of i)if(n===r){s=!1;break}}s&&(t.push(n),n._parentContainer=this)}}moveAllFromScene(e){this._wasAddedToScene=!1,e===void 0&&(e=new Ss);for(const t in this)Object.prototype.hasOwnProperty.call(this,t)&&(this[t]=this[t]||(t==="_environmentTexture"?null:[]),this._moveAssets(this.scene[t],this[t],e[t]));this.environmentTexture=this.scene.environmentTexture,this.removeAllFromScene()}createRootMesh(){const e=new ne("assetContainerRootMesh",this.scene);return this.meshes.forEach(t=>{t.parent||e.addChild(t)}),this.meshes.unshift(e),e}mergeAnimationsTo(e=tt.LastCreatedScene,t,i=null){if(!e)return H.Error("No scene available to merge animations to"),[];const n=i||(o=>{let l=null;const c=o.animations.length?o.animations[0].targetProperty:"",f=o.name.split(".").join("").split("_primitive")[0];switch(c){case"position":case"rotationQuaternion":l=e.getTransformNodeByName(o.name)||e.getTransformNodeByName(f);break;case"influence":l=e.getMorphTargetByName(o.name)||e.getMorphTargetByName(f);break;default:l=e.getNodeByName(o.name)||e.getNodeByName(f)}return l});this.getNodes().forEach(o=>{const l=n(o);if(l!==null){for(const c of o.animations){const f=l.animations.filter(u=>u.targetProperty===c.targetProperty);for(const u of f){const h=l.animations.indexOf(u,0);h>-1&&l.animations.splice(h,1)}}l.animations=l.animations.concat(o.animations)}});const r=new Array;return this.animationGroups.slice().forEach(o=>{r.push(o.clone(o.name,n)),o.animatables.forEach(l=>{l.stop()})}),t.forEach(o=>{const l=n(o.target);l&&(e.beginAnimation(l,o.fromFrame,o.toFrame,o.loopAnimation,o.speedRatio,o.onAnimationEnd?o.onAnimationEnd:void 0,void 0,!0,void 0,o.onAnimationLoop?o.onAnimationLoop:void 0),e.stopAnimation(o.target))}),r}}class Bt{constructor(e){this.byteOffset=0,this.buffer=e}loadAsync(e){return this.buffer.readAsync(this.byteOffset,e).then(t=>{this._dataView=new DataView(t.buffer,t.byteOffset,t.byteLength),this._dataByteOffset=0})}readUint32(){const e=this._dataView.getUint32(this._dataByteOffset,!0);return this._dataByteOffset+=4,this.byteOffset+=4,e}readUint8Array(e){const t=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._dataByteOffset,e);return this._dataByteOffset+=e,this.byteOffset+=e,t}readString(e){return Hn(this.readUint8Array(e))}skipBytes(e){this._dataByteOffset+=e,this.byteOffset+=e}}function kt(a,e,t,i){const n={externalResourceFunction:s=>i(s).then(r=>new Uint8Array(r))};return t&&(n.uri=e==="file:"?t:e+t),a instanceof ArrayBuffer?GLTFValidator.validateBytes(new Uint8Array(a),n):GLTFValidator.validateString(a,n)}function xs(){const a=[];onmessage=e=>{const t=e.data;switch(t.id){case"init":{importScripts(t.url);break}case"validate":{kt(t.data,t.rootUrl,t.fileName,i=>new Promise((n,s)=>{const r=a.length;a.push({resolve:n,reject:s}),postMessage({id:"getExternalResource",index:r,uri:i})})).then(i=>{postMessage({id:"validate.resolve",value:i})},i=>{postMessage({id:"validate.reject",reason:i})});break}case"getExternalResource.resolve":{a[t.index].resolve(t.value);break}case"getExternalResource.reject":{a[t.index].reject(t.reason);break}}}}class nn{static ValidateAsync(e,t,i,n){return typeof Worker=="function"?new Promise((s,r)=>{const o=`${kt}(${xs})()`,l=URL.createObjectURL(new Blob([o],{type:"application/javascript"})),c=new Worker(l),f=h=>{c.removeEventListener("error",f),c.removeEventListener("message",u),r(h)},u=h=>{const _=h.data;switch(_.id){case"getExternalResource":{n(_.uri).then(d=>{c.postMessage({id:"getExternalResource.resolve",index:_.index,value:d},[d])},d=>{c.postMessage({id:"getExternalResource.reject",index:_.index,reason:d})});break}case"validate.resolve":{c.removeEventListener("error",f),c.removeEventListener("message",u),s(_.value),c.terminate();break}case"validate.reject":c.removeEventListener("error",f),c.removeEventListener("message",u),r(_.reason),c.terminate()}};c.addEventListener("error",f),c.addEventListener("message",u),c.postMessage({id:"init",url:this.Configuration.url}),c.postMessage({id:"validate",data:e,rootUrl:t,fileName:i})}):(this._LoadScriptPromise||(this._LoadScriptPromise=w.LoadScriptAsync(this.Configuration.url)),this._LoadScriptPromise.then(()=>kt(e,t,i,n)))}}nn.Configuration={url:"https://preview.babylonjs.com/gltf_validator.js"};function Di(a,e,t){try{return Promise.resolve(new Uint8Array(a,e,t))}catch(i){return Promise.reject(i)}}var ht;(function(a){a[a.AUTO=0]="AUTO",a[a.FORCE_RIGHT_HANDED=1]="FORCE_RIGHT_HANDED"})(ht||(ht={}));var Je;(function(a){a[a.NONE=0]="NONE",a[a.FIRST=1]="FIRST",a[a.ALL=2]="ALL"})(Je||(Je={}));var Ae;(function(a){a[a.LOADING=0]="LOADING",a[a.READY=1]="READY",a[a.COMPLETE=2]="COMPLETE"})(Ae||(Ae={}));class q{constructor(){this.onParsedObservable=new Y,this.coordinateSystemMode=ht.AUTO,this.animationStartMode=Je.FIRST,this.compileMaterials=!1,this.useClipPlane=!1,this.compileShadowGenerators=!1,this.transparencyAsCoverage=!1,this.useRangeRequests=!1,this.createInstances=!0,this.alwaysComputeBoundingBox=!1,this.loadAllMaterials=!1,this.loadOnlyMaterials=!1,this.skipMaterials=!1,this.useSRGBBuffers=!0,this.targetFps=60,this.alwaysComputeSkeletonRootNode=!1,this.preprocessUrlAsync=e=>Promise.resolve(e),this.onMeshLoadedObservable=new Y,this.onSkinLoadedObservable=new Y,this.onTextureLoadedObservable=new Y,this.onMaterialLoadedObservable=new Y,this.onCameraLoadedObservable=new Y,this.onCompleteObservable=new Y,this.onErrorObservable=new Y,this.onDisposeObservable=new Y,this.onExtensionLoadedObservable=new Y,this.validate=!1,this.onValidatedObservable=new Y,this._loader=null,this._state=null,this._requests=new Array,this.name="gltf",this.extensions={".gltf":{isBinary:!1},".glb":{isBinary:!0}},this.onLoaderStateChangedObservable=new Y,this._logIndentLevel=0,this._loggingEnabled=!1,this._log=this._logDisabled,this._capturePerformanceCounters=!1,this._startPerformanceCounter=this._startPerformanceCounterDisabled,this._endPerformanceCounter=this._endPerformanceCounterDisabled}set onParsed(e){this._onParsedObserver&&this.onParsedObservable.remove(this._onParsedObserver),this._onParsedObserver=this.onParsedObservable.add(e)}set onMeshLoaded(e){this._onMeshLoadedObserver&&this.onMeshLoadedObservable.remove(this._onMeshLoadedObserver),this._onMeshLoadedObserver=this.onMeshLoadedObservable.add(e)}set onTextureLoaded(e){this._onTextureLoadedObserver&&this.onTextureLoadedObservable.remove(this._onTextureLoadedObserver),this._onTextureLoadedObserver=this.onTextureLoadedObservable.add(e)}set onMaterialLoaded(e){this._onMaterialLoadedObserver&&this.onMaterialLoadedObservable.remove(this._onMaterialLoadedObserver),this._onMaterialLoadedObserver=this.onMaterialLoadedObservable.add(e)}set onCameraLoaded(e){this._onCameraLoadedObserver&&this.onCameraLoadedObservable.remove(this._onCameraLoadedObserver),this._onCameraLoadedObserver=this.onCameraLoadedObservable.add(e)}set onComplete(e){this._onCompleteObserver&&this.onCompleteObservable.remove(this._onCompleteObserver),this._onCompleteObserver=this.onCompleteObservable.add(e)}set onError(e){this._onErrorObserver&&this.onErrorObservable.remove(this._onErrorObserver),this._onErrorObserver=this.onErrorObservable.add(e)}set onDispose(e){this._onDisposeObserver&&this.onDisposeObservable.remove(this._onDisposeObserver),this._onDisposeObserver=this.onDisposeObservable.add(e)}set onExtensionLoaded(e){this._onExtensionLoadedObserver&&this.onExtensionLoadedObservable.remove(this._onExtensionLoadedObserver),this._onExtensionLoadedObserver=this.onExtensionLoadedObservable.add(e)}get loggingEnabled(){return this._loggingEnabled}set loggingEnabled(e){this._loggingEnabled!==e&&(this._loggingEnabled=e,this._loggingEnabled?this._log=this._logEnabled:this._log=this._logDisabled)}get capturePerformanceCounters(){return this._capturePerformanceCounters}set capturePerformanceCounters(e){this._capturePerformanceCounters!==e&&(this._capturePerformanceCounters=e,this._capturePerformanceCounters?(this._startPerformanceCounter=this._startPerformanceCounterEnabled,this._endPerformanceCounter=this._endPerformanceCounterEnabled):(this._startPerformanceCounter=this._startPerformanceCounterDisabled,this._endPerformanceCounter=this._endPerformanceCounterDisabled))}set onValidated(e){this._onValidatedObserver&&this.onValidatedObservable.remove(this._onValidatedObserver),this._onValidatedObserver=this.onValidatedObservable.add(e)}dispose(){this._loader&&(this._loader.dispose(),this._loader=null);for(const e of this._requests)e.abort();this._requests.length=0,delete this._progressCallback,this.preprocessUrlAsync=e=>Promise.resolve(e),this.onMeshLoadedObservable.clear(),this.onSkinLoadedObservable.clear(),this.onTextureLoadedObservable.clear(),this.onMaterialLoadedObservable.clear(),this.onCameraLoadedObservable.clear(),this.onCompleteObservable.clear(),this.onExtensionLoadedObservable.clear(),this.onDisposeObservable.notifyObservers(void 0),this.onDisposeObservable.clear()}loadFile(e,t,i,n,s,r){this._progressCallback=n;const o=t.name?"file:":w.GetFolderPath(t),l=t.name||w.GetFilename(t);if(s){if(this.useRangeRequests){this.validate&&H.Warn("glTF validation is not supported when range requests are enabled");const c={abort:()=>{},onCompleteObservable:new Y},f={readAsync:(u,h)=>new Promise((_,d)=>{this._loadFile(e,t,E=>{_(new Uint8Array(E))},!0,E=>{d(E)},E=>{E.setRequestHeader("Range",`bytes=${u}-${u+h-1}`)})}),byteLength:0};return this._unpackBinaryAsync(new Bt(f)).then(u=>{c.onCompleteObservable.notifyObservers(c),i(u)},r?u=>r(void 0,u):void 0),c}return this._loadFile(e,t,c=>{this._validate(e,c,o,l),this._unpackBinaryAsync(new Bt({readAsync:(f,u)=>Di(c,f,u),byteLength:c.byteLength})).then(f=>{i(f)},r?f=>r(void 0,f):void 0)},!0,r)}return this._loadFile(e,t,c=>{this._validate(e,c,o,l),i({json:this._parseJson(c)})},s,r)}importMeshAsync(e,t,i,n,s,r){return Promise.resolve().then(()=>(this.onParsedObservable.notifyObservers(i),this.onParsedObservable.clear(),this._log(`Loading ${r||""}`),this._loader=this._getLoader(i),this._loader.importMeshAsync(e,t,null,i,n,s,r)))}loadAsync(e,t,i,n,s){return Promise.resolve().then(()=>(this.onParsedObservable.notifyObservers(t),this.onParsedObservable.clear(),this._log(`Loading ${s||""}`),this._loader=this._getLoader(t),this._loader.loadAsync(e,t,i,n,s)))}loadAssetContainerAsync(e,t,i,n,s){return Promise.resolve().then(()=>{this.onParsedObservable.notifyObservers(t),this.onParsedObservable.clear(),this._log(`Loading ${s||""}`),this._loader=this._getLoader(t);const r=new vs(e),o=[];this.onMaterialLoadedObservable.add(f=>{o.push(f)});const l=[];this.onTextureLoadedObservable.add(f=>{l.push(f)});const c=[];return this.onCameraLoadedObservable.add(f=>{c.push(f)}),this._loader.importMeshAsync(null,e,r,t,i,n,s).then(f=>(Array.prototype.push.apply(r.geometries,f.geometries),Array.prototype.push.apply(r.meshes,f.meshes),Array.prototype.push.apply(r.particleSystems,f.particleSystems),Array.prototype.push.apply(r.skeletons,f.skeletons),Array.prototype.push.apply(r.animationGroups,f.animationGroups),Array.prototype.push.apply(r.materials,o),Array.prototype.push.apply(r.textures,l),Array.prototype.push.apply(r.lights,f.lights),Array.prototype.push.apply(r.transformNodes,f.transformNodes),Array.prototype.push.apply(r.cameras,c),r))})}canDirectLoad(e){return e.indexOf("asset")!==-1&&e.indexOf("version")!==-1||e.startsWith("data:base64,"+q._MagicBase64Encoded)||e.startsWith("data:;base64,"+q._MagicBase64Encoded)||e.startsWith("data:application/octet-stream;base64,"+q._MagicBase64Encoded)||e.startsWith("data:model/gltf-binary;base64,"+q._MagicBase64Encoded)}directLoad(e,t){if(t.startsWith("base64,"+q._MagicBase64Encoded)||t.startsWith(";base64,"+q._MagicBase64Encoded)||t.startsWith("application/octet-stream;base64,"+q._MagicBase64Encoded)||t.startsWith("model/gltf-binary;base64,"+q._MagicBase64Encoded)){const i=ji(t);return this._validate(e,i),this._unpackBinaryAsync(new Bt({readAsync:(n,s)=>Di(i,n,s),byteLength:i.byteLength}))}return this._validate(e,t),Promise.resolve({json:this._parseJson(t)})}createPlugin(){return new q}get loaderState(){return this._state}whenCompleteAsync(){return new Promise((e,t)=>{this.onCompleteObservable.addOnce(()=>{e()}),this.onErrorObservable.addOnce(i=>{t(i)})})}_setState(e){this._state!==e&&(this._state=e,this.onLoaderStateChangedObservable.notifyObservers(this._state),this._log(Ae[this._state]))}_loadFile(e,t,i,n,s,r){const o=e._loadFile(t,i,l=>{this._onProgress(l,o)},!0,n,s,r);return o.onCompleteObservable.add(l=>{this._requests.splice(this._requests.indexOf(l),1)}),this._requests.push(o),o}_onProgress(e,t){if(!this._progressCallback)return;t._lengthComputable=e.lengthComputable,t._loaded=e.loaded,t._total=e.total;let i=!0,n=0,s=0;for(const r of this._requests){if(r._lengthComputable===void 0||r._loaded===void 0||r._total===void 0)return;i=i&&r._lengthComputable,n+=r._loaded,s+=r._total}this._progressCallback({lengthComputable:i,loaded:n,total:i?s:0})}_validate(e,t,i="",n=""){!this.validate||(this._startPerformanceCounter("Validate JSON"),nn.ValidateAsync(t,i,n,s=>this.preprocessUrlAsync(i+s).then(r=>e._loadFileAsync(r,void 0,!0,!0))).then(s=>{this._endPerformanceCounter("Validate JSON"),this.onValidatedObservable.notifyObservers(s),this.onValidatedObservable.clear()},s=>{this._endPerformanceCounter("Validate JSON"),w.Warn(`Failed to validate: ${s.message}`),this.onValidatedObservable.clear()}))}_getLoader(e){const t=e.json.asset||{};this._log(`Asset version: ${t.version}`),t.minVersion&&this._log(`Asset minimum version: ${t.minVersion}`),t.generator&&this._log(`Asset generator: ${t.generator}`);const i=q._parseVersion(t.version);if(!i)throw new Error("Invalid version: "+t.version);if(t.minVersion!==void 0){const r=q._parseVersion(t.minVersion);if(!r)throw new Error("Invalid minimum version: "+t.minVersion);if(q._compareVersion(r,{major:2,minor:0})>0)throw new Error("Incompatible minimum version: "+t.minVersion)}const s={1:q._CreateGLTF1Loader,2:q._CreateGLTF2Loader}[i.major];if(!s)throw new Error("Unsupported version: "+t.version);return s(this)}_parseJson(e){this._startPerformanceCounter("Parse JSON"),this._log(`JSON length: ${e.length}`);const t=JSON.parse(e);return this._endPerformanceCounter("Parse JSON"),t}_unpackBinaryAsync(e){return this._startPerformanceCounter("Unpack Binary"),e.loadAsync(20).then(()=>{const t={Magic:1179937895},i=e.readUint32();if(i!==t.Magic)throw new kn("Unexpected magic: "+i,Xn.GLTFLoaderUnexpectedMagicError);const n=e.readUint32();this.loggingEnabled&&this._log(`Binary version: ${n}`);const s=e.readUint32();!this.useRangeRequests&&s!==e.buffer.byteLength&&H.Warn(`Length in header does not match actual data length: ${s} != ${e.buffer.byteLength}`);let r;switch(n){case 1:{r=this._unpackBinaryV1Async(e,s);break}case 2:{r=this._unpackBinaryV2Async(e,s);break}default:throw new Error("Unsupported version: "+n)}return this._endPerformanceCounter("Unpack Binary"),r})}_unpackBinaryV1Async(e,t){const i={JSON:0},n=e.readUint32(),s=e.readUint32();if(s!==i.JSON)throw new Error(`Unexpected content format: ${s}`);const r=t-e.byteOffset,o={json:this._parseJson(e.readString(n)),bin:null};if(r!==0){const l=e.byteOffset;o.bin={readAsync:(c,f)=>e.buffer.readAsync(l+c,f),byteLength:r}}return Promise.resolve(o)}_unpackBinaryV2Async(e,t){const i={JSON:1313821514,BIN:5130562},n=e.readUint32();if(e.readUint32()!==i.JSON)throw new Error("First chunk format is not JSON");return e.byteOffset+n===t?e.loadAsync(n).then(()=>({json:this._parseJson(e.readString(n)),bin:null})):e.loadAsync(n+8).then(()=>{const r={json:this._parseJson(e.readString(n)),bin:null},o=()=>{const l=e.readUint32();switch(e.readUint32()){case i.JSON:throw new Error("Unexpected JSON chunk");case i.BIN:{const f=e.byteOffset;r.bin={readAsync:(u,h)=>e.buffer.readAsync(f+u,h),byteLength:l},e.skipBytes(l);break}default:{e.skipBytes(l);break}}return e.byteOffset!==t?e.loadAsync(8).then(o):Promise.resolve(r)};return o()})}static _parseVersion(e){if(e==="1.0"||e==="1.0.1")return{major:1,minor:0};const t=(e+"").match(/^(\d+)\.(\d+)/);return t?{major:parseInt(t[1]),minor:parseInt(t[2])}:null}static _compareVersion(e,t){return e.major>t.major?1:e.major<t.major?-1:e.minor>t.minor?1:e.minor<t.minor?-1:0}_logOpen(e){this._log(e),this._logIndentLevel++}_logClose(){--this._logIndentLevel}_logEnabled(e){const t=q._logSpaces.substr(0,this._logIndentLevel*2);H.Log(`${t}${e}`)}_logDisabled(e){}_startPerformanceCounterEnabled(e){w.StartPerformanceCounter(e)}_startPerformanceCounterDisabled(e){}_endPerformanceCounterEnabled(e){w.EndPerformanceCounter(e)}_endPerformanceCounterDisabled(e){}}q.IncrementalLoading=!0;q.HomogeneousCoordinates=!1;q._MagicBase64Encoded="Z2xURg";q._logSpaces="                                ";Pi&&Pi.RegisterPlugin(new q);var we;(function(a){a[a.BYTE=5120]="BYTE",a[a.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",a[a.SHORT=5122]="SHORT",a[a.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",a[a.FLOAT=5126]="FLOAT"})(we||(we={}));var Rt;(function(a){a[a.FRAGMENT=35632]="FRAGMENT",a[a.VERTEX=35633]="VERTEX"})(Rt||(Rt={}));var ue;(function(a){a[a.BYTE=5120]="BYTE",a[a.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",a[a.SHORT=5122]="SHORT",a[a.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",a[a.INT=5124]="INT",a[a.UNSIGNED_INT=5125]="UNSIGNED_INT",a[a.FLOAT=5126]="FLOAT",a[a.FLOAT_VEC2=35664]="FLOAT_VEC2",a[a.FLOAT_VEC3=35665]="FLOAT_VEC3",a[a.FLOAT_VEC4=35666]="FLOAT_VEC4",a[a.INT_VEC2=35667]="INT_VEC2",a[a.INT_VEC3=35668]="INT_VEC3",a[a.INT_VEC4=35669]="INT_VEC4",a[a.BOOL=35670]="BOOL",a[a.BOOL_VEC2=35671]="BOOL_VEC2",a[a.BOOL_VEC3=35672]="BOOL_VEC3",a[a.BOOL_VEC4=35673]="BOOL_VEC4",a[a.FLOAT_MAT2=35674]="FLOAT_MAT2",a[a.FLOAT_MAT3=35675]="FLOAT_MAT3",a[a.FLOAT_MAT4=35676]="FLOAT_MAT4",a[a.SAMPLER_2D=35678]="SAMPLER_2D"})(ue||(ue={}));var $e;(function(a){a[a.CLAMP_TO_EDGE=33071]="CLAMP_TO_EDGE",a[a.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",a[a.REPEAT=10497]="REPEAT"})($e||($e={}));var Re;(function(a){a[a.NEAREST=9728]="NEAREST",a[a.LINEAR=9728]="LINEAR",a[a.NEAREST_MIPMAP_NEAREST=9984]="NEAREST_MIPMAP_NEAREST",a[a.LINEAR_MIPMAP_NEAREST=9985]="LINEAR_MIPMAP_NEAREST",a[a.NEAREST_MIPMAP_LINEAR=9986]="NEAREST_MIPMAP_LINEAR",a[a.LINEAR_MIPMAP_LINEAR=9987]="LINEAR_MIPMAP_LINEAR"})(Re||(Re={}));var Xt;(function(a){a[a.ALPHA=6406]="ALPHA",a[a.RGB=6407]="RGB",a[a.RGBA=6408]="RGBA",a[a.LUMINANCE=6409]="LUMINANCE",a[a.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA"})(Xt||(Xt={}));var Ct;(function(a){a[a.FRONT=1028]="FRONT",a[a.BACK=1029]="BACK",a[a.FRONT_AND_BACK=1032]="FRONT_AND_BACK"})(Ct||(Ct={}));var Z;(function(a){a[a.ZERO=0]="ZERO",a[a.ONE=1]="ONE",a[a.SRC_COLOR=768]="SRC_COLOR",a[a.ONE_MINUS_SRC_COLOR=769]="ONE_MINUS_SRC_COLOR",a[a.DST_COLOR=774]="DST_COLOR",a[a.ONE_MINUS_DST_COLOR=775]="ONE_MINUS_DST_COLOR",a[a.SRC_ALPHA=770]="SRC_ALPHA",a[a.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",a[a.DST_ALPHA=772]="DST_ALPHA",a[a.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",a[a.CONSTANT_COLOR=32769]="CONSTANT_COLOR",a[a.ONE_MINUS_CONSTANT_COLOR=32770]="ONE_MINUS_CONSTANT_COLOR",a[a.CONSTANT_ALPHA=32771]="CONSTANT_ALPHA",a[a.ONE_MINUS_CONSTANT_ALPHA=32772]="ONE_MINUS_CONSTANT_ALPHA",a[a.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE"})(Z||(Z={}));class Se{constructor(){this.keysUp=[38],this.keysUpward=[33],this.keysDown=[40],this.keysDownward=[34],this.keysLeft=[37],this.keysRight=[39],this.rotationSpeed=.5,this.keysRotateLeft=[],this.keysRotateRight=[],this._keys=new Array}attachControl(e){e=w.BackCompatCameraNoPreventDefault(arguments),!this._onCanvasBlurObserver&&(this._scene=this.camera.getScene(),this._engine=this._scene.getEngine(),this._onCanvasBlurObserver=this._engine.onCanvasBlurObservable.add(()=>{this._keys.length=0}),this._onKeyboardObserver=this._scene.onKeyboardObservable.add(t=>{const i=t.event;if(!i.metaKey){if(t.type===Yn.KEYDOWN)(this.keysUp.indexOf(i.keyCode)!==-1||this.keysDown.indexOf(i.keyCode)!==-1||this.keysLeft.indexOf(i.keyCode)!==-1||this.keysRight.indexOf(i.keyCode)!==-1||this.keysUpward.indexOf(i.keyCode)!==-1||this.keysDownward.indexOf(i.keyCode)!==-1||this.keysRotateLeft.indexOf(i.keyCode)!==-1||this.keysRotateRight.indexOf(i.keyCode)!==-1)&&(this._keys.indexOf(i.keyCode)===-1&&this._keys.push(i.keyCode),e||i.preventDefault());else if(this.keysUp.indexOf(i.keyCode)!==-1||this.keysDown.indexOf(i.keyCode)!==-1||this.keysLeft.indexOf(i.keyCode)!==-1||this.keysRight.indexOf(i.keyCode)!==-1||this.keysUpward.indexOf(i.keyCode)!==-1||this.keysDownward.indexOf(i.keyCode)!==-1||this.keysRotateLeft.indexOf(i.keyCode)!==-1||this.keysRotateRight.indexOf(i.keyCode)!==-1){const n=this._keys.indexOf(i.keyCode);n>=0&&this._keys.splice(n,1),e||i.preventDefault()}}}))}detachControl(){this._scene&&(this._onKeyboardObserver&&this._scene.onKeyboardObservable.remove(this._onKeyboardObserver),this._onCanvasBlurObserver&&this._engine.onCanvasBlurObservable.remove(this._onCanvasBlurObserver),this._onKeyboardObserver=null,this._onCanvasBlurObserver=null),this._keys.length=0}checkInputs(){if(this._onKeyboardObserver){const e=this.camera;for(let t=0;t<this._keys.length;t++){const i=this._keys[t],n=e._computeLocalCameraSpeed();this.keysLeft.indexOf(i)!==-1?e._localDirection.copyFromFloats(-n,0,0):this.keysUp.indexOf(i)!==-1?e._localDirection.copyFromFloats(0,0,n):this.keysRight.indexOf(i)!==-1?e._localDirection.copyFromFloats(n,0,0):this.keysDown.indexOf(i)!==-1?e._localDirection.copyFromFloats(0,0,-n):this.keysUpward.indexOf(i)!==-1?e._localDirection.copyFromFloats(0,n,0):this.keysDownward.indexOf(i)!==-1?e._localDirection.copyFromFloats(0,-n,0):this.keysRotateLeft.indexOf(i)!==-1?(e._localDirection.copyFromFloats(0,0,0),e.cameraRotation.y-=this._getLocalRotation()):this.keysRotateRight.indexOf(i)!==-1&&(e._localDirection.copyFromFloats(0,0,0),e.cameraRotation.y+=this._getLocalRotation()),e.getScene().useRightHandedSystem&&(e._localDirection.z*=-1),e.getViewMatrix().invertToRef(e._cameraTransformMatrix),A.TransformNormalToRef(e._localDirection,e._cameraTransformMatrix,e._transformedDirection),e.cameraDirection.addInPlace(e._transformedDirection)}}}getClassName(){return"FreeCameraKeyboardMoveInput"}_onLostFocus(){this._keys.length=0}getSimpleName(){return"keyboard"}_getLocalRotation(){let e=this.rotationSpeed*this._engine.getDeltaTime()/1e3;return this.camera.getScene().useRightHandedSystem&&(e*=-1),this.camera.parent&&this.camera.parent._getWorldMatrixDeterminant()<0&&(e*=-1),e}}m([T()],Se.prototype,"keysUp",void 0);m([T()],Se.prototype,"keysUpward",void 0);m([T()],Se.prototype,"keysDown",void 0);m([T()],Se.prototype,"keysDownward",void 0);m([T()],Se.prototype,"keysLeft",void 0);m([T()],Se.prototype,"keysRight",void 0);m([T()],Se.prototype,"rotationSpeed",void 0);m([T()],Se.prototype,"keysRotateLeft",void 0);m([T()],Se.prototype,"keysRotateRight",void 0);It.FreeCameraKeyboardMoveInput=Se;class Nt{constructor(e=!0){this.touchEnabled=e,this.buttons=[0,1,2],this.angularSensibility=2e3,this._previousPosition=null,this.onPointerMovedObservable=new Y,this._allowCameraRotation=!0,this._currentActiveButton=-1,this._activePointerId=-1}attachControl(e){e=w.BackCompatCameraNoPreventDefault(arguments);const t=this.camera.getEngine(),i=t.getInputElement();this._pointerInput||(this._pointerInput=n=>{const s=n.event,r=s.pointerType==="touch";if(t.isInVRExclusivePointerMode||!this.touchEnabled&&r||n.type!==_e.POINTERMOVE&&this.buttons.indexOf(s.button)===-1)return;const o=s.target;if(n.type===_e.POINTERDOWN){if(r&&this._activePointerId!==-1||!r&&this._currentActiveButton!==-1)return;this._activePointerId=s.pointerId;try{o==null||o.setPointerCapture(s.pointerId)}catch{}this._currentActiveButton===-1&&(this._currentActiveButton=s.button),this._previousPosition={x:s.clientX,y:s.clientY},e||(s.preventDefault(),i&&i.focus()),t.isPointerLock&&this._onMouseMove&&this._onMouseMove(n.event)}else if(n.type===_e.POINTERUP){if(r&&this._activePointerId!==s.pointerId||!r&&this._currentActiveButton!==s.button)return;try{o==null||o.releasePointerCapture(s.pointerId)}catch{}this._currentActiveButton=-1,this._previousPosition=null,e||s.preventDefault(),this._activePointerId=-1}else if(n.type===_e.POINTERMOVE&&(this._activePointerId===s.pointerId||!r)){if(t.isPointerLock&&this._onMouseMove)this._onMouseMove(n.event);else if(this._previousPosition){let l=s.clientX-this._previousPosition.x;const c=s.clientY-this._previousPosition.y;this.camera.getScene().useRightHandedSystem&&(l*=-1),this.camera.parent&&this.camera.parent._getWorldMatrixDeterminant()<0&&(l*=-1),this._allowCameraRotation&&(this.camera.cameraRotation.y+=l/this.angularSensibility,this.camera.cameraRotation.x+=c/this.angularSensibility),this.onPointerMovedObservable.notifyObservers({offsetX:l,offsetY:c}),this._previousPosition={x:s.clientX,y:s.clientY},e||s.preventDefault()}}}),this._onMouseMove=n=>{if(!t.isPointerLock||t.isInVRExclusivePointerMode)return;let s=n.movementX;this.camera.getScene().useRightHandedSystem&&(s*=-1),this.camera.parent&&this.camera.parent._getWorldMatrixDeterminant()<0&&(s*=-1),this.camera.cameraRotation.y+=s/this.angularSensibility;const r=n.movementY;this.camera.cameraRotation.x+=r/this.angularSensibility,this._previousPosition=null,e||n.preventDefault()},this._observer=this.camera.getScene()._onCameraInputObservable.add(this._pointerInput,_e.POINTERDOWN|_e.POINTERUP|_e.POINTERMOVE),i&&(this._contextMenuBind=this.onContextMenu.bind(this),i.addEventListener("contextmenu",this._contextMenuBind,!1))}onContextMenu(e){e.preventDefault()}detachControl(){if(this._observer){if(this.camera.getScene()._onCameraInputObservable.remove(this._observer),this._contextMenuBind){const t=this.camera.getEngine().getInputElement();t&&t.removeEventListener("contextmenu",this._contextMenuBind)}this.onPointerMovedObservable&&this.onPointerMovedObservable.clear(),this._observer=null,this._onMouseMove=null,this._previousPosition=null}this._currentActiveButton=-1}getClassName(){return"FreeCameraMouseInput"}getSimpleName(){return"mouse"}}m([T()],Nt.prototype,"buttons",void 0);m([T()],Nt.prototype,"angularSensibility",void 0);It.FreeCameraMouseInput=Nt;class Ot{constructor(){this.wheelPrecisionX=3,this.wheelPrecisionY=3,this.wheelPrecisionZ=3,this.onChangedObservable=new Y,this._wheelDeltaX=0,this._wheelDeltaY=0,this._wheelDeltaZ=0,this._ffMultiplier=12,this._normalize=120}attachControl(e){e=w.BackCompatCameraNoPreventDefault(arguments),this._wheel=t=>{if(t.type!==_e.POINTERWHEEL)return;const i=t.event,n=i.deltaMode===zn.DOM_DELTA_LINE?this._ffMultiplier:1;this._wheelDeltaX+=this.wheelPrecisionX*n*i.deltaX/this._normalize,this._wheelDeltaY-=this.wheelPrecisionY*n*i.deltaY/this._normalize,this._wheelDeltaZ+=this.wheelPrecisionZ*n*i.deltaZ/this._normalize,i.preventDefault&&(e||i.preventDefault())},this._observer=this.camera.getScene()._onCameraInputObservable.add(this._wheel,_e.POINTERWHEEL)}detachControl(){this._observer&&(this.camera.getScene()._onCameraInputObservable.remove(this._observer),this._observer=null,this._wheel=null),this.onChangedObservable&&this.onChangedObservable.clear()}checkInputs(){this.onChangedObservable.notifyObservers({wheelDeltaX:this._wheelDeltaX,wheelDeltaY:this._wheelDeltaY,wheelDeltaZ:this._wheelDeltaZ}),this._wheelDeltaX=0,this._wheelDeltaY=0,this._wheelDeltaZ=0}getClassName(){return"BaseCameraMouseWheelInput"}getSimpleName(){return"mousewheel"}}m([T()],Ot.prototype,"wheelPrecisionX",void 0);m([T()],Ot.prototype,"wheelPrecisionY",void 0);m([T()],Ot.prototype,"wheelPrecisionZ",void 0);var z;(function(a){a[a.MoveRelative=0]="MoveRelative",a[a.RotateRelative=1]="RotateRelative",a[a.MoveScene=2]="MoveScene"})(z||(z={}));class Ie extends Ot{constructor(){super(...arguments),this._moveRelative=A.Zero(),this._rotateRelative=A.Zero(),this._moveScene=A.Zero(),this._wheelXAction=z.MoveRelative,this._wheelXActionCoordinate=rt.X,this._wheelYAction=z.MoveRelative,this._wheelYActionCoordinate=rt.Z,this._wheelZAction=null,this._wheelZActionCoordinate=null}getClassName(){return"FreeCameraMouseWheelInput"}set wheelXMoveRelative(e){e===null&&this._wheelXAction!==z.MoveRelative||(this._wheelXAction=z.MoveRelative,this._wheelXActionCoordinate=e)}get wheelXMoveRelative(){return this._wheelXAction!==z.MoveRelative?null:this._wheelXActionCoordinate}set wheelYMoveRelative(e){e===null&&this._wheelYAction!==z.MoveRelative||(this._wheelYAction=z.MoveRelative,this._wheelYActionCoordinate=e)}get wheelYMoveRelative(){return this._wheelYAction!==z.MoveRelative?null:this._wheelYActionCoordinate}set wheelZMoveRelative(e){e===null&&this._wheelZAction!==z.MoveRelative||(this._wheelZAction=z.MoveRelative,this._wheelZActionCoordinate=e)}get wheelZMoveRelative(){return this._wheelZAction!==z.MoveRelative?null:this._wheelZActionCoordinate}set wheelXRotateRelative(e){e===null&&this._wheelXAction!==z.RotateRelative||(this._wheelXAction=z.RotateRelative,this._wheelXActionCoordinate=e)}get wheelXRotateRelative(){return this._wheelXAction!==z.RotateRelative?null:this._wheelXActionCoordinate}set wheelYRotateRelative(e){e===null&&this._wheelYAction!==z.RotateRelative||(this._wheelYAction=z.RotateRelative,this._wheelYActionCoordinate=e)}get wheelYRotateRelative(){return this._wheelYAction!==z.RotateRelative?null:this._wheelYActionCoordinate}set wheelZRotateRelative(e){e===null&&this._wheelZAction!==z.RotateRelative||(this._wheelZAction=z.RotateRelative,this._wheelZActionCoordinate=e)}get wheelZRotateRelative(){return this._wheelZAction!==z.RotateRelative?null:this._wheelZActionCoordinate}set wheelXMoveScene(e){e===null&&this._wheelXAction!==z.MoveScene||(this._wheelXAction=z.MoveScene,this._wheelXActionCoordinate=e)}get wheelXMoveScene(){return this._wheelXAction!==z.MoveScene?null:this._wheelXActionCoordinate}set wheelYMoveScene(e){e===null&&this._wheelYAction!==z.MoveScene||(this._wheelYAction=z.MoveScene,this._wheelYActionCoordinate=e)}get wheelYMoveScene(){return this._wheelYAction!==z.MoveScene?null:this._wheelYActionCoordinate}set wheelZMoveScene(e){e===null&&this._wheelZAction!==z.MoveScene||(this._wheelZAction=z.MoveScene,this._wheelZActionCoordinate=e)}get wheelZMoveScene(){return this._wheelZAction!==z.MoveScene?null:this._wheelZActionCoordinate}checkInputs(){if(this._wheelDeltaX===0&&this._wheelDeltaY===0&&this._wheelDeltaZ==0)return;this._moveRelative.setAll(0),this._rotateRelative.setAll(0),this._moveScene.setAll(0),this._updateCamera(),this.camera.getScene().useRightHandedSystem&&(this._moveRelative.z*=-1);const e=X.Zero();this.camera.getViewMatrix().invertToRef(e);const t=A.Zero();A.TransformNormalToRef(this._moveRelative,e,t),this.camera.cameraRotation.x+=this._rotateRelative.x/200,this.camera.cameraRotation.y+=this._rotateRelative.y/200,this.camera.cameraDirection.addInPlace(t),this.camera.cameraDirection.addInPlace(this._moveScene),super.checkInputs()}_updateCamera(){this._updateCameraProperty(this._wheelDeltaX,this._wheelXAction,this._wheelXActionCoordinate),this._updateCameraProperty(this._wheelDeltaY,this._wheelYAction,this._wheelYActionCoordinate),this._updateCameraProperty(this._wheelDeltaZ,this._wheelZAction,this._wheelZActionCoordinate)}_updateCameraProperty(e,t,i){if(e===0||t===null||i===null)return;let n=null;switch(t){case z.MoveRelative:n=this._moveRelative;break;case z.RotateRelative:n=this._rotateRelative;break;case z.MoveScene:n=this._moveScene;break}switch(i){case rt.X:n.set(e,0,0);break;case rt.Y:n.set(0,e,0);break;case rt.Z:n.set(0,0,e);break}}}m([T()],Ie.prototype,"wheelXMoveRelative",null);m([T()],Ie.prototype,"wheelYMoveRelative",null);m([T()],Ie.prototype,"wheelZMoveRelative",null);m([T()],Ie.prototype,"wheelXRotateRelative",null);m([T()],Ie.prototype,"wheelYRotateRelative",null);m([T()],Ie.prototype,"wheelZRotateRelative",null);m([T()],Ie.prototype,"wheelXMoveScene",null);m([T()],Ie.prototype,"wheelYMoveScene",null);m([T()],Ie.prototype,"wheelZMoveScene",null);It.FreeCameraMouseWheelInput=Ie;class yt{constructor(e=!1){this.allowMouse=e,this.touchAngularSensibility=2e5,this.touchMoveSensibility=250,this.singleFingerRotate=!1,this._offsetX=null,this._offsetY=null,this._pointerPressed=new Array,this._isSafari=w.IsSafari()}attachControl(e){e=w.BackCompatCameraNoPreventDefault(arguments);let t=null;if(this._pointerInput===void 0&&(this._onLostFocus=()=>{this._offsetX=null,this._offsetY=null},this._pointerInput=i=>{const n=i.event,s=n.pointerType==="mouse"||this._isSafari&&typeof n.pointerType>"u";if(!(!this.allowMouse&&s)){if(i.type===_e.POINTERDOWN){if(e||n.preventDefault(),this._pointerPressed.push(n.pointerId),this._pointerPressed.length!==1)return;t={x:n.clientX,y:n.clientY}}else if(i.type===_e.POINTERUP){e||n.preventDefault();const r=this._pointerPressed.indexOf(n.pointerId);if(r===-1||(this._pointerPressed.splice(r,1),r!=0))return;t=null,this._offsetX=null,this._offsetY=null}else if(i.type===_e.POINTERMOVE){if(e||n.preventDefault(),!t||this._pointerPressed.indexOf(n.pointerId)!=0)return;this._offsetX=n.clientX-t.x,this._offsetY=-(n.clientY-t.y)}}}),this._observer=this.camera.getScene()._onCameraInputObservable.add(this._pointerInput,_e.POINTERDOWN|_e.POINTERUP|_e.POINTERMOVE),this._onLostFocus){const n=this.camera.getEngine().getInputElement();n&&n.addEventListener("blur",this._onLostFocus)}}detachControl(){if(this._pointerInput){if(this._observer&&(this.camera.getScene()._onCameraInputObservable.remove(this._observer),this._observer=null),this._onLostFocus){const t=this.camera.getEngine().getInputElement();t&&t.removeEventListener("blur",this._onLostFocus),this._onLostFocus=null}this._pointerPressed.length=0,this._offsetX=null,this._offsetY=null}}checkInputs(){if(this._offsetX===null||this._offsetY===null||this._offsetX===0&&this._offsetY===0)return;const e=this.camera;if(e.cameraRotation.y=this._offsetX/this.touchAngularSensibility,this.singleFingerRotate&&this._pointerPressed.length===1||!this.singleFingerRotate&&this._pointerPressed.length>1)e.cameraRotation.x=-this._offsetY/this.touchAngularSensibility;else{const i=e._computeLocalCameraSpeed(),n=new A(0,0,this.touchMoveSensibility!==0?i*this._offsetY/this.touchMoveSensibility:0);X.RotationYawPitchRollToRef(e.rotation.y,e.rotation.x,0,e._cameraRotationMatrix),e.cameraDirection.addInPlace(A.TransformCoordinates(n,e._cameraRotationMatrix))}}getClassName(){return"FreeCameraTouchInput"}getSimpleName(){return"touch"}}m([T()],yt.prototype,"touchAngularSensibility",void 0);m([T()],yt.prototype,"touchMoveSensibility",void 0);It.FreeCameraTouchInput=yt;class Ms extends Wn{constructor(e){super(e),this._mouseInput=null,this._mouseWheelInput=null}addKeyboard(){return this.add(new Se),this}addMouse(e=!0){return this._mouseInput||(this._mouseInput=new Nt(e),this.add(this._mouseInput)),this}removeMouse(){return this._mouseInput&&this.remove(this._mouseInput),this}addMouseWheel(){return this._mouseWheelInput||(this._mouseWheelInput=new Ie,this.add(this._mouseWheelInput)),this}removeMouseWheel(){return this._mouseWheelInput&&this.remove(this._mouseWheelInput),this}addTouch(){return this.add(new yt),this}clear(){super.clear(),this._mouseInput=null}}class We extends Kn{constructor(e,t,i,n=!0){super(e,t,i,n),this.ellipsoid=new A(.5,1,.5),this.ellipsoidOffset=new A(0,0,0),this.checkCollisions=!1,this.applyGravity=!1,this._needMoveForGravity=!1,this._oldPosition=A.Zero(),this._diffPosition=A.Zero(),this._newPosition=A.Zero(),this._collisionMask=-1,this._onCollisionPositionChange=(s,r,o=null)=>{(c=>{this._newPosition.copyFrom(c),this._newPosition.subtractToRef(this._oldPosition,this._diffPosition),this._diffPosition.length()>D.CollisionsEpsilon&&(this.position.addInPlace(this._diffPosition),this.onCollide&&o&&this.onCollide(o))})(r)},this.inputs=new Ms(this),this.inputs.addKeyboard().addMouse()}get angularSensibility(){const e=this.inputs.attached.mouse;return e?e.angularSensibility:0}set angularSensibility(e){const t=this.inputs.attached.mouse;t&&(t.angularSensibility=e)}get keysUp(){const e=this.inputs.attached.keyboard;return e?e.keysUp:[]}set keysUp(e){const t=this.inputs.attached.keyboard;t&&(t.keysUp=e)}get keysUpward(){const e=this.inputs.attached.keyboard;return e?e.keysUpward:[]}set keysUpward(e){const t=this.inputs.attached.keyboard;t&&(t.keysUpward=e)}get keysDown(){const e=this.inputs.attached.keyboard;return e?e.keysDown:[]}set keysDown(e){const t=this.inputs.attached.keyboard;t&&(t.keysDown=e)}get keysDownward(){const e=this.inputs.attached.keyboard;return e?e.keysDownward:[]}set keysDownward(e){const t=this.inputs.attached.keyboard;t&&(t.keysDownward=e)}get keysLeft(){const e=this.inputs.attached.keyboard;return e?e.keysLeft:[]}set keysLeft(e){const t=this.inputs.attached.keyboard;t&&(t.keysLeft=e)}get keysRight(){const e=this.inputs.attached.keyboard;return e?e.keysRight:[]}set keysRight(e){const t=this.inputs.attached.keyboard;t&&(t.keysRight=e)}get keysRotateLeft(){const e=this.inputs.attached.keyboard;return e?e.keysRotateLeft:[]}set keysRotateLeft(e){const t=this.inputs.attached.keyboard;t&&(t.keysRotateLeft=e)}get keysRotateRight(){const e=this.inputs.attached.keyboard;return e?e.keysRotateRight:[]}set keysRotateRight(e){const t=this.inputs.attached.keyboard;t&&(t.keysRotateRight=e)}attachControl(e,t){t=w.BackCompatCameraNoPreventDefault(arguments),this.inputs.attachElement(t)}detachControl(){this.inputs.detachElement(),this.cameraDirection=new A(0,0,0),this.cameraRotation=new ft(0,0)}get collisionMask(){return this._collisionMask}set collisionMask(e){this._collisionMask=isNaN(e)?-1:e}_collideWithWorld(e){let t;this.parent?t=A.TransformCoordinates(this.position,this.parent.getWorldMatrix()):t=this.position,t.subtractFromFloatsToRef(0,this.ellipsoid.y,0,this._oldPosition),this._oldPosition.addInPlace(this.ellipsoidOffset);const i=this.getScene().collisionCoordinator;this._collider||(this._collider=i.createCollider()),this._collider._radius=this.ellipsoid,this._collider.collisionMask=this._collisionMask;let n=e;this.applyGravity&&(n=e.add(this.getScene().gravity)),i.getNewPosition(this._oldPosition,n,this._collider,3,null,this._onCollisionPositionChange,this.uniqueId)}_checkInputs(){this._localDirection||(this._localDirection=A.Zero(),this._transformedDirection=A.Zero()),this.inputs.checkInputs(),super._checkInputs()}_decideIfNeedsToMove(){return this._needMoveForGravity||Math.abs(this.cameraDirection.x)>0||Math.abs(this.cameraDirection.y)>0||Math.abs(this.cameraDirection.z)>0}_updatePosition(){this.checkCollisions&&this.getScene().collisionsEnabled?this._collideWithWorld(this.cameraDirection):super._updatePosition()}dispose(){this.inputs.clear(),super.dispose()}getClassName(){return"FreeCamera"}}m([vt()],We.prototype,"ellipsoid",void 0);m([vt()],We.prototype,"ellipsoidOffset",void 0);m([T()],We.prototype,"checkCollisions",void 0);m([T()],We.prototype,"applyGravity",void 0);class it{constructor(e,t,i){this.name=e,this.id=t,this.bones=new Array,this.needInitialSkinMatrix=!1,this._isDirty=!0,this._meshesWithPoseMatrix=new Array,this._identity=X.Identity(),this._ranges={},this._absoluteTransformIsDirty=!0,this._canUseTextureForBones=!1,this._uniqueId=0,this._numBonesWithLinkedTransformNode=0,this._hasWaitingData=null,this._parentContainer=null,this.doNotSerialize=!1,this._useTextureToStoreBoneMatrices=!0,this._animationPropertiesOverride=null,this.onBeforeComputeObservable=new Y,this.bones=[],this._scene=i||tt.LastCreatedScene,this._uniqueId=this._scene.getUniqueId(),this._scene.addSkeleton(this),this._isDirty=!0;const n=this._scene.getEngine().getCaps();this._canUseTextureForBones=n.textureFloat&&n.maxVertexTextureImageUnits>0}get useTextureToStoreBoneMatrices(){return this._useTextureToStoreBoneMatrices}set useTextureToStoreBoneMatrices(e){this._useTextureToStoreBoneMatrices=e,this._markAsDirty()}get animationPropertiesOverride(){return this._animationPropertiesOverride?this._animationPropertiesOverride:this._scene.animationPropertiesOverride}set animationPropertiesOverride(e){this._animationPropertiesOverride=e}get isUsingTextureForMatrices(){return this.useTextureToStoreBoneMatrices&&this._canUseTextureForBones}get uniqueId(){return this._uniqueId}getClassName(){return"Skeleton"}getChildren(){return this.bones.filter(e=>!e.getParent())}getTransformMatrices(e){return this.needInitialSkinMatrix?(e._bonesTransformMatrices||this.prepare(),e._bonesTransformMatrices):(this._transformMatrices||this.prepare(),this._transformMatrices)}getTransformMatrixTexture(e){return this.needInitialSkinMatrix&&e._transformMatrixTexture?e._transformMatrixTexture:this._transformMatrixTexture}getScene(){return this._scene}toString(e){let t=`Name: ${this.name}, nBones: ${this.bones.length}`;if(t+=`, nAnimationRanges: ${this._ranges?Object.keys(this._ranges).length:"none"}`,e){t+=", Ranges: {";let i=!0;for(const n in this._ranges)i&&(t+=", ",i=!1),t+=n;t+="}"}return t}getBoneIndexByName(e){for(let t=0,i=this.bones.length;t<i;t++)if(this.bones[t].name===e)return t;return-1}createAnimationRange(e,t,i){if(!this._ranges[e]){this._ranges[e]=new Oi(e,t,i);for(let n=0,s=this.bones.length;n<s;n++)this.bones[n].animations[0]&&this.bones[n].animations[0].createRange(e,t,i)}}deleteAnimationRange(e,t=!0){for(let i=0,n=this.bones.length;i<n;i++)this.bones[i].animations[0]&&this.bones[i].animations[0].deleteRange(e,t);this._ranges[e]=null}getAnimationRange(e){return this._ranges[e]||null}getAnimationRanges(){const e=[];let t;for(t in this._ranges)e.push(this._ranges[t]);return e}copyAnimationRange(e,t,i=!1){if(this._ranges[t]||!e.getAnimationRange(t))return!1;let n=!0;const s=this._getHighestAnimationFrame()+1,r={},o=e.bones;let l,c;for(c=0,l=o.length;c<l;c++)r[o[c].name]=o[c];this.bones.length!==o.length&&(H.Warn(`copyAnimationRange: this rig has ${this.bones.length} bones, while source as ${o.length}`),n=!1);const f=i&&this.dimensionsAtRest&&e.dimensionsAtRest?this.dimensionsAtRest.divide(e.dimensionsAtRest):null;for(c=0,l=this.bones.length;c<l;c++){const h=this.bones[c].name,_=r[h];_?n=n&&this.bones[c].copyAnimationRange(_,t,s,i,f):(H.Warn("copyAnimationRange: not same rig, missing source bone "+h),n=!1)}const u=e.getAnimationRange(t);return u&&(this._ranges[t]=new Oi(t,u.from+s,u.to+s)),n}returnToRest(){for(const e of this.bones)e._index!==-1&&e.returnToRest()}_getHighestAnimationFrame(){let e=0;for(let t=0,i=this.bones.length;t<i;t++)if(this.bones[t].animations[0]){const n=this.bones[t].animations[0].getHighestFrame();e<n&&(e=n)}return e}beginAnimation(e,t,i,n){const s=this.getAnimationRange(e);return s?this._scene.beginAnimation(this,s.from,s.to,t,i,n):null}static MakeAnimationAdditive(e,t=0,i){const n=e.getAnimationRange(i);if(!n)return null;const s=e._scene.getAllAnimatablesByTarget(e);let r=null;for(let l=0;l<s.length;l++){const c=s[l];if(c.fromFrame===(n==null?void 0:n.from)&&c.toFrame===(n==null?void 0:n.to)){r=c;break}}const o=e.getAnimatables();for(let l=0;l<o.length;l++){const f=o[l].animations;if(!!f)for(let u=0;u<f.length;u++)U.MakeAnimationAdditive(f[u],t,i)}return r&&(r.isAdditive=!0),e}_markAsDirty(){this._isDirty=!0,this._absoluteTransformIsDirty=!0}_registerMeshWithPoseMatrix(e){this._meshesWithPoseMatrix.push(e)}_unregisterMeshWithPoseMatrix(e){const t=this._meshesWithPoseMatrix.indexOf(e);t>-1&&this._meshesWithPoseMatrix.splice(t,1)}_computeTransformMatrices(e,t){this.onBeforeComputeObservable.notifyObservers(this);for(let i=0;i<this.bones.length;i++){const n=this.bones[i];n._childUpdateId++;const s=n.getParent();if(s?n.getLocalMatrix().multiplyToRef(s.getWorldMatrix(),n.getWorldMatrix()):t?n.getLocalMatrix().multiplyToRef(t,n.getWorldMatrix()):n.getWorldMatrix().copyFrom(n.getLocalMatrix()),n._index!==-1){const r=n._index===null?i:n._index;n.getInvertedAbsoluteTransform().multiplyToArray(n.getWorldMatrix(),e,r*16)}}this._identity.copyToArray(e,this.bones.length*16)}prepare(){if(this._numBonesWithLinkedTransformNode>0){for(const e of this.bones)if(e._linkedTransformNode){const t=e._linkedTransformNode;e.position=t.position,t.rotationQuaternion?e.rotationQuaternion=t.rotationQuaternion:e.rotation=t.rotation,e.scaling=t.scaling}}if(this.needInitialSkinMatrix)for(const e of this._meshesWithPoseMatrix){const t=e.getPoseMatrix();let i=this._isDirty;if((!e._bonesTransformMatrices||e._bonesTransformMatrices.length!==16*(this.bones.length+1))&&(e._bonesTransformMatrices=new Float32Array(16*(this.bones.length+1)),i=!0),!!i){if(this._synchronizedWithMesh!==e){this._synchronizedWithMesh=e;for(const n of this.bones)n.getParent()||(n.getBaseMatrix().multiplyToRef(t,F.Matrix[1]),n._updateDifferenceMatrix(F.Matrix[1]));if(this.isUsingTextureForMatrices){const n=(this.bones.length+1)*4;(!e._transformMatrixTexture||e._transformMatrixTexture.getSize().width!==n)&&(e._transformMatrixTexture&&e._transformMatrixTexture.dispose(),e._transformMatrixTexture=yi.CreateRGBATexture(e._bonesTransformMatrices,(this.bones.length+1)*4,1,this._scene,!1,!1,1,1))}}this._computeTransformMatrices(e._bonesTransformMatrices,t),this.isUsingTextureForMatrices&&e._transformMatrixTexture&&e._transformMatrixTexture.update(e._bonesTransformMatrices)}}else{if(!this._isDirty)return;(!this._transformMatrices||this._transformMatrices.length!==16*(this.bones.length+1))&&(this._transformMatrices=new Float32Array(16*(this.bones.length+1)),this.isUsingTextureForMatrices&&(this._transformMatrixTexture&&this._transformMatrixTexture.dispose(),this._transformMatrixTexture=yi.CreateRGBATexture(this._transformMatrices,(this.bones.length+1)*4,1,this._scene,!1,!1,1,1))),this._computeTransformMatrices(this._transformMatrices,null),this.isUsingTextureForMatrices&&this._transformMatrixTexture&&this._transformMatrixTexture.update(this._transformMatrices)}this._isDirty=!1}getAnimatables(){if(!this._animatables||this._animatables.length!==this.bones.length){this._animatables=[];for(let e=0;e<this.bones.length;e++)this._animatables.push(this.bones[e])}return this._animatables}clone(e,t){const i=new it(e,t||e,this._scene);i.needInitialSkinMatrix=this.needInitialSkinMatrix;for(let n=0;n<this.bones.length;n++){const s=this.bones[n];let r=null;const o=s.getParent();if(o){const c=this.bones.indexOf(o);r=i.bones[c]}const l=new ze(s.name,i,r,s.getBaseMatrix().clone(),s.getRestPose().clone());l._index=s._index,s._linkedTransformNode&&l.linkTransformNode(s._linkedTransformNode),Qn.DeepCopy(s.animations,l.animations)}if(this._ranges){i._ranges={};for(const n in this._ranges){const s=this._ranges[n];s&&(i._ranges[n]=s.clone())}}return this._isDirty=!0,i}enableBlending(e=.01){this.bones.forEach(t=>{t.animations.forEach(i=>{i.enableBlending=!0,i.blendingSpeed=e})})}dispose(){if(this._meshesWithPoseMatrix.length=0,this.getScene().stopAnimation(this),this.getScene().removeSkeleton(this),this._parentContainer){const e=this._parentContainer.skeletons.indexOf(this);e>-1&&this._parentContainer.skeletons.splice(e,1),this._parentContainer=null}this._transformMatrixTexture&&(this._transformMatrixTexture.dispose(),this._transformMatrixTexture=null)}serialize(){var e;const t={};t.name=this.name,t.id=this.id,this.dimensionsAtRest&&(t.dimensionsAtRest=this.dimensionsAtRest.asArray()),t.bones=[],t.needInitialSkinMatrix=this.needInitialSkinMatrix;for(let i=0;i<this.bones.length;i++){const n=this.bones[i],s=n.getParent(),r={parentBoneIndex:s?this.bones.indexOf(s):-1,index:n.getIndex(),name:n.name,id:n.id,matrix:n.getBaseMatrix().toArray(),rest:n.getRestPose().toArray(),linkedTransformNodeId:(e=n.getTransformNode())===null||e===void 0?void 0:e.id};t.bones.push(r),n.length&&(r.length=n.length),n.metadata&&(r.metadata=n.metadata),n.animations&&n.animations.length>0&&(r.animation=n.animations[0].serialize()),t.ranges=[];for(const o in this._ranges){const l=this._ranges[o];if(!l)continue;const c={};c.name=o,c.from=l.from,c.to=l.to,t.ranges.push(c)}}return t}static Parse(e,t){const i=new it(e.name,e.id,t);e.dimensionsAtRest&&(i.dimensionsAtRest=A.FromArray(e.dimensionsAtRest)),i.needInitialSkinMatrix=e.needInitialSkinMatrix;let n;for(n=0;n<e.bones.length;n++){const s=e.bones[n],r=e.bones[n].index;let o=null;s.parentBoneIndex>-1&&(o=i.bones[s.parentBoneIndex]);const l=s.rest?X.FromArray(s.rest):null,c=new ze(s.name,i,o,X.FromArray(s.matrix),l,null,r);s.id!==void 0&&s.id!==null&&(c.id=s.id),s.length&&(c.length=s.length),s.metadata&&(c.metadata=s.metadata),s.animation&&c.animations.push(U.Parse(s.animation)),s.linkedTransformNodeId!==void 0&&s.linkedTransformNodeId!==null&&(i._hasWaitingData=!0,c._waitingTransformNodeId=s.linkedTransformNodeId)}if(e.ranges)for(n=0;n<e.ranges.length;n++){const s=e.ranges[n];i.createAnimationRange(s.name,s.from,s.to)}return i}computeAbsoluteTransforms(e=!1){(this._absoluteTransformIsDirty||e)&&(this.bones[0].computeAbsoluteTransforms(),this._absoluteTransformIsDirty=!1)}getPoseMatrix(){let e=null;return this._meshesWithPoseMatrix.length>0&&(e=this._meshesWithPoseMatrix[0].getPoseMatrix()),e}sortBones(){const e=new Array,t=new Array(this.bones.length);for(let i=0;i<this.bones.length;i++)this._sortBones(i,e,t);this.bones=e}_sortBones(e,t,i){if(i[e])return;i[e]=!0;const n=this.bones[e];if(!n)return;n._index===void 0&&(n._index=e);const s=n.getParent();s&&this._sortBones(this.bones.indexOf(s),t,i),t.push(n)}setCurrentPoseAsRest(){this.bones.forEach(e=>{e.setCurrentPoseAsRest()})}}class Qe extends _t{constructor(){super(...arguments),this._needProjectionMatrixCompute=!0}_setPosition(e){this._position=e}get position(){return this._position}set position(e){this._setPosition(e)}_setDirection(e){this._direction=e}get direction(){return this._direction}set direction(e){this._setDirection(e)}get shadowMinZ(){return this._shadowMinZ}set shadowMinZ(e){this._shadowMinZ=e,this.forceProjectionMatrixCompute()}get shadowMaxZ(){return this._shadowMaxZ}set shadowMaxZ(e){this._shadowMaxZ=e,this.forceProjectionMatrixCompute()}computeTransformedInformation(){return this.parent&&this.parent.getWorldMatrix?(this.transformedPosition||(this.transformedPosition=A.Zero()),A.TransformCoordinatesToRef(this.position,this.parent.getWorldMatrix(),this.transformedPosition),this.direction&&(this.transformedDirection||(this.transformedDirection=A.Zero()),A.TransformNormalToRef(this.direction,this.parent.getWorldMatrix(),this.transformedDirection)),!0):!1}getDepthScale(){return 50}getShadowDirection(e){return this.transformedDirection?this.transformedDirection:this.direction}getAbsolutePosition(){return this.transformedPosition?this.transformedPosition:this.position}setDirectionToTarget(e){return this.direction=A.Normalize(e.subtract(this.position)),this.direction}getRotation(){this.direction.normalize();const e=A.Cross(this.direction,jn.Y),t=A.Cross(e,this.direction);return A.RotationFromAxis(e,t,this.direction)}needCube(){return!1}needProjectionMatrixCompute(){return this._needProjectionMatrixCompute}forceProjectionMatrixCompute(){this._needProjectionMatrixCompute=!0}_initCache(){super._initCache(),this._cache.position=A.Zero()}_isSynchronized(){return!!this._cache.position.equals(this.position)}computeWorldMatrix(e){return!e&&this.isSynchronized()?(this._currentRenderId=this.getScene().getRenderId(),this._worldMatrix):(this._updateCache(),this._cache.position.copyFrom(this.position),this._worldMatrix||(this._worldMatrix=X.Identity()),X.TranslationToRef(this.position.x,this.position.y,this.position.z,this._worldMatrix),this.parent&&this.parent.getWorldMatrix&&(this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(),this._worldMatrix),this._markSyncedWithParent()),this._worldMatrixDeterminantIsDirty=!0,this._worldMatrix)}getDepthMinZ(e){return this.shadowMinZ!==void 0?this.shadowMinZ:e.minZ}getDepthMaxZ(e){return this.shadowMaxZ!==void 0?this.shadowMaxZ:e.maxZ}setShadowProjectionMatrix(e,t,i){return this.customProjectionMatrixBuilder?this.customProjectionMatrixBuilder(t,i,e):this._setDefaultShadowProjectionMatrix(e,t,i),this}_syncParentEnabledState(){super._syncParentEnabledState(),(!this.parent||!this.parent.getWorldMatrix)&&(this.transformedPosition=null,this.transformedDirection=null)}}m([vt()],Qe.prototype,"position",null);m([vt()],Qe.prototype,"direction",null);m([T()],Qe.prototype,"shadowMinZ",null);m([T()],Qe.prototype,"shadowMaxZ",null);Ti.AddNodeConstructor("Light_Type_1",(a,e)=>()=>new Ce(a,A.Zero(),e));class Ce extends Qe{constructor(e,t,i){super(e,i),this._shadowFrustumSize=0,this._shadowOrthoScale=.1,this.autoUpdateExtends=!0,this.autoCalcShadowZBounds=!1,this._orthoLeft=Number.MAX_VALUE,this._orthoRight=Number.MIN_VALUE,this._orthoTop=Number.MIN_VALUE,this._orthoBottom=Number.MAX_VALUE,this.position=t.scale(-1),this.direction=t}get shadowFrustumSize(){return this._shadowFrustumSize}set shadowFrustumSize(e){this._shadowFrustumSize=e,this.forceProjectionMatrixCompute()}get shadowOrthoScale(){return this._shadowOrthoScale}set shadowOrthoScale(e){this._shadowOrthoScale=e,this.forceProjectionMatrixCompute()}get orthoLeft(){return this._orthoLeft}set orthoLeft(e){this._orthoLeft=e}get orthoRight(){return this._orthoRight}set orthoRight(e){this._orthoRight=e}get orthoTop(){return this._orthoTop}set orthoTop(e){this._orthoTop=e}get orthoBottom(){return this._orthoBottom}set orthoBottom(e){this._orthoBottom=e}getClassName(){return"DirectionalLight"}getTypeID(){return _t.LIGHTTYPEID_DIRECTIONALLIGHT}_setDefaultShadowProjectionMatrix(e,t,i){this.shadowFrustumSize>0?this._setDefaultFixedFrustumShadowProjectionMatrix(e):this._setDefaultAutoExtendShadowProjectionMatrix(e,t,i)}_setDefaultFixedFrustumShadowProjectionMatrix(e){const t=this.getScene().activeCamera;!t||X.OrthoLHToRef(this.shadowFrustumSize,this.shadowFrustumSize,this.shadowMinZ!==void 0?this.shadowMinZ:t.minZ,this.shadowMaxZ!==void 0?this.shadowMaxZ:t.maxZ,e,this.getScene().getEngine().isNDCHalfZRange)}_setDefaultAutoExtendShadowProjectionMatrix(e,t,i){const n=this.getScene().activeCamera;if(!n)return;if(this.autoUpdateExtends||this._orthoLeft===Number.MAX_VALUE){const f=A.Zero();this._orthoLeft=Number.MAX_VALUE,this._orthoRight=Number.MIN_VALUE,this._orthoTop=Number.MIN_VALUE,this._orthoBottom=Number.MAX_VALUE;let u=Number.MAX_VALUE,h=Number.MIN_VALUE;for(let _=0;_<i.length;_++){const d=i[_];if(!d)continue;const p=d.getBoundingInfo().boundingBox;for(let g=0;g<p.vectorsWorld.length;g++)A.TransformCoordinatesToRef(p.vectorsWorld[g],t,f),f.x<this._orthoLeft&&(this._orthoLeft=f.x),f.y<this._orthoBottom&&(this._orthoBottom=f.y),f.x>this._orthoRight&&(this._orthoRight=f.x),f.y>this._orthoTop&&(this._orthoTop=f.y),this.autoCalcShadowZBounds&&(f.z<u&&(u=f.z),f.z>h&&(h=f.z))}this.autoCalcShadowZBounds&&(this._shadowMinZ=u,this._shadowMaxZ=h)}const s=this._orthoRight-this._orthoLeft,r=this._orthoTop-this._orthoBottom,o=this.shadowMinZ!==void 0?this.shadowMinZ:n.minZ,l=this.shadowMaxZ!==void 0?this.shadowMaxZ:n.maxZ,c=this.getScene().getEngine().useReverseDepthBuffer;X.OrthoOffCenterLHToRef(this._orthoLeft-s*this.shadowOrthoScale,this._orthoRight+s*this.shadowOrthoScale,this._orthoBottom-r*this.shadowOrthoScale,this._orthoTop+r*this.shadowOrthoScale,c?l:o,c?o:l,e,this.getScene().getEngine().isNDCHalfZRange)}_buildUniformLayout(){this._uniformBuffer.addUniform("vLightData",4),this._uniformBuffer.addUniform("vLightDiffuse",4),this._uniformBuffer.addUniform("vLightSpecular",4),this._uniformBuffer.addUniform("shadowsInfo",3),this._uniformBuffer.addUniform("depthValues",2),this._uniformBuffer.create()}transferToEffect(e,t){return this.computeTransformedInformation()?(this._uniformBuffer.updateFloat4("vLightData",this.transformedDirection.x,this.transformedDirection.y,this.transformedDirection.z,1,t),this):(this._uniformBuffer.updateFloat4("vLightData",this.direction.x,this.direction.y,this.direction.z,1,t),this)}transferToNodeMaterialEffect(e,t){return this.computeTransformedInformation()?(e.setFloat3(t,this.transformedDirection.x,this.transformedDirection.y,this.transformedDirection.z),this):(e.setFloat3(t,this.direction.x,this.direction.y,this.direction.z),this)}getDepthMinZ(e){const t=this._scene.getEngine();return!t.useReverseDepthBuffer&&t.isNDCHalfZRange?0:1}getDepthMaxZ(e){const t=this._scene.getEngine();return t.useReverseDepthBuffer&&t.isNDCHalfZRange?0:1}prepareLightSpecificDefines(e,t){e["DIRLIGHT"+t]=!0}}m([T()],Ce.prototype,"shadowFrustumSize",null);m([T()],Ce.prototype,"shadowOrthoScale",null);m([T()],Ce.prototype,"autoUpdateExtends",void 0);m([T()],Ce.prototype,"autoCalcShadowZBounds",void 0);m([T("orthoLeft")],Ce.prototype,"_orthoLeft",void 0);m([T("orthoRight")],Ce.prototype,"_orthoRight",void 0);m([T("orthoTop")],Ce.prototype,"_orthoTop",void 0);m([T("orthoBottom")],Ce.prototype,"_orthoBottom",void 0);Ti.AddNodeConstructor("Light_Type_0",(a,e)=>()=>new mt(a,A.Zero(),e));class mt extends Qe{constructor(e,t,i){super(e,i),this._shadowAngle=Math.PI/2,this.position=t}get shadowAngle(){return this._shadowAngle}set shadowAngle(e){this._shadowAngle=e,this.forceProjectionMatrixCompute()}get direction(){return this._direction}set direction(e){const t=this.needCube();if(this._direction=e,this.needCube()!==t&&this._shadowGenerators){const i=this._shadowGenerators.values();for(let n=i.next();n.done!==!0;n=i.next())n.value.recreateShadowMap()}}getClassName(){return"PointLight"}getTypeID(){return _t.LIGHTTYPEID_POINTLIGHT}needCube(){return!this.direction}getShadowDirection(e){if(this.direction)return super.getShadowDirection(e);switch(e){case 0:return new A(1,0,0);case 1:return new A(-1,0,0);case 2:return new A(0,-1,0);case 3:return new A(0,1,0);case 4:return new A(0,0,1);case 5:return new A(0,0,-1)}return A.Zero()}_setDefaultShadowProjectionMatrix(e,t,i){const n=this.getScene().activeCamera;if(!n)return;const s=this.shadowMinZ!==void 0?this.shadowMinZ:n.minZ,r=this.shadowMaxZ!==void 0?this.shadowMaxZ:n.maxZ,o=this.getScene().getEngine().useReverseDepthBuffer;X.PerspectiveFovLHToRef(this.shadowAngle,1,o?r:s,o?s:r,e,!0,this._scene.getEngine().isNDCHalfZRange,void 0,o)}_buildUniformLayout(){this._uniformBuffer.addUniform("vLightData",4),this._uniformBuffer.addUniform("vLightDiffuse",4),this._uniformBuffer.addUniform("vLightSpecular",4),this._uniformBuffer.addUniform("vLightFalloff",4),this._uniformBuffer.addUniform("shadowsInfo",3),this._uniformBuffer.addUniform("depthValues",2),this._uniformBuffer.create()}transferToEffect(e,t){return this.computeTransformedInformation()?this._uniformBuffer.updateFloat4("vLightData",this.transformedPosition.x,this.transformedPosition.y,this.transformedPosition.z,0,t):this._uniformBuffer.updateFloat4("vLightData",this.position.x,this.position.y,this.position.z,0,t),this._uniformBuffer.updateFloat4("vLightFalloff",this.range,this._inverseSquaredRange,0,0,t),this}transferToNodeMaterialEffect(e,t){return this.computeTransformedInformation()?e.setFloat3(t,this.transformedPosition.x,this.transformedPosition.y,this.transformedPosition.z):e.setFloat3(t,this.position.x,this.position.y,this.position.z),this}prepareLightSpecificDefines(e,t){e["POINTLIGHT"+t]=!0}}m([T()],mt.prototype,"shadowAngle",null);Ti.AddNodeConstructor("Light_Type_2",(a,e)=>()=>new pe(a,A.Zero(),A.Zero(),0,0,e));class pe extends Qe{constructor(e,t,i,n,s,r){super(e,r),this._innerAngle=0,this._projectionTextureMatrix=X.Zero(),this._projectionTextureLightNear=1e-6,this._projectionTextureLightFar=1e3,this._projectionTextureUpDirection=A.Up(),this._projectionTextureViewLightDirty=!0,this._projectionTextureProjectionLightDirty=!0,this._projectionTextureDirty=!0,this._projectionTextureViewTargetVector=A.Zero(),this._projectionTextureViewLightMatrix=X.Zero(),this._projectionTextureProjectionLightMatrix=X.Zero(),this._projectionTextureScalingMatrix=X.FromValues(.5,0,0,0,0,.5,0,0,0,0,.5,0,.5,.5,.5,1),this.position=t,this.direction=i,this.angle=n,this.exponent=s}get angle(){return this._angle}set angle(e){this._angle=e,this._cosHalfAngle=Math.cos(e*.5),this._projectionTextureProjectionLightDirty=!0,this.forceProjectionMatrixCompute(),this._computeAngleValues()}get innerAngle(){return this._innerAngle}set innerAngle(e){this._innerAngle=e,this._computeAngleValues()}get shadowAngleScale(){return this._shadowAngleScale}set shadowAngleScale(e){this._shadowAngleScale=e,this.forceProjectionMatrixCompute()}get projectionTextureMatrix(){return this._projectionTextureMatrix}get projectionTextureLightNear(){return this._projectionTextureLightNear}set projectionTextureLightNear(e){this._projectionTextureLightNear=e,this._projectionTextureProjectionLightDirty=!0}get projectionTextureLightFar(){return this._projectionTextureLightFar}set projectionTextureLightFar(e){this._projectionTextureLightFar=e,this._projectionTextureProjectionLightDirty=!0}get projectionTextureUpDirection(){return this._projectionTextureUpDirection}set projectionTextureUpDirection(e){this._projectionTextureUpDirection=e,this._projectionTextureProjectionLightDirty=!0}get projectionTexture(){return this._projectionTexture}set projectionTexture(e){this._projectionTexture!==e&&(this._projectionTexture=e,this._projectionTextureDirty=!0,this._projectionTexture&&!this._projectionTexture.isReady()&&(pe._IsProceduralTexture(this._projectionTexture)?this._projectionTexture.getEffect().executeWhenCompiled(()=>{this._markMeshesAsLightDirty()}):pe._IsTexture(this._projectionTexture)&&this._projectionTexture.onLoadObservable.addOnce(()=>{this._markMeshesAsLightDirty()})))}static _IsProceduralTexture(e){return e.onGeneratedObservable!==void 0}static _IsTexture(e){return e.onLoadObservable!==void 0}get projectionTextureProjectionLightMatrix(){return this._projectionTextureProjectionLightMatrix}set projectionTextureProjectionLightMatrix(e){this._projectionTextureProjectionLightMatrix=e,this._projectionTextureProjectionLightDirty=!1,this._projectionTextureDirty=!0}getClassName(){return"SpotLight"}getTypeID(){return _t.LIGHTTYPEID_SPOTLIGHT}_setDirection(e){super._setDirection(e),this._projectionTextureViewLightDirty=!0}_setPosition(e){super._setPosition(e),this._projectionTextureViewLightDirty=!0}_setDefaultShadowProjectionMatrix(e,t,i){const n=this.getScene().activeCamera;if(!n)return;this._shadowAngleScale=this._shadowAngleScale||1;const s=this._shadowAngleScale*this._angle,r=this.shadowMinZ!==void 0?this.shadowMinZ:n.minZ,o=this.shadowMaxZ!==void 0?this.shadowMaxZ:n.maxZ,l=this.getScene().getEngine().useReverseDepthBuffer;X.PerspectiveFovLHToRef(s,1,l?o:r,l?r:o,e,!0,this._scene.getEngine().isNDCHalfZRange,void 0,l)}_computeProjectionTextureViewLightMatrix(){this._projectionTextureViewLightDirty=!1,this._projectionTextureDirty=!0,this.position.addToRef(this.direction,this._projectionTextureViewTargetVector),X.LookAtLHToRef(this.position,this._projectionTextureViewTargetVector,this._projectionTextureUpDirection,this._projectionTextureViewLightMatrix)}_computeProjectionTextureProjectionLightMatrix(){this._projectionTextureProjectionLightDirty=!1,this._projectionTextureDirty=!0;const e=this.projectionTextureLightFar,t=this.projectionTextureLightNear,i=e/(e-t),n=-i*t,s=1/Math.tan(this._angle/2),r=1;X.FromValuesToRef(s/r,0,0,0,0,s,0,0,0,0,i,1,0,0,n,0,this._projectionTextureProjectionLightMatrix)}_computeProjectionTextureMatrix(){if(this._projectionTextureDirty=!1,this._projectionTextureViewLightMatrix.multiplyToRef(this._projectionTextureProjectionLightMatrix,this._projectionTextureMatrix),this._projectionTexture instanceof B){const e=this._projectionTexture.uScale/2,t=this._projectionTexture.vScale/2;X.FromValuesToRef(e,0,0,0,0,t,0,0,0,0,.5,0,.5,.5,.5,1,this._projectionTextureScalingMatrix)}this._projectionTextureMatrix.multiplyToRef(this._projectionTextureScalingMatrix,this._projectionTextureMatrix)}_buildUniformLayout(){this._uniformBuffer.addUniform("vLightData",4),this._uniformBuffer.addUniform("vLightDiffuse",4),this._uniformBuffer.addUniform("vLightSpecular",4),this._uniformBuffer.addUniform("vLightDirection",3),this._uniformBuffer.addUniform("vLightFalloff",4),this._uniformBuffer.addUniform("shadowsInfo",3),this._uniformBuffer.addUniform("depthValues",2),this._uniformBuffer.create()}_computeAngleValues(){this._lightAngleScale=1/Math.max(.001,Math.cos(this._innerAngle*.5)-this._cosHalfAngle),this._lightAngleOffset=-this._cosHalfAngle*this._lightAngleScale}transferTexturesToEffect(e,t){return this.projectionTexture&&this.projectionTexture.isReady()&&(this._projectionTextureViewLightDirty&&this._computeProjectionTextureViewLightMatrix(),this._projectionTextureProjectionLightDirty&&this._computeProjectionTextureProjectionLightMatrix(),this._projectionTextureDirty&&this._computeProjectionTextureMatrix(),e.setMatrix("textureProjectionMatrix"+t,this._projectionTextureMatrix),e.setTexture("projectionLightSampler"+t,this.projectionTexture)),this}transferToEffect(e,t){let i;return this.computeTransformedInformation()?(this._uniformBuffer.updateFloat4("vLightData",this.transformedPosition.x,this.transformedPosition.y,this.transformedPosition.z,this.exponent,t),i=A.Normalize(this.transformedDirection)):(this._uniformBuffer.updateFloat4("vLightData",this.position.x,this.position.y,this.position.z,this.exponent,t),i=A.Normalize(this.direction)),this._uniformBuffer.updateFloat4("vLightDirection",i.x,i.y,i.z,this._cosHalfAngle,t),this._uniformBuffer.updateFloat4("vLightFalloff",this.range,this._inverseSquaredRange,this._lightAngleScale,this._lightAngleOffset,t),this}transferToNodeMaterialEffect(e,t){let i;return this.computeTransformedInformation()?i=A.Normalize(this.transformedDirection):i=A.Normalize(this.direction),this.getScene().useRightHandedSystem?e.setFloat3(t,-i.x,-i.y,-i.z):e.setFloat3(t,i.x,i.y,i.z),this}dispose(){super.dispose(),this._projectionTexture&&this._projectionTexture.dispose()}getDepthMinZ(e){const t=this._scene.getEngine(),i=this.shadowMinZ!==void 0?this.shadowMinZ:e.minZ;return t.useReverseDepthBuffer&&t.isNDCHalfZRange?i:this._scene.getEngine().isNDCHalfZRange?0:i}getDepthMaxZ(e){const t=this._scene.getEngine(),i=this.shadowMaxZ!==void 0?this.shadowMaxZ:e.maxZ;return t.useReverseDepthBuffer&&t.isNDCHalfZRange?0:i}prepareLightSpecificDefines(e,t){e["SPOTLIGHT"+t]=!0,e["PROJECTEDLIGHTTEXTURE"+t]=!!(this.projectionTexture&&this.projectionTexture.isReady())}}m([T()],pe.prototype,"angle",null);m([T()],pe.prototype,"innerAngle",null);m([T()],pe.prototype,"shadowAngleScale",null);m([T()],pe.prototype,"exponent",void 0);m([T()],pe.prototype,"projectionTextureLightNear",null);m([T()],pe.prototype,"projectionTextureLightFar",null);m([T()],pe.prototype,"projectionTextureUpDirection",null);m([ee("projectedLightTexture")],pe.prototype,"_projectionTexture",void 0);class ie{static SetMatrix(e,t,i,n,s){let r=null;if(i.semantic==="MODEL"?r=t.getWorldMatrix():i.semantic==="PROJECTION"?r=e.getProjectionMatrix():i.semantic==="VIEW"?r=e.getViewMatrix():i.semantic==="MODELVIEWINVERSETRANSPOSE"?r=X.Transpose(t.getWorldMatrix().multiply(e.getViewMatrix()).invert()):i.semantic==="MODELVIEW"?r=t.getWorldMatrix().multiply(e.getViewMatrix()):i.semantic==="MODELVIEWPROJECTION"?r=t.getWorldMatrix().multiply(e.getTransformMatrix()):i.semantic==="MODELINVERSE"?r=t.getWorldMatrix().invert():i.semantic==="VIEWINVERSE"?r=e.getViewMatrix().invert():i.semantic==="PROJECTIONINVERSE"?r=e.getProjectionMatrix().invert():i.semantic==="MODELVIEWINVERSE"?r=t.getWorldMatrix().multiply(e.getViewMatrix()).invert():i.semantic==="MODELVIEWPROJECTIONINVERSE"?r=t.getWorldMatrix().multiply(e.getTransformMatrix()).invert():i.semantic==="MODELINVERSETRANSPOSE"&&(r=X.Transpose(t.getWorldMatrix().invert())),r)switch(i.type){case ue.FLOAT_MAT2:s.setMatrix2x2(n,X.GetAsMatrix2x2(r));break;case ue.FLOAT_MAT3:s.setMatrix3x3(n,X.GetAsMatrix3x3(r));break;case ue.FLOAT_MAT4:s.setMatrix(n,r);break}}static SetUniform(e,t,i,n){switch(n){case ue.FLOAT:return e.setFloat(t,i),!0;case ue.FLOAT_VEC2:return e.setVector2(t,ft.FromArray(i)),!0;case ue.FLOAT_VEC3:return e.setVector3(t,A.FromArray(i)),!0;case ue.FLOAT_VEC4:return e.setVector4(t,qi.FromArray(i)),!0;default:return!1}}static GetWrapMode(e){switch(e){case $e.CLAMP_TO_EDGE:return B.CLAMP_ADDRESSMODE;case $e.MIRRORED_REPEAT:return B.MIRROR_ADDRESSMODE;case $e.REPEAT:return B.WRAP_ADDRESSMODE;default:return B.WRAP_ADDRESSMODE}}static GetByteStrideFromType(e){switch(e.type){case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"MAT2":return 4;case"MAT3":return 9;case"MAT4":return 16;default:return 1}}static GetTextureFilterMode(e){switch(e){case Re.LINEAR:case Re.LINEAR_MIPMAP_NEAREST:case Re.LINEAR_MIPMAP_LINEAR:return B.TRILINEAR_SAMPLINGMODE;case Re.NEAREST:case Re.NEAREST_MIPMAP_NEAREST:return B.NEAREST_SAMPLINGMODE;default:return B.BILINEAR_SAMPLINGMODE}}static GetBufferFromBufferView(e,t,i,n,s){i=t.byteOffset+i;const r=e.loadedBufferViews[t.buffer];if(i+n>r.byteLength)throw new Error("Buffer access is out of range");const o=r.buffer;switch(i+=r.byteOffset,s){case we.BYTE:return new Int8Array(o,i,n);case we.UNSIGNED_BYTE:return new Uint8Array(o,i,n);case we.SHORT:return new Int16Array(o,i,n);case we.UNSIGNED_SHORT:return new Uint16Array(o,i,n);default:return new Float32Array(o,i,n)}}static GetBufferFromAccessor(e,t){const i=e.bufferViews[t.bufferView],n=t.count*ie.GetByteStrideFromType(t);return ie.GetBufferFromBufferView(e,i,t.byteOffset,n,t.componentType)}static DecodeBufferToText(e){let t="";const i=e.byteLength;for(let n=0;n<i;++n)t+=String.fromCharCode(e[n]);return t}static GetDefaultMaterial(e){if(!ie._DefaultMaterial){Ve.ShadersStore.GLTFDefaultMaterialVertexShader=["precision highp float;","","uniform mat4 worldView;","uniform mat4 projection;","","attribute vec3 position;","","void main(void)","{","    gl_Position = projection * worldView * vec4(position, 1.0);","}"].join(`
`),Ve.ShadersStore.GLTFDefaultMaterialPixelShader=["precision highp float;","","uniform vec4 u_emission;","","void main(void)","{","    gl_FragColor = u_emission;","}"].join(`
`);const t={vertex:"GLTFDefaultMaterial",fragment:"GLTFDefaultMaterial"},i={attributes:["position"],uniforms:["worldView","projection","u_emission"],samplers:new Array,needAlphaBlending:!1};ie._DefaultMaterial=new Zi("GLTFDefaultMaterial",e,t,i),ie._DefaultMaterial.setColor4("u_emission",new qn(.5,.5,.5,1))}return ie._DefaultMaterial}}ie._DefaultMaterial=null;var He;(function(a){a[a.IDENTIFIER=1]="IDENTIFIER",a[a.UNKNOWN=2]="UNKNOWN",a[a.END_OF_INPUT=3]="END_OF_INPUT"})(He||(He={}));class Fi{constructor(e){this._pos=0,this.currentToken=He.UNKNOWN,this.currentIdentifier="",this.currentString="",this.isLetterOrDigitPattern=/^[a-zA-Z0-9]+$/,this._toParse=e,this._maxPos=e.length}getNextToken(){if(this.isEnd())return He.END_OF_INPUT;if(this.currentString=this.read(),this.currentToken=He.UNKNOWN,this.currentString==="_"||this.isLetterOrDigitPattern.test(this.currentString))for(this.currentToken=He.IDENTIFIER,this.currentIdentifier=this.currentString;!this.isEnd()&&(this.isLetterOrDigitPattern.test(this.currentString=this.peek())||this.currentString==="_");)this.currentIdentifier+=this.currentString,this.forward();return this.currentToken}peek(){return this._toParse[this._pos]}read(){return this._toParse[this._pos++]}forward(){this._pos++}isEnd(){return this._pos>=this._maxPos}}const sn=["MODEL","VIEW","PROJECTION","MODELVIEW","MODELVIEWPROJECTION","JOINTMATRIX"],rn=["world","view","projection","worldView","worldViewProjection","mBones"],Ns=["translation","rotation","scale"],Os=["position","rotationQuaternion","scaling"],ys=(a,e)=>{for(const t in a){const i=a[t];e.buffers[t]=i,e.buffersCount++}},bs=(a,e)=>{for(const t in a){const i=a[t];e.shaders[t]=i,e.shaderscount++}},fe=(a,e,t)=>{for(const i in a){const n=a[i];t[e][i]=n}},Ls=a=>{if(!!a)for(let e=0;e<a.length/2;e++)a[e*2+1]=1-a[e*2+1]},Bi=a=>{if(a.semantic==="NORMAL")return"normal";if(a.semantic==="POSITION")return"position";if(a.semantic==="JOINT")return"matricesIndices";if(a.semantic==="WEIGHT")return"matricesWeights";if(a.semantic==="COLOR")return"color";if(a.semantic&&a.semantic.indexOf("TEXCOORD_")!==-1){const e=Number(a.semantic.split("_")[1]);return"uv"+(e===0?"":e+1)}return null},Ps=a=>{for(const e in a.animations){const t=a.animations[e];if(!t.channels||!t.samplers)continue;let i=null;for(let n=0;n<t.channels.length;n++){const s=t.channels[n],r=t.samplers[s.sampler];if(!r)continue;let o=null,l=null;t.parameters?(o=t.parameters[r.input],l=t.parameters[r.output]):(o=r.input,l=r.output);const c=ie.GetBufferFromAccessor(a,a.accessors[o]),f=ie.GetBufferFromAccessor(a,a.accessors[l]),u=s.target.id;let h=a.scene.getNodeById(u);if(h===null&&(h=a.scene.getNodeByName(u)),h===null){w.Warn("Creating animation named "+e+". But cannot find node named "+u+" to attach to");continue}const _=h instanceof ze;let d=s.target.path;const E=Ns.indexOf(d);E!==-1&&(d=Os[E]);let p=U.ANIMATIONTYPE_MATRIX;_||(d==="rotationQuaternion"?(p=U.ANIMATIONTYPE_QUATERNION,h.rotationQuaternion=new Ee):p=U.ANIMATIONTYPE_VECTOR3);let g=null;const R=[];let M=0,b=!1;_&&i&&i.getKeys().length===c.length&&(g=i,b=!0),b||(a.scene._blockEntityCollection=!!a.assetContainer,g=new U(e,_?"_matrix":d,1,p,U.ANIMATIONLOOPMODE_CYCLE),a.scene._blockEntityCollection=!1);for(let O=0;O<c.length;O++){let I=null;if(d==="rotationQuaternion"?(I=Ee.FromArray([f[M],f[M+1],f[M+2],f[M+3]]),M+=4):(I=A.FromArray([f[M],f[M+1],f[M+2]]),M+=3),_){const N=h;let G=A.Zero(),Q=new Ee,J=A.Zero(),se=N.getBaseMatrix();b&&i&&(se=i.getKeys()[O].value),se.decompose(J,Q,G),d==="position"?G=I:d==="rotationQuaternion"?Q=I:J=I,I=X.Compose(J,Q,G)}b?i&&(i.getKeys()[O].value=I):R.push({frame:c[O],value:I})}!b&&g&&(g.setKeys(R),h.animations.push(g)),i=g,a.scene.stopAnimation(h),a.scene.beginAnimation(h,0,c[c.length-1],!0,1)}}},Si=a=>{let e=null;if(a.translation||a.rotation||a.scale){const t=A.FromArray(a.scale||[1,1,1]),i=Ee.FromArray(a.rotation||[0,0,0,1]),n=A.FromArray(a.translation||[0,0,0]);e=X.Compose(t,i,n)}else e=X.FromArray(a.matrix);return e},an=(a,e,t,i)=>{for(let s=0;s<i.bones.length;s++)if(i.bones[s].name===t)return i.bones[s];const n=a.nodes;for(const s in n){const r=n[s];if(!r.jointName)continue;const o=r.children;for(let l=0;l<o.length;l++){const c=a.nodes[o[l]];if(!!c.jointName&&c.jointName===t){const f=Si(r),u=new ze(r.name||"",i,an(a,e,r.jointName,i),f);return u.id=s,u}}}return null},Ds=(a,e)=>{for(let t=0;t<a.length;t++){const i=a[t];for(let n=0;n<i.node.children.length;n++)if(i.node.children[n]===e)return i.bone}return null},Ut=(a,e)=>{const t=a.nodes;let i=t[e];if(i)return{node:i,id:e};for(const n in t)if(i=t[n],i.jointName===e)return{node:i,id:n};return null},Fs=(a,e)=>{for(let t=0;t<a.jointNames.length;t++)if(a.jointNames[t]===e)return!0;return!1},Bs=(a,e,t,i)=>{for(const n in a.nodes){const s=a.nodes[n],r=n;if(!s.jointName||Fs(t,s.jointName))continue;const o=Si(s),l=new ze(s.name||"",e,null,o);l.id=r,i.push({bone:l,node:s,id:r})}for(let n=0;n<i.length;n++){const s=i[n],r=s.node.children;for(let o=0;o<r.length;o++){let l=null;for(let c=0;c<i.length;c++)if(i[c].id===r[o]){l=i[c];break}l&&(l.bone._parent=s.bone,s.bone.children.push(l.bone))}}},Us=(a,e,t,i)=>{if(i||(i=new it(e.name||"","",a.scene)),!e.babylonSkeleton)return i;const n=[],s=[];Bs(a,i,e,n),i.bones=[];for(let o=0;o<e.jointNames.length;o++){const l=Ut(a,e.jointNames[o]);if(!l)continue;const c=l.node;if(!c){w.Warn("Joint named "+e.jointNames[o]+" does not exist");continue}const f=l.id,u=a.scene.getBoneById(f);if(u){i.bones.push(u);continue}let h=!1,_=null;for(let p=0;p<o;p++){const g=Ut(a,e.jointNames[p]);if(!g)continue;const R=g.node;if(!R){w.Warn("Joint named "+e.jointNames[p]+" does not exist when looking for parent");continue}const M=R.children;if(!!M){h=!1;for(let b=0;b<M.length;b++)if(M[b]===f){_=an(a,e,e.jointNames[p],i),h=!0;break}if(h)break}}const d=Si(c);!_&&n.length>0&&(_=Ds(n,f),_&&s.indexOf(_)===-1&&s.push(_));const E=new ze(c.jointName||"",i,_,d);E.id=f}const r=i.bones;i.bones=[];for(let o=0;o<e.jointNames.length;o++){const l=Ut(a,e.jointNames[o]);if(!!l){for(let c=0;c<r.length;c++)if(r[c].id===l.id){i.bones.push(r[c]);break}}}i.prepare();for(let o=0;o<s.length;o++)i.bones.push(s[o]);return i},Ui=(a,e,t,i,n)=>{if(n||(a.scene._blockEntityCollection=!!a.assetContainer,n=new ne(e.name||"",a.scene),n._parentContainer=a.assetContainer,a.scene._blockEntityCollection=!1,n.id=i),!e.babylonNode)return n;const s=[];let r=null;const o=new Array,l=new Array,c=new Array,f=new Array;for(let _=0;_<t.length;_++){const d=t[_],E=a.meshes[d];if(!!E)for(let p=0;p<E.primitives.length;p++){const g=new Ht,R=E.primitives[p];R.mode;const M=R.attributes;let b=null,O=null;for(const N in M)if(b=a.accessors[M[N]],O=ie.GetBufferFromAccessor(a,b),N==="NORMAL")g.normals=new Float32Array(O.length),g.normals.set(O);else if(N==="POSITION"){if(q.HomogeneousCoordinates){g.positions=new Float32Array(O.length-O.length/4);for(let G=0;G<O.length;G+=4)g.positions[G]=O[G],g.positions[G+1]=O[G+1],g.positions[G+2]=O[G+2]}else g.positions=new Float32Array(O.length),g.positions.set(O);l.push(g.positions.length)}else if(N.indexOf("TEXCOORD_")!==-1){const G=Number(N.split("_")[1]),Q=y.UVKind+(G===0?"":G+1),J=new Float32Array(O.length);J.set(O),Ls(J),g.set(J,Q)}else N==="JOINT"?(g.matricesIndices=new Float32Array(O.length),g.matricesIndices.set(O)):N==="WEIGHT"?(g.matricesWeights=new Float32Array(O.length),g.matricesWeights.set(O)):N==="COLOR"&&(g.colors=new Float32Array(O.length),g.colors.set(O));if(b=a.accessors[R.indices],b)O=ie.GetBufferFromAccessor(a,b),g.indices=new Int32Array(O.length),g.indices.set(O),f.push(g.indices.length);else{const N=[];for(let G=0;G<g.positions.length/3;G++)N.push(G);g.indices=new Int32Array(N),f.push(g.indices.length)}r?r.merge(g):r=g;const I=a.scene.getMaterialById(R.material);s.push(I===null?ie.GetDefaultMaterial(a.scene):I),o.push(o.length===0?0:o[o.length-1]+l[l.length-2]),c.push(c.length===0?0:c[c.length-1]+f[f.length-2])}}let u;a.scene._blockEntityCollection=!!a.assetContainer,s.length>1?(u=new Jn("multimat"+i,a.scene),u.subMaterials=s):u=new gi("multimat"+i,a.scene),s.length===1&&(u=s[0]),u._parentContainer=a.assetContainer,n.material||(n.material=u),new Ri(i,a.scene,r,!1,n),n.computeWorldMatrix(!0),a.scene._blockEntityCollection=!1,n.subMeshes=[];let h=0;for(let _=0;_<t.length;_++){const d=t[_],E=a.meshes[d];if(!!E)for(let p=0;p<E.primitives.length;p++)E.primitives[p].mode,$n.AddToMesh(h,o[h],l[h],c[h],f[h],n,n,!0),h++}return n},Yt=(a,e,t,i)=>{a.position&&(a.position=e),(a.rotationQuaternion||a.rotation)&&(a.rotationQuaternion=t),a.scaling&&(a.scaling=i)},ws=(a,e)=>{if(e.matrix){const t=new A(0,0,0),i=new Ee,n=new A(0,0,0);X.FromArray(e.matrix).decompose(n,i,t),Yt(a,t,i,n)}else e.translation&&e.rotation&&e.scale&&Yt(a,A.FromArray(e.translation),Ee.FromArray(e.rotation),A.FromArray(e.scale));a.computeWorldMatrix(!0)},Gs=(a,e,t)=>{let i=null;if(a.importOnlyMeshes&&(e.skin||e.meshes)&&a.importMeshesNames&&a.importMeshesNames.length>0&&a.importMeshesNames.indexOf(e.name||"")===-1)return null;if(e.skin){if(e.meshes){const n=a.skins[e.skin],s=Ui(a,e,e.meshes,t,e.babylonNode);s.skeleton=a.scene.getLastSkeletonById(e.skin),s.skeleton===null&&(s.skeleton=Us(a,n,s,n.babylonSkeleton),n.babylonSkeleton||(n.babylonSkeleton=s.skeleton)),i=s}}else if(e.meshes)i=Ui(a,e,e.mesh?[e.mesh]:e.meshes,t,e.babylonNode);else if(e.light&&!e.babylonNode&&!a.importOnlyMeshes){const n=a.lights[e.light];if(n){if(n.type==="ambient"){const s=n[n.type],r=new Ji(e.light,A.Zero(),a.scene);r.name=e.name||"",s.color&&(r.diffuse=V.FromArray(s.color)),i=r}else if(n.type==="directional"){const s=n[n.type],r=new Ce(e.light,A.Zero(),a.scene);r.name=e.name||"",s.color&&(r.diffuse=V.FromArray(s.color)),i=r}else if(n.type==="point"){const s=n[n.type],r=new mt(e.light,A.Zero(),a.scene);r.name=e.name||"",s.color&&(r.diffuse=V.FromArray(s.color)),i=r}else if(n.type==="spot"){const s=n[n.type],r=new pe(e.light,A.Zero(),A.Zero(),0,0,a.scene);r.name=e.name||"",s.color&&(r.diffuse=V.FromArray(s.color)),s.fallOfAngle&&(r.angle=s.fallOfAngle),s.fallOffExponent&&(r.exponent=s.fallOffExponent),i=r}}}else if(e.camera&&!e.babylonNode&&!a.importOnlyMeshes){const n=a.cameras[e.camera];if(n){if(a.scene._blockEntityCollection=!!a.assetContainer,n.type==="orthographic"){const s=new We(e.camera,A.Zero(),a.scene,!1);s.name=e.name||"",s.mode=$i.ORTHOGRAPHIC_CAMERA,s.attachControl(),i=s,s._parentContainer=a.assetContainer}else if(n.type==="perspective"){const s=n[n.type],r=new We(e.camera,A.Zero(),a.scene,!1);r.name=e.name||"",r.attachControl(),s.aspectRatio||(s.aspectRatio=a.scene.getEngine().getRenderWidth()/a.scene.getEngine().getRenderHeight()),s.znear&&s.zfar&&(r.maxZ=s.zfar,r.minZ=s.znear),i=r,r._parentContainer=a.assetContainer}a.scene._blockEntityCollection=!1}}if(!e.jointName){if(e.babylonNode)return e.babylonNode;if(i===null){a.scene._blockEntityCollection=!!a.assetContainer;const n=new ne(e.name||"",a.scene);n._parentContainer=a.assetContainer,a.scene._blockEntityCollection=!1,e.babylonNode=n,i=n}}if(i!==null){if(e.matrix&&i instanceof ne)ws(i,e);else{const n=e.translation||[0,0,0],s=e.rotation||[0,0,0,1],r=e.scale||[1,1,1];Yt(i,A.FromArray(n),Ee.FromArray(s),A.FromArray(r))}i.updateCache(!0),e.babylonNode=i}return i},ut=(a,e,t,i=!1)=>{const n=a.nodes[e];let s=null;if(a.importOnlyMeshes&&!i&&a.importMeshesNames?a.importMeshesNames.indexOf(n.name||"")!==-1||a.importMeshesNames.length===0?i=!0:i=!1:i=!0,!n.jointName&&i&&(s=Gs(a,n,e),s!==null&&(s.id=e,s.parent=t)),n.children)for(let r=0;r<n.children.length;r++)ut(a,n.children[r],s,i)},wi=a=>{let e=a.currentScene;if(e)for(let t=0;t<e.nodes.length;t++)ut(a,e.nodes[t],null);else for(const t in a.scenes){e=a.scenes[t];for(let i=0;i<e.nodes.length;i++)ut(a,e.nodes[i],null)}Ps(a);for(let t=0;t<a.scene.skeletons.length;t++){const i=a.scene.skeletons[t];a.scene.beginAnimation(i,0,Number.MAX_VALUE,!0,1)}},Vs=(a,e,t,i,n,s,r)=>{const o=s.values||n.parameters;for(const l in t){const c=t[l],f=c.type;if(f===ue.FLOAT_MAT2||f===ue.FLOAT_MAT3||f===ue.FLOAT_MAT4){if(c.semantic&&!c.source&&!c.node)ie.SetMatrix(e.scene,a,c,l,i.getEffect());else if(c.semantic&&(c.source||c.node)){let u=e.scene.getNodeByName(c.source||c.node||"");if(u===null&&(u=e.scene.getNodeById(c.source||c.node||"")),u===null)continue;ie.SetMatrix(e.scene,u,c,l,i.getEffect())}}else{const u=o[n.uniforms[l]];if(!u)continue;if(f===ue.SAMPLER_2D){const h=e.textures[s.values?u:c.value].babylonTexture;if(h==null)continue;i.getEffect().setTexture(l,h)}else ie.SetUniform(i.getEffect(),l,u,f)}}r(i)},Hs=(a,e,t,i,n)=>{const s=i.values||t.parameters,r=t.uniforms;for(const o in n){const l=n[o],c=l.type;let f=s[r[o]];if(f===void 0&&(f=l.value),!f)continue;const u=h=>_=>{l.value&&h&&(e.setTexture(h,_),delete n[h])};c===ue.SAMPLER_2D?re.LoadTextureAsync(a,i.values?f:l.value,u(o),()=>u(null)):l.value&&ie.SetUniform(e,o,i.values?f:l.value,c)&&delete n[o]}},ks=(a,e,t)=>(i,n)=>{e.dispose(!0),t("Cannot compile program named "+a.name+". Error: "+n+". Default material will be applied")},Xs=(a,e,t,i,n,s)=>r=>{Hs(a,e,t,i,n),e.onBind=o=>{Vs(o,a,n,e,t,i,s)}},Gi=(a,e,t)=>{for(const i in e.uniforms){const n=e.uniforms[i],s=e.parameters[n];if(a.currentIdentifier===i&&s.semantic&&!s.source&&!s.node){const r=sn.indexOf(s.semantic);if(r!==-1)return delete t[i],rn[r]}}return a.currentIdentifier},Vi=a=>{for(const e in a.materials)re.LoadMaterialAsync(a,e,()=>{},()=>{})};class Me{static CreateRuntime(e,t,i){const n={extensions:{},accessors:{},buffers:{},bufferViews:{},meshes:{},lights:{},cameras:{},nodes:{},images:{},textures:{},shaders:{},programs:{},samplers:{},techniques:{},materials:{},animations:{},skins:{},extensionsUsed:[],scenes:{},buffersCount:0,shaderscount:0,scene:t,rootUrl:i,loadedBufferCount:0,loadedBufferViews:{},loadedShaderCount:0,importOnlyMeshes:!1,dummyNodes:[],assetContainer:null};return e.extensions&&fe(e.extensions,"extensions",n),e.extensionsUsed&&fe(e.extensionsUsed,"extensionsUsed",n),e.buffers&&ys(e.buffers,n),e.bufferViews&&fe(e.bufferViews,"bufferViews",n),e.accessors&&fe(e.accessors,"accessors",n),e.meshes&&fe(e.meshes,"meshes",n),e.lights&&fe(e.lights,"lights",n),e.cameras&&fe(e.cameras,"cameras",n),e.nodes&&fe(e.nodes,"nodes",n),e.images&&fe(e.images,"images",n),e.textures&&fe(e.textures,"textures",n),e.shaders&&bs(e.shaders,n),e.programs&&fe(e.programs,"programs",n),e.samplers&&fe(e.samplers,"samplers",n),e.techniques&&fe(e.techniques,"techniques",n),e.materials&&fe(e.materials,"materials",n),e.animations&&fe(e.animations,"animations",n),e.skins&&fe(e.skins,"skins",n),e.scenes&&(n.scenes=e.scenes),e.scene&&e.scenes&&(n.currentScene=e.scenes[e.scene]),n}static LoadBufferAsync(e,t,i,n,s){const r=e.buffers[t];w.IsBase64(r.uri)?setTimeout(()=>i(new Uint8Array(w.DecodeBase64(r.uri)))):w.LoadFile(e.rootUrl+r.uri,o=>i(new Uint8Array(o)),s,void 0,!0,o=>{o&&n(o.status+" "+o.statusText)})}static LoadTextureBufferAsync(e,t,i,n){const s=e.textures[t];if(!s||!s.source){n("");return}if(s.babylonTexture){i(null);return}const r=e.images[s.source];w.IsBase64(r.uri)?setTimeout(()=>i(new Uint8Array(w.DecodeBase64(r.uri)))):w.LoadFile(e.rootUrl+r.uri,o=>i(new Uint8Array(o)),void 0,void 0,!0,o=>{o&&n(o.status+" "+o.statusText)})}static CreateTextureAsync(e,t,i,n){const s=e.textures[t];if(s.babylonTexture){n(s.babylonTexture);return}const r=e.samplers[s.sampler],o=r.minFilter===Re.NEAREST_MIPMAP_NEAREST||r.minFilter===Re.NEAREST_MIPMAP_LINEAR||r.minFilter===Re.LINEAR_MIPMAP_NEAREST||r.minFilter===Re.LINEAR_MIPMAP_LINEAR,l=B.BILINEAR_SAMPLINGMODE,c=i==null?new Blob:new Blob([i]),f=URL.createObjectURL(c),u=()=>URL.revokeObjectURL(f),h=new B(f,e.scene,!o,!0,l,u,u);r.wrapS!==void 0&&(h.wrapU=ie.GetWrapMode(r.wrapS)),r.wrapT!==void 0&&(h.wrapV=ie.GetWrapMode(r.wrapT)),h.name=t,s.babylonTexture=h,n(h)}static LoadShaderStringAsync(e,t,i,n){const s=e.shaders[t];if(w.IsBase64(s.uri)){const r=atob(s.uri.split(",")[1]);i&&i(r)}else w.LoadFile(e.rootUrl+s.uri,i,void 0,void 0,!1,r=>{r&&n&&n(r.status+" "+r.statusText)})}static LoadMaterialAsync(e,t,i,n){const s=e.materials[t];if(!s.technique){n&&n("No technique found.");return}const r=e.techniques[s.technique];if(!r){e.scene._blockEntityCollection=!!e.assetContainer;const I=new gi(t,e.scene);I._parentContainer=e.assetContainer,e.scene._blockEntityCollection=!1,I.diffuseColor=new V(.5,.5,.5),I.sideOrientation=le.CounterClockWiseSideOrientation,i(I);return}const o=e.programs[r.program],l=r.states,c=Ve.ShadersStore[o.vertexShader+"VertexShader"],f=Ve.ShadersStore[o.fragmentShader+"PixelShader"];let u="",h="";const _=new Fi(c),d=new Fi(f),E={},p=[],g=[],R=[];for(const I in r.uniforms){const N=r.uniforms[I],G=r.parameters[N];if(E[I]=G,G.semantic&&!G.node&&!G.source){const Q=sn.indexOf(G.semantic);Q!==-1?(p.push(rn[Q]),delete E[I]):p.push(I)}else G.type===ue.SAMPLER_2D?R.push(I):p.push(I)}for(const I in r.attributes){const N=r.attributes[I],G=r.parameters[N];if(G.semantic){const Q=Bi(G);Q&&g.push(Q)}}for(;!_.isEnd()&&_.getNextToken();){if(_.currentToken!==He.IDENTIFIER){u+=_.currentString;continue}let N=!1;for(const G in r.attributes){const Q=r.attributes[G],J=r.parameters[Q];if(_.currentIdentifier===G&&J.semantic){u+=Bi(J),N=!0;break}}N||(u+=Gi(_,r,E))}for(;!d.isEnd()&&d.getNextToken();){if(d.currentToken!==He.IDENTIFIER){h+=d.currentString;continue}h+=Gi(d,r,E)}const M={vertex:o.vertexShader+t,fragment:o.fragmentShader+t},b={attributes:g,uniforms:p,samplers:R,needAlphaBlending:l&&l.enable&&l.enable.indexOf(3042)!==-1};Ve.ShadersStore[o.vertexShader+t+"VertexShader"]=u,Ve.ShadersStore[o.fragmentShader+t+"PixelShader"]=h;const O=new Zi(t,e.scene,M,b);if(O.onError=ks(o,O,n),O.onCompiled=Xs(e,O,r,s,E,i),O.sideOrientation=le.CounterClockWiseSideOrientation,l&&l.functions){const I=l.functions;I.cullFace&&I.cullFace[0]!==Ct.BACK&&(O.backFaceCulling=!1);const N=I.blendFuncSeparate;N&&(N[0]===Z.SRC_ALPHA&&N[1]===Z.ONE_MINUS_SRC_ALPHA&&N[2]===Z.ONE&&N[3]===Z.ONE?O.alphaMode=ke.ALPHA_COMBINE:N[0]===Z.ONE&&N[1]===Z.ONE&&N[2]===Z.ZERO&&N[3]===Z.ONE?O.alphaMode=ke.ALPHA_ONEONE:N[0]===Z.SRC_ALPHA&&N[1]===Z.ONE&&N[2]===Z.ZERO&&N[3]===Z.ONE?O.alphaMode=ke.ALPHA_ADD:N[0]===Z.ZERO&&N[1]===Z.ONE_MINUS_SRC_COLOR&&N[2]===Z.ONE&&N[3]===Z.ONE?O.alphaMode=ke.ALPHA_SUBTRACT:N[0]===Z.DST_COLOR&&N[1]===Z.ZERO&&N[2]===Z.ONE&&N[3]===Z.ONE?O.alphaMode=ke.ALPHA_MULTIPLY:N[0]===Z.SRC_ALPHA&&N[1]===Z.ONE_MINUS_SRC_COLOR&&N[2]===Z.ONE&&N[3]===Z.ONE&&(O.alphaMode=ke.ALPHA_MAXIMIZED))}}}class ye{static RegisterExtension(e){if(ye.Extensions[e.name]){w.Error('Tool with the same name "'+e.name+'" already exists');return}ye.Extensions[e.name]=e}dispose(){}_importMeshAsync(e,t,i,n,s,r,o,l){return t.useRightHandedSystem=!0,re.LoadRuntimeAsync(t,i,n,c=>{c.assetContainer=s,c.importOnlyMeshes=!0,e===""?c.importMeshesNames=[]:typeof e=="string"?c.importMeshesNames=[e]:e&&!(e instanceof Array)?c.importMeshesNames=[e]:(c.importMeshesNames=[],w.Warn("Argument meshesNames must be of type string or string[]")),this._createNodes(c);const f=new Array,u=new Array;for(const h in c.nodes){const _=c.nodes[h];_.babylonNode instanceof Zn&&f.push(_.babylonNode)}for(const h in c.skins){const _=c.skins[h];_.babylonSkeleton instanceof it&&u.push(_.babylonSkeleton)}this._loadBuffersAsync(c,()=>{this._loadShadersAsync(c,()=>{Vi(c),wi(c),!q.IncrementalLoading&&r&&r(f,u)})}),q.IncrementalLoading&&r&&r(f,u)},l),!0}importMeshAsync(e,t,i,n,s,r){return new Promise((o,l)=>{this._importMeshAsync(e,t,n,s,i,(c,f)=>{o({meshes:c,particleSystems:[],skeletons:f,animationGroups:[],lights:[],transformNodes:[],geometries:[]})},r,c=>{l(new Error(c))})})}_loadAsync(e,t,i,n,s,r){e.useRightHandedSystem=!0,re.LoadRuntimeAsync(e,t,i,o=>{re.LoadRuntimeExtensionsAsync(o,()=>{this._createNodes(o),this._loadBuffersAsync(o,()=>{this._loadShadersAsync(o,()=>{Vi(o),wi(o),q.IncrementalLoading||n()})}),q.IncrementalLoading&&n()},r)},r)}loadAsync(e,t,i,n){return new Promise((s,r)=>{this._loadAsync(e,t,i,()=>{s()},n,o=>{r(new Error(o))})})}_loadShadersAsync(e,t){let i=!1;const n=(s,r)=>{re.LoadShaderStringAsync(e,s,o=>{o instanceof ArrayBuffer||(e.loadedShaderCount++,o&&(Ve.ShadersStore[s+(r.type===Rt.VERTEX?"VertexShader":"PixelShader")]=o),e.loadedShaderCount===e.shaderscount&&t())},()=>{w.Error("Error when loading shader program named "+s+" located at "+r.uri)})};for(const s in e.shaders){i=!0;const r=e.shaders[s];r?n.bind(this,s,r)():w.Error("No shader named: "+s)}i||t()}_loadBuffersAsync(e,t){let i=!1;const n=(s,r)=>{re.LoadBufferAsync(e,s,o=>{e.loadedBufferCount++,o&&(o.byteLength!=e.buffers[s].byteLength&&w.Error("Buffer named "+s+" is length "+o.byteLength+". Expected: "+r.byteLength),e.loadedBufferViews[s]=o),e.loadedBufferCount===e.buffersCount&&t()},()=>{w.Error("Error when loading buffer named "+s+" located at "+r.uri)})};for(const s in e.buffers){i=!0;const r=e.buffers[s];r?n.bind(this,s,r)():w.Error("No buffer named: "+s)}i||t()}_createNodes(e){let t=e.currentScene;if(t)for(let i=0;i<t.nodes.length;i++)ut(e,t.nodes[i],null);else for(const i in e.scenes){t=e.scenes[i];for(let n=0;n<t.nodes.length;n++)ut(e,t.nodes[n],null)}}}ye.Extensions={};class re{constructor(e){this._name=e}get name(){return this._name}loadRuntimeAsync(e,t,i,n,s){return!1}loadRuntimeExtensionsAsync(e,t,i){return!1}loadBufferAsync(e,t,i,n,s){return!1}loadTextureBufferAsync(e,t,i,n){return!1}createTextureAsync(e,t,i,n,s){return!1}loadShaderStringAsync(e,t,i,n){return!1}loadMaterialAsync(e,t,i,n){return!1}static LoadRuntimeAsync(e,t,i,n,s){re._ApplyExtensions(r=>r.loadRuntimeAsync(e,t,i,n,s),()=>{setTimeout(()=>{!n||n(Me.CreateRuntime(t.json,e,i))})})}static LoadRuntimeExtensionsAsync(e,t,i){re._ApplyExtensions(n=>n.loadRuntimeExtensionsAsync(e,t,i),()=>{setTimeout(()=>{t()})})}static LoadBufferAsync(e,t,i,n,s){re._ApplyExtensions(r=>r.loadBufferAsync(e,t,i,n,s),()=>{Me.LoadBufferAsync(e,t,i,n,s)})}static LoadTextureAsync(e,t,i,n){re._LoadTextureBufferAsync(e,t,s=>{s&&re._CreateTextureAsync(e,t,s,i,n)},n)}static LoadShaderStringAsync(e,t,i,n){re._ApplyExtensions(s=>s.loadShaderStringAsync(e,t,i,n),()=>{Me.LoadShaderStringAsync(e,t,i,n)})}static LoadMaterialAsync(e,t,i,n){re._ApplyExtensions(s=>s.loadMaterialAsync(e,t,i,n),()=>{Me.LoadMaterialAsync(e,t,i,n)})}static _LoadTextureBufferAsync(e,t,i,n){re._ApplyExtensions(s=>s.loadTextureBufferAsync(e,t,i,n),()=>{Me.LoadTextureBufferAsync(e,t,i,n)})}static _CreateTextureAsync(e,t,i,n,s){re._ApplyExtensions(r=>r.createTextureAsync(e,t,i,n,s),()=>{Me.CreateTextureAsync(e,t,i,n)})}static _ApplyExtensions(e,t){for(const i in ye.Extensions){const n=ye.Extensions[i];if(e(n))return}t()}}q._CreateGLTF1Loader=()=>new ye;const Ys="binary_glTF";class on extends re{constructor(){super("KHR_binary_glTF")}loadRuntimeAsync(e,t,i,n){const s=t.json.extensionsUsed;return!s||s.indexOf(this.name)===-1||!t.bin?!1:(this._bin=t.bin,n(Me.CreateRuntime(t.json,e,i)),!0)}loadBufferAsync(e,t,i,n){return e.extensionsUsed.indexOf(this.name)===-1||t!==Ys?!1:(this._bin.readAsync(0,this._bin.byteLength).then(i,s=>n(s.message)),!0)}loadTextureBufferAsync(e,t,i){const n=e.textures[t],s=e.images[n.source];if(!s.extensions||!(this.name in s.extensions))return!1;const r=s.extensions[this.name],o=e.bufferViews[r.bufferView],l=ie.GetBufferFromBufferView(e,o,0,o.byteLength,we.UNSIGNED_BYTE);return i(l),!0}loadShaderStringAsync(e,t,i){const n=e.shaders[t];if(!n.extensions||!(this.name in n.extensions))return!1;const s=n.extensions[this.name],r=e.bufferViews[s.bufferView],o=ie.GetBufferFromBufferView(e,r,0,r.byteLength,we.UNSIGNED_BYTE);return setTimeout(()=>{const l=ie.DecodeBufferToText(o);i(l)}),!0}}ye.RegisterExtension(new on);class ln extends re{constructor(){super("KHR_materials_common")}loadRuntimeExtensionsAsync(e){if(!e.extensions)return!1;const t=e.extensions[this.name];if(!t)return!1;const i=t.lights;if(i)for(const n in i){const s=i[n];switch(s.type){case"ambient":{const r=new Ji(s.name,new A(0,1,0),e.scene),o=s.ambient;o&&(r.diffuse=V.FromArray(o.color||[1,1,1]));break}case"point":{const r=new mt(s.name,new A(10,10,10),e.scene),o=s.point;o&&(r.diffuse=V.FromArray(o.color||[1,1,1]));break}case"directional":{const r=new Ce(s.name,new A(0,-1,0),e.scene),o=s.directional;o&&(r.diffuse=V.FromArray(o.color||[1,1,1]));break}case"spot":{const r=s.spot;if(r){const o=new pe(s.name,new A(0,10,0),new A(0,-1,0),r.fallOffAngle||Math.PI,r.fallOffExponent||0,e.scene);o.diffuse=V.FromArray(r.color||[1,1,1])}break}default:w.Warn('GLTF Material Common extension: light type "'+s.type+"\u201D not supported");break}}return!1}loadMaterialAsync(e,t,i,n){const s=e.materials[t];if(!s||!s.extensions)return!1;const r=s.extensions[this.name];if(!r)return!1;const o=new gi(t,e.scene);return o.sideOrientation=le.CounterClockWiseSideOrientation,r.technique==="CONSTANT"&&(o.disableLighting=!0),o.backFaceCulling=r.doubleSided===void 0?!1:!r.doubleSided,o.alpha=r.values.transparency===void 0?1:r.values.transparency,o.specularPower=r.values.shininess===void 0?0:r.values.shininess,typeof r.values.ambient=="string"?this._loadTexture(e,r.values.ambient,o,"ambientTexture",n):o.ambientColor=V.FromArray(r.values.ambient||[0,0,0]),typeof r.values.diffuse=="string"?this._loadTexture(e,r.values.diffuse,o,"diffuseTexture",n):o.diffuseColor=V.FromArray(r.values.diffuse||[0,0,0]),typeof r.values.emission=="string"?this._loadTexture(e,r.values.emission,o,"emissiveTexture",n):o.emissiveColor=V.FromArray(r.values.emission||[0,0,0]),typeof r.values.specular=="string"?this._loadTexture(e,r.values.specular,o,"specularTexture",n):o.specularColor=V.FromArray(r.values.specular||[0,0,0]),!0}_loadTexture(e,t,i,n,s){Me.LoadTextureBufferAsync(e,t,r=>{Me.CreateTextureAsync(e,t,r,o=>i[n]=o)},s)}}ye.RegisterExtension(new ln);var no=Object.freeze({__proto__:null,GLTFBinaryExtension:on,GLTFLoaderBase:Me,GLTFLoader:ye,GLTFLoaderExtension:re,get EComponentType(){return we},get EShaderType(){return Rt},get EParameterType(){return ue},get ETextureWrapMode(){return $e},get ETextureFilterType(){return Re},get ETextureFormat(){return Xt},get ECullingType(){return Ct},get EBlendingFunction(){return Z},GLTFUtils:ie,GLTFMaterialsCommonExtension:ln});class lt{constructor(){this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}get resolve(){return this._resolve}get reject(){return this._reject}}const zs="postprocessVertexShader",Ws=`attribute vec2 position;
uniform vec2 scale;
varying vec2 vUV;
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vUV=(position*madd+madd)*scale;
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;k.ShadersStore[zs]=Ws;class Ks{constructor(e,t,i,n){this._textures=null,this._samples=1,this._attachments=null,this._generateStencilBuffer=!1,this._generateDepthBuffer=!1,this._depthStencilTextureWithStencil=!1,this._isMulti=e,this._isCube=t,this._size=i,this._engine=n,this._depthStencilTexture=null}get depthStencilTexture(){return this._depthStencilTexture}get depthStencilTextureWithStencil(){return this._depthStencilTextureWithStencil}get isCube(){return this._isCube}get isMulti(){return this._isMulti}get is2DArray(){return this.layers>0}get size(){return this.width}get width(){return this._size.width||this._size}get height(){return this._size.height||this._size}get layers(){return this._size.layers||0}get texture(){var e,t;return(t=(e=this._textures)===null||e===void 0?void 0:e[0])!==null&&t!==void 0?t:null}get textures(){return this._textures}get samples(){return this._samples}setSamples(e,t=!0,i=!1){if(this.samples===e&&!i)return e;const n=this._isMulti?this._engine.updateMultipleRenderTargetTextureSampleCount(this,e,t):this._engine.updateRenderTargetTextureSampleCount(this,e);return this._samples=e,n}setTextures(e){Array.isArray(e)?this._textures=e:e?this._textures=[e]:this._textures=null}setTexture(e,t=0,i=!0){this._textures||(this._textures=[]),this._textures[t]&&i&&this._textures[t].dispose(),this._textures[t]=e}createDepthStencilTexture(e=0,t=!0,i=!1,n=1,s=14){var r;return(r=this._depthStencilTexture)===null||r===void 0||r.dispose(),this._depthStencilTextureWithStencil=i,this._depthStencilTexture=this._engine.createDepthStencilTexture(this._size,{bilinearFiltering:t,comparisonFunction:e,generateStencil:i,isCube:this._isCube,samples:n,depthTextureFormat:s},this),this._depthStencilTexture}_shareDepth(e){this._depthStencilTexture&&(e._depthStencilTexture&&e._depthStencilTexture.dispose(),e._depthStencilTexture=this._depthStencilTexture,this._depthStencilTexture.incrementReferences())}_swapAndDie(e){this.texture&&this.texture._swapAndDie(e),this._textures=null,this.dispose(!0)}_cloneRenderTargetWrapper(){var e,t,i,n,s,r;let o=null;if(this._isMulti){const l=this.textures;if(l&&l.length>0){let c=!1,f=l.length;const u=l[l.length-1]._source;(u===Ne.Depth||u===Ne.DepthStencil)&&(c=!0,f--);const h=[],_=[];for(let p=0;p<f;++p){const g=l[p];h.push(g.samplingMode),_.push(g.type)}const d={samplingModes:h,generateMipMaps:l[0].generateMipMaps,generateDepthBuffer:this._generateDepthBuffer,generateStencilBuffer:this._generateStencilBuffer,generateDepthTexture:c,types:_,textureCount:f},E={width:this.width,height:this.height};o=this._engine.createMultipleRenderTarget(E,d)}}else{const l={};if(l.generateDepthBuffer=this._generateDepthBuffer,l.generateMipMaps=(t=(e=this.texture)===null||e===void 0?void 0:e.generateMipMaps)!==null&&t!==void 0?t:!1,l.generateStencilBuffer=this._generateStencilBuffer,l.samplingMode=(i=this.texture)===null||i===void 0?void 0:i.samplingMode,l.type=(n=this.texture)===null||n===void 0?void 0:n.type,l.format=(s=this.texture)===null||s===void 0?void 0:s.format,this.isCube)o=this._engine.createRenderTargetCubeTexture(this.width,l);else{const c={width:this.width,height:this.height,layers:this.is2DArray?(r=this.texture)===null||r===void 0?void 0:r.depth:void 0};o=this._engine.createRenderTargetTexture(c,l)}o.texture.isReady=!0}return o}_swapRenderTargetWrapper(e){if(this._textures&&e._textures)for(let t=0;t<this._textures.length;++t)this._textures[t]._swapAndDie(e._textures[t],!1),e._textures[t].isReady=!0;this._depthStencilTexture&&e._depthStencilTexture&&(this._depthStencilTexture._swapAndDie(e._depthStencilTexture),e._depthStencilTexture.isReady=!0),this._textures=null,this._depthStencilTexture=null}_rebuild(){const e=this._cloneRenderTargetWrapper();if(!!e){if(this._depthStencilTexture){const t=this._depthStencilTexture.samplingMode,i=t===2||t===3||t===11;e.createDepthStencilTexture(this._depthStencilTexture._comparisonFunction,i,this._depthStencilTextureWithStencil,this._depthStencilTexture.samples)}this.samples>1&&e.setSamples(this.samples),e._swapRenderTargetWrapper(this),e.dispose()}}releaseTextures(){var e,t;if(this._textures)for(let i=0;(t=i<((e=this._textures)===null||e===void 0?void 0:e.length))!==null&&t!==void 0&&t;++i)this._textures[i].dispose();this._textures=null}dispose(e=!1){var t;e||((t=this._depthStencilTexture)===null||t===void 0||t.dispose(),this._depthStencilTexture=null,this.releaseTextures()),this._engine._releaseRenderTargetWrapper(this)}}class Qs extends Ks{constructor(e,t,i,n,s){super(e,t,i,n),this._framebuffer=null,this._depthStencilBuffer=null,this._MSAAFramebuffer=null,this._colorTextureArray=null,this._depthStencilTextureArray=null,this._context=s}_cloneRenderTargetWrapper(){let e=null;return this._colorTextureArray&&this._depthStencilTextureArray?(e=this._engine.createMultiviewRenderTargetTexture(this.width,this.height),e.texture.isReady=!0):e=super._cloneRenderTargetWrapper(),e}_swapRenderTargetWrapper(e){super._swapRenderTargetWrapper(e),e._framebuffer=this._framebuffer,e._depthStencilBuffer=this._depthStencilBuffer,e._MSAAFramebuffer=this._MSAAFramebuffer,e._colorTextureArray=this._colorTextureArray,e._depthStencilTextureArray=this._depthStencilTextureArray,this._framebuffer=this._depthStencilBuffer=this._MSAAFramebuffer=this._colorTextureArray=this._depthStencilTextureArray=null}_shareDepth(e){super._shareDepth(e);const t=this._context,i=this._depthStencilBuffer,n=e._MSAAFramebuffer||e._framebuffer;e._depthStencilBuffer&&t.deleteRenderbuffer(e._depthStencilBuffer),e._depthStencilBuffer=this._depthStencilBuffer,this._engine._bindUnboundFramebuffer(n),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,i),this._engine._bindUnboundFramebuffer(null)}_bindTextureRenderTarget(e,t=0,i=-1,n=0){if(!e._hardwareTexture)return;const s=this._context,r=this._framebuffer,o=this._engine._currentFramebuffer;this._engine._bindUnboundFramebuffer(r);const l=s[this._engine.webGLVersion>1?"COLOR_ATTACHMENT"+t:"COLOR_ATTACHMENT"+t+"_WEBGL"],c=i!==-1?s.TEXTURE_CUBE_MAP_POSITIVE_X+i:s.TEXTURE_2D;s.framebufferTexture2D(s.FRAMEBUFFER,l,c,e._hardwareTexture.underlyingResource,n),this._engine._bindUnboundFramebuffer(o)}setTexture(e,t=0,i=!0){super.setTexture(e,t,i),this._bindTextureRenderTarget(e,t)}dispose(e=!1){const t=this._context;e||(this._colorTextureArray&&(this._context.deleteTexture(this._colorTextureArray),this._colorTextureArray=null),this._depthStencilTextureArray&&(this._context.deleteTexture(this._depthStencilTextureArray),this._depthStencilTextureArray=null)),this._framebuffer&&(t.deleteFramebuffer(this._framebuffer),this._framebuffer=null),this._depthStencilBuffer&&(t.deleteRenderbuffer(this._depthStencilBuffer),this._depthStencilBuffer=null),this._MSAAFramebuffer&&(t.deleteFramebuffer(this._MSAAFramebuffer),this._MSAAFramebuffer=null),super.dispose(e)}}ce.prototype._createHardwareRenderTargetWrapper=function(a,e,t){const i=new Qs(a,e,t,this,this._gl);return this._renderTargetWrapperCache.push(i),i};ce.prototype.createRenderTargetTexture=function(a,e){var t;const i=this._createHardwareRenderTargetWrapper(!1,!1,a),n={};e!==void 0&&typeof e=="object"?(n.generateDepthBuffer=!!e.generateDepthBuffer,n.generateStencilBuffer=!!e.generateStencilBuffer,n.noColorTarget=!!e.noColorTarget,n.samples=e.samples):(n.generateDepthBuffer=!0,n.generateStencilBuffer=!1,n.noColorTarget=!1);const s=n.noColorTarget?null:this._createInternalTexture(a,e,!0,Ne.RenderTarget),r=a.width||a,o=a.height||a,l=this._currentFramebuffer,c=this._gl,f=c.createFramebuffer();return this._bindUnboundFramebuffer(f),i._depthStencilBuffer=this._setupFramebufferDepthAttachments(!!n.generateStencilBuffer,n.generateDepthBuffer,r,o),s&&!s.is2DArray&&c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,s._hardwareTexture.underlyingResource,0),this._bindUnboundFramebuffer(l),i._framebuffer=f,i._generateDepthBuffer=n.generateDepthBuffer,i._generateStencilBuffer=!!n.generateStencilBuffer,i.setTextures(s),this.updateRenderTargetTextureSampleCount(i,(t=n.samples)!==null&&t!==void 0?t:1),i};ce.prototype.createDepthStencilTexture=function(a,e,t){if(e.isCube){const i=a.width||a;return this._createDepthStencilCubeTexture(i,e,t)}else return this._createDepthStencilTexture(a,e,t)};ce.prototype._createDepthStencilTexture=function(a,e,t){const i=this._gl,n=a.layers||0,s=n!==0?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D,r=new Et(this,Ne.DepthStencil);if(!this._caps.depthTextureExtension)return H.Error("Depth texture is not supported by your browser or hardware."),r;const o={bilinearFiltering:!1,comparisonFunction:0,generateStencil:!1,...e};if(this._bindTextureDirectly(s,r,!0),this._setupDepthStencilTexture(r,a,o.generateStencil,o.comparisonFunction===0?!1:o.bilinearFiltering,o.comparisonFunction,o.samples),o.depthTextureFormat!==void 0){if(o.depthTextureFormat!==15&&o.depthTextureFormat!==16&&o.depthTextureFormat!==17&&o.depthTextureFormat!==13&&o.depthTextureFormat!==14&&o.depthTextureFormat!==18)return H.Error("Depth texture format is not supported."),r;r.format=o.depthTextureFormat}else r.format=o.generateStencil?13:16;const l=r.format===17||r.format===13||r.format===18;t._depthStencilTexture=r,t._depthStencilTextureWithStencil=l;let c=i.UNSIGNED_INT;r.format===15?c=i.UNSIGNED_SHORT:r.format===17||r.format===13?c=i.UNSIGNED_INT_24_8:r.format===14?c=i.FLOAT:r.format===18&&(c=i.FLOAT_32_UNSIGNED_INT_24_8_REV);const f=l?i.DEPTH_STENCIL:i.DEPTH_COMPONENT;let u=f;this.webGLVersion>1&&(r.format===15?u=i.DEPTH_COMPONENT16:r.format===16?u=i.DEPTH_COMPONENT24:r.format===17||r.format===13?u=i.DEPTH24_STENCIL8:r.format===14?u=i.DEPTH_COMPONENT32F:r.format===18&&(u=i.DEPTH32F_STENCIL8)),r.is2DArray?i.texImage3D(s,0,u,r.width,r.height,n,0,f,c,null):i.texImage2D(s,0,u,r.width,r.height,0,f,c,null),this._bindTextureDirectly(s,null),this._internalTexturesCache.push(r);const h=t;if(h._depthStencilBuffer){const _=this._currentFramebuffer;this._bindUnboundFramebuffer(h._framebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,null),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,null),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.STENCIL_ATTACHMENT,i.RENDERBUFFER,null),this._bindUnboundFramebuffer(_),i.deleteRenderbuffer(h._depthStencilBuffer),h._depthStencilBuffer=null}return r};ce.prototype.updateRenderTargetTextureSampleCount=function(a,e){if(this.webGLVersion<2||!a||!a.texture)return 1;if(a.samples===e)return e;const t=this._gl;e=Math.min(e,this.getCaps().maxMSAASamples),a._depthStencilBuffer&&(t.deleteRenderbuffer(a._depthStencilBuffer),a._depthStencilBuffer=null),a._MSAAFramebuffer&&(t.deleteFramebuffer(a._MSAAFramebuffer),a._MSAAFramebuffer=null);const i=a.texture._hardwareTexture;if(i._MSAARenderBuffer&&(t.deleteRenderbuffer(i._MSAARenderBuffer),i._MSAARenderBuffer=null),e>1&&t.renderbufferStorageMultisample){const n=t.createFramebuffer();if(!n)throw new Error("Unable to create multi sampled framebuffer");a._MSAAFramebuffer=n,this._bindUnboundFramebuffer(a._MSAAFramebuffer);const s=this._createRenderBuffer(a.texture.width,a.texture.height,e,-1,this._getRGBAMultiSampleBufferFormat(a.texture.type),t.COLOR_ATTACHMENT0,!1);if(!s)throw new Error("Unable to create multi sampled framebuffer");i._MSAARenderBuffer=s}else this._bindUnboundFramebuffer(a._framebuffer);return a.texture.samples=e,a._samples=e,a._depthStencilBuffer=this._setupFramebufferDepthAttachments(a._generateStencilBuffer,a._generateDepthBuffer,a.texture.width,a.texture.height,e),this._bindUnboundFramebuffer(null),e};class K{constructor(e,t,i,n,s,r,o=1,l,c,f=null,u=0,h="postprocess",_,d=!1,E=5){this._parentContainer=null,this.width=-1,this.height=-1,this.nodeMaterialSource=null,this._outputTexture=null,this.autoClear=!0,this.alphaMode=0,this.animations=new Array,this.enablePixelPerfectMode=!1,this.forceFullscreenViewport=!0,this.scaleMode=1,this.alwaysForcePOT=!1,this._samples=1,this.adaptScaleToCurrentViewport=!1,this._reusable=!1,this._renderId=0,this.externalTextureSamplerBinding=!1,this._textures=new gt(2),this._textureCache=[],this._currentRenderTextureInd=0,this._scaleRatio=new ft(1,1),this._texelSize=ft.Zero(),this.onActivateObservable=new Y,this.onSizeChangedObservable=new Y,this.onApplyObservable=new Y,this.onBeforeRenderObservable=new Y,this.onAfterRenderObservable=new Y,this.name=e,r!=null?(this._camera=r,this._scene=r.getScene(),r.attachPostProcess(this),this._engine=this._scene.getEngine(),this._scene.postProcesses.push(this),this.uniqueId=this._scene.getUniqueId()):l&&(this._engine=l,this._engine.postProcesses.push(this)),this._options=s,this.renderTargetSamplingMode=o||1,this._reusable=c||!1,this._textureType=u,this._textureFormat=E,this._samplers=n||[],this._samplers.push("textureSampler"),this._fragmentUrl=t,this._vertexUrl=h,this._parameters=i||[],this._parameters.push("scale"),this._indexParameters=_,this._drawWrapper=new en(this._engine),d||this.updateEffect(f)}static RegisterShaderCodeProcessing(e,t){if(!t){delete K._CustomShaderCodeProcessing[e!=null?e:""];return}K._CustomShaderCodeProcessing[e!=null?e:""]=t}static _GetShaderCodeProcessing(e){var t;return(t=K._CustomShaderCodeProcessing[e])!==null&&t!==void 0?t:K._CustomShaderCodeProcessing[""]}get samples(){return this._samples}set samples(e){this._samples=Math.min(e,this._engine.getCaps().maxMSAASamples),this._textures.forEach(t=>{t.setSamples(this._samples)})}getEffectName(){return this._fragmentUrl}set onActivate(e){this._onActivateObserver&&this.onActivateObservable.remove(this._onActivateObserver),e&&(this._onActivateObserver=this.onActivateObservable.add(e))}set onSizeChanged(e){this._onSizeChangedObserver&&this.onSizeChangedObservable.remove(this._onSizeChangedObserver),this._onSizeChangedObserver=this.onSizeChangedObservable.add(e)}set onApply(e){this._onApplyObserver&&this.onApplyObservable.remove(this._onApplyObserver),this._onApplyObserver=this.onApplyObservable.add(e)}set onBeforeRender(e){this._onBeforeRenderObserver&&this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver),this._onBeforeRenderObserver=this.onBeforeRenderObservable.add(e)}set onAfterRender(e){this._onAfterRenderObserver&&this.onAfterRenderObservable.remove(this._onAfterRenderObserver),this._onAfterRenderObserver=this.onAfterRenderObservable.add(e)}get inputTexture(){return this._textures.data[this._currentRenderTextureInd]}set inputTexture(e){this._forcedOutputTexture=e}restoreDefaultInputTexture(){this._forcedOutputTexture&&(this._forcedOutputTexture=null,this.markTextureDirty())}getCamera(){return this._camera}get texelSize(){return this._shareOutputWithPostProcess?this._shareOutputWithPostProcess.texelSize:(this._forcedOutputTexture&&this._texelSize.copyFromFloats(1/this._forcedOutputTexture.width,1/this._forcedOutputTexture.height),this._texelSize)}getClassName(){return"PostProcess"}getEngine(){return this._engine}getEffect(){return this._drawWrapper.effect}shareOutputWith(e){return this._disposeTextures(),this._shareOutputWithPostProcess=e,this}useOwnOutput(){this._textures.length==0&&(this._textures=new gt(2)),this._shareOutputWithPostProcess=null}updateEffect(e=null,t=null,i=null,n,s,r,o,l){var c,f;const u=K._GetShaderCodeProcessing(this.name);if(u!=null&&u.defineCustomBindings){const h=(c=t==null?void 0:t.slice())!==null&&c!==void 0?c:[];h.push(...this._parameters);const _=(f=i==null?void 0:i.slice())!==null&&f!==void 0?f:[];_.push(...this._samplers),e=u.defineCustomBindings(this.name,e,h,_),t=h,i=_}this._postProcessDefines=e,this._drawWrapper.effect=this._engine.createEffect({vertex:o!=null?o:this._vertexUrl,fragment:l!=null?l:this._fragmentUrl},{attributes:["position"],uniformsNames:t||this._parameters,uniformBuffersNames:[],samplers:i||this._samplers,defines:e!==null?e:"",fallbacks:null,onCompiled:s!=null?s:null,onError:r!=null?r:null,indexParameters:n||this._indexParameters,processCodeAfterIncludes:u!=null&&u.processCodeAfterIncludes?(h,_)=>u.processCodeAfterIncludes(this.name,h,_):null,processFinalCode:u!=null&&u.processFinalCode?(h,_)=>u.processFinalCode(this.name,h,_):null},this._engine)}isReusable(){return this._reusable}markTextureDirty(){this.width=-1}_createRenderTargetTexture(e,t,i=0){for(let s=0;s<this._textureCache.length;s++)if(this._textureCache[s].texture.width===e.width&&this._textureCache[s].texture.height===e.height&&this._textureCache[s].postProcessChannel===i&&this._textureCache[s].texture._generateDepthBuffer===t.generateDepthBuffer&&this._textureCache[s].texture.samples===t.samples)return this._textureCache[s].texture;const n=this._engine.createRenderTargetTexture(e,t);return this._textureCache.push({texture:n,postProcessChannel:i,lastUsedRenderId:-1}),n}_flushTextureCache(){const e=this._renderId;for(let t=this._textureCache.length-1;t>=0;t--)if(e-this._textureCache[t].lastUsedRenderId>100){let i=!1;for(let n=0;n<this._textures.length;n++)if(this._textures.data[n]===this._textureCache[t].texture){i=!0;break}i||(this._textureCache[t].texture.dispose(),this._textureCache.splice(t,1))}}_resize(e,t,i,n,s){this._textures.length>0&&this._textures.reset(),this.width=e,this.height=t;let r=null;for(let c=0;c<i._postProcesses.length;c++)if(i._postProcesses[c]!==null){r=i._postProcesses[c];break}const o={width:this.width,height:this.height},l={generateMipMaps:n,generateDepthBuffer:s||r===this,generateStencilBuffer:(s||r===this)&&this._engine.isStencilEnable,samplingMode:this.renderTargetSamplingMode,type:this._textureType,format:this._textureFormat,samples:this._samples};this._textures.push(this._createRenderTargetTexture(o,l,0)),this._reusable&&this._textures.push(this._createRenderTargetTexture(o,l,1)),this._texelSize.copyFromFloats(1/this.width,1/this.height),this.onSizeChangedObservable.notifyObservers(this)}activate(e,t=null,i){var n,s;e=e||this._camera;const r=e.getScene(),o=r.getEngine(),l=o.getCaps().maxTextureSize;let c=(t?t.width:this._engine.getRenderWidth(!0))*this._options|0;const f=(t?t.height:this._engine.getRenderHeight(!0))*this._options|0,u=e.parent;u&&(u.leftCamera==e||u.rightCamera==e)&&(c/=2);let h=this._options.width||c,_=this._options.height||f;const d=this.renderTargetSamplingMode!==7&&this.renderTargetSamplingMode!==1&&this.renderTargetSamplingMode!==2;if(!this._shareOutputWithPostProcess&&!this._forcedOutputTexture){if(this.adaptScaleToCurrentViewport){const p=o.currentViewport;p&&(h*=p.width,_*=p.height)}(d||this.alwaysForcePOT)&&(this._options.width||(h=o.needPOTTextures?D.GetExponentOfTwo(h,l,this.scaleMode):h),this._options.height||(_=o.needPOTTextures?D.GetExponentOfTwo(_,l,this.scaleMode):_)),(this.width!==h||this.height!==_)&&this._resize(h,_,e,d,i),this._textures.forEach(p=>{p.samples!==this.samples&&this._engine.updateRenderTargetTextureSampleCount(p,this.samples)}),this._flushTextureCache(),this._renderId++}let E;if(this._shareOutputWithPostProcess)E=this._shareOutputWithPostProcess.inputTexture;else if(this._forcedOutputTexture)E=this._forcedOutputTexture,this.width=this._forcedOutputTexture.width,this.height=this._forcedOutputTexture.height;else{E=this.inputTexture;let p;for(let g=0;g<this._textureCache.length;g++)if(this._textureCache[g].texture===E){p=this._textureCache[g];break}p&&(p.lastUsedRenderId=this._renderId)}return this.enablePixelPerfectMode?(this._scaleRatio.copyFromFloats(c/h,f/_),this._engine.bindFramebuffer(E,0,c,f,this.forceFullscreenViewport)):(this._scaleRatio.copyFromFloats(1,1),this._engine.bindFramebuffer(E,0,void 0,void 0,this.forceFullscreenViewport)),(s=(n=this._engine)._debugInsertMarker)===null||s===void 0||s.call(n,`post process ${this.name} input`),this.onActivateObservable.notifyObservers(e),this.autoClear&&this.alphaMode===0&&this._engine.clear(this.clearColor?this.clearColor:r.clearColor,r._allowPostProcessClearColor,!0,!0),this._reusable&&(this._currentRenderTextureInd=(this._currentRenderTextureInd+1)%2),E}get isSupported(){return this._drawWrapper.effect.isSupported}get aspectRatio(){return this._shareOutputWithPostProcess?this._shareOutputWithPostProcess.aspectRatio:this._forcedOutputTexture?this._forcedOutputTexture.width/this._forcedOutputTexture.height:this.width/this.height}isReady(){var e,t;return(t=(e=this._drawWrapper.effect)===null||e===void 0?void 0:e.isReady())!==null&&t!==void 0?t:!1}apply(){var e,t,i;if(!(!((e=this._drawWrapper.effect)===null||e===void 0)&&e.isReady()))return null;this._engine.enableEffect(this._drawWrapper),this._engine.setState(!1),this._engine.setDepthBuffer(!1),this._engine.setDepthWrite(!1),this._engine.setAlphaMode(this.alphaMode),this.alphaConstants&&this.getEngine().setAlphaConstants(this.alphaConstants.r,this.alphaConstants.g,this.alphaConstants.b,this.alphaConstants.a);let n;return this._shareOutputWithPostProcess?n=this._shareOutputWithPostProcess.inputTexture:this._forcedOutputTexture?n=this._forcedOutputTexture:n=this.inputTexture,this.externalTextureSamplerBinding||this._drawWrapper.effect._bindTexture("textureSampler",n==null?void 0:n.texture),this._drawWrapper.effect.setVector2("scale",this._scaleRatio),this.onApplyObservable.notifyObservers(this._drawWrapper.effect),(i=(t=K._GetShaderCodeProcessing(this.name))===null||t===void 0?void 0:t.bindCustomBindings)===null||i===void 0||i.call(t,this.name,this._drawWrapper.effect),this._drawWrapper.effect}_disposeTextures(){if(this._shareOutputWithPostProcess||this._forcedOutputTexture){this._disposeTextureCache();return}this._disposeTextureCache(),this._textures.dispose()}_disposeTextureCache(){for(let e=this._textureCache.length-1;e>=0;e--)this._textureCache[e].texture.dispose();this._textureCache.length=0}setPrePassRenderer(e){return this._prePassEffectConfiguration?(this._prePassEffectConfiguration=e.addEffectConfiguration(this._prePassEffectConfiguration),this._prePassEffectConfiguration.enabled=!0,!0):!1}dispose(e){e=e||this._camera,this._disposeTextures();let t;if(this._scene&&(t=this._scene.postProcesses.indexOf(this),t!==-1&&this._scene.postProcesses.splice(t,1)),this._parentContainer){const i=this._parentContainer.postProcesses.indexOf(this);i>-1&&this._parentContainer.postProcesses.splice(i,1),this._parentContainer=null}if(t=this._engine.postProcesses.indexOf(this),t!==-1&&this._engine.postProcesses.splice(t,1),!!e){if(e.detachPostProcess(this),t=e._postProcesses.indexOf(this),t===0&&e._postProcesses.length>0){const i=this._camera._getFirstPostProcess();i&&i.markTextureDirty()}this.onActivateObservable.clear(),this.onAfterRenderObservable.clear(),this.onApplyObservable.clear(),this.onBeforeRenderObservable.clear(),this.onSizeChangedObservable.clear()}}serialize(){const e=Oe.Serialize(this),t=this.getCamera()||this._scene&&this._scene.activeCamera;return e.customType="BABYLON."+this.getClassName(),e.cameraId=t?t.id:null,e.reusable=this._reusable,e.textureType=this._textureType,e.fragmentUrl=this._fragmentUrl,e.parameters=this._parameters,e.samplers=this._samplers,e.options=this._options,e.defines=this._postProcessDefines,e.textureFormat=this._textureFormat,e.vertexUrl=this._vertexUrl,e.indexParameters=this._indexParameters,e}clone(){const e=this.serialize();e._engine=this._engine,e.cameraId=null;const t=K.Parse(e,this._scene,"");return t?(t.onActivateObservable=this.onActivateObservable.clone(),t.onSizeChangedObservable=this.onSizeChangedObservable.clone(),t.onApplyObservable=this.onApplyObservable.clone(),t.onBeforeRenderObservable=this.onBeforeRenderObservable.clone(),t.onAfterRenderObservable=this.onAfterRenderObservable.clone(),t._prePassEffectConfiguration=this._prePassEffectConfiguration,t):null}static Parse(e,t,i){const n=Ci(e.customType);if(!n||!n._Parse)return null;const s=t?t.getCameraById(e.cameraId):null;return n._Parse(e,s,t,i)}static _Parse(e,t,i,n){return Oe.Parse(()=>new K(e.name,e.fragmentUrl,e.parameters,e.samplers,e.options,t,e.renderTargetSamplingMode,e._engine,e.reusable,e.defines,e.textureType,e.vertexUrl,e.indexParameters,!1,e.textureFormat),e,i,n)}}K._CustomShaderCodeProcessing={};m([T()],K.prototype,"uniqueId",void 0);m([T()],K.prototype,"name",void 0);m([T()],K.prototype,"width",void 0);m([T()],K.prototype,"height",void 0);m([T()],K.prototype,"renderTargetSamplingMode",void 0);m([es()],K.prototype,"clearColor",void 0);m([T()],K.prototype,"autoClear",void 0);m([T()],K.prototype,"alphaMode",void 0);m([T()],K.prototype,"alphaConstants",void 0);m([T()],K.prototype,"enablePixelPerfectMode",void 0);m([T()],K.prototype,"forceFullscreenViewport",void 0);m([T()],K.prototype,"scaleMode",void 0);m([T()],K.prototype,"alwaysForcePOT",void 0);m([T("samples")],K.prototype,"_samples",void 0);m([T()],K.prototype,"adaptScaleToCurrentViewport",void 0);xt("BABYLON.PostProcess",K);const js="rgbdDecodePixelShader",qs=`varying vec2 vUV;
uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);
}`;k.ShadersStore[js]=qs;ce.prototype.createRenderTargetCubeTexture=function(a,e){const t=this._createHardwareRenderTargetWrapper(!1,!0,a),i={generateMipMaps:!0,generateDepthBuffer:!0,generateStencilBuffer:!1,type:0,samplingMode:3,format:5,...e};i.generateStencilBuffer=i.generateDepthBuffer&&i.generateStencilBuffer,(i.type===1&&!this._caps.textureFloatLinearFiltering||i.type===2&&!this._caps.textureHalfFloatLinearFiltering)&&(i.samplingMode=1);const n=this._gl,s=new Et(this,Ne.RenderTarget);this._bindTextureDirectly(n.TEXTURE_CUBE_MAP,s,!0);const r=this._getSamplingParameters(i.samplingMode,i.generateMipMaps);i.type===1&&!this._caps.textureFloat&&(i.type=0,H.Warn("Float textures are not supported. Cube render target forced to TEXTURETYPE_UNESIGNED_BYTE type")),n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAG_FILTER,r.mag),n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MIN_FILTER,r.min),n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);for(let l=0;l<6;l++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+l,0,this._getRGBABufferInternalSizedFormat(i.type,i.format),a,a,0,this._getInternalFormat(i.format),this._getWebGLTextureType(i.type),null);const o=n.createFramebuffer();return this._bindUnboundFramebuffer(o),t._depthStencilBuffer=this._setupFramebufferDepthAttachments(i.generateStencilBuffer,i.generateDepthBuffer,a,a),i.generateMipMaps&&n.generateMipmap(n.TEXTURE_CUBE_MAP),this._bindTextureDirectly(n.TEXTURE_CUBE_MAP,null),this._bindUnboundFramebuffer(null),t._framebuffer=o,t._generateDepthBuffer=i.generateDepthBuffer,t._generateStencilBuffer=i.generateStencilBuffer,s.width=a,s.height=a,s.isReady=!0,s.isCube=!0,s.samples=1,s.generateMipMaps=i.generateMipMaps,s.samplingMode=i.samplingMode,s.type=i.type,s.format=i.format,this._internalTexturesCache.push(s),t.setTextures(s),t};const wt={positions:[1,1,-1,1,-1,-1,1,-1],indices:[0,1,2,0,2,3]};class Zs{constructor(e,t=wt){var i,n;this._fullscreenViewport=new ts(0,0,1,1);const s=(i=t.positions)!==null&&i!==void 0?i:wt.positions,r=(n=t.indices)!==null&&n!==void 0?n:wt.indices;this.engine=e,this._vertexBuffers={[y.PositionKind]:new y(e,s,y.PositionKind,!1,!1,2)},this._indexBuffer=e.createIndexBuffer(r),this._onContextRestoredObserver=e.onContextRestoredObservable.add(()=>{this._indexBuffer=e.createIndexBuffer(r);for(const o in this._vertexBuffers)this._vertexBuffers[o]._rebuild()})}setViewport(e=this._fullscreenViewport){this.engine.setViewport(e)}bindBuffers(e){this.engine.bindBuffers(this._vertexBuffers,this._indexBuffer,e)}applyEffectWrapper(e){this.engine.setState(!0),this.engine.depthCullingState.depthTest=!1,this.engine.stencilState.stencilTest=!1,this.engine.enableEffect(e._drawWrapper),this.bindBuffers(e.effect),e.onApplyObservable.notifyObservers({})}restoreStates(){this.engine.depthCullingState.depthTest=!0,this.engine.stencilState.stencilTest=!0}draw(){this.engine.drawElementsType(0,0,6)}_isRenderTargetTexture(e){return e.renderTarget!==void 0}render(e,t=null){if(!e.effect.isReady())return;this.setViewport();const i=t===null?null:this._isRenderTargetTexture(t)?t.renderTarget:t;i&&this.engine.bindFramebuffer(i),this.applyEffectWrapper(e),this.draw(),i&&this.engine.unBindFramebuffer(i),this.restoreStates()}dispose(){const e=this._vertexBuffers[y.PositionKind];e&&(e.dispose(),delete this._vertexBuffers[y.PositionKind]),this._indexBuffer&&this.engine._releaseBuffer(this._indexBuffer),this._onContextRestoredObserver&&(this.engine.onContextRestoredObservable.remove(this._onContextRestoredObserver),this._onContextRestoredObserver=null)}}class Js{constructor(e){this.onApplyObservable=new Y;let t;const i=e.uniformNames||[];e.vertexShader?t={fragmentSource:e.fragmentShader,vertexSource:e.vertexShader,spectorName:e.name||"effectWrapper"}:(i.push("scale"),t={fragmentSource:e.fragmentShader,vertex:"postprocess",spectorName:e.name||"effectWrapper"},this.onApplyObservable.add(()=>{this.effect.setFloat2("scale",1,1)}));const n=e.defines?e.defines.join(`
`):"";this._drawWrapper=new en(e.engine),e.useShaderStore?(t.fragment=t.fragmentSource,t.vertex||(t.vertex=t.vertexSource),delete t.fragmentSource,delete t.vertexSource,this.effect=e.engine.createEffect(t,e.attributeNames||["position"],i,e.samplerNames,n,void 0,e.onCompiled,void 0,void 0,e.shaderLanguage)):(this.effect=new Ve(t,e.attributeNames||["position"],i,e.samplerNames,e.engine,n,void 0,e.onCompiled,void 0,void 0,void 0,e.shaderLanguage),this._onContextRestoredObserver=e.engine.onContextRestoredObservable.add(()=>{this.effect._pipelineContext=null,this.effect._wasPreviouslyReady=!1,this.effect._prepareEffect()}))}get effect(){return this._drawWrapper.effect}set effect(e){this._drawWrapper.effect=e}dispose(){this._onContextRestoredObserver&&(this.effect.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver),this._onContextRestoredObserver=null),this.effect.dispose()}}const cn="passPixelShader",fn=`varying vec2 vUV;
uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=texture2D(textureSampler,vUV);
}`;k.ShadersStore[cn]=fn;const Hi={name:cn,shader:fn};class he{static _CreateDumpRenderer(){if(!he._DumpToolsEngine){const e=document.createElement("canvas"),t=new ce(e,!1,{preserveDrawingBuffer:!0,depth:!1,stencil:!1,alpha:!0,premultipliedAlpha:!1,antialias:!1,failIfMajorPerformanceCaveat:!1});t.getCaps().parallelShaderCompile=void 0;const i=new Zs(t),n=new Js({engine:t,name:Hi.name,fragmentShader:Hi.shader,samplerNames:["textureSampler"]});he._DumpToolsEngine={canvas:e,engine:t,renderer:i,wrapper:n}}return he._DumpToolsEngine}static async DumpFramebuffer(e,t,i,n,s="image/png",r){const o=await i.readPixels(0,0,e,t),l=new Uint8Array(o.buffer);he.DumpData(e,t,l,n,s,r,!0)}static DumpDataAsync(e,t,i,n="image/png",s,r=!1,o=!1,l){return new Promise(c=>{he.DumpData(e,t,i,f=>c(f),n,s,r,o,l)})}static DumpData(e,t,i,n,s="image/png",r,o=!1,l=!1,c){const f=he._CreateDumpRenderer();if(f.engine.setSize(e,t,!0),i instanceof Float32Array){const h=new Uint8Array(i.length);let _=i.length;for(;_--;){const d=i[_];h[_]=d<0?0:d>1?1:Math.round(d*255)}i=h}const u=f.engine.createRawTexture(i,e,t,5,!1,!o,1);f.renderer.setViewport(),f.renderer.applyEffectWrapper(f.wrapper),f.wrapper.effect._bindTexture("textureSampler",u),f.renderer.draw(),l?w.ToBlob(f.canvas,h=>{const _=new FileReader;_.onload=d=>{const E=d.target.result;n&&n(E)},_.readAsArrayBuffer(h)},s,c):w.EncodeScreenshotCanvasData(f.canvas,n,s,r,c),u.dispose()}static Dispose(){he._DumpToolsEngine&&(he._DumpToolsEngine.wrapper.dispose(),he._DumpToolsEngine.renderer.dispose(),he._DumpToolsEngine.engine.dispose()),he._DumpToolsEngine=null}}const $s=()=>{w.DumpData=he.DumpData,w.DumpDataAsync=he.DumpDataAsync,w.DumpFramebuffer=he.DumpFramebuffer};$s();class Ge extends B{constructor(e,t,i,n,s=!0,r=0,o=!1,l=B.TRILINEAR_SAMPLINGMODE,c=!0,f=!1,u=!1,h=5,_=!1,d,E,p=!1,g=!1){var R;if(super(null,i,!n,void 0,l,void 0,void 0,void 0,void 0,h),this._unObserveRenderList=null,this._renderListHasChanged=(b,O)=>{var I;const N=this._renderList?this._renderList.length:0;(O===0&&N>0||N===0)&&((I=this.getScene())===null||I===void 0||I.meshes.forEach(G=>{G._markSubMeshesAsLightDirty()}))},this.renderParticles=!0,this.renderSprites=!1,this.ignoreCameraViewport=!1,this.onBeforeBindObservable=new Y,this.onAfterUnbindObservable=new Y,this.onBeforeRenderObservable=new Y,this.onAfterRenderObservable=new Y,this.onClearObservable=new Y,this.onResizeObservable=new Y,this._cleared=!1,this.skipInitialClear=!1,this._currentRefreshId=-1,this._refreshRate=1,this._samples=1,this._canRescale=!0,this._renderTarget=null,this.boundingBoxPosition=A.Zero(),i=this.getScene(),!i)return;const M=this.getScene().getEngine();this._coordinatesMode=B.PROJECTION_MODE,this.renderList=new Array,this.name=e,this.isRenderTarget=!0,this._initialSizeParameter=t,this._renderPassIds=[],this._isCubeData=o,this._processSizeParameter(t),this.renderPassId=this._renderPassIds[0],this._resizeObserver=M.onResizeObservable.add(()=>{}),this._generateMipMaps=!!n,this._doNotChangeAspectRatio=s,this._renderingManager=new is(i),this._renderingManager._useSceneAutoClearSetup=!0,!u&&(this._renderTargetOptions={generateMipMaps:n,type:r,format:(R=this._format)!==null&&R!==void 0?R:void 0,samplingMode:this.samplingMode,generateDepthBuffer:c,generateStencilBuffer:f,samples:d,creationFlags:E,noColorTarget:p,useSRGBBuffer:g},this.samplingMode===B.NEAREST_SAMPLINGMODE&&(this.wrapU=B.CLAMP_ADDRESSMODE,this.wrapV=B.CLAMP_ADDRESSMODE),_||(o?(this._renderTarget=i.getEngine().createRenderTargetCubeTexture(this.getRenderSize(),this._renderTargetOptions),this.coordinatesMode=B.INVCUBIC_MODE,this._textureMatrix=X.Identity()):this._renderTarget=i.getEngine().createRenderTargetTexture(this._size,this._renderTargetOptions),this._texture=this._renderTarget.texture,d!==void 0&&(this.samples=d)))}get renderList(){return this._renderList}set renderList(e){this._unObserveRenderList&&(this._unObserveRenderList(),this._unObserveRenderList=null),e&&(this._unObserveRenderList=ns(e,this._renderListHasChanged)),this._renderList=e}get postProcesses(){return this._postProcesses}get _prePassEnabled(){return!!this._prePassRenderTarget&&this._prePassRenderTarget.enabled}set onAfterUnbind(e){this._onAfterUnbindObserver&&this.onAfterUnbindObservable.remove(this._onAfterUnbindObserver),this._onAfterUnbindObserver=this.onAfterUnbindObservable.add(e)}set onBeforeRender(e){this._onBeforeRenderObserver&&this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver),this._onBeforeRenderObserver=this.onBeforeRenderObservable.add(e)}set onAfterRender(e){this._onAfterRenderObserver&&this.onAfterRenderObservable.remove(this._onAfterRenderObserver),this._onAfterRenderObserver=this.onAfterRenderObservable.add(e)}set onClear(e){this._onClearObserver&&this.onClearObservable.remove(this._onClearObserver),this._onClearObserver=this.onClearObservable.add(e)}get renderPassIds(){return this._renderPassIds}get currentRefreshId(){return this._currentRefreshId}setMaterialForRendering(e,t){let i;Array.isArray(e)?i=e:i=[e];for(let n=0;n<i.length;++n)for(let s=0;s<this._renderPassIds.length;++s)i[n].setMaterialForRenderPass(this._renderPassIds[s],t!==void 0?Array.isArray(t)?t[s]:t:void 0)}get renderTargetOptions(){return this._renderTargetOptions}get renderTarget(){return this._renderTarget}_onRatioRescale(){this._sizeRatio&&this.resize(this._initialSizeParameter)}set boundingBoxSize(e){if(this._boundingBoxSize&&this._boundingBoxSize.equals(e))return;this._boundingBoxSize=e;const t=this.getScene();t&&t.markAllMaterialsAsDirty(1)}get boundingBoxSize(){return this._boundingBoxSize}get depthStencilTexture(){var e,t;return(t=(e=this._renderTarget)===null||e===void 0?void 0:e._depthStencilTexture)!==null&&t!==void 0?t:null}createDepthStencilTexture(e=0,t=!0,i=!1,n=1,s=14){var r;(r=this._renderTarget)===null||r===void 0||r.createDepthStencilTexture(e,t,i,n,s)}_releaseRenderPassId(){if(this._scene){const e=this._scene.getEngine();for(let t=0;t<this._renderPassIds.length;++t)e.releaseRenderPassId(this._renderPassIds[t])}this._renderPassIds=[]}_createRenderPassId(){this._releaseRenderPassId();const e=this._scene.getEngine(),t=this._isCubeData?6:this.getRenderLayers()||1;for(let i=0;i<t;++i)this._renderPassIds[i]=e.createRenderPassId(`RenderTargetTexture - ${this.name}#${i}`)}_processSizeParameter(e){if(e.ratio){this._sizeRatio=e.ratio;const t=this._getEngine();this._size={width:this._bestReflectionRenderTargetDimension(t.getRenderWidth(),this._sizeRatio),height:this._bestReflectionRenderTargetDimension(t.getRenderHeight(),this._sizeRatio)}}else this._size=e;this._createRenderPassId()}get samples(){var e,t;return(t=(e=this._renderTarget)===null||e===void 0?void 0:e.samples)!==null&&t!==void 0?t:this._samples}set samples(e){this._renderTarget&&(this._samples=this._renderTarget.setSamples(e))}resetRefreshCounter(){this._currentRefreshId=-1}get refreshRate(){return this._refreshRate}set refreshRate(e){this._refreshRate=e,this.resetRefreshCounter()}addPostProcess(e){if(!this._postProcessManager){const t=this.getScene();if(!t)return;this._postProcessManager=new ss(t),this._postProcesses=new Array}this._postProcesses.push(e),this._postProcesses[0].autoClear=!1}clearPostProcesses(e=!1){if(!!this._postProcesses){if(e)for(const t of this._postProcesses)t.dispose();this._postProcesses=[]}}removePostProcess(e){if(!this._postProcesses)return;const t=this._postProcesses.indexOf(e);t!==-1&&(this._postProcesses.splice(t,1),this._postProcesses.length>0&&(this._postProcesses[0].autoClear=!1))}_shouldRender(){return this._currentRefreshId===-1?(this._currentRefreshId=1,!0):this.refreshRate===this._currentRefreshId?(this._currentRefreshId=1,!0):(this._currentRefreshId++,!1)}getRenderSize(){return this.getRenderWidth()}getRenderWidth(){return this._size.width?this._size.width:this._size}getRenderHeight(){return this._size.width?this._size.height:this._size}getRenderLayers(){const e=this._size.layers;return e||0}disableRescaling(){this._canRescale=!1}get canRescale(){return this._canRescale}scale(e){const t=Math.max(1,this.getRenderSize()*e);this.resize(t)}getReflectionTextureMatrix(){return this.isCube?this._textureMatrix:super.getReflectionTextureMatrix()}resize(e){var t;const i=this.isCube;(t=this._renderTarget)===null||t===void 0||t.dispose(),this._renderTarget=null;const n=this.getScene();!n||(this._processSizeParameter(e),i?this._renderTarget=n.getEngine().createRenderTargetCubeTexture(this.getRenderSize(),this._renderTargetOptions):this._renderTarget=n.getEngine().createRenderTargetTexture(this._size,this._renderTargetOptions),this._texture=this._renderTarget.texture,this._renderTargetOptions.samples!==void 0&&(this.samples=this._renderTargetOptions.samples),this.onResizeObservable.hasObservers()&&this.onResizeObservable.notifyObservers(this))}render(e=!1,t=!1){this._render(e,t)}isReadyForRendering(){return this._render(!1,!1,!0)}_render(e=!1,t=!1,i=!1){var n;const s=this.getScene();if(!s)return i;const r=s.getEngine();if(this.useCameraPostProcesses!==void 0&&(e=this.useCameraPostProcesses),this._waitingRenderList){this.renderList=[];for(let u=0;u<this._waitingRenderList.length;u++){const h=this._waitingRenderList[u],_=s.getMeshById(h);_&&this.renderList.push(_)}this._waitingRenderList=void 0}if(this.renderListPredicate){this.renderList?this.renderList.length=0:this.renderList=[];const u=this.getScene();if(!u)return i;const h=u.meshes;for(let _=0;_<h.length;_++){const d=h[_];this.renderListPredicate(d)&&this.renderList.push(d)}}const o=r.currentRenderPassId;this.onBeforeBindObservable.notifyObservers(this);const l=(n=this.activeCamera)!==null&&n!==void 0?n:s.activeCamera,c=s.activeCamera;l&&(l!==s.activeCamera&&(s.setTransformMatrix(l.getViewMatrix(),l.getProjectionMatrix(!0)),s.activeCamera=l),r.setViewport(l.viewport,this.getRenderWidth(),this.getRenderHeight())),this._defaultRenderListPrepared=!1;let f=i;if(i){s.getViewMatrix()||s.updateTransformMatrix();const u=this.is2DArray?this.getRenderLayers():this.isCube?6:1;for(let h=0;h<u&&f;h++){let _=null;const d=this.renderList?this.renderList:s.getActiveMeshes().data,E=this.renderList?this.renderList.length:s.getActiveMeshes().length;r.currentRenderPassId=this._renderPassIds[h],this.onBeforeRenderObservable.notifyObservers(h),this.getCustomRenderList&&(_=this.getCustomRenderList(h,d,E)),_||(_=d),this._doNotChangeAspectRatio||s.updateTransformMatrix(!0);for(let p=0;p<_.length&&f;++p){const g=_[p];if(!(!g.isEnabled()||g.isBlocked||!g.isVisible||!g.subMeshes)){if(this.customIsReadyFunction){if(!this.customIsReadyFunction(g,this.refreshRate,i)){f=!1;break}}else if(!g.isReady(!0)){f=!1;break}}}this.onAfterRenderObservable.notifyObservers(h)}}else if(this.is2DArray)for(let u=0;u<this.getRenderLayers();u++)this._renderToTarget(0,e,t,u,l),s.incrementRenderId(),s.resetCachedMaterial();else if(this.isCube)for(let u=0;u<6;u++)this._renderToTarget(u,e,t,void 0,l),s.incrementRenderId(),s.resetCachedMaterial();else this._renderToTarget(0,e,t,void 0,l);return this.onAfterUnbindObservable.notifyObservers(this),r.currentRenderPassId=o,c&&(s.activeCamera=c,(s.getEngine().scenes.length>1||this.activeCamera&&this.activeCamera!==s.activeCamera)&&s.setTransformMatrix(s.activeCamera.getViewMatrix(),s.activeCamera.getProjectionMatrix(!0)),r.setViewport(s.activeCamera.viewport)),s.resetCachedMaterial(),f}_bestReflectionRenderTargetDimension(e,t){const n=e*t,s=D.NearestPOT(n+128*128/(128+n));return Math.min(D.FloorPOT(e),s)}_prepareRenderingManager(e,t,i,n){const s=this.getScene();if(!s)return;this._renderingManager.reset();const r=s.getRenderId();for(let o=0;o<t;o++){const l=e[o];if(l&&!l.isBlocked){if(this.customIsReadyFunction){if(!this.customIsReadyFunction(l,this.refreshRate,!1)){this.resetRefreshCounter();continue}}else if(!l.isReady(this.refreshRate===0)){this.resetRefreshCounter();continue}if(!l._internalAbstractMeshDataInfo._currentLODIsUpToDate&&s.activeCamera&&(l._internalAbstractMeshDataInfo._currentLOD=s.customLODSelector?s.customLODSelector(l,this.activeCamera||s.activeCamera):l.getLOD(this.activeCamera||s.activeCamera),l._internalAbstractMeshDataInfo._currentLODIsUpToDate=!0),!l._internalAbstractMeshDataInfo._currentLOD)continue;let c=l._internalAbstractMeshDataInfo._currentLOD;c._preActivateForIntermediateRendering(r);let f;if(n&&i?f=(l.layerMask&i.layerMask)===0:f=!1,l.isEnabled()&&l.isVisible&&l.subMeshes&&!f&&(c!==l&&c._activate(r,!0),l._activate(r,!0)&&l.subMeshes.length)){l.isAnInstance?l._internalAbstractMeshDataInfo._actAsRegularMesh&&(c=l):c._internalAbstractMeshDataInfo._onlyForInstancesIntermediate=!1,c._internalAbstractMeshDataInfo._isActiveIntermediate=!0;for(let u=0;u<c.subMeshes.length;u++){const h=c.subMeshes[u];this._renderingManager.dispatch(h,c)}}}}for(let o=0;o<s.particleSystems.length;o++){const l=s.particleSystems[o],c=l.emitter;!l.isStarted()||!c||!c.position||!c.isEnabled()||e.indexOf(c)>=0&&this._renderingManager.dispatchParticles(l)}}_bindFrameBuffer(e=0,t=0){const i=this.getScene();if(!i)return;const n=i.getEngine();this._renderTarget&&n.bindFramebuffer(this._renderTarget,this.isCube?e:void 0,void 0,void 0,this.ignoreCameraViewport,0,t)}_unbindFrameBuffer(e,t){!this._renderTarget||e.unBindFramebuffer(this._renderTarget,this.isCube,()=>{this.onAfterRenderObservable.notifyObservers(t)})}_prepareFrame(e,t,i,n){this._postProcessManager?this._prePassEnabled||this._postProcessManager._prepareFrame(this._texture,this._postProcesses):(!n||!e.postProcessManager._prepareFrame(this._texture))&&this._bindFrameBuffer(t,i)}_renderToTarget(e,t,i,n=0,s=null){var r,o,l,c,f,u;const h=this.getScene();if(!h)return;const _=h.getEngine();if((r=_._debugPushGroup)===null||r===void 0||r.call(_,`render to face #${e} layer #${n}`,1),this._prepareFrame(h,e,n,t),this.is2DArray?(_.currentRenderPassId=this._renderPassIds[n],this.onBeforeRenderObservable.notifyObservers(n)):(_.currentRenderPassId=this._renderPassIds[e],this.onBeforeRenderObservable.notifyObservers(e)),_.snapshotRendering&&_.snapshotRenderingMode===1)this.onClearObservable.hasObservers()?this.onClearObservable.notifyObservers(_):this.skipInitialClear||_.clear(this.clearColor||h.clearColor,!0,!0,!0);else{let E=null;const p=this.renderList?this.renderList:h.getActiveMeshes().data,g=this.renderList?this.renderList.length:h.getActiveMeshes().length;this.getCustomRenderList&&(E=this.getCustomRenderList(this.is2DArray?n:e,p,g)),E?this._prepareRenderingManager(E,E.length,s,!1):(this._defaultRenderListPrepared||(this._prepareRenderingManager(p,g,s,!this.renderList),this._defaultRenderListPrepared=!0),E=p);for(const M of h._beforeRenderTargetClearStage)M.action(this,e,n);this.onClearObservable.hasObservers()?this.onClearObservable.notifyObservers(_):this.skipInitialClear||_.clear(this.clearColor||h.clearColor,!0,!0,!0),this._doNotChangeAspectRatio||h.updateTransformMatrix(!0);for(const M of h._beforeRenderTargetDrawStage)M.action(this,e,n);this._renderingManager.render(this.customRenderFunction,E,this.renderParticles,this.renderSprites);for(const M of h._afterRenderTargetDrawStage)M.action(this,e,n);const R=(l=(o=this._texture)===null||o===void 0?void 0:o.generateMipMaps)!==null&&l!==void 0?l:!1;this._texture&&(this._texture.generateMipMaps=!1),this._postProcessManager?this._postProcessManager._finalizeFrame(!1,(c=this._renderTarget)!==null&&c!==void 0?c:void 0,e,this._postProcesses,this.ignoreCameraViewport):t&&h.postProcessManager._finalizeFrame(!1,(f=this._renderTarget)!==null&&f!==void 0?f:void 0,e);for(const M of h._afterRenderTargetPostProcessStage)M.action(this,e,n);this._texture&&(this._texture.generateMipMaps=R),this._doNotChangeAspectRatio||h.updateTransformMatrix(!0),i&&he.DumpFramebuffer(this.getRenderWidth(),this.getRenderHeight(),_)}this._unbindFrameBuffer(_,e),this._texture&&this.isCube&&e===5&&_.generateMipMapsForCubemap(this._texture),(u=_._debugPopGroup)===null||u===void 0||u.call(_,1)}setRenderingOrder(e,t=null,i=null,n=null){this._renderingManager.setRenderingOrder(e,t,i,n)}setRenderingAutoClearDepthStencil(e,t){this._renderingManager.setRenderingAutoClearDepthStencil(e,t),this._renderingManager._useSceneAutoClearSetup=!1}clone(){const e=this.getSize(),t=new Ge(this.name,e,this.getScene(),this._renderTargetOptions.generateMipMaps,this._doNotChangeAspectRatio,this._renderTargetOptions.type,this.isCube,this._renderTargetOptions.samplingMode,this._renderTargetOptions.generateDepthBuffer,this._renderTargetOptions.generateStencilBuffer,void 0,this._renderTargetOptions.format,void 0,this._renderTargetOptions.samples);return t.hasAlpha=this.hasAlpha,t.level=this.level,t.coordinatesMode=this.coordinatesMode,this.renderList&&(t.renderList=this.renderList.slice(0)),t}serialize(){if(!this.name)return null;const e=super.serialize();if(e.renderTargetSize=this.getRenderSize(),e.renderList=[],this.renderList)for(let t=0;t<this.renderList.length;t++)e.renderList.push(this.renderList[t].id);return e}disposeFramebufferObjects(){var e;(e=this._renderTarget)===null||e===void 0||e.dispose(!0)}releaseInternalTexture(){var e;(e=this._renderTarget)===null||e===void 0||e.releaseTextures(),this._texture=null}dispose(){var e;this.onResizeObservable.clear(),this.onClearObservable.clear(),this.onAfterRenderObservable.clear(),this.onAfterUnbindObservable.clear(),this.onBeforeBindObservable.clear(),this.onBeforeRenderObservable.clear(),this._postProcessManager&&(this._postProcessManager.dispose(),this._postProcessManager=null),this._prePassRenderTarget&&this._prePassRenderTarget.dispose(),this._releaseRenderPassId(),this.clearPostProcesses(!0),this._resizeObserver&&(this.getScene().getEngine().onResizeObservable.remove(this._resizeObserver),this._resizeObserver=null),this.renderList=null;const t=this.getScene();if(!t)return;let i=t.customRenderTargets.indexOf(this);i>=0&&t.customRenderTargets.splice(i,1);for(const n of t.cameras)i=n.customRenderTargets.indexOf(this),i>=0&&n.customRenderTargets.splice(i,1);(e=this._renderTarget)===null||e===void 0||e.dispose(),this._renderTarget=null,this._texture=null,super.dispose()}_rebuild(){this.refreshRate===Ge.REFRESHRATE_RENDER_ONCE&&(this.refreshRate=Ge.REFRESHRATE_RENDER_ONCE),this._postProcessManager&&this._postProcessManager._rebuild()}freeRenderingGroups(){this._renderingManager&&this._renderingManager.freeRenderingGroups()}getViewCount(){return 1}}Ge.REFRESHRATE_RENDER_ONCE=0;Ge.REFRESHRATE_RENDER_ONEVERYFRAME=1;Ge.REFRESHRATE_RENDER_ONEVERYTWOFRAMES=2;B._CreateRenderTargetTexture=(a,e,t,i,n)=>new Ge(a,e,t,i);const er="passCubePixelShader",tr=`varying vec2 vUV;
uniform samplerCube textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
vec2 uv=vUV*2.0-1.0;
#ifdef POSITIVEX
gl_FragColor=textureCube(textureSampler,vec3(1.001,uv.y,uv.x));
#endif
#ifdef NEGATIVEX
gl_FragColor=textureCube(textureSampler,vec3(-1.001,uv.y,uv.x));
#endif
#ifdef POSITIVEY
gl_FragColor=textureCube(textureSampler,vec3(uv.y,1.001,uv.x));
#endif
#ifdef NEGATIVEY
gl_FragColor=textureCube(textureSampler,vec3(uv.y,-1.001,uv.x));
#endif
#ifdef POSITIVEZ
gl_FragColor=textureCube(textureSampler,vec3(uv,1.001));
#endif
#ifdef NEGATIVEZ
gl_FragColor=textureCube(textureSampler,vec3(uv,-1.001));
#endif
}`;k.ShadersStore[er]=tr;class bt extends K{getClassName(){return"PassPostProcess"}constructor(e,t,i=null,n,s,r,o=0,l=!1){super(e,"pass",null,null,t,i,n,s,r,void 0,o,void 0,null,l)}static _Parse(e,t,i,n){return Oe.Parse(()=>new bt(e.name,e.options,t,e.renderTargetSamplingMode,e._engine,e.reusable),e,i,n)}}xt("BABYLON.PassPostProcess",bt);D._RescalePostProcessFactory=a=>new bt("rescale",1,null,2,a,!1,0);function ir(a,e,t,i,n,s){const r=e.getEngine();return e.isReady=!1,n=n!=null?n:e.samplingMode,i=i!=null?i:e.type,s=s!=null?s:e.format,i===-1&&(i=0),new Promise(o=>{const l=new K("postprocess",a,null,null,1,null,n,r,!1,void 0,i,void 0,null,!1,s);l.externalTextureSamplerBinding=!0;const c=r.createRenderTargetTexture({width:e.width,height:e.height},{generateDepthBuffer:!1,generateMipMaps:!1,generateStencilBuffer:!1,samplingMode:n,type:i,format:s});l.getEffect().executeWhenCompiled(()=>{l.onApply=f=>{f._bindTexture("textureSampler",e),f.setFloat2("scale",1,1)},t.postProcessManager.directRender([l],c,!0),r.restoreDefaultFramebuffer(),r._releaseTexture(e),l&&l.dispose(),c._swapAndDie(e),e.type=i,e.format=5,e.isReady=!0,o(e)})})}class ki{static ExpandRGBDTexture(e){const t=e._texture;if(!t||!e.isRGBD)return;const i=t.getEngine(),n=i.getCaps(),s=t.isReady;let r=!1;n.textureHalfFloatRender&&n.textureHalfFloatLinearFiltering?(r=!0,t.type=2):n.textureFloatRender&&n.textureFloatLinearFiltering&&(r=!0,t.type=1),r&&(t.isReady=!1,t._isRGBD=!1,t.invertY=!1);const o=()=>{if(r){const l=new K("rgbdDecode","rgbdDecode",null,null,1,null,3,i,!1,void 0,t.type,void 0,null,!1);l.externalTextureSamplerBinding=!0;const c=i.createRenderTargetTexture(t.width,{generateDepthBuffer:!1,generateMipMaps:!1,generateStencilBuffer:!1,samplingMode:t.samplingMode,type:t.type,format:5});l.getEffect().executeWhenCompiled(()=>{l.onApply=f=>{f._bindTexture("textureSampler",t),f.setFloat2("scale",1,1)},e.getScene().postProcessManager.directRender([l],c,!0),i.restoreDefaultFramebuffer(),i._releaseTexture(t),l&&l.dispose(),c._swapAndDie(t),t.isReady=!0})}};s?o():e.onLoadObservable.addOnce(o)}static EncodeTextureToRGBD(e,t,i=0){return ir("rgbdEncode",e,t,i,1,5)}}const nr="data:image/png;base64,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";let sr=0;const hn=a=>{if(!a.environmentBRDFTexture){const e=a.useDelayedTextureLoading;a.useDelayedTextureLoading=!1;const t=a._blockEntityCollection;a._blockEntityCollection=!1;const i=B.CreateFromBase64String(nr,"EnvironmentBRDFTexture"+sr++,a,!0,!1,B.BILINEAR_SAMPLINGMODE);a._blockEntityCollection=t;const n=a.getEngine().getLoadedTexturesCache(),s=n.indexOf(i.getInternalTexture());s!==-1&&n.splice(s,1),i.isRGBD=!0,i.wrapU=B.CLAMP_ADDRESSMODE,i.wrapV=B.CLAMP_ADDRESSMODE,a.environmentBRDFTexture=i,a.useDelayedTextureLoading=e,ki.ExpandRGBDTexture(i);const r=a.getEngine().onContextRestoredObservable.add(()=>{i.isRGBD=!0;const o=()=>{i.isReady()?ki.ExpandRGBDTexture(i):w.SetImmediate(o)};o()});a.onDisposeObservable.add(()=>{a.getEngine().onContextRestoredObservable.remove(r)})}return a.environmentBRDFTexture};class rr extends Ke{constructor(){super(...arguments),this.BRDF_V_HEIGHT_CORRELATED=!1,this.MS_BRDF_ENERGY_CONSERVATION=!1,this.SPHERICAL_HARMONICS=!1,this.SPECULAR_GLOSSINESS_ENERGY_CONSERVATION=!1}}class oe extends st{constructor(e,t=!0){super(e,"PBRBRDF",90,new rr,t),this._useEnergyConservation=oe.DEFAULT_USE_ENERGY_CONSERVATION,this.useEnergyConservation=oe.DEFAULT_USE_ENERGY_CONSERVATION,this._useSmithVisibilityHeightCorrelated=oe.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED,this.useSmithVisibilityHeightCorrelated=oe.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED,this._useSphericalHarmonics=oe.DEFAULT_USE_SPHERICAL_HARMONICS,this.useSphericalHarmonics=oe.DEFAULT_USE_SPHERICAL_HARMONICS,this._useSpecularGlossinessInputEnergyConservation=oe.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION,this.useSpecularGlossinessInputEnergyConservation=oe.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION,this._internalMarkAllSubMeshesAsMiscDirty=e._dirtyCallbacks[16],this._enable(!0)}_markAllSubMeshesAsMiscDirty(){this._internalMarkAllSubMeshesAsMiscDirty()}prepareDefines(e){e.BRDF_V_HEIGHT_CORRELATED=this._useSmithVisibilityHeightCorrelated,e.MS_BRDF_ENERGY_CONSERVATION=this._useEnergyConservation&&this._useSmithVisibilityHeightCorrelated,e.SPHERICAL_HARMONICS=this._useSphericalHarmonics,e.SPECULAR_GLOSSINESS_ENERGY_CONSERVATION=this._useSpecularGlossinessInputEnergyConservation}getClassName(){return"PBRBRDFConfiguration"}}oe.DEFAULT_USE_ENERGY_CONSERVATION=!0;oe.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED=!0;oe.DEFAULT_USE_SPHERICAL_HARMONICS=!0;oe.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION=!0;m([T(),C("_markAllSubMeshesAsMiscDirty")],oe.prototype,"useEnergyConservation",void 0);m([T(),C("_markAllSubMeshesAsMiscDirty")],oe.prototype,"useSmithVisibilityHeightCorrelated",void 0);m([T(),C("_markAllSubMeshesAsMiscDirty")],oe.prototype,"useSphericalHarmonics",void 0);m([T(),C("_markAllSubMeshesAsMiscDirty")],oe.prototype,"useSpecularGlossinessInputEnergyConservation",void 0);const ve=[Math.sqrt(1/(4*Math.PI)),-Math.sqrt(3/(4*Math.PI)),Math.sqrt(3/(4*Math.PI)),-Math.sqrt(3/(4*Math.PI)),Math.sqrt(15/(4*Math.PI)),-Math.sqrt(15/(4*Math.PI)),Math.sqrt(5/(16*Math.PI)),-Math.sqrt(15/(4*Math.PI)),Math.sqrt(15/(16*Math.PI))],ar=[()=>1,a=>a.y,a=>a.z,a=>a.x,a=>a.x*a.y,a=>a.y*a.z,a=>3*a.z*a.z-1,a=>a.x*a.z,a=>a.x*a.x-a.y*a.y],Pe=(a,e)=>ve[a]*ar[a](e),De=[Math.PI,2*Math.PI/3,2*Math.PI/3,2*Math.PI/3,Math.PI/4,Math.PI/4,Math.PI/4,Math.PI/4,Math.PI/4];class nt{constructor(){this.preScaled=!1,this.l00=A.Zero(),this.l1_1=A.Zero(),this.l10=A.Zero(),this.l11=A.Zero(),this.l2_2=A.Zero(),this.l2_1=A.Zero(),this.l20=A.Zero(),this.l21=A.Zero(),this.l22=A.Zero()}addLight(e,t,i){F.Vector3[0].set(t.r,t.g,t.b);const n=F.Vector3[0],s=F.Vector3[1];n.scaleToRef(i,s),s.scaleToRef(Pe(0,e),F.Vector3[2]),this.l00.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(1,e),F.Vector3[2]),this.l1_1.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(2,e),F.Vector3[2]),this.l10.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(3,e),F.Vector3[2]),this.l11.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(4,e),F.Vector3[2]),this.l2_2.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(5,e),F.Vector3[2]),this.l2_1.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(6,e),F.Vector3[2]),this.l20.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(7,e),F.Vector3[2]),this.l21.addInPlace(F.Vector3[2]),s.scaleToRef(Pe(8,e),F.Vector3[2]),this.l22.addInPlace(F.Vector3[2])}scaleInPlace(e){this.l00.scaleInPlace(e),this.l1_1.scaleInPlace(e),this.l10.scaleInPlace(e),this.l11.scaleInPlace(e),this.l2_2.scaleInPlace(e),this.l2_1.scaleInPlace(e),this.l20.scaleInPlace(e),this.l21.scaleInPlace(e),this.l22.scaleInPlace(e)}convertIncidentRadianceToIrradiance(){this.l00.scaleInPlace(De[0]),this.l1_1.scaleInPlace(De[1]),this.l10.scaleInPlace(De[2]),this.l11.scaleInPlace(De[3]),this.l2_2.scaleInPlace(De[4]),this.l2_1.scaleInPlace(De[5]),this.l20.scaleInPlace(De[6]),this.l21.scaleInPlace(De[7]),this.l22.scaleInPlace(De[8])}convertIrradianceToLambertianRadiance(){this.scaleInPlace(1/Math.PI)}preScaleForRendering(){this.preScaled=!0,this.l00.scaleInPlace(ve[0]),this.l1_1.scaleInPlace(ve[1]),this.l10.scaleInPlace(ve[2]),this.l11.scaleInPlace(ve[3]),this.l2_2.scaleInPlace(ve[4]),this.l2_1.scaleInPlace(ve[5]),this.l20.scaleInPlace(ve[6]),this.l21.scaleInPlace(ve[7]),this.l22.scaleInPlace(ve[8])}updateFromArray(e){return A.FromArrayToRef(e[0],0,this.l00),A.FromArrayToRef(e[1],0,this.l1_1),A.FromArrayToRef(e[2],0,this.l10),A.FromArrayToRef(e[3],0,this.l11),A.FromArrayToRef(e[4],0,this.l2_2),A.FromArrayToRef(e[5],0,this.l2_1),A.FromArrayToRef(e[6],0,this.l20),A.FromArrayToRef(e[7],0,this.l21),A.FromArrayToRef(e[8],0,this.l22),this}updateFromFloatsArray(e){return A.FromFloatsToRef(e[0],e[1],e[2],this.l00),A.FromFloatsToRef(e[3],e[4],e[5],this.l1_1),A.FromFloatsToRef(e[6],e[7],e[8],this.l10),A.FromFloatsToRef(e[9],e[10],e[11],this.l11),A.FromFloatsToRef(e[12],e[13],e[14],this.l2_2),A.FromFloatsToRef(e[15],e[16],e[17],this.l2_1),A.FromFloatsToRef(e[18],e[19],e[20],this.l20),A.FromFloatsToRef(e[21],e[22],e[23],this.l21),A.FromFloatsToRef(e[24],e[25],e[26],this.l22),this}static FromArray(e){return new nt().updateFromArray(e)}static FromPolynomial(e){const t=new nt;return t.l00=e.xx.scale(.376127).add(e.yy.scale(.376127)).add(e.zz.scale(.376126)),t.l1_1=e.y.scale(.977204),t.l10=e.z.scale(.977204),t.l11=e.x.scale(.977204),t.l2_2=e.xy.scale(1.16538),t.l2_1=e.yz.scale(1.16538),t.l20=e.zz.scale(1.34567).subtract(e.xx.scale(.672834)).subtract(e.yy.scale(.672834)),t.l21=e.zx.scale(1.16538),t.l22=e.xx.scale(1.16538).subtract(e.yy.scale(1.16538)),t.l1_1.scaleInPlace(-1),t.l11.scaleInPlace(-1),t.l2_1.scaleInPlace(-1),t.l21.scaleInPlace(-1),t.scaleInPlace(Math.PI),t}}class dt{constructor(){this.x=A.Zero(),this.y=A.Zero(),this.z=A.Zero(),this.xx=A.Zero(),this.yy=A.Zero(),this.zz=A.Zero(),this.xy=A.Zero(),this.yz=A.Zero(),this.zx=A.Zero()}get preScaledHarmonics(){return this._harmonics||(this._harmonics=nt.FromPolynomial(this)),this._harmonics.preScaled||this._harmonics.preScaleForRendering(),this._harmonics}addAmbient(e){F.Vector3[0].copyFromFloats(e.r,e.g,e.b);const t=F.Vector3[0];this.xx.addInPlace(t),this.yy.addInPlace(t),this.zz.addInPlace(t)}scaleInPlace(e){this.x.scaleInPlace(e),this.y.scaleInPlace(e),this.z.scaleInPlace(e),this.xx.scaleInPlace(e),this.yy.scaleInPlace(e),this.zz.scaleInPlace(e),this.yz.scaleInPlace(e),this.zx.scaleInPlace(e),this.xy.scaleInPlace(e)}updateFromHarmonics(e){return this._harmonics=e,this.x.copyFrom(e.l11),this.x.scaleInPlace(1.02333).scaleInPlace(-1),this.y.copyFrom(e.l1_1),this.y.scaleInPlace(1.02333).scaleInPlace(-1),this.z.copyFrom(e.l10),this.z.scaleInPlace(1.02333),this.xx.copyFrom(e.l00),F.Vector3[0].copyFrom(e.l20).scaleInPlace(.247708),F.Vector3[1].copyFrom(e.l22).scaleInPlace(.429043),this.xx.scaleInPlace(.886277).subtractInPlace(F.Vector3[0]).addInPlace(F.Vector3[1]),this.yy.copyFrom(e.l00),this.yy.scaleInPlace(.886277).subtractInPlace(F.Vector3[0]).subtractInPlace(F.Vector3[1]),this.zz.copyFrom(e.l00),F.Vector3[0].copyFrom(e.l20).scaleInPlace(.495417),this.zz.scaleInPlace(.886277).addInPlace(F.Vector3[0]),this.yz.copyFrom(e.l2_1),this.yz.scaleInPlace(.858086).scaleInPlace(-1),this.zx.copyFrom(e.l21),this.zx.scaleInPlace(.858086).scaleInPlace(-1),this.xy.copyFrom(e.l2_2),this.xy.scaleInPlace(.858086),this.scaleInPlace(1/Math.PI),this}static FromHarmonics(e){return new dt().updateFromHarmonics(e)}static FromArray(e){const t=new dt;return A.FromArrayToRef(e[0],0,t.x),A.FromArrayToRef(e[1],0,t.y),A.FromArrayToRef(e[2],0,t.z),A.FromArrayToRef(e[3],0,t.xx),A.FromArrayToRef(e[4],0,t.yy),A.FromArrayToRef(e[5],0,t.zz),A.FromArrayToRef(e[6],0,t.yz),A.FromArrayToRef(e[7],0,t.zx),A.FromArrayToRef(e[8],0,t.xy),t}}class je{constructor(e,t,i,n){this.name=e,this.worldAxisForNormal=t,this.worldAxisForFileX=i,this.worldAxisForFileY=n}}class un{static ConvertCubeMapTextureToSphericalPolynomial(e){var t;if(!e.isCube)return null;(t=e.getScene())===null||t===void 0||t.getEngine().flushFramebuffer();const i=e.getSize().width,n=e.readPixels(0,void 0,void 0,!1),s=e.readPixels(1,void 0,void 0,!1);let r,o;e.isRenderTarget?(r=e.readPixels(3,void 0,void 0,!1),o=e.readPixels(2,void 0,void 0,!1)):(r=e.readPixels(2,void 0,void 0,!1),o=e.readPixels(3,void 0,void 0,!1));const l=e.readPixels(4,void 0,void 0,!1),c=e.readPixels(5,void 0,void 0,!1),f=e.gammaSpace,u=5;let h=0;return(e.textureType==1||e.textureType==2)&&(h=1),new Promise(_=>{Promise.all([s,n,r,o,l,c]).then(([d,E,p,g,R,M])=>{const b={size:i,right:E,left:d,up:p,down:g,front:R,back:M,format:u,type:h,gammaSpace:f};_(this.ConvertCubeMapToSphericalPolynomial(b))})})}static _AreaElement(e,t){return Math.atan2(e*t,Math.sqrt(e*e+t*t+1))}static ConvertCubeMapToSphericalPolynomial(e){const t=new nt;let i=0;const n=2/e.size,s=n,r=.5*n,o=r-1;for(let h=0;h<6;h++){const _=this._FileFaces[h],d=e[_.name];let E=o;const p=e.format===5?4:3;for(let g=0;g<e.size;g++){let R=o;for(let M=0;M<e.size;M++){const b=_.worldAxisForFileX.scale(R).add(_.worldAxisForFileY.scale(E)).add(_.worldAxisForNormal);b.normalize();const O=this._AreaElement(R-r,E-r)-this._AreaElement(R-r,E+r)-this._AreaElement(R+r,E-r)+this._AreaElement(R+r,E+r);let I=d[g*e.size*p+M*p+0],N=d[g*e.size*p+M*p+1],G=d[g*e.size*p+M*p+2];isNaN(I)&&(I=0),isNaN(N)&&(N=0),isNaN(G)&&(G=0),e.type===0&&(I/=255,N/=255,G/=255),e.gammaSpace&&(I=Math.pow(xe.Clamp(I),Pt),N=Math.pow(xe.Clamp(N),Pt),G=Math.pow(xe.Clamp(G),Pt));const Q=4096;I=xe.Clamp(I,0,Q),N=xe.Clamp(N,0,Q),G=xe.Clamp(G,0,Q);const J=new V(I,N,G);t.addLight(b,J,O),i+=O,R+=n}E+=s}}const u=4*Math.PI*6/6/i;return t.scaleInPlace(u),t.convertIncidentRadianceToIrradiance(),t.convertIrradianceToLambertianRadiance(),dt.FromHarmonics(t)}}un._FileFaces=[new je("right",new A(1,0,0),new A(0,0,-1),new A(0,-1,0)),new je("left",new A(-1,0,0),new A(0,0,1),new A(0,-1,0)),new je("up",new A(0,1,0),new A(1,0,0),new A(0,0,1)),new je("down",new A(0,-1,0),new A(1,0,0),new A(0,0,-1)),new je("front",new A(0,0,1),new A(1,0,0),new A(0,-1,0)),new je("back",new A(0,0,-1),new A(-1,0,0),new A(0,-1,0))];Mt.prototype.forceSphericalPolynomialsRecompute=function(){this._texture&&(this._texture._sphericalPolynomial=null,this._texture._sphericalPolynomialPromise=null,this._texture._sphericalPolynomialComputed=!1)};Object.defineProperty(Mt.prototype,"sphericalPolynomial",{get:function(){if(this._texture){if(this._texture._sphericalPolynomial||this._texture._sphericalPolynomialComputed)return this._texture._sphericalPolynomial;if(this._texture.isReady)return this._texture._sphericalPolynomialPromise||(this._texture._sphericalPolynomialPromise=un.ConvertCubeMapTextureToSphericalPolynomial(this),this._texture._sphericalPolynomialPromise===null?this._texture._sphericalPolynomialComputed=!0:this._texture._sphericalPolynomialPromise.then(a=>{this._texture._sphericalPolynomial=a,this._texture._sphericalPolynomialComputed=!0})),null}return null},set:function(a){this._texture&&(this._texture._sphericalPolynomial=a)},enumerable:!0,configurable:!0});const or="pbrFragmentDeclaration",lr=`uniform vec4 vEyePosition;
uniform vec3 vReflectionColor;
uniform vec4 vAlbedoColor;
uniform vec4 vLightingIntensity;
uniform vec4 vReflectivityColor;
uniform vec4 vMetallicReflectanceFactors;
uniform vec3 vEmissiveColor;
uniform float visibility;
uniform vec3 vAmbientColor;
#ifdef ALBEDO
uniform vec2 vAlbedoInfos;
#endif
#ifdef AMBIENT
uniform vec4 vAmbientInfos;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform vec2 vTangentSpaceParams;
#endif
#ifdef OPACITY
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
#endif
#ifdef REFLECTIVITY
uniform vec3 vReflectivityInfos;
#endif
#ifdef MICROSURFACEMAP
uniform vec2 vMicroSurfaceSamplerInfos;
#endif
#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(SS_REFRACTION) || defined(PREPASS)
uniform mat4 view;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
#ifdef REALTIME_FILTERING
uniform vec2 vReflectionFilteringInfo;
#endif
uniform mat4 reflectionMatrix;
uniform vec3 vReflectionMicrosurfaceInfos;
#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)
uniform vec3 vReflectionPosition;
uniform vec3 vReflectionSize; 
#endif
#endif
#if defined(SS_REFRACTION) && defined(SS_USE_LOCAL_REFRACTIONMAP_CUBIC)
uniform vec3 vRefractionPosition;
uniform vec3 vRefractionSize; 
#endif
#ifdef CLEARCOAT
uniform vec2 vClearCoatParams;
uniform vec4 vClearCoatRefractionParams;
#if defined(CLEARCOAT_TEXTURE) || defined(CLEARCOAT_TEXTURE_ROUGHNESS)
uniform vec4 vClearCoatInfos;
#endif
#ifdef CLEARCOAT_TEXTURE
uniform mat4 clearCoatMatrix;
#endif
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS
uniform mat4 clearCoatRoughnessMatrix;
#endif
#ifdef CLEARCOAT_BUMP
uniform vec2 vClearCoatBumpInfos;
uniform vec2 vClearCoatTangentSpaceParams;
uniform mat4 clearCoatBumpMatrix;
#endif
#ifdef CLEARCOAT_TINT
uniform vec4 vClearCoatTintParams;
uniform float clearCoatColorAtDistance;
#ifdef CLEARCOAT_TINT_TEXTURE
uniform vec2 vClearCoatTintInfos;
uniform mat4 clearCoatTintMatrix;
#endif
#endif
#endif
#ifdef IRIDESCENCE
uniform vec4 vIridescenceParams;
#if defined(IRIDESCENCE_TEXTURE) || defined(IRIDESCENCE_THICKNESS_TEXTURE)
uniform vec4 vIridescenceInfos;
#endif
#ifdef IRIDESCENCE_TEXTURE
uniform mat4 iridescenceMatrix;
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
uniform mat4 iridescenceThicknessMatrix;
#endif
#endif
#ifdef ANISOTROPIC
uniform vec3 vAnisotropy;
#ifdef ANISOTROPIC_TEXTURE
uniform vec2 vAnisotropyInfos;
uniform mat4 anisotropyMatrix;
#endif
#endif
#ifdef SHEEN
uniform vec4 vSheenColor;
#ifdef SHEEN_ROUGHNESS
uniform float vSheenRoughness;
#endif
#if defined(SHEEN_TEXTURE) || defined(SHEEN_TEXTURE_ROUGHNESS)
uniform vec4 vSheenInfos;
#endif
#ifdef SHEEN_TEXTURE
uniform mat4 sheenMatrix;
#endif
#ifdef SHEEN_TEXTURE_ROUGHNESS
uniform mat4 sheenRoughnessMatrix;
#endif
#endif
#ifdef SUBSURFACE
#ifdef SS_REFRACTION
uniform vec4 vRefractionMicrosurfaceInfos;
uniform vec4 vRefractionInfos;
uniform mat4 refractionMatrix;
#ifdef REALTIME_FILTERING
uniform vec2 vRefractionFilteringInfo;
#endif
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
uniform vec2 vThicknessInfos;
uniform mat4 thicknessMatrix;
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
uniform vec2 vRefractionIntensityInfos;
uniform mat4 refractionIntensityMatrix;
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
uniform vec2 vTranslucencyIntensityInfos;
uniform mat4 translucencyIntensityMatrix;
#endif
uniform vec2 vThicknessParam;
uniform vec3 vDiffusionDistance;
uniform vec4 vTintColor;
uniform vec3 vSubSurfaceIntensity;
#endif
#ifdef PREPASS
#ifdef SS_SCATTERING
uniform float scatteringDiffusionProfile;
#endif
#endif
#if DEBUGMODE>0
uniform vec2 vDebugMode;
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
uniform vec3 vSphericalL00;
uniform vec3 vSphericalL1_1;
uniform vec3 vSphericalL10;
uniform vec3 vSphericalL11;
uniform vec3 vSphericalL2_2;
uniform vec3 vSphericalL2_1;
uniform vec3 vSphericalL20;
uniform vec3 vSphericalL21;
uniform vec3 vSphericalL22;
#else
uniform vec3 vSphericalX;
uniform vec3 vSphericalY;
uniform vec3 vSphericalZ;
uniform vec3 vSphericalXX_ZZ;
uniform vec3 vSphericalYY_ZZ;
uniform vec3 vSphericalZZ;
uniform vec3 vSphericalXY;
uniform vec3 vSphericalYZ;
uniform vec3 vSphericalZX;
#endif
#endif
#define ADDITIONAL_FRAGMENT_DECLARATION
`;k.IncludesShadersStore[or]=lr;const cr="pbrUboDeclaration",fr=`layout(std140,column_major) uniform;
uniform Material {
vec2 vAlbedoInfos;
vec4 vAmbientInfos;
vec2 vOpacityInfos;
vec2 vEmissiveInfos;
vec2 vLightmapInfos;
vec3 vReflectivityInfos;
vec2 vMicroSurfaceSamplerInfos;
vec2 vReflectionInfos;
vec2 vReflectionFilteringInfo;
vec3 vReflectionPosition;
vec3 vReflectionSize;
vec3 vBumpInfos;
mat4 albedoMatrix;
mat4 ambientMatrix;
mat4 opacityMatrix;
mat4 emissiveMatrix;
mat4 lightmapMatrix;
mat4 reflectivityMatrix;
mat4 microSurfaceSamplerMatrix;
mat4 bumpMatrix;
vec2 vTangentSpaceParams;
mat4 reflectionMatrix;
vec3 vReflectionColor;
vec4 vAlbedoColor;
vec4 vLightingIntensity;
vec3 vReflectionMicrosurfaceInfos;
float pointSize;
vec4 vReflectivityColor;
vec3 vEmissiveColor;
vec3 vAmbientColor;
vec2 vDebugMode;
vec4 vMetallicReflectanceFactors;
vec2 vMetallicReflectanceInfos;
mat4 metallicReflectanceMatrix;
vec2 vReflectanceInfos;
mat4 reflectanceMatrix;
vec3 vSphericalL00;
vec3 vSphericalL1_1;
vec3 vSphericalL10;
vec3 vSphericalL11;
vec3 vSphericalL2_2;
vec3 vSphericalL2_1;
vec3 vSphericalL20;
vec3 vSphericalL21;
vec3 vSphericalL22;
vec3 vSphericalX;
vec3 vSphericalY;
vec3 vSphericalZ;
vec3 vSphericalXX_ZZ;
vec3 vSphericalYY_ZZ;
vec3 vSphericalZZ;
vec3 vSphericalXY;
vec3 vSphericalYZ;
vec3 vSphericalZX;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;k.IncludesShadersStore[cr]=fr;const hr="pbrFragmentExtraDeclaration",ur=`varying vec3 vPositionW;
#if DEBUGMODE>0
varying vec4 vClipSpacePosition;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#ifdef NORMAL
varying vec3 vNormalW;
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
varying vec3 vEnvironmentIrradiance;
#endif
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
`;k.IncludesShadersStore[hr]=ur;const dr="samplerFragmentAlternateDeclaration",_r=`#ifdef _DEFINENAME_
#if _DEFINENAME_DIRECTUV==1
#define v_VARYINGNAME_UV vMainUV1
#elif _DEFINENAME_DIRECTUV==2
#define v_VARYINGNAME_UV vMainUV2
#elif _DEFINENAME_DIRECTUV==3
#define v_VARYINGNAME_UV vMainUV3
#elif _DEFINENAME_DIRECTUV==4
#define v_VARYINGNAME_UV vMainUV4
#elif _DEFINENAME_DIRECTUV==5
#define v_VARYINGNAME_UV vMainUV5
#elif _DEFINENAME_DIRECTUV==6
#define v_VARYINGNAME_UV vMainUV6
#else
varying vec2 v_VARYINGNAME_UV;
#endif
#endif
`;k.IncludesShadersStore[dr]=_r;const Er="pbrFragmentSamplersDeclaration",mr=`#include<samplerFragmentDeclaration>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo,_SAMPLERNAME_,albedo)
#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_SAMPLERNAME_,ambient)
#include<samplerFragmentDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_SAMPLERNAME_,opacity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_SAMPLERNAME_,emissive)
#include<samplerFragmentDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_SAMPLERNAME_,lightmap)
#include<samplerFragmentDeclaration>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity,_SAMPLERNAME_,reflectivity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler,_SAMPLERNAME_,microSurface)
#include<samplerFragmentDeclaration>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance,_SAMPLERNAME_,metallicReflectance)
#include<samplerFragmentDeclaration>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance,_SAMPLERNAME_,reflectance)
#ifdef CLEARCOAT
#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat,_SAMPLERNAME_,clearCoat)
#include<samplerFragmentAlternateDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness)
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL)
uniform sampler2D clearCoatRoughnessSampler;
#endif
#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump,_SAMPLERNAME_,clearCoatBump)
#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint,_SAMPLERNAME_,clearCoatTint)
#endif
#ifdef IRIDESCENCE
#include<samplerFragmentDeclaration>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence,_SAMPLERNAME_,iridescence)
#include<samplerFragmentDeclaration>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness,_SAMPLERNAME_,iridescenceThickness)
#endif
#ifdef SHEEN
#include<samplerFragmentDeclaration>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen,_SAMPLERNAME_,sheen)
#include<samplerFragmentAlternateDeclaration>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness)
#if defined(SHEEN_ROUGHNESS) && defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL)
uniform sampler2D sheenRoughnessSampler;
#endif
#endif
#ifdef ANISOTROPIC
#include<samplerFragmentDeclaration>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy,_SAMPLERNAME_,anisotropy)
#endif
#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
#define sampleReflection(s,c) textureCube(s,c)
uniform samplerCube reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) textureCubeLodEXT(s,c,l)
#else
uniform samplerCube reflectionSamplerLow;
uniform samplerCube reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform samplerCube irradianceSampler;
#endif
#else
#define sampleReflection(s,c) texture2D(s,c)
uniform sampler2D reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) texture2DLodEXT(s,c,l)
#else
uniform sampler2D reflectionSamplerLow;
uniform sampler2D reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform sampler2D irradianceSampler;
#endif
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#endif
#ifdef ENVIRONMENTBRDF
uniform sampler2D environmentBrdfSampler;
#endif
#ifdef SUBSURFACE
#ifdef SS_REFRACTION
#ifdef SS_REFRACTIONMAP_3D
#define sampleRefraction(s,c) textureCube(s,c)
uniform samplerCube refractionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleRefractionLod(s,c,l) textureCubeLodEXT(s,c,l)
#else
uniform samplerCube refractionSamplerLow;
uniform samplerCube refractionSamplerHigh;
#endif
#else
#define sampleRefraction(s,c) texture2D(s,c)
uniform sampler2D refractionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleRefractionLod(s,c,l) texture2DLodEXT(s,c,l)
#else
uniform sampler2D refractionSamplerLow;
uniform sampler2D refractionSamplerHigh;
#endif
#endif
#endif
#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness,_SAMPLERNAME_,thickness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity,_SAMPLERNAME_,refractionIntensity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity,_SAMPLERNAME_,translucencyIntensity)
#endif
`;k.IncludesShadersStore[Er]=mr;const pr="subSurfaceScatteringFunctions",Ar=`bool testLightingForSSS(float diffusionProfile)
{
return diffusionProfile<1.;
}`;k.IncludesShadersStore[pr]=Ar;const Tr="importanceSampling",gr=`vec3 hemisphereCosSample(vec2 u) {
float phi=2.*PI*u.x;
float cosTheta2=1.-u.y;
float cosTheta=sqrt(cosTheta2);
float sinTheta=sqrt(1.-cosTheta2);
return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);
}
vec3 hemisphereImportanceSampleDggx(vec2 u,float a) {
float phi=2.*PI*u.x;
float cosTheta2=(1.-u.y)/(1.+(a+1.)*((a-1.)*u.y));
float cosTheta=sqrt(cosTheta2);
float sinTheta=sqrt(1.-cosTheta2);
return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);
}
vec3 hemisphereImportanceSampleDCharlie(vec2 u,float a) { 
float phi=2.*PI*u.x;
float sinTheta=pow(u.y,a/(2.*a+1.));
float cosTheta=sqrt(1.-sinTheta*sinTheta);
return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);
}`;k.IncludesShadersStore[Tr]=gr;const Rr="pbrHelperFunctions",Cr=`#define RECIPROCAL_PI2 0.15915494
#define RECIPROCAL_PI 0.31830988618
#define MINIMUMVARIANCE 0.0005
float convertRoughnessToAverageSlope(float roughness)
{
return square(roughness)+MINIMUMVARIANCE;
}
float fresnelGrazingReflectance(float reflectance0) {
float reflectance90=saturate(reflectance0*25.0);
return reflectance90;
}
vec2 getAARoughnessFactors(vec3 normalVector) {
#ifdef SPECULARAA
vec3 nDfdx=dFdx(normalVector.xyz);
vec3 nDfdy=dFdy(normalVector.xyz);
float slopeSquare=max(dot(nDfdx,nDfdx),dot(nDfdy,nDfdy));
float geometricRoughnessFactor=pow(saturate(slopeSquare),0.333);
float geometricAlphaGFactor=sqrt(slopeSquare);
geometricAlphaGFactor*=0.75;
return vec2(geometricRoughnessFactor,geometricAlphaGFactor);
#else
return vec2(0.);
#endif
}
#ifdef ANISOTROPIC
vec2 getAnisotropicRoughness(float alphaG,float anisotropy) {
float alphaT=max(alphaG*(1.0+anisotropy),MINIMUMVARIANCE);
float alphaB=max(alphaG*(1.0-anisotropy),MINIMUMVARIANCE);
return vec2(alphaT,alphaB);
}
vec3 getAnisotropicBentNormals(const vec3 T,const vec3 B,const vec3 N,const vec3 V,float anisotropy) {
vec3 anisotropicFrameDirection=anisotropy>=0.0 ? B : T;
vec3 anisotropicFrameTangent=cross(normalize(anisotropicFrameDirection),V);
vec3 anisotropicFrameNormal=cross(anisotropicFrameTangent,anisotropicFrameDirection);
vec3 anisotropicNormal=normalize(mix(N,anisotropicFrameNormal,abs(anisotropy)));
return anisotropicNormal;
}
#endif
#if defined(CLEARCOAT) || defined(SS_REFRACTION)
vec3 cocaLambert(vec3 alpha,float distance) {
return exp(-alpha*distance);
}
vec3 cocaLambert(float NdotVRefract,float NdotLRefract,vec3 alpha,float thickness) {
return cocaLambert(alpha,(thickness*((NdotLRefract+NdotVRefract)/(NdotLRefract*NdotVRefract))));
}
vec3 computeColorAtDistanceInMedia(vec3 color,float distance) {
return -log(color)/distance;
}
vec3 computeClearCoatAbsorption(float NdotVRefract,float NdotLRefract,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {
vec3 clearCoatAbsorption=mix(vec3(1.0),
cocaLambert(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness),
clearCoatIntensity);
return clearCoatAbsorption;
}
#endif
#ifdef MICROSURFACEAUTOMATIC
float computeDefaultMicroSurface(float microSurface,vec3 reflectivityColor)
{
const float kReflectivityNoAlphaWorkflow_SmoothnessMax=0.95;
float reflectivityLuminance=getLuminance(reflectivityColor);
float reflectivityLuma=sqrt(reflectivityLuminance);
microSurface=reflectivityLuma*kReflectivityNoAlphaWorkflow_SmoothnessMax;
return microSurface;
}
#endif
`;k.IncludesShadersStore[Rr]=Cr;const Sr="harmonicsFunctions",Ir=`#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
vec3 computeEnvironmentIrradiance(vec3 normal) {
return vSphericalL00
+ vSphericalL1_1*(normal.y)
+ vSphericalL10*(normal.z)
+ vSphericalL11*(normal.x)
+ vSphericalL2_2*(normal.y*normal.x)
+ vSphericalL2_1*(normal.y*normal.z)
+ vSphericalL20*((3.0*normal.z*normal.z)-1.0)
+ vSphericalL21*(normal.z*normal.x)
+ vSphericalL22*(normal.x*normal.x-(normal.y*normal.y));
}
#else
vec3 computeEnvironmentIrradiance(vec3 normal) {
float Nx=normal.x;
float Ny=normal.y;
float Nz=normal.z;
vec3 C1=vSphericalZZ.rgb;
vec3 Cx=vSphericalX.rgb;
vec3 Cy=vSphericalY.rgb;
vec3 Cz=vSphericalZ.rgb;
vec3 Cxx_zz=vSphericalXX_ZZ.rgb;
vec3 Cyy_zz=vSphericalYY_ZZ.rgb;
vec3 Cxy=vSphericalXY.rgb;
vec3 Cyz=vSphericalYZ.rgb;
vec3 Czx=vSphericalZX.rgb;
vec3 a1=Cyy_zz*Ny+Cy;
vec3 a2=Cyz*Nz+a1;
vec3 b1=Czx*Nz+Cx;
vec3 b2=Cxy*Ny+b1;
vec3 b3=Cxx_zz*Nx+b2;
vec3 t1=Cz *Nz+C1;
vec3 t2=a2 *Ny+t1;
vec3 t3=b3 *Nx+t2;
return t3;
}
#endif
#endif
`;k.IncludesShadersStore[Sr]=Ir;const vr="pbrDirectLightingSetupFunctions",xr=`struct preLightingInfo
{
vec3 lightOffset;
float lightDistanceSquared;
float lightDistance;
float attenuation;
vec3 L;
vec3 H;
float NdotV;
float NdotLUnclamped;
float NdotL;
float VdotH;
float roughness;
#ifdef IRIDESCENCE
float iridescenceIntensity;
#endif
};
preLightingInfo computePointAndSpotPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;
result.lightOffset=lightData.xyz-vPositionW;
result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);
result.lightDistance=sqrt(result.lightDistanceSquared);
result.L=normalize(result.lightOffset);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
result.NdotLUnclamped=dot(N,result.L);
result.NdotL=saturateEps(result.NdotLUnclamped);
return result;
}
preLightingInfo computeDirectionalPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;
result.lightDistance=length(-lightData.xyz);
result.L=normalize(-lightData.xyz);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
result.NdotLUnclamped=dot(N,result.L);
result.NdotL=saturateEps(result.NdotLUnclamped);
return result;
}
preLightingInfo computeHemisphericPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;
result.NdotL=dot(N,lightData.xyz)*0.5+0.5;
result.NdotL=saturateEps(result.NdotL);
result.NdotLUnclamped=result.NdotL;
#ifdef SPECULARTERM
result.L=normalize(lightData.xyz);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
#endif
return result;
}`;k.IncludesShadersStore[vr]=xr;const Mr="pbrDirectLightingFalloffFunctions",Nr=`float computeDistanceLightFalloff_Standard(vec3 lightOffset,float range)
{
return max(0.,1.0-length(lightOffset)/range);
}
float computeDistanceLightFalloff_Physical(float lightDistanceSquared)
{
return 1.0/maxEps(lightDistanceSquared);
}
float computeDistanceLightFalloff_GLTF(float lightDistanceSquared,float inverseSquaredRange)
{
float lightDistanceFalloff=1.0/maxEps(lightDistanceSquared);
float factor=lightDistanceSquared*inverseSquaredRange;
float attenuation=saturate(1.0-factor*factor);
attenuation*=attenuation;
lightDistanceFalloff*=attenuation;
return lightDistanceFalloff;
}
float computeDistanceLightFalloff(vec3 lightOffset,float lightDistanceSquared,float range,float inverseSquaredRange)
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDistanceLightFalloff_Physical(lightDistanceSquared);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDistanceLightFalloff_GLTF(lightDistanceSquared,inverseSquaredRange);
#else
return computeDistanceLightFalloff_Standard(lightOffset,range);
#endif
}
float computeDirectionalLightFalloff_Standard(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent)
{
float falloff=0.0;
float cosAngle=maxEps(dot(-lightDirection,directionToLightCenterW));
if (cosAngle>=cosHalfAngle)
{
falloff=max(0.,pow(cosAngle,exponent));
}
return falloff;
}
float computeDirectionalLightFalloff_Physical(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle)
{
const float kMinusLog2ConeAngleIntensityRatio=6.64385618977; 
float concentrationKappa=kMinusLog2ConeAngleIntensityRatio/(1.0-cosHalfAngle);
vec4 lightDirectionSpreadSG=vec4(-lightDirection*concentrationKappa,-concentrationKappa);
float falloff=exp2(dot(vec4(directionToLightCenterW,1.0),lightDirectionSpreadSG));
return falloff;
}
float computeDirectionalLightFalloff_GLTF(vec3 lightDirection,vec3 directionToLightCenterW,float lightAngleScale,float lightAngleOffset)
{
float cd=dot(-lightDirection,directionToLightCenterW);
float falloff=saturate(cd*lightAngleScale+lightAngleOffset);
falloff*=falloff;
return falloff;
}
float computeDirectionalLightFalloff(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent,float lightAngleScale,float lightAngleOffset)
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDirectionalLightFalloff_Physical(lightDirection,directionToLightCenterW,cosHalfAngle);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDirectionalLightFalloff_GLTF(lightDirection,directionToLightCenterW,lightAngleScale,lightAngleOffset);
#else
return computeDirectionalLightFalloff_Standard(lightDirection,directionToLightCenterW,cosHalfAngle,exponent);
#endif
}`;k.IncludesShadersStore[Mr]=Nr;const Or="pbrBRDFFunctions",yr=`#define FRESNEL_MAXIMUM_ON_ROUGH 0.25
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 getEnergyConservationFactor(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
return 1.0+specularEnvironmentR0*(1.0/environmentBrdf.y-1.0);
}
#endif
#ifdef ENVIRONMENTBRDF
vec3 getBRDFLookup(float NdotV,float perceptualRoughness) {
vec2 UV=vec2(NdotV,perceptualRoughness);
vec4 brdfLookup=texture2D(environmentBrdfSampler,UV);
#ifdef ENVIRONMENTBRDF_RGBD
brdfLookup.rgb=fromRGBD(brdfLookup.rgba);
#endif
return brdfLookup.rgb;
}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 specularEnvironmentR90,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=(specularEnvironmentR90-specularEnvironmentR0)*environmentBrdf.x+specularEnvironmentR0*environmentBrdf.y;
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+specularEnvironmentR90*environmentBrdf.y;
#endif
return reflectance;
}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=mix(environmentBrdf.xxx,environmentBrdf.yyy,specularEnvironmentR0);
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+environmentBrdf.y;
#endif
return reflectance;
}
#endif
/* NOT USED
#if defined(SHEEN) && defined(SHEEN_SOFTER)
float getBRDFLookupCharlieSheen(float NdotV,float perceptualRoughness)
{
float c=1.0-NdotV;
float c3=c*c*c;
return 0.65584461*c3+1.0/(4.16526551+exp(-7.97291361*perceptualRoughness+6.33516894));
}
#endif
*/
#if !defined(ENVIRONMENTBRDF) || defined(REFLECTIONMAP_SKYBOX) || defined(ALPHAFRESNEL)
vec3 getReflectanceFromAnalyticalBRDFLookup_Jones(float VdotN,vec3 reflectance0,vec3 reflectance90,float smoothness)
{
float weight=mix(FRESNEL_MAXIMUM_ON_ROUGH,1.0,smoothness);
return reflectance0+weight*(reflectance90-reflectance0)*pow5(saturate(1.0-VdotN));
}
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
/**
* The sheen BRDF not containing F can be easily stored in the blue channel of the BRDF texture.
* The blue channel contains DCharlie*VAshikhmin*NdotL as a lokkup table
*/
vec3 getSheenReflectanceFromBRDFLookup(const vec3 reflectance0,const vec3 environmentBrdf) {
vec3 sheenEnvironmentReflectance=reflectance0*environmentBrdf.b;
return sheenEnvironmentReflectance;
}
#endif
vec3 fresnelSchlickGGX(float VdotH,vec3 reflectance0,vec3 reflectance90)
{
return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);
}
float fresnelSchlickGGX(float VdotH,float reflectance0,float reflectance90)
{
return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);
}
#ifdef CLEARCOAT
vec3 getR0RemappedForClearCoat(vec3 f0) {
#ifdef CLEARCOAT_DEFAULTIOR
#ifdef MOBILE
return saturate(f0*(f0*0.526868+0.529324)-0.0482256);
#else
return saturate(f0*(f0*(0.941892-0.263008*f0)+0.346479)-0.0285998);
#endif
#else
vec3 s=sqrt(f0);
vec3 t=(vClearCoatRefractionParams.z+vClearCoatRefractionParams.w*s)/(vClearCoatRefractionParams.w+vClearCoatRefractionParams.z*s);
return square(t);
#endif
}
#endif
#ifdef IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(
3.2404542,-0.9692660, 0.0556434,
-1.5371385, 1.8760108,-0.2040259,
-0.4985314, 0.0415560, 1.0572252
);
vec3 getIORTfromAirToSurfaceR0(vec3 f0) {
vec3 sqrtF0=sqrt(f0);
return (1.+sqrtF0)/(1.-sqrtF0);
}
vec3 getR0fromIORs(vec3 iorT,float iorI) {
return square((iorT-vec3(iorI))/(iorT+vec3(iorI)));
}
float getR0fromIORs(float iorT,float iorI) {
return square((iorT-iorI)/(iorT+iorI));
}
vec3 evalSensitivity(float opd,vec3 shift) {
float phase=2.0*PI*opd*1.0e-9;
const vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);
const vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);
const vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);
vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-square(phase)*var);
xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*square(phase));
xyz/=1.0685e-7;
vec3 srgb=XYZ_TO_REC709*xyz;
return srgb;
}
vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0) {
vec3 I=vec3(1.0);
float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));
float sinTheta2Sq=square(outsideIOR/iridescenceIOR)*(1.0-square(cosTheta1));
float cosTheta2Sq=1.0-sinTheta2Sq;
if (cosTheta2Sq<0.0) {
return I;
}
float cosTheta2=sqrt(cosTheta2Sq);
float R0=getR0fromIORs(iridescenceIOR,outsideIOR);
float R12=fresnelSchlickGGX(cosTheta1,R0,1.);
float R21=R12;
float T121=1.0-R12;
float phi12=0.0;
if (iridescenceIOR<outsideIOR) phi12=PI;
float phi21=PI-phi12;
vec3 baseIOR=getIORTfromAirToSurfaceR0(clamp(baseF0,0.0,0.9999)); 
vec3 R1=getR0fromIORs(baseIOR,iridescenceIOR);
vec3 R23=fresnelSchlickGGX(cosTheta2,R1,vec3(1.));
vec3 phi23=vec3(0.0);
if (baseIOR[0]<iridescenceIOR) phi23[0]=PI;
if (baseIOR[1]<iridescenceIOR) phi23[1]=PI;
if (baseIOR[2]<iridescenceIOR) phi23[2]=PI;
float opd=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;
vec3 phi=vec3(phi21)+phi23;
vec3 R123=clamp(R12*R23,1e-5,0.9999);
vec3 r123=sqrt(R123);
vec3 Rs=square(T121)*R23/(vec3(1.0)-R123);
vec3 C0=R12+Rs;
I=C0;
vec3 Cm=Rs-T121;
for (int m=1; m<=2; ++m)
{
Cm*=r123;
vec3 Sm=2.0*evalSensitivity(float(m)*opd,float(m)*phi);
I+=Cm*Sm;
}
return max(I,vec3(0.0));
}
#endif
float normalDistributionFunction_TrowbridgeReitzGGX(float NdotH,float alphaG)
{
float a2=square(alphaG);
float d=NdotH*NdotH*(a2-1.0)+1.0;
return a2/(PI*d*d);
}
#ifdef SHEEN
float normalDistributionFunction_CharlieSheen(float NdotH,float alphaG)
{
float invR=1./alphaG;
float cos2h=NdotH*NdotH;
float sin2h=1.-cos2h;
return (2.+invR)*pow(sin2h,invR*.5)/(2.*PI);
}
#endif
#ifdef ANISOTROPIC
float normalDistributionFunction_BurleyGGX_Anisotropic(float NdotH,float TdotH,float BdotH,const vec2 alphaTB) {
float a2=alphaTB.x*alphaTB.y;
vec3 v=vec3(alphaTB.y*TdotH,alphaTB.x *BdotH,a2*NdotH);
float v2=dot(v,v);
float w2=a2/v2;
return a2*w2*w2*RECIPROCAL_PI;
}
#endif
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility_GGXCorrelated(float NdotL,float NdotV,float alphaG) {
#ifdef MOBILE
float GGXV=NdotL*(NdotV*(1.0-alphaG)+alphaG);
float GGXL=NdotV*(NdotL*(1.0-alphaG)+alphaG);
return 0.5/(GGXV+GGXL);
#else
float a2=alphaG*alphaG;
float GGXV=NdotL*sqrt(NdotV*(NdotV-a2*NdotV)+a2);
float GGXL=NdotV*sqrt(NdotL*(NdotL-a2*NdotL)+a2);
return 0.5/(GGXV+GGXL);
#endif
}
#else
float smithVisibilityG1_TrowbridgeReitzGGXFast(float dot,float alphaG)
{
#ifdef MOBILE
return 1.0/(dot+alphaG+(1.0-alphaG)*dot ));
#else
float alphaSquared=alphaG*alphaG;
return 1.0/(dot+sqrt(alphaSquared+(1.0-alphaSquared)*dot*dot));
#endif
}
float smithVisibility_TrowbridgeReitzGGXFast(float NdotL,float NdotV,float alphaG)
{
float visibility=smithVisibilityG1_TrowbridgeReitzGGXFast(NdotL,alphaG)*smithVisibilityG1_TrowbridgeReitzGGXFast(NdotV,alphaG);
return visibility;
}
#endif
#ifdef ANISOTROPIC
float smithVisibility_GGXCorrelated_Anisotropic(float NdotL,float NdotV,float TdotV,float BdotV,float TdotL,float BdotL,const vec2 alphaTB) {
float lambdaV=NdotL*length(vec3(alphaTB.x*TdotV,alphaTB.y*BdotV,NdotV));
float lambdaL=NdotV*length(vec3(alphaTB.x*TdotL,alphaTB.y*BdotL,NdotL));
float v=0.5/(lambdaV+lambdaL);
return v;
}
#endif
#ifdef CLEARCOAT
float visibility_Kelemen(float VdotH) {
return 0.25/(VdotH*VdotH); 
}
#endif
#ifdef SHEEN
float visibility_Ashikhmin(float NdotL,float NdotV)
{
return 1./(4.*(NdotL+NdotV-NdotL*NdotV));
}
/* NOT USED
#ifdef SHEEN_SOFTER
float l(float x,float alphaG)
{
float oneMinusAlphaSq=(1.0-alphaG)*(1.0-alphaG);
float a=mix(21.5473,25.3245,oneMinusAlphaSq);
float b=mix(3.82987,3.32435,oneMinusAlphaSq);
float c=mix(0.19823,0.16801,oneMinusAlphaSq);
float d=mix(-1.97760,-1.27393,oneMinusAlphaSq);
float e=mix(-4.32054,-4.85967,oneMinusAlphaSq);
return a/(1.0+b*pow(x,c))+d*x+e;
}
float lambdaSheen(float cosTheta,float alphaG)
{
return abs(cosTheta)<0.5 ? exp(l(cosTheta,alphaG)) : exp(2.0*l(0.5,alphaG)-l(1.0-cosTheta,alphaG));
}
float visibility_CharlieSheen(float NdotL,float NdotV,float alphaG)
{
float G=1.0/(1.0+lambdaSheen(NdotV,alphaG)+lambdaSheen(NdotL,alphaG));
return G/(4.0*NdotV*NdotL);
}
#endif
*/
#endif
float diffuseBRDF_Burley(float NdotL,float NdotV,float VdotH,float roughness) {
float diffuseFresnelNV=pow5(saturateEps(1.0-NdotL));
float diffuseFresnelNL=pow5(saturateEps(1.0-NdotV));
float diffuseFresnel90=0.5+2.0*VdotH*VdotH*roughness;
float fresnel =
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNL) *
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNV);
return fresnel/PI;
}
#ifdef SS_TRANSLUCENCY
vec3 transmittanceBRDF_Burley(const vec3 tintColor,const vec3 diffusionDistance,float thickness) {
vec3 S=1./maxEps(diffusionDistance);
vec3 temp=exp((-0.333333333*thickness)*S);
return tintColor.rgb*0.25*(temp*temp*temp+3.0*temp);
}
float computeWrappedDiffuseNdotL(float NdotL,float w) {
float t=1.0+w;
float invt2=1.0/square(t);
return saturate((NdotL+w)*invt2);
}
#endif
`;k.IncludesShadersStore[Or]=yr;const br="hdrFilteringFunctions",Lr=`#ifdef NUM_SAMPLES
#if NUM_SAMPLES>0
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
float radicalInverse_VdC(uint bits) 
{
bits=(bits<<16u) | (bits>>16u);
bits=((bits & 0x55555555u)<<1u) | ((bits & 0xAAAAAAAAu)>>1u);
bits=((bits & 0x33333333u)<<2u) | ((bits & 0xCCCCCCCCu)>>2u);
bits=((bits & 0x0F0F0F0Fu)<<4u) | ((bits & 0xF0F0F0F0u)>>4u);
bits=((bits & 0x00FF00FFu)<<8u) | ((bits & 0xFF00FF00u)>>8u);
return float(bits)*2.3283064365386963e-10; 
}
vec2 hammersley(uint i,uint N)
{
return vec2(float(i)/float(N),radicalInverse_VdC(i));
}
#else
float vanDerCorpus(int n,int base)
{
float invBase=1.0/float(base);
float denom =1.0;
float result =0.0;
for(int i=0; i<32; ++i)
{
if(n>0)
{
denom =mod(float(n),2.0);
result+=denom*invBase;
invBase=invBase/2.0;
n =int(float(n)/2.0);
}
}
return result;
}
vec2 hammersley(int i,int N)
{
return vec2(float(i)/float(N),vanDerCorpus(i,2));
}
#endif
float log4(float x) {
return log2(x)/2.;
}
const float NUM_SAMPLES_FLOAT=float(NUM_SAMPLES);
const float NUM_SAMPLES_FLOAT_INVERSED=1./NUM_SAMPLES_FLOAT;
const float K=4.;
#define inline
vec3 irradiance(samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{
vec3 n=normalize(inputN);
vec3 result=vec3(0.0);
vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);
tangent=normalize(cross(tangent,n));
vec3 bitangent=cross(n,tangent);
mat3 tbn=mat3(tangent,bitangent,n);
float maxLevel=filteringInfo.y;
float dim0=filteringInfo.x;
float omegaP=(4.*PI)/(6.*dim0*dim0);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{
vec2 Xi=hammersley(i,NUM_SAMPLES);
vec3 Ls=hemisphereCosSample(Xi);
Ls=normalize(Ls);
vec3 Ns=vec3(0.,0.,1.);
float NoL=dot(Ns,Ls);
if (NoL>0.) {
float pdf_inversed=PI/NoL;
float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;
float l=log4(omegaS)-log4(omegaP)+log4(K);
float mipLevel=clamp(l,0.0,maxLevel);
vec3 c=textureCubeLodEXT(inputTexture,tbn*Ls,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c;
}
}
result=result*NUM_SAMPLES_FLOAT_INVERSED;
return result;
}
#define inline
vec3 radiance(float alphaG,samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{
vec3 n=normalize(inputN);
if (alphaG==0.) {
vec3 c=textureCube(inputTexture,n).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
return c;
} else {
vec3 result=vec3(0.);
vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);
tangent=normalize(cross(tangent,n));
vec3 bitangent=cross(n,tangent);
mat3 tbn=mat3(tangent,bitangent,n);
float maxLevel=filteringInfo.y;
float dim0=filteringInfo.x;
float omegaP=(4.*PI)/(6.*dim0*dim0);
float weight=0.;
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{
vec2 Xi=hammersley(i,NUM_SAMPLES);
vec3 H=hemisphereImportanceSampleDggx(Xi,alphaG);
float NoV=1.;
float NoH=H.z;
float NoH2=H.z*H.z;
float NoL=2.*NoH2-1.;
vec3 L=vec3(2.*NoH*H.x,2.*NoH*H.y,NoL);
L=normalize(L);
if (NoL>0.) {
float pdf_inversed=4./normalDistributionFunction_TrowbridgeReitzGGX(NoH,alphaG);
float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;
float l=log4(omegaS)-log4(omegaP)+log4(K);
float mipLevel=clamp(float(l),0.0,maxLevel);
weight+=NoL;
vec3 c=textureCubeLodEXT(inputTexture,tbn*L,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c*NoL;
}
}
result=result/weight;
return result;
}
}
#endif
#endif
`;k.IncludesShadersStore[br]=Lr;const Pr="pbrDirectLightingFunctions",Dr=`#define CLEARCOATREFLECTANCE90 1.0
struct lightingInfo
{
vec3 diffuse;
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef CLEARCOAT
vec4 clearCoat;
#endif
#ifdef SHEEN
vec3 sheen;
#endif
};
float adjustRoughnessFromLightProperties(float roughness,float lightRadius,float lightDistance) {
#if defined(USEPHYSICALLIGHTFALLOFF) || defined(USEGLTFLIGHTFALLOFF)
float lightRoughness=lightRadius/lightDistance;
float totalRoughness=saturate(lightRoughness+roughness);
return totalRoughness;
#else
return roughness;
#endif
}
vec3 computeHemisphericDiffuseLighting(preLightingInfo info,vec3 lightColor,vec3 groundColor) {
return mix(groundColor,lightColor,info.NdotL);
}
vec3 computeDiffuseLighting(preLightingInfo info,vec3 lightColor) {
float diffuseTerm=diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness);
return diffuseTerm*info.attenuation*info.NdotL*lightColor;
}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){
vec4 strq=textureProjectionMatrix*vec4(vPositionW,1.0);
strq/=strq.w;
vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;
return toLinearSpace(textureColor);
}
#ifdef SS_TRANSLUCENCY
vec3 computeDiffuseAndTransmittedLighting(preLightingInfo info,vec3 lightColor,vec3 transmittance) {
float NdotL=absEps(info.NdotLUnclamped);
float wrapNdotL=computeWrappedDiffuseNdotL(NdotL,0.02);
float trAdapt=step(0.,info.NdotLUnclamped);
vec3 transmittanceNdotL=mix(transmittance*wrapNdotL,vec3(wrapNdotL),trAdapt);
float diffuseTerm=diffuseBRDF_Burley(NdotL,info.NdotV,info.VdotH,info.roughness);
return diffuseTerm*transmittanceNdotL*info.attenuation*lightColor;
}
#endif
#ifdef SPECULARTERM
vec3 computeSpecularLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float roughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(roughness);
vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NdotH,alphaG);
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility=smithVisibility_GGXCorrelated(info.NdotL,info.NdotV,alphaG);
#else
float smithVisibility=smithVisibility_TrowbridgeReitzGGXFast(info.NdotL,info.NdotV,alphaG);
#endif
vec3 specTerm=fresnel*distribution*smithVisibility;
return specTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
#ifdef ANISOTROPIC
vec3 computeAnisotropicSpecularLighting(preLightingInfo info,vec3 V,vec3 N,vec3 T,vec3 B,float anisotropy,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float TdotH=dot(T,info.H);
float BdotH=dot(B,info.H);
float TdotV=dot(T,V);
float BdotV=dot(B,V);
float TdotL=dot(T,info.L);
float BdotL=dot(B,info.L);
float alphaG=convertRoughnessToAverageSlope(info.roughness);
vec2 alphaTB=getAnisotropicRoughness(alphaG,anisotropy);
alphaTB=max(alphaTB,square(geometricRoughnessFactor));
vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
float distribution=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);
float smithVisibility=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);
vec3 specTerm=fresnel*distribution*smithVisibility;
return specTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
#ifdef CLEARCOAT
vec4 computeClearCoatLighting(preLightingInfo info,vec3 Ncc,float geometricRoughnessFactor,float clearCoatIntensity,vec3 lightColor) {
float NccdotL=saturateEps(dot(Ncc,info.L));
float NccdotH=saturateEps(dot(Ncc,info.H));
float clearCoatRoughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(clearCoatRoughness);
float fresnel=fresnelSchlickGGX(info.VdotH,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);
fresnel*=clearCoatIntensity;
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NccdotH,alphaG);
float kelemenVisibility=visibility_Kelemen(info.VdotH);
float clearCoatTerm=fresnel*distribution*kelemenVisibility;
return vec4(
clearCoatTerm*info.attenuation*NccdotL*lightColor,
1.0-fresnel
);
}
vec3 computeClearCoatLightingAbsorption(float NdotVRefract,vec3 L,vec3 Ncc,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {
vec3 LRefract=-refract(L,Ncc,vClearCoatRefractionParams.y);
float NdotLRefract=saturateEps(dot(Ncc,LRefract));
vec3 absorption=computeClearCoatAbsorption(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness,clearCoatIntensity);
return absorption;
}
#endif
#ifdef SHEEN
vec3 computeSheenLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float roughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(roughness);
float fresnel=1.;
float distribution=normalDistributionFunction_CharlieSheen(NdotH,alphaG);
/*#ifdef SHEEN_SOFTER
float visibility=visibility_CharlieSheen(info.NdotL,info.NdotV,alphaG);
#else */
float visibility=visibility_Ashikhmin(info.NdotL,info.NdotV);
/* #endif */
float sheenTerm=fresnel*distribution*visibility;
return sheenTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
`;k.IncludesShadersStore[Pr]=Dr;const Fr="pbrIBLFunctions",Br=`#if defined(REFLECTION) || defined(SS_REFRACTION)
float getLodFromAlphaG(float cubeMapDimensionPixels,float microsurfaceAverageSlope) {
float microsurfaceAverageSlopeTexels=cubeMapDimensionPixels*microsurfaceAverageSlope;
float lod=log2(microsurfaceAverageSlopeTexels);
return lod;
}
float getLinearLodFromRoughness(float cubeMapDimensionPixels,float roughness) {
float lod=log2(cubeMapDimensionPixels)*roughness;
return lod;
}
#endif
#if defined(ENVIRONMENTBRDF) && defined(RADIANCEOCCLUSION)
float environmentRadianceOcclusion(float ambientOcclusion,float NdotVUnclamped) {
float temp=NdotVUnclamped+ambientOcclusion;
return saturate(square(temp)-1.0+ambientOcclusion);
}
#endif
#if defined(ENVIRONMENTBRDF) && defined(HORIZONOCCLUSION)
float environmentHorizonOcclusion(vec3 view,vec3 normal,vec3 geometricNormal) {
vec3 reflection=reflect(view,normal);
float temp=saturate(1.0+1.1*dot(reflection,geometricNormal));
return square(temp);
}
#endif
#if defined(LODINREFLECTIONALPHA) || defined(SS_LODINREFRACTIONALPHA)
#define UNPACK_LOD(x) (1.0-x)*255.0
float getLodFromAlphaG(float cubeMapDimensionPixels,float alphaG,float NdotV) {
float microsurfaceAverageSlope=alphaG;
microsurfaceAverageSlope*=sqrt(abs(NdotV));
return getLodFromAlphaG(cubeMapDimensionPixels,microsurfaceAverageSlope);
}
#endif
`;k.IncludesShadersStore[Fr]=Br;const Ur="pbrBlockAlbedoOpacity",wr=`struct albedoOpacityOutParams
{
vec3 surfaceAlbedo;
float alpha;
};
#define pbr_inline
void albedoOpacityBlock(
in vec4 vAlbedoColor,
#ifdef ALBEDO
in vec4 albedoTexture,
in vec2 albedoInfos,
#endif
#ifdef OPACITY
in vec4 opacityMap,
in vec2 vOpacityInfos,
#endif
#ifdef DETAIL
in vec4 detailColor,
in vec4 vDetailInfos,
#endif
out albedoOpacityOutParams outParams
)
{
vec3 surfaceAlbedo=vAlbedoColor.rgb;
float alpha=vAlbedoColor.a;
#ifdef ALBEDO
#if defined(ALPHAFROMALBEDO) || defined(ALPHATEST)
alpha*=albedoTexture.a;
#endif
#ifdef GAMMAALBEDO
surfaceAlbedo*=toLinearSpace(albedoTexture.rgb);
#else
surfaceAlbedo*=albedoTexture.rgb;
#endif
surfaceAlbedo*=albedoInfos.y;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
surfaceAlbedo*=vColor.rgb;
#endif
#ifdef DETAIL
float detailAlbedo=2.0*mix(0.5,detailColor.r,vDetailInfos.y);
surfaceAlbedo.rgb=surfaceAlbedo.rgb*detailAlbedo*detailAlbedo; 
#endif
#define CUSTOM_FRAGMENT_UPDATE_ALBEDO
#ifdef OPACITY
#ifdef OPACITYRGB
alpha=getLuminance(opacityMap.rgb);
#else
alpha*=opacityMap.a;
#endif
alpha*=vOpacityInfos.y;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#if !defined(SS_LINKREFRACTIONTOTRANSPARENCY) && !defined(ALPHAFRESNEL)
#ifdef ALPHATEST
if (alpha<ALPHATESTVALUE)
discard;
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
#endif
outParams.surfaceAlbedo=surfaceAlbedo;
outParams.alpha=alpha;
}
`;k.IncludesShadersStore[Ur]=wr;const Gr="pbrBlockReflectivity",Vr=`struct reflectivityOutParams
{
float microSurface;
float roughness;
vec3 surfaceReflectivityColor;
#ifdef METALLICWORKFLOW
vec3 surfaceAlbedo;
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
vec3 ambientOcclusionColor;
#endif
#if DEBUGMODE>0
vec4 surfaceMetallicColorMap;
vec4 surfaceReflectivityColorMap;
vec2 metallicRoughness;
vec3 metallicF0;
#endif
};
#define pbr_inline
void reflectivityBlock(
in vec4 vReflectivityColor,
#ifdef METALLICWORKFLOW
in vec3 surfaceAlbedo,
in vec4 metallicReflectanceFactors,
#endif
#ifdef REFLECTIVITY
in vec3 reflectivityInfos,
in vec4 surfaceMetallicOrReflectivityColorMap,
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
in vec3 ambientOcclusionColorIn,
#endif
#ifdef MICROSURFACEMAP
in vec4 microSurfaceTexel,
#endif
#ifdef DETAIL
in vec4 detailColor,
in vec4 vDetailInfos,
#endif
out reflectivityOutParams outParams
)
{
float microSurface=vReflectivityColor.a;
vec3 surfaceReflectivityColor=vReflectivityColor.rgb;
#ifdef METALLICWORKFLOW
vec2 metallicRoughness=surfaceReflectivityColor.rg;
#ifdef REFLECTIVITY
#if DEBUGMODE>0
outParams.surfaceMetallicColorMap=surfaceMetallicOrReflectivityColorMap;
#endif
#ifdef AOSTOREINMETALMAPRED
vec3 aoStoreInMetalMap=vec3(surfaceMetallicOrReflectivityColorMap.r,surfaceMetallicOrReflectivityColorMap.r,surfaceMetallicOrReflectivityColorMap.r);
outParams.ambientOcclusionColor=mix(ambientOcclusionColorIn,aoStoreInMetalMap,reflectivityInfos.z);
#endif
#ifdef METALLNESSSTOREINMETALMAPBLUE
metallicRoughness.r*=surfaceMetallicOrReflectivityColorMap.b;
#else
metallicRoughness.r*=surfaceMetallicOrReflectivityColorMap.r;
#endif
#ifdef ROUGHNESSSTOREINMETALMAPALPHA
metallicRoughness.g*=surfaceMetallicOrReflectivityColorMap.a;
#else
#ifdef ROUGHNESSSTOREINMETALMAPGREEN
metallicRoughness.g*=surfaceMetallicOrReflectivityColorMap.g;
#endif
#endif
#endif
#ifdef DETAIL
float detailRoughness=mix(0.5,detailColor.b,vDetailInfos.w);
float loLerp=mix(0.,metallicRoughness.g,detailRoughness*2.);
float hiLerp=mix(metallicRoughness.g,1.,(detailRoughness-0.5)*2.);
metallicRoughness.g=mix(loLerp,hiLerp,step(detailRoughness,0.5));
#endif
#ifdef MICROSURFACEMAP
metallicRoughness.g*=microSurfaceTexel.r;
#endif
#if DEBUGMODE>0
outParams.metallicRoughness=metallicRoughness;
#endif
#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS
microSurface=1.0-metallicRoughness.g;
vec3 baseColor=surfaceAlbedo;
#ifdef FROSTBITE_REFLECTANCE
outParams.surfaceAlbedo=baseColor.rgb*(1.0-metallicRoughness.r);
surfaceReflectivityColor=mix(0.16*reflectance*reflectance,baseColor,metallicRoughness.r);
#else
vec3 metallicF0=metallicReflectanceFactors.rgb;
#if DEBUGMODE>0
outParams.metallicF0=metallicF0;
#endif
outParams.surfaceAlbedo=mix(baseColor.rgb*(1.0-metallicF0),vec3(0.,0.,0.),metallicRoughness.r);
surfaceReflectivityColor=mix(metallicF0,baseColor,metallicRoughness.r);
#endif
#else
#ifdef REFLECTIVITY
surfaceReflectivityColor*=surfaceMetallicOrReflectivityColorMap.rgb;
#if DEBUGMODE>0
outParams.surfaceReflectivityColorMap=surfaceMetallicOrReflectivityColorMap;
#endif
#ifdef MICROSURFACEFROMREFLECTIVITYMAP
microSurface*=surfaceMetallicOrReflectivityColorMap.a;
microSurface*=reflectivityInfos.z;
#else
#ifdef MICROSURFACEAUTOMATIC
microSurface*=computeDefaultMicroSurface(microSurface,surfaceReflectivityColor);
#endif
#ifdef MICROSURFACEMAP
microSurface*=microSurfaceTexel.r;
#endif
#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE
#endif
#endif
#endif
microSurface=saturate(microSurface);
float roughness=1.-microSurface;
outParams.microSurface=microSurface;
outParams.roughness=roughness;
outParams.surfaceReflectivityColor=surfaceReflectivityColor;
}
`;k.IncludesShadersStore[Gr]=Vr;const Hr="pbrBlockAmbientOcclusion",kr=`struct ambientOcclusionOutParams
{
vec3 ambientOcclusionColor;
#if DEBUGMODE>0
vec3 ambientOcclusionColorMap;
#endif
};
#define pbr_inline
void ambientOcclusionBlock(
#ifdef AMBIENT
in vec3 ambientOcclusionColorMap_,
in vec4 vAmbientInfos,
#endif
out ambientOcclusionOutParams outParams
)
{
vec3 ambientOcclusionColor=vec3(1.,1.,1.);
#ifdef AMBIENT
vec3 ambientOcclusionColorMap=ambientOcclusionColorMap_*vAmbientInfos.y;
#ifdef AMBIENTINGRAYSCALE
ambientOcclusionColorMap=vec3(ambientOcclusionColorMap.r,ambientOcclusionColorMap.r,ambientOcclusionColorMap.r);
#endif
ambientOcclusionColor=mix(ambientOcclusionColor,ambientOcclusionColorMap,vAmbientInfos.z);
#if DEBUGMODE>0
outParams.ambientOcclusionColorMap=ambientOcclusionColorMap;
#endif
#endif
outParams.ambientOcclusionColor=ambientOcclusionColor;
}
`;k.IncludesShadersStore[Hr]=kr;const Xr="pbrBlockAlphaFresnel",Yr=`#ifdef ALPHAFRESNEL
#if defined(ALPHATEST) || defined(ALPHABLEND)
struct alphaFresnelOutParams
{
float alpha;
};
#define pbr_inline
void alphaFresnelBlock(
in vec3 normalW,
in vec3 viewDirectionW,
in float alpha,
in float microSurface,
out alphaFresnelOutParams outParams
)
{
float opacityPerceptual=alpha;
#ifdef LINEARALPHAFRESNEL
float opacity0=opacityPerceptual;
#else
float opacity0=opacityPerceptual*opacityPerceptual;
#endif
float opacity90=fresnelGrazingReflectance(opacity0);
vec3 normalForward=faceforward(normalW,-viewDirectionW,normalW);
outParams.alpha=getReflectanceFromAnalyticalBRDFLookup_Jones(saturate(dot(viewDirectionW,normalForward)),vec3(opacity0),vec3(opacity90),sqrt(microSurface)).x;
#ifdef ALPHATEST
if (outParams.alpha<ALPHATESTVALUE)
discard;
#ifndef ALPHABLEND
outParams.alpha=1.0;
#endif
#endif
}
#endif
#endif
`;k.IncludesShadersStore[Xr]=Yr;const zr="pbrBlockAnisotropic",Wr=`#ifdef ANISOTROPIC
struct anisotropicOutParams
{
float anisotropy;
vec3 anisotropicTangent;
vec3 anisotropicBitangent;
vec3 anisotropicNormal;
#if DEBUGMODE>0
vec3 anisotropyMapData;
#endif
};
#define pbr_inline
void anisotropicBlock(
in vec3 vAnisotropy,
#ifdef ANISOTROPIC_TEXTURE
in vec3 anisotropyMapData,
#endif
in mat3 TBN,
in vec3 normalW,
in vec3 viewDirectionW,
out anisotropicOutParams outParams
)
{
float anisotropy=vAnisotropy.b;
vec3 anisotropyDirection=vec3(vAnisotropy.xy,0.);
#ifdef ANISOTROPIC_TEXTURE
anisotropy*=anisotropyMapData.b;
anisotropyDirection.rg*=anisotropyMapData.rg*2.0-1.0;
#if DEBUGMODE>0
outParams.anisotropyMapData=anisotropyMapData;
#endif
#endif
mat3 anisoTBN=mat3(normalize(TBN[0]),normalize(TBN[1]),normalize(TBN[2]));
vec3 anisotropicTangent=normalize(anisoTBN*anisotropyDirection);
vec3 anisotropicBitangent=normalize(cross(anisoTBN[2],anisotropicTangent));
outParams.anisotropy=anisotropy;
outParams.anisotropicTangent=anisotropicTangent;
outParams.anisotropicBitangent=anisotropicBitangent;
outParams.anisotropicNormal=getAnisotropicBentNormals(anisotropicTangent,anisotropicBitangent,normalW,viewDirectionW,anisotropy);
}
#endif
`;k.IncludesShadersStore[zr]=Wr;const Kr="pbrBlockReflection",Qr=`#ifdef REFLECTION
struct reflectionOutParams
{
vec4 environmentRadiance;
vec3 environmentIrradiance;
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords;
#else
vec2 reflectionCoords;
#endif
#ifdef SS_TRANSLUCENCY
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
vec3 irradianceVector;
#endif
#endif
#endif
};
#define pbr_inline
void createReflectionCoords(
in vec3 vPositionW,
in vec3 normalW,
#ifdef ANISOTROPIC
in anisotropicOutParams anisotropicOut,
#endif
#ifdef REFLECTIONMAP_3D
out vec3 reflectionCoords
#else
out vec2 reflectionCoords
#endif
)
{
#ifdef ANISOTROPIC
vec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),anisotropicOut.anisotropicNormal);
#else
vec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
reflectionCoords=reflectionVector;
#else
reflectionCoords=reflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
reflectionCoords/=reflectionVector.z;
#endif
reflectionCoords.y=1.0-reflectionCoords.y;
#endif
}
#define pbr_inline
#define inline
void sampleReflectionTexture(
in float alphaG,
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
in float NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
in float roughness,
#endif
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
const vec3 reflectionCoords,
#else
in sampler2D reflectionSampler,
const vec2 reflectionCoords,
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
out vec4 environmentRadiance
)
{
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
#ifdef LODBASEDMICROSFURACE
reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef LODINREFLECTIONALPHA
float automaticReflectionLOD=UNPACK_LOD(sampleReflection(reflectionSampler,reflectionCoords).a);
float requestedReflectionLOD=max(automaticReflectionLOD,reflectionLOD);
#else
float requestedReflectionLOD=reflectionLOD;
#endif
#ifdef REALTIME_FILTERING
environmentRadiance=vec4(radiance(alphaG,reflectionSampler,reflectionCoords,vReflectionFilteringInfo),1.0);
#else
environmentRadiance=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#endif
#else
float lodReflectionNormalized=saturate(reflectionLOD/log2(vReflectionMicrosurfaceInfos.x));
float lodReflectionNormalizedDoubled=lodReflectionNormalized*2.0;
vec4 environmentMid=sampleReflection(reflectionSampler,reflectionCoords);
if (lodReflectionNormalizedDoubled<1.0){
environmentRadiance=mix(
sampleReflection(reflectionSamplerHigh,reflectionCoords),
environmentMid,
lodReflectionNormalizedDoubled
);
} else {
environmentRadiance=mix(
environmentMid,
sampleReflection(reflectionSamplerLow,reflectionCoords),
lodReflectionNormalizedDoubled-1.0
);
}
#endif
#ifdef RGBDREFLECTION
environmentRadiance.rgb=fromRGBD(environmentRadiance);
#endif
#ifdef GAMMAREFLECTION
environmentRadiance.rgb=toLinearSpace(environmentRadiance.rgb);
#endif
environmentRadiance.rgb*=vReflectionInfos.x;
environmentRadiance.rgb*=vReflectionColor.rgb;
}
#define pbr_inline
#define inline
void reflectionBlock(
in vec3 vPositionW,
in vec3 normalW,
in float alphaG,
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
#ifdef ANISOTROPIC
in anisotropicOutParams anisotropicOut,
#endif
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
in float NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
in float roughness,
#endif
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
#else
in sampler2D reflectionSampler,
#endif
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
in vec3 vEnvironmentIrradiance,
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
in mat4 reflectionMatrix,
#endif
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
in samplerCube irradianceSampler,
#else
in sampler2D irradianceSampler,
#endif
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
out reflectionOutParams outParams
)
{
vec4 environmentRadiance=vec4(0.,0.,0.,0.);
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=vec3(0.);
#else
vec2 reflectionCoords=vec2(0.);
#endif
createReflectionCoords(
vPositionW,
normalW,
#ifdef ANISOTROPIC
anisotropicOut,
#endif
reflectionCoords
);
sampleReflectionTexture(
alphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
roughness,
#endif
#ifdef REFLECTIONMAP_3D
reflectionSampler,
reflectionCoords,
#else
reflectionSampler,
reflectionCoords,
#endif
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentRadiance
);
vec3 environmentIrradiance=vec3(0.,0.,0.);
#ifdef USESPHERICALFROMREFLECTIONMAP
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
environmentIrradiance=vEnvironmentIrradiance;
#else
#ifdef ANISOTROPIC
vec3 irradianceVector=vec3(reflectionMatrix*vec4(anisotropicOut.anisotropicNormal,0)).xyz;
#else
vec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#if defined(REALTIME_FILTERING)
environmentIrradiance=irradiance(reflectionSampler,irradianceVector,vReflectionFilteringInfo);
#else
environmentIrradiance=computeEnvironmentIrradiance(irradianceVector);
#endif
#ifdef SS_TRANSLUCENCY
outParams.irradianceVector=irradianceVector;
#endif
#endif
#elif defined(USEIRRADIANCEMAP)
vec4 environmentIrradiance4=sampleReflection(irradianceSampler,reflectionCoords);
environmentIrradiance=environmentIrradiance4.rgb;
#ifdef RGBDREFLECTION
environmentIrradiance.rgb=fromRGBD(environmentIrradiance4);
#endif
#ifdef GAMMAREFLECTION
environmentIrradiance.rgb=toLinearSpace(environmentIrradiance.rgb);
#endif
#endif
environmentIrradiance*=vReflectionColor.rgb;
outParams.environmentRadiance=environmentRadiance;
outParams.environmentIrradiance=environmentIrradiance;
outParams.reflectionCoords=reflectionCoords;
}
#endif
`;k.IncludesShadersStore[Kr]=Qr;const jr="pbrBlockSheen",qr=`#ifdef SHEEN
struct sheenOutParams
{
float sheenIntensity;
vec3 sheenColor;
float sheenRoughness;
#ifdef SHEEN_LINKWITHALBEDO
vec3 surfaceAlbedo;
#endif
#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
float sheenAlbedoScaling;
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
vec3 finalSheenRadianceScaled;
#endif
#if DEBUGMODE>0
vec4 sheenMapData;
vec3 sheenEnvironmentReflectance;
#endif
};
#define pbr_inline
#define inline
void sheenBlock(
in vec4 vSheenColor,
#ifdef SHEEN_ROUGHNESS
in float vSheenRoughness,
#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
in vec4 sheenMapRoughnessData,
#endif
#endif
in float roughness,
#ifdef SHEEN_TEXTURE
in vec4 sheenMapData,
in float sheenMapLevel,
#endif
in float reflectance,
#ifdef SHEEN_LINKWITHALBEDO
in vec3 baseColor,
in vec3 surfaceAlbedo,
#endif
#ifdef ENVIRONMENTBRDF
in float NdotV,
in vec3 environmentBrdf,
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
in vec2 AARoughnessFactors,
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
in vec4 vLightingIntensity,
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
in vec3 reflectionCoords,
#else
in sampler2D reflectionSampler,
in vec2 reflectionCoords,
#endif
in float NdotVUnclamped,
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
in float seo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
in float eho,
#endif
#endif
out sheenOutParams outParams
)
{
float sheenIntensity=vSheenColor.a;
#ifdef SHEEN_TEXTURE
#if DEBUGMODE>0
outParams.sheenMapData=sheenMapData;
#endif
#endif
#ifdef SHEEN_LINKWITHALBEDO
float sheenFactor=pow5(1.0-sheenIntensity);
vec3 sheenColor=baseColor.rgb*(1.0-sheenFactor);
float sheenRoughness=sheenIntensity;
outParams.surfaceAlbedo=surfaceAlbedo*sheenFactor;
#ifdef SHEEN_TEXTURE
sheenIntensity*=sheenMapData.a;
#endif
#else
vec3 sheenColor=vSheenColor.rgb;
#ifdef SHEEN_TEXTURE
#ifdef SHEEN_GAMMATEXTURE
sheenColor.rgb*=toLinearSpace(sheenMapData.rgb);
#else
sheenColor.rgb*=sheenMapData.rgb;
#endif
sheenColor.rgb*=sheenMapLevel;
#endif
#ifdef SHEEN_ROUGHNESS
float sheenRoughness=vSheenRoughness;
#ifdef SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE
#if defined(SHEEN_TEXTURE)
sheenRoughness*=sheenMapData.a;
#endif
#elif defined(SHEEN_TEXTURE_ROUGHNESS)
#ifdef SHEEN_TEXTURE_ROUGHNESS_IDENTICAL
sheenRoughness*=sheenMapData.a;
#else
sheenRoughness*=sheenMapRoughnessData.a;
#endif
#endif
#else
float sheenRoughness=roughness;
#ifdef SHEEN_TEXTURE
sheenIntensity*=sheenMapData.a;
#endif
#endif
#if !defined(SHEEN_ALBEDOSCALING)
sheenIntensity*=(1.-reflectance);
#endif
sheenColor*=sheenIntensity;
#endif
#ifdef ENVIRONMENTBRDF
/*#ifdef SHEEN_SOFTER
vec3 environmentSheenBrdf=vec3(0.,0.,getBRDFLookupCharlieSheen(NdotV,sheenRoughness));
#else*/
#ifdef SHEEN_ROUGHNESS
vec3 environmentSheenBrdf=getBRDFLookup(NdotV,sheenRoughness);
#else
vec3 environmentSheenBrdf=environmentBrdf;
#endif
/*#endif*/
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
float sheenAlphaG=convertRoughnessToAverageSlope(sheenRoughness);
#ifdef SPECULARAA
sheenAlphaG+=AARoughnessFactors.y;
#endif
vec4 environmentSheenRadiance=vec4(0.,0.,0.,0.);
sampleReflectionTexture(
sheenAlphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
sheenRoughness,
#endif
reflectionSampler,
reflectionCoords,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentSheenRadiance
);
vec3 sheenEnvironmentReflectance=getSheenReflectanceFromBRDFLookup(sheenColor,environmentSheenBrdf);
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
sheenEnvironmentReflectance*=seo;
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
sheenEnvironmentReflectance*=eho;
#endif
#if DEBUGMODE>0
outParams.sheenEnvironmentReflectance=sheenEnvironmentReflectance;
#endif
outParams.finalSheenRadianceScaled=
environmentSheenRadiance.rgb *
sheenEnvironmentReflectance *
vLightingIntensity.z;
#endif
#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
outParams.sheenAlbedoScaling=1.0-sheenIntensity*max(max(sheenColor.r,sheenColor.g),sheenColor.b)*environmentSheenBrdf.b;
#endif
outParams.sheenIntensity=sheenIntensity;
outParams.sheenColor=sheenColor;
outParams.sheenRoughness=sheenRoughness;
}
#endif
`;k.IncludesShadersStore[jr]=qr;const Zr="pbrBlockClearcoat",Jr=`struct clearcoatOutParams
{
vec3 specularEnvironmentR0;
float conservationFactor;
vec3 clearCoatNormalW;
vec2 clearCoatAARoughnessFactors;
float clearCoatIntensity;
float clearCoatRoughness;
#ifdef REFLECTION
vec3 finalClearCoatRadianceScaled;
#endif
#ifdef CLEARCOAT_TINT
vec3 absorption;
float clearCoatNdotVRefract;
vec3 clearCoatColor;
float clearCoatThickness;
#endif
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
vec3 energyConservationFactorClearCoat;
#endif
#if DEBUGMODE>0
mat3 TBNClearCoat;
vec2 clearCoatMapData;
vec4 clearCoatTintMapData;
vec4 environmentClearCoatRadiance;
float clearCoatNdotV;
vec3 clearCoatEnvironmentReflectance;
#endif
};
#ifdef CLEARCOAT
#define pbr_inline
#define inline
void clearcoatBlock(
in vec3 vPositionW,
in vec3 geometricNormalW,
in vec3 viewDirectionW,
in vec2 vClearCoatParams,
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
in vec4 clearCoatMapRoughnessData,
#endif
in vec3 specularEnvironmentR0,
#ifdef CLEARCOAT_TEXTURE
in vec2 clearCoatMapData,
#endif
#ifdef CLEARCOAT_TINT
in vec4 vClearCoatTintParams,
in float clearCoatColorAtDistance,
in vec4 vClearCoatRefractionParams,
#ifdef CLEARCOAT_TINT_TEXTURE
in vec4 clearCoatTintMapData,
#endif
#endif
#ifdef CLEARCOAT_BUMP
in vec2 vClearCoatBumpInfos,
in vec4 clearCoatBumpMapData,
in vec2 vClearCoatBumpUV,
#if defined(TANGENT) && defined(NORMAL)
in mat3 vTBN,
#else
in vec2 vClearCoatTangentSpaceParams,
#endif
#ifdef OBJECTSPACE_NORMALMAP
in mat4 normalMatrix,
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
in vec3 faceNormal,
#endif
#ifdef REFLECTION
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
in vec4 vLightingIntensity,
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
#else
in sampler2D reflectionSampler,
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
in float ambientMonochrome,
#endif
#endif
#if defined(CLEARCOAT_BUMP) || defined(TWOSIDEDLIGHTING)
in float frontFacingMultiplier,
#endif
out clearcoatOutParams outParams
)
{
float clearCoatIntensity=vClearCoatParams.x;
float clearCoatRoughness=vClearCoatParams.y;
#ifdef CLEARCOAT_TEXTURE
clearCoatIntensity*=clearCoatMapData.x;
#ifdef CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE
clearCoatRoughness*=clearCoatMapData.y;
#endif
#if DEBUGMODE>0
outParams.clearCoatMapData=clearCoatMapData;
#endif
#endif
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL
clearCoatRoughness*=clearCoatMapData.y;
#else
clearCoatRoughness*=clearCoatMapRoughnessData.y;
#endif
#endif
outParams.clearCoatIntensity=clearCoatIntensity;
outParams.clearCoatRoughness=clearCoatRoughness;
#ifdef CLEARCOAT_TINT
vec3 clearCoatColor=vClearCoatTintParams.rgb;
float clearCoatThickness=vClearCoatTintParams.a;
#ifdef CLEARCOAT_TINT_TEXTURE
#ifdef CLEARCOAT_TINT_GAMMATEXTURE
clearCoatColor*=toLinearSpace(clearCoatTintMapData.rgb);
#else
clearCoatColor*=clearCoatTintMapData.rgb;
#endif
clearCoatThickness*=clearCoatTintMapData.a;
#if DEBUGMODE>0
outParams.clearCoatTintMapData=clearCoatTintMapData;
#endif
#endif
outParams.clearCoatColor=computeColorAtDistanceInMedia(clearCoatColor,clearCoatColorAtDistance);
outParams.clearCoatThickness=clearCoatThickness;
#endif
#ifdef CLEARCOAT_REMAP_F0
vec3 specularEnvironmentR0Updated=getR0RemappedForClearCoat(specularEnvironmentR0);
#else
vec3 specularEnvironmentR0Updated=specularEnvironmentR0;
#endif
outParams.specularEnvironmentR0=mix(specularEnvironmentR0,specularEnvironmentR0Updated,clearCoatIntensity);
vec3 clearCoatNormalW=geometricNormalW;
#ifdef CLEARCOAT_BUMP
#ifdef NORMALXYSCALE
float clearCoatNormalScale=1.0;
#else
float clearCoatNormalScale=vClearCoatBumpInfos.y;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBNClearCoat=vTBN;
#else
vec2 TBNClearCoatUV=vClearCoatBumpUV*frontFacingMultiplier;
mat3 TBNClearCoat=cotangent_frame(clearCoatNormalW*clearCoatNormalScale,vPositionW,TBNClearCoatUV,vClearCoatTangentSpaceParams);
#endif
#if DEBUGMODE>0
outParams.TBNClearCoat=TBNClearCoat;
#endif
#ifdef OBJECTSPACE_NORMALMAP
clearCoatNormalW=normalize(clearCoatBumpMapData.xyz *2.0-1.0);
clearCoatNormalW=normalize(mat3(normalMatrix)*clearCoatNormalW);
#else
clearCoatNormalW=perturbNormal(TBNClearCoat,clearCoatBumpMapData.xyz,vClearCoatBumpInfos.y);
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
clearCoatNormalW*=sign(dot(clearCoatNormalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
clearCoatNormalW=clearCoatNormalW*frontFacingMultiplier;
#endif
outParams.clearCoatNormalW=clearCoatNormalW;
outParams.clearCoatAARoughnessFactors=getAARoughnessFactors(clearCoatNormalW.xyz);
float clearCoatNdotVUnclamped=dot(clearCoatNormalW,viewDirectionW);
float clearCoatNdotV=absEps(clearCoatNdotVUnclamped);
#if DEBUGMODE>0
outParams.clearCoatNdotV=clearCoatNdotV;
#endif
#ifdef CLEARCOAT_TINT
vec3 clearCoatVRefract=refract(-viewDirectionW,clearCoatNormalW,vClearCoatRefractionParams.y);
outParams.clearCoatNdotVRefract=absEps(dot(clearCoatNormalW,clearCoatVRefract));
#endif
#if defined(ENVIRONMENTBRDF) && (!defined(REFLECTIONMAP_SKYBOX) || defined(MS_BRDF_ENERGY_CONSERVATION))
vec3 environmentClearCoatBrdf=getBRDFLookup(clearCoatNdotV,clearCoatRoughness);
#endif
#if defined(REFLECTION)
float clearCoatAlphaG=convertRoughnessToAverageSlope(clearCoatRoughness);
#ifdef SPECULARAA
clearCoatAlphaG+=outParams.clearCoatAARoughnessFactors.y;
#endif
vec4 environmentClearCoatRadiance=vec4(0.,0.,0.,0.);
vec3 clearCoatReflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),clearCoatNormalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
clearCoatReflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
vec3 clearCoatReflectionCoords=clearCoatReflectionVector;
#else
vec2 clearCoatReflectionCoords=clearCoatReflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
clearCoatReflectionCoords/=clearCoatReflectionVector.z;
#endif
clearCoatReflectionCoords.y=1.0-clearCoatReflectionCoords.y;
#endif
sampleReflectionTexture(
clearCoatAlphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
clearCoatNdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
clearCoatRoughness,
#endif
reflectionSampler,
clearCoatReflectionCoords,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentClearCoatRadiance
);
#if DEBUGMODE>0
outParams.environmentClearCoatRadiance=environmentClearCoatRadiance;
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
vec3 clearCoatEnvironmentReflectance=getReflectanceFromBRDFLookup(vec3(vClearCoatRefractionParams.x),environmentClearCoatBrdf);
#ifdef RADIANCEOCCLUSION
float clearCoatSeo=environmentRadianceOcclusion(ambientMonochrome,clearCoatNdotVUnclamped);
clearCoatEnvironmentReflectance*=clearCoatSeo;
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
float clearCoatEho=environmentHorizonOcclusion(-viewDirectionW,clearCoatNormalW,geometricNormalW);
clearCoatEnvironmentReflectance*=clearCoatEho;
#endif
#endif
#endif
#else
vec3 clearCoatEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(clearCoatNdotV,vec3(1.),vec3(1.),sqrt(1.-clearCoatRoughness));
#endif
clearCoatEnvironmentReflectance*=clearCoatIntensity;
#if DEBUGMODE>0
outParams.clearCoatEnvironmentReflectance=clearCoatEnvironmentReflectance;
#endif
outParams.finalClearCoatRadianceScaled=
environmentClearCoatRadiance.rgb *
clearCoatEnvironmentReflectance *
vLightingIntensity.z;
#endif
#if defined(CLEARCOAT_TINT)
outParams.absorption=computeClearCoatAbsorption(outParams.clearCoatNdotVRefract,outParams.clearCoatNdotVRefract,outParams.clearCoatColor,clearCoatThickness,clearCoatIntensity);
#endif
float fresnelIBLClearCoat=fresnelSchlickGGX(clearCoatNdotV,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);
fresnelIBLClearCoat*=clearCoatIntensity;
outParams.conservationFactor=(1.-fresnelIBLClearCoat);
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
outParams.energyConservationFactorClearCoat=getEnergyConservationFactor(outParams.specularEnvironmentR0,environmentClearCoatBrdf);
#endif
}
#endif
`;k.IncludesShadersStore[Zr]=Jr;const $r="pbrBlockIridescence",ea=`struct iridescenceOutParams
{
float iridescenceIntensity;
float iridescenceIOR;
float iridescenceThickness;
vec3 specularEnvironmentR0;
};
#ifdef IRIDESCENCE
#define pbr_inline
#define inline
void iridescenceBlock(
in vec4 vIridescenceParams,
in float viewAngle,
in vec3 specularEnvironmentR0,
#ifdef IRIDESCENCE_TEXTURE
in vec2 iridescenceMapData,
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
in vec2 iridescenceThicknessMapData,
#endif
#ifdef CLEARCOAT
in float NdotVUnclamped,
#ifdef CLEARCOAT_TEXTURE
in vec2 clearCoatMapData,
#endif
#endif
out iridescenceOutParams outParams
)
{
float iridescenceIntensity=vIridescenceParams.x;
float iridescenceIOR=vIridescenceParams.y;
float iridescenceThicknessMin=vIridescenceParams.z;
float iridescenceThicknessMax=vIridescenceParams.w;
float iridescenceThicknessWeight=1.;
#ifdef IRIDESCENCE_TEXTURE
iridescenceIntensity*=iridescenceMapData.x;
#ifdef IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE
iridescenceThicknessWeight=iridescenceMapData.g;
#endif
#endif
#if defined(IRIDESCENCE_THICKNESS_TEXTURE)
iridescenceThicknessWeight=iridescenceThicknessMapData.g;
#endif
float iridescenceThickness=mix(iridescenceThicknessMin,iridescenceThicknessMax,iridescenceThicknessWeight);
float topIor=1.; 
#ifdef CLEARCOAT
float clearCoatIntensity=vClearCoatParams.x;
#ifdef CLEARCOAT_TEXTURE
clearCoatIntensity*=clearCoatMapData.x;
#endif
topIor=mix(1.0,vClearCoatRefractionParams.w-1.,clearCoatIntensity);
viewAngle=sqrt(1.0+square(1.0/topIor)*(square(NdotVUnclamped)-1.0));
#endif
vec3 iridescenceFresnel=evalIridescence(topIor,iridescenceIOR,viewAngle,iridescenceThickness,specularEnvironmentR0);
outParams.specularEnvironmentR0=mix(specularEnvironmentR0,iridescenceFresnel,iridescenceIntensity);
outParams.iridescenceIntensity=iridescenceIntensity;
outParams.iridescenceThickness=iridescenceThickness;
outParams.iridescenceIOR=iridescenceIOR;
}
#endif
`;k.IncludesShadersStore[$r]=ea;const ta="pbrBlockSubSurface",ia=`struct subSurfaceOutParams
{
vec3 specularEnvironmentReflectance;
#ifdef SS_REFRACTION
vec3 finalRefraction;
vec3 surfaceAlbedo;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
float alpha;
#endif
#ifdef REFLECTION
float refractionFactorForIrradiance;
#endif
#endif
#ifdef SS_TRANSLUCENCY
vec3 transmittance;
float translucencyIntensity;
#ifdef REFLECTION
vec3 refractionIrradiance;
#endif
#endif
#if DEBUGMODE>0
vec4 thicknessMap;
vec4 environmentRefraction;
vec3 refractionTransmittance;
#endif
};
#ifdef SUBSURFACE
#define pbr_inline
#define inline
void subSurfaceBlock(
in vec3 vSubSurfaceIntensity,
in vec2 vThicknessParam,
in vec4 vTintColor,
in vec3 normalW,
in vec3 specularEnvironmentReflectance,
#ifdef SS_THICKNESSANDMASK_TEXTURE
in vec4 thicknessMap,
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
in vec4 refractionIntensityMap,
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
in vec4 translucencyIntensityMap,
#endif
#ifdef REFLECTION
#ifdef SS_TRANSLUCENCY
in mat4 reflectionMatrix,
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
in vec3 irradianceVector_,
#endif
#if defined(REALTIME_FILTERING)
in samplerCube reflectionSampler,
in vec2 vReflectionFilteringInfo,
#endif
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
in samplerCube irradianceSampler,
#else
in sampler2D irradianceSampler,
#endif
#endif
#endif
#endif
#if defined(SS_REFRACTION) || defined(SS_TRANSLUCENCY)
in vec3 surfaceAlbedo,
#endif
#ifdef SS_REFRACTION
in vec3 vPositionW,
in vec3 viewDirectionW,
in mat4 view,
in vec4 vRefractionInfos,
in mat4 refractionMatrix,
in vec4 vRefractionMicrosurfaceInfos,
in vec4 vLightingIntensity,
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
in float alpha,
#endif
#ifdef SS_LODINREFRACTIONALPHA
in float NdotVUnclamped,
#endif
#ifdef SS_LINEARSPECULARREFRACTION
in float roughness,
#endif
in float alphaG,
#ifdef SS_REFRACTIONMAP_3D
in samplerCube refractionSampler,
#ifndef LODBASEDMICROSFURACE
in samplerCube refractionSamplerLow,
in samplerCube refractionSamplerHigh,
#endif
#else
in sampler2D refractionSampler,
#ifndef LODBASEDMICROSFURACE
in sampler2D refractionSamplerLow,
in sampler2D refractionSamplerHigh,
#endif
#endif
#ifdef ANISOTROPIC
in anisotropicOutParams anisotropicOut,
#endif
#ifdef REALTIME_FILTERING
in vec2 vRefractionFilteringInfo,
#endif
#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC
in vec3 refractionPosition,
in vec3 refractionSize,
#endif
#endif
#ifdef SS_TRANSLUCENCY
in vec3 vDiffusionDistance,
#endif
out subSurfaceOutParams outParams
)
{
outParams.specularEnvironmentReflectance=specularEnvironmentReflectance;
#ifdef SS_REFRACTION
float refractionIntensity=vSubSurfaceIntensity.x;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
refractionIntensity*=(1.0-alpha);
outParams.alpha=1.0;
#endif
#endif
#ifdef SS_TRANSLUCENCY
float translucencyIntensity=vSubSurfaceIntensity.y;
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
#if defined(SS_USE_GLTF_TEXTURES)
float thickness=thicknessMap.g*vThicknessParam.y+vThicknessParam.x;
#else
float thickness=thicknessMap.r*vThicknessParam.y+vThicknessParam.x;
#endif
#if DEBUGMODE>0
outParams.thicknessMap=thicknessMap;
#endif
#ifdef SS_MASK_FROM_THICKNESS_TEXTURE
#if defined(SS_REFRACTION) && defined(SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE)
#if defined(SS_USE_GLTF_TEXTURES)
refractionIntensity*=thicknessMap.r;
#else
refractionIntensity*=thicknessMap.g;
#endif
#endif
#if defined(SS_TRANSLUCENCY) && defined(SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE)
translucencyIntensity*=thicknessMap.b;
#endif
#endif
#else
float thickness=vThicknessParam.y;
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
#ifdef SS_USE_GLTF_TEXTURES
refractionIntensity*=refractionIntensityMap.r;
#else
refractionIntensity*=refractionIntensityMap.g;
#endif
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
translucencyIntensity*=translucencyIntensityMap.b;
#endif
#ifdef SS_TRANSLUCENCY
thickness=maxEps(thickness);
vec3 transmittance=transmittanceBRDF_Burley(vTintColor.rgb,vDiffusionDistance,thickness);
transmittance*=translucencyIntensity;
outParams.transmittance=transmittance;
outParams.translucencyIntensity=translucencyIntensity;
#endif
#ifdef SS_REFRACTION
vec4 environmentRefraction=vec4(0.,0.,0.,0.);
#ifdef ANISOTROPIC
vec3 refractionVector=refract(-viewDirectionW,anisotropicOut.anisotropicNormal,vRefractionInfos.y);
#else
vec3 refractionVector=refract(-viewDirectionW,normalW,vRefractionInfos.y);
#endif
#ifdef SS_REFRACTIONMAP_OPPOSITEZ
refractionVector.z*=-1.0;
#endif
#ifdef SS_REFRACTIONMAP_3D
#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC
refractionVector=parallaxCorrectNormal(vPositionW,refractionVector,refractionSize,refractionPosition);
#endif
refractionVector.y=refractionVector.y*vRefractionInfos.w;
vec3 refractionCoords=refractionVector;
refractionCoords=vec3(refractionMatrix*vec4(refractionCoords,0));
#else
#ifdef SS_USE_THICKNESS_AS_DEPTH
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*thickness,1.0)));
#else
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));
#endif
vec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;
refractionCoords.y=1.0-refractionCoords.y;
#endif
#ifdef SS_HAS_THICKNESS
float ior=vRefractionInfos.y;
#else
float ior=vRefractionMicrosurfaceInfos.w;
#endif
#ifdef SS_LODINREFRACTIONALPHA
float refractionAlphaG=alphaG;
refractionAlphaG=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));
float refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,refractionAlphaG,NdotVUnclamped);
#elif defined(SS_LINEARSPECULARREFRACTION)
float refractionRoughness=alphaG;
refractionRoughness=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));
float refractionLOD=getLinearLodFromRoughness(vRefractionMicrosurfaceInfos.x,refractionRoughness);
#else
float refractionAlphaG=alphaG;
refractionAlphaG=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));
float refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,refractionAlphaG);
#endif
#ifdef LODBASEDMICROSFURACE
refractionLOD=refractionLOD*vRefractionMicrosurfaceInfos.y+vRefractionMicrosurfaceInfos.z;
#ifdef SS_LODINREFRACTIONALPHA
float automaticRefractionLOD=UNPACK_LOD(sampleRefraction(refractionSampler,refractionCoords).a);
float requestedRefractionLOD=max(automaticRefractionLOD,refractionLOD);
#else
float requestedRefractionLOD=refractionLOD;
#endif
#ifdef REALTIME_FILTERING
environmentRefraction=vec4(radiance(alphaG,refractionSampler,refractionCoords,vRefractionFilteringInfo),1.0);
#else
environmentRefraction=sampleRefractionLod(refractionSampler,refractionCoords,requestedRefractionLOD);
#endif
#else
float lodRefractionNormalized=saturate(refractionLOD/log2(vRefractionMicrosurfaceInfos.x));
float lodRefractionNormalizedDoubled=lodRefractionNormalized*2.0;
vec4 environmentRefractionMid=sampleRefraction(refractionSampler,refractionCoords);
if (lodRefractionNormalizedDoubled<1.0){
environmentRefraction=mix(
sampleRefraction(refractionSamplerHigh,refractionCoords),
environmentRefractionMid,
lodRefractionNormalizedDoubled
);
} else {
environmentRefraction=mix(
environmentRefractionMid,
sampleRefraction(refractionSamplerLow,refractionCoords),
lodRefractionNormalizedDoubled-1.0
);
}
#endif
#ifdef SS_RGBDREFRACTION
environmentRefraction.rgb=fromRGBD(environmentRefraction);
#endif
#ifdef SS_GAMMAREFRACTION
environmentRefraction.rgb=toLinearSpace(environmentRefraction.rgb);
#endif
environmentRefraction.rgb*=vRefractionInfos.x;
#endif
#ifdef SS_REFRACTION
vec3 refractionTransmittance=vec3(refractionIntensity);
#ifdef SS_THICKNESSANDMASK_TEXTURE
vec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);
refractionTransmittance*=cocaLambert(volumeAlbedo,thickness);
#elif defined(SS_LINKREFRACTIONTOTRANSPARENCY)
float maxChannel=max(max(surfaceAlbedo.r,surfaceAlbedo.g),surfaceAlbedo.b);
vec3 volumeAlbedo=saturate(maxChannel*surfaceAlbedo);
environmentRefraction.rgb*=volumeAlbedo;
#else
vec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);
refractionTransmittance*=cocaLambert(volumeAlbedo,vThicknessParam.y);
#endif
#ifdef SS_ALBEDOFORREFRACTIONTINT
environmentRefraction.rgb*=surfaceAlbedo.rgb;
#endif
outParams.surfaceAlbedo=surfaceAlbedo*(1.-refractionIntensity);
#ifdef REFLECTION
outParams.refractionFactorForIrradiance=(1.-refractionIntensity);
#endif
#ifdef UNUSED_MULTIPLEBOUNCES
vec3 bounceSpecularEnvironmentReflectance=(2.0*specularEnvironmentReflectance)/(1.0+specularEnvironmentReflectance);
outParams.specularEnvironmentReflectance=mix(bounceSpecularEnvironmentReflectance,specularEnvironmentReflectance,refractionIntensity);
#endif
refractionTransmittance*=1.0-outParams.specularEnvironmentReflectance;
#if DEBUGMODE>0
outParams.refractionTransmittance=refractionTransmittance;
#endif
outParams.finalRefraction=environmentRefraction.rgb*refractionTransmittance*vLightingIntensity.z;
#if DEBUGMODE>0
outParams.environmentRefraction=environmentRefraction;
#endif
#endif
#if defined(REFLECTION) && defined(SS_TRANSLUCENCY)
#if defined(NORMAL) && defined(USESPHERICALINVERTEX) || !defined(USESPHERICALFROMREFLECTIONMAP)
vec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#else
vec3 irradianceVector=irradianceVector_;
#endif
#if defined(USESPHERICALFROMREFLECTIONMAP)
#if defined(REALTIME_FILTERING)
vec3 refractionIrradiance=irradiance(reflectionSampler,-irradianceVector,vReflectionFilteringInfo);
#else
vec3 refractionIrradiance=computeEnvironmentIrradiance(-irradianceVector);
#endif
#elif defined(USEIRRADIANCEMAP)
#ifdef REFLECTIONMAP_3D
vec3 irradianceCoords=irradianceVector;
#else
vec2 irradianceCoords=irradianceVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
irradianceCoords/=irradianceVector.z;
#endif
irradianceCoords.y=1.0-irradianceCoords.y;
#endif
vec4 refractionIrradiance=sampleReflection(irradianceSampler,-irradianceCoords);
#ifdef RGBDREFLECTION
refractionIrradiance.rgb=fromRGBD(refractionIrradiance);
#endif
#ifdef GAMMAREFLECTION
refractionIrradiance.rgb=toLinearSpace(refractionIrradiance.rgb);
#endif
#else
vec4 refractionIrradiance=vec4(0.);
#endif
refractionIrradiance.rgb*=transmittance;
#ifdef SS_ALBEDOFORTRANSLUCENCYTINT
refractionIrradiance.rgb*=surfaceAlbedo.rgb;
#endif
outParams.refractionIrradiance=refractionIrradiance.rgb;
#endif
}
#endif
`;k.IncludesShadersStore[ta]=ia;const na="pbrBlockNormalGeometric",sa=`vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;
#endif
vec3 geometricNormalW=normalW;
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
geometricNormalW=gl_FrontFacing ? geometricNormalW : -geometricNormalW;
#endif
`;k.IncludesShadersStore[na]=sa;const ra="pbrBlockNormalFinal",aa=`#if defined(FORCENORMALFORWARD) && defined(NORMAL)
vec3 faceNormal=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;
#if defined(TWOSIDEDLIGHTING)
faceNormal=gl_FrontFacing ? faceNormal : -faceNormal;
#endif
normalW*=sign(dot(normalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
normalW=gl_FrontFacing ? normalW : -normalW;
#endif
`;k.IncludesShadersStore[ra]=aa;const oa="pbrBlockLightmapInit",la=`#ifdef LIGHTMAP
vec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);
#ifdef RGBDLIGHTMAP
lightmapColor.rgb=fromRGBD(lightmapColor);
#endif
#ifdef GAMMALIGHTMAP
lightmapColor.rgb=toLinearSpace(lightmapColor.rgb);
#endif
lightmapColor.rgb*=vLightmapInfos.y;
#endif
`;k.IncludesShadersStore[oa]=la;const ca="pbrBlockGeometryInfo",fa=`float NdotVUnclamped=dot(normalW,viewDirectionW);
float NdotV=absEps(NdotVUnclamped);
float alphaG=convertRoughnessToAverageSlope(roughness);
vec2 AARoughnessFactors=getAARoughnessFactors(normalW.xyz);
#ifdef SPECULARAA
alphaG+=AARoughnessFactors.y;
#endif
#if defined(ENVIRONMENTBRDF)
vec3 environmentBrdf=getBRDFLookup(NdotV,roughness);
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
#ifdef AMBIENTINGRAYSCALE
float ambientMonochrome=aoOut.ambientOcclusionColor.r;
#else
float ambientMonochrome=getLuminance(aoOut.ambientOcclusionColor);
#endif
float seo=environmentRadianceOcclusion(ambientMonochrome,NdotVUnclamped);
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
float eho=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);
#endif
#endif
#endif
#endif
`;k.IncludesShadersStore[ca]=fa;const ha="pbrBlockReflectance0",ua=`float reflectance=max(max(reflectivityOut.surfaceReflectivityColor.r,reflectivityOut.surfaceReflectivityColor.g),reflectivityOut.surfaceReflectivityColor.b);
vec3 specularEnvironmentR0=reflectivityOut.surfaceReflectivityColor.rgb;
#ifdef METALLICWORKFLOW
vec3 specularEnvironmentR90=vec3(metallicReflectanceFactors.a);
#else 
vec3 specularEnvironmentR90=vec3(1.0,1.0,1.0);
#endif
#ifdef ALPHAFRESNEL
float reflectance90=fresnelGrazingReflectance(reflectance);
specularEnvironmentR90=specularEnvironmentR90*reflectance90;
#endif
`;k.IncludesShadersStore[ha]=ua;const da="pbrBlockReflectance",_a=`#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
vec3 specularEnvironmentReflectance=getReflectanceFromBRDFLookup(clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,environmentBrdf);
#ifdef RADIANCEOCCLUSION
specularEnvironmentReflectance*=seo;
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
specularEnvironmentReflectance*=eho;
#endif
#endif
#endif
#else
vec3 specularEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(NdotV,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,sqrt(microSurface));
#endif
#ifdef CLEARCOAT
specularEnvironmentReflectance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
specularEnvironmentReflectance*=clearcoatOut.absorption;
#endif
#endif
`;k.IncludesShadersStore[da]=_a;const Ea="pbrBlockDirectLighting",ma=`vec3 diffuseBase=vec3(0.,0.,0.);
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#ifdef CLEARCOAT
vec3 clearCoatBase=vec3(0.,0.,0.);
#endif
#ifdef SHEEN
vec3 sheenBase=vec3(0.,0.,0.);
#endif
preLightingInfo preInfo;
lightingInfo info;
float shadow=1.; 
#if defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
vec3 absorption=vec3(0.);
#endif
`;k.IncludesShadersStore[Ea]=ma;const pa="pbrBlockFinalLitComponents",Aa=`#if defined(ENVIRONMENTBRDF)
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 energyConservationFactor=getEnergyConservationFactor(clearcoatOut.specularEnvironmentR0,environmentBrdf);
#endif
#endif
#ifndef METALLICWORKFLOW
#ifdef SPECULAR_GLOSSINESS_ENERGY_CONSERVATION
surfaceAlbedo.rgb=(1.-reflectance)*surfaceAlbedo.rgb;
#endif
#endif
#if defined(SHEEN) && defined(SHEEN_ALBEDOSCALING) && defined(ENVIRONMENTBRDF)
surfaceAlbedo.rgb=sheenOut.sheenAlbedoScaling*surfaceAlbedo.rgb;
#endif
#ifdef REFLECTION
vec3 finalIrradiance=reflectionOut.environmentIrradiance;
#if defined(CLEARCOAT)
finalIrradiance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
finalIrradiance*=clearcoatOut.absorption;
#endif
#endif
#if defined(SS_REFRACTION)
finalIrradiance*=subSurfaceOut.refractionFactorForIrradiance;
#endif
#if defined(SS_TRANSLUCENCY)
finalIrradiance*=(1.0-subSurfaceOut.translucencyIntensity);
finalIrradiance+=subSurfaceOut.refractionIrradiance;
#endif
finalIrradiance*=surfaceAlbedo.rgb;
finalIrradiance*=vLightingIntensity.z;
finalIrradiance*=aoOut.ambientOcclusionColor;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase;
finalSpecular=max(finalSpecular,0.0);
vec3 finalSpecularScaled=finalSpecular*vLightingIntensity.x*vLightingIntensity.w;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalSpecularScaled*=energyConservationFactor;
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
finalSpecularScaled*=sheenOut.sheenAlbedoScaling;
#endif
#endif
#ifdef REFLECTION
vec3 finalRadiance=reflectionOut.environmentRadiance.rgb;
finalRadiance*=subSurfaceOut.specularEnvironmentReflectance;
vec3 finalRadianceScaled=finalRadiance*vLightingIntensity.z;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalRadianceScaled*=energyConservationFactor;
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
finalRadianceScaled*=sheenOut.sheenAlbedoScaling;
#endif
#endif
#ifdef SHEEN
vec3 finalSheen=sheenBase*sheenOut.sheenColor;
finalSheen=max(finalSheen,0.0);
vec3 finalSheenScaled=finalSheen*vLightingIntensity.x*vLightingIntensity.w;
#if defined(CLEARCOAT) && defined(REFLECTION) && defined(ENVIRONMENTBRDF)
sheenOut.finalSheenRadianceScaled*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
sheenOut.finalSheenRadianceScaled*=clearcoatOut.absorption;
#endif
#endif
#endif
#ifdef CLEARCOAT
vec3 finalClearCoat=clearCoatBase;
finalClearCoat=max(finalClearCoat,0.0);
vec3 finalClearCoatScaled=finalClearCoat*vLightingIntensity.x*vLightingIntensity.w;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalClearCoatScaled*=clearcoatOut.energyConservationFactorClearCoat;
#endif
#ifdef SS_REFRACTION
subSurfaceOut.finalRefraction*=clearcoatOut.conservationFactor;
#ifdef CLEARCOAT_TINT
subSurfaceOut.finalRefraction*=clearcoatOut.absorption;
#endif
#endif
#endif
#ifdef ALPHABLEND
float luminanceOverAlpha=0.0;
#if defined(REFLECTION) && defined(RADIANCEOVERALPHA)
luminanceOverAlpha+=getLuminance(finalRadianceScaled);
#if defined(CLEARCOAT)
luminanceOverAlpha+=getLuminance(clearcoatOut.finalClearCoatRadianceScaled);
#endif
#endif
#if defined(SPECULARTERM) && defined(SPECULAROVERALPHA)
luminanceOverAlpha+=getLuminance(finalSpecularScaled);
#endif
#if defined(CLEARCOAT) && defined(CLEARCOATOVERALPHA)
luminanceOverAlpha+=getLuminance(finalClearCoatScaled);
#endif
#if defined(RADIANCEOVERALPHA) || defined(SPECULAROVERALPHA) || defined(CLEARCOATOVERALPHA)
alpha=saturate(alpha+luminanceOverAlpha*luminanceOverAlpha);
#endif
#endif
`;k.IncludesShadersStore[pa]=Aa;const Ta="pbrBlockFinalUnlitComponents",ga=`vec3 finalDiffuse=diffuseBase;
finalDiffuse*=surfaceAlbedo.rgb;
finalDiffuse=max(finalDiffuse,0.0);
finalDiffuse*=vLightingIntensity.x;
vec3 finalAmbient=vAmbientColor;
finalAmbient*=surfaceAlbedo.rgb;
vec3 finalEmissive=vEmissiveColor;
#ifdef EMISSIVE
vec3 emissiveColorTex=texture2D(emissiveSampler,vEmissiveUV+uvOffset).rgb;
#ifdef GAMMAEMISSIVE
finalEmissive*=toLinearSpace(emissiveColorTex.rgb);
#else
finalEmissive*=emissiveColorTex.rgb;
#endif
finalEmissive*= vEmissiveInfos.y;
#endif
finalEmissive*=vLightingIntensity.y;
#ifdef AMBIENT
vec3 ambientOcclusionForDirectDiffuse=mix(vec3(1.),aoOut.ambientOcclusionColor,vAmbientInfos.w);
#else
vec3 ambientOcclusionForDirectDiffuse=aoOut.ambientOcclusionColor;
#endif
finalAmbient*=aoOut.ambientOcclusionColor;
finalDiffuse*=ambientOcclusionForDirectDiffuse;
`;k.IncludesShadersStore[Ta]=ga;const Ra="pbrBlockFinalColorComposition",Ca=`vec4 finalColor=vec4(
finalAmbient +
finalDiffuse +
#ifndef UNLIT
#ifdef REFLECTION
finalIrradiance +
#endif
#ifdef SPECULARTERM
finalSpecularScaled +
#endif
#ifdef SHEEN
finalSheenScaled +
#endif
#ifdef CLEARCOAT
finalClearCoatScaled +
#endif
#ifdef REFLECTION
finalRadianceScaled +
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
sheenOut.finalSheenRadianceScaled +
#endif
#ifdef CLEARCOAT
clearcoatOut.finalClearCoatRadianceScaled +
#endif
#endif
#ifdef SS_REFRACTION
subSurfaceOut.finalRefraction +
#endif
#endif
finalEmissive,
alpha);
#ifdef LIGHTMAP
#ifndef LIGHTMAPEXCLUDED
#ifdef USELIGHTMAPASSHADOWMAP
finalColor.rgb*=lightmapColor.rgb;
#else
finalColor.rgb+=lightmapColor.rgb;
#endif
#endif
#endif
#define CUSTOM_FRAGMENT_BEFORE_FOG
finalColor=max(finalColor,0.0);
`;k.IncludesShadersStore[Ra]=Ca;const Sa="pbrBlockImageProcessing",Ia=`#if defined(IMAGEPROCESSINGPOSTPROCESS) || defined(SS_SCATTERING)
#if !defined(SKIPFINALCOLORCLAMP)
finalColor.rgb=clamp(finalColor.rgb,0.,30.0);
#endif
#else
finalColor=applyImageProcessing(finalColor);
#endif
finalColor.a*=visibility;
#ifdef PREMULTIPLYALPHA
finalColor.rgb*=finalColor.a;
#endif
`;k.IncludesShadersStore[Sa]=Ia;const va="pbrDebug",xa=`#if DEBUGMODE>0
if (vClipSpacePosition.x/vClipSpacePosition.w>=vDebugMode.x) {
#if DEBUGMODE==1
gl_FragColor.rgb=vPositionW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==2 && defined(NORMAL)
gl_FragColor.rgb=vNormalW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==3 && defined(BUMP) || DEBUGMODE==3 && defined(PARALLAX) || DEBUGMODE==3 && defined(ANISOTROPIC)
gl_FragColor.rgb=TBN[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==4 && defined(BUMP) || DEBUGMODE==4 && defined(PARALLAX) || DEBUGMODE==4 && defined(ANISOTROPIC)
gl_FragColor.rgb=TBN[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==5
gl_FragColor.rgb=normalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==6 && defined(MAINUV1)
gl_FragColor.rgb=vec3(vMainUV1,0.0);
#elif DEBUGMODE==7 && defined(MAINUV2)
gl_FragColor.rgb=vec3(vMainUV2,0.0);
#elif DEBUGMODE==8 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
gl_FragColor.rgb=clearcoatOut.TBNClearCoat[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==9 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
gl_FragColor.rgb=clearcoatOut.TBNClearCoat[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==10 && defined(CLEARCOAT)
gl_FragColor.rgb=clearcoatOut.clearCoatNormalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==11 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicNormal;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==12 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicTangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==13 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicBitangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==20 && defined(ALBEDO)
gl_FragColor.rgb=albedoTexture.rgb;
#elif DEBUGMODE==21 && defined(AMBIENT)
gl_FragColor.rgb=aoOut.ambientOcclusionColorMap.rgb;
#elif DEBUGMODE==22 && defined(OPACITY)
gl_FragColor.rgb=opacityMap.rgb;
#elif DEBUGMODE==23 && defined(EMISSIVE)
gl_FragColor.rgb=emissiveColorTex.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==24 && defined(LIGHTMAP)
gl_FragColor.rgb=lightmapColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==25 && defined(REFLECTIVITY) && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceMetallicColorMap.rgb;
#elif DEBUGMODE==26 && defined(REFLECTIVITY) && !defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceReflectivityColorMap.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==27 && defined(CLEARCOAT) && defined(CLEARCOAT_TEXTURE)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatMapData.rg,0.0);
#elif DEBUGMODE==28 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
gl_FragColor.rgb=clearcoatOut.clearCoatTintMapData.rgb;
#elif DEBUGMODE==29 && defined(SHEEN) && defined(SHEEN_TEXTURE)
gl_FragColor.rgb=sheenOut.sheenMapData.rgb;
#elif DEBUGMODE==30 && defined(ANISOTROPIC) && defined(ANISOTROPIC_TEXTURE)
gl_FragColor.rgb=anisotropicOut.anisotropyMapData.rgb;
#elif DEBUGMODE==31 && defined(SUBSURFACE) && defined(SS_THICKNESSANDMASK_TEXTURE)
gl_FragColor.rgb=subSurfaceOut.thicknessMap.rgb;
#elif DEBUGMODE==40 && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.environmentRefraction.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==41 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==42 && defined(CLEARCOAT) && defined(REFLECTION)
gl_FragColor.rgb=clearcoatOut.environmentClearCoatRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==50
gl_FragColor.rgb=diffuseBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==51 && defined(SPECULARTERM)
gl_FragColor.rgb=specularBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==52 && defined(CLEARCOAT)
gl_FragColor.rgb=clearCoatBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==53 && defined(SHEEN)
gl_FragColor.rgb=sheenBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==54 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentIrradiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==60
gl_FragColor.rgb=surfaceAlbedo.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==61
gl_FragColor.rgb=clearcoatOut.specularEnvironmentR0;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==62 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=vec3(reflectivityOut.metallicRoughness.r);
#elif DEBUGMODE==71 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.metallicF0;
#elif DEBUGMODE==63
gl_FragColor.rgb=vec3(roughness);
#elif DEBUGMODE==64
gl_FragColor.rgb=vec3(alphaG);
#elif DEBUGMODE==65
gl_FragColor.rgb=vec3(NdotV);
#elif DEBUGMODE==66 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
gl_FragColor.rgb=clearcoatOut.clearCoatColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==67 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatRoughness);
#elif DEBUGMODE==68 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatNdotV);
#elif DEBUGMODE==69 && defined(SUBSURFACE) && defined(SS_TRANSLUCENCY)
gl_FragColor.rgb=subSurfaceOut.transmittance;
#elif DEBUGMODE==70 && defined(SUBSURFACE) && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.refractionTransmittance;
#elif DEBUGMODE==80 && defined(RADIANCEOCCLUSION)
gl_FragColor.rgb=vec3(seo);
#elif DEBUGMODE==81 && defined(HORIZONOCCLUSION)
gl_FragColor.rgb=vec3(eho);
#elif DEBUGMODE==82 && defined(MS_BRDF_ENERGY_CONSERVATION)
gl_FragColor.rgb=vec3(energyConservationFactor);
#elif DEBUGMODE==83 && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=specularEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==84 && defined(CLEARCOAT) && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=clearcoatOut.clearCoatEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==85 && defined(SHEEN) && defined(REFLECTION)
gl_FragColor.rgb=sheenOut.sheenEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==86 && defined(ALPHABLEND)
gl_FragColor.rgb=vec3(luminanceOverAlpha);
#elif DEBUGMODE==87
gl_FragColor.rgb=vec3(alpha);
#endif
gl_FragColor.rgb*=vDebugMode.y;
#ifdef DEBUGMODE_NORMALIZE
gl_FragColor.rgb=normalize(gl_FragColor.rgb)*0.5+0.5;
#endif
#ifdef DEBUGMODE_GAMMA
gl_FragColor.rgb=toGammaSpace(gl_FragColor.rgb);
#endif
gl_FragColor.a=1.0;
#ifdef PREPASS
gl_FragData[0]=toLinearSpace(gl_FragColor); 
gl_FragData[1]=vec4(0.,0.,0.,0.); 
#endif
return;
}
#endif
`;k.IncludesShadersStore[va]=xa;const Ma="pbrPixelShader",Na=`#if defined(BUMP) || !defined(NORMAL) || defined(FORCENORMALFORWARD) || defined(SPECULARAA) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#extension GL_OES_standard_derivatives : enable
#endif
#ifdef LODBASEDMICROSFURACE
#extension GL_EXT_shader_texture_lod : enable
#endif
#define CUSTOM_FRAGMENT_BEGIN
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
precision highp float;
#include<oitDeclaration>
#ifndef FROMLINEARSPACE
#define FROMLINEARSPACE
#endif
#include<__decl__pbrFragment>
#include<pbrFragmentExtraDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<pbrFragmentSamplersDeclaration>
#include<imageProcessingDeclaration>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#include<helperFunctions>
#include<subSurfaceScatteringFunctions>
#include<importanceSampling>
#include<pbrHelperFunctions>
#include<imageProcessingFunctions>
#include<shadowsFragmentFunctions>
#include<harmonicsFunctions>
#include<pbrDirectLightingSetupFunctions>
#include<pbrDirectLightingFalloffFunctions>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
#include<pbrDirectLightingFunctions>
#include<pbrIBLFunctions>
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#ifdef REFLECTION
#include<reflectionFunction>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<pbrBlockAlbedoOpacity>
#include<pbrBlockReflectivity>
#include<pbrBlockAmbientOcclusion>
#include<pbrBlockAlphaFresnel>
#include<pbrBlockAnisotropic>
#include<pbrBlockReflection>
#include<pbrBlockSheen>
#include<pbrBlockClearcoat>
#include<pbrBlockIridescence>
#include<pbrBlockSubSurface>
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#include<pbrBlockNormalGeometric>
#include<bumpFragment>
#include<pbrBlockNormalFinal>
albedoOpacityOutParams albedoOpacityOut;
#ifdef ALBEDO
vec4 albedoTexture=texture2D(albedoSampler,vAlbedoUV+uvOffset);
#endif
#ifdef OPACITY
vec4 opacityMap=texture2D(opacitySampler,vOpacityUV+uvOffset);
#endif
albedoOpacityBlock(
vAlbedoColor,
#ifdef ALBEDO
albedoTexture,
vAlbedoInfos,
#endif
#ifdef OPACITY
opacityMap,
vOpacityInfos,
#endif
#ifdef DETAIL
detailColor,
vDetailInfos,
#endif
albedoOpacityOut
);
vec3 surfaceAlbedo=albedoOpacityOut.surfaceAlbedo;
float alpha=albedoOpacityOut.alpha;
#define CUSTOM_FRAGMENT_UPDATE_ALPHA
#include<depthPrePass>
#define CUSTOM_FRAGMENT_BEFORE_LIGHTS
ambientOcclusionOutParams aoOut;
#ifdef AMBIENT
vec3 ambientOcclusionColorMap=texture2D(ambientSampler,vAmbientUV+uvOffset).rgb;
#endif
ambientOcclusionBlock(
#ifdef AMBIENT
ambientOcclusionColorMap,
vAmbientInfos,
#endif
aoOut
);
#include<pbrBlockLightmapInit>
#ifdef UNLIT
vec3 diffuseBase=vec3(1.,1.,1.);
#else
vec3 baseColor=surfaceAlbedo;
reflectivityOutParams reflectivityOut;
#if defined(REFLECTIVITY)
vec4 surfaceMetallicOrReflectivityColorMap=texture2D(reflectivitySampler,vReflectivityUV+uvOffset);
vec4 baseReflectivity=surfaceMetallicOrReflectivityColorMap;
#ifndef METALLICWORKFLOW
#ifdef REFLECTIVITY_GAMMA
surfaceMetallicOrReflectivityColorMap=toLinearSpace(surfaceMetallicOrReflectivityColorMap);
#endif
surfaceMetallicOrReflectivityColorMap.rgb*=vReflectivityInfos.y;
#endif
#endif
#if defined(MICROSURFACEMAP)
vec4 microSurfaceTexel=texture2D(microSurfaceSampler,vMicroSurfaceSamplerUV+uvOffset)*vMicroSurfaceSamplerInfos.y;
#endif
#ifdef METALLICWORKFLOW
vec4 metallicReflectanceFactors=vMetallicReflectanceFactors;
#ifdef REFLECTANCE
vec4 reflectanceFactorsMap=texture2D(reflectanceSampler,vReflectanceUV+uvOffset);
#ifdef REFLECTANCE_GAMMA
reflectanceFactorsMap=toLinearSpace(reflectanceFactorsMap);
#endif
metallicReflectanceFactors.rgb*=reflectanceFactorsMap.rgb;
#endif
#ifdef METALLIC_REFLECTANCE
vec4 metallicReflectanceFactorsMap=texture2D(metallicReflectanceSampler,vMetallicReflectanceUV+uvOffset);
#ifdef METALLIC_REFLECTANCE_GAMMA
metallicReflectanceFactorsMap=toLinearSpace(metallicReflectanceFactorsMap);
#endif
#ifndef METALLIC_REFLECTANCE_USE_ALPHA_ONLY
metallicReflectanceFactors.rgb*=metallicReflectanceFactorsMap.rgb;
#endif
metallicReflectanceFactors*=metallicReflectanceFactorsMap.a;
#endif
#endif
reflectivityBlock(
vReflectivityColor,
#ifdef METALLICWORKFLOW
surfaceAlbedo,
metallicReflectanceFactors,
#endif
#ifdef REFLECTIVITY
vReflectivityInfos,
surfaceMetallicOrReflectivityColorMap,
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
aoOut.ambientOcclusionColor,
#endif
#ifdef MICROSURFACEMAP
microSurfaceTexel,
#endif
#ifdef DETAIL
detailColor,
vDetailInfos,
#endif
reflectivityOut
);
float microSurface=reflectivityOut.microSurface;
float roughness=reflectivityOut.roughness;
#ifdef METALLICWORKFLOW
surfaceAlbedo=reflectivityOut.surfaceAlbedo;
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
aoOut.ambientOcclusionColor=reflectivityOut.ambientOcclusionColor;
#endif
#ifdef ALPHAFRESNEL
#if defined(ALPHATEST) || defined(ALPHABLEND)
alphaFresnelOutParams alphaFresnelOut;
alphaFresnelBlock(
normalW,
viewDirectionW,
alpha,
microSurface,
alphaFresnelOut
);
alpha=alphaFresnelOut.alpha;
#endif
#endif
#include<pbrBlockGeometryInfo>
#ifdef ANISOTROPIC
anisotropicOutParams anisotropicOut;
#ifdef ANISOTROPIC_TEXTURE
vec3 anisotropyMapData=texture2D(anisotropySampler,vAnisotropyUV+uvOffset).rgb*vAnisotropyInfos.y;
#endif
anisotropicBlock(
vAnisotropy,
#ifdef ANISOTROPIC_TEXTURE
anisotropyMapData,
#endif
TBN,
normalW,
viewDirectionW,
anisotropicOut
);
#endif
#ifdef REFLECTION
reflectionOutParams reflectionOut;
#ifndef USE_CUSTOM_REFLECTION
reflectionBlock(
vPositionW,
normalW,
alphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#ifdef ANISOTROPIC
anisotropicOut,
#endif
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
roughness,
#endif
reflectionSampler,
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
vEnvironmentIrradiance,
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
reflectionMatrix,
#endif
#endif
#ifdef USEIRRADIANCEMAP
irradianceSampler,
#endif
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
reflectionOut
);
#else
#define CUSTOM_REFLECTION
#endif
#endif
#include<pbrBlockReflectance0>
#ifdef SHEEN
sheenOutParams sheenOut;
#ifdef SHEEN_TEXTURE
vec4 sheenMapData=texture2D(sheenSampler,vSheenUV+uvOffset);
#endif
#if defined(SHEEN_ROUGHNESS) && defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
vec4 sheenMapRoughnessData=texture2D(sheenRoughnessSampler,vSheenRoughnessUV+uvOffset)*vSheenInfos.w;
#endif
sheenBlock(
vSheenColor,
#ifdef SHEEN_ROUGHNESS
vSheenRoughness,
#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
sheenMapRoughnessData,
#endif
#endif
roughness,
#ifdef SHEEN_TEXTURE
sheenMapData,
vSheenInfos.y,
#endif
reflectance,
#ifdef SHEEN_LINKWITHALBEDO
baseColor,
surfaceAlbedo,
#endif
#ifdef ENVIRONMENTBRDF
NdotV,
environmentBrdf,
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
AARoughnessFactors,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
vLightingIntensity,
reflectionSampler,
reflectionOut.reflectionCoords,
NdotVUnclamped,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
seo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
eho,
#endif
#endif
sheenOut
);
#ifdef SHEEN_LINKWITHALBEDO
surfaceAlbedo=sheenOut.surfaceAlbedo;
#endif
#endif
#ifdef CLEARCOAT
#ifdef CLEARCOAT_TEXTURE
vec2 clearCoatMapData=texture2D(clearCoatSampler,vClearCoatUV+uvOffset).rg*vClearCoatInfos.y;
#endif
#endif
#ifdef IRIDESCENCE
iridescenceOutParams iridescenceOut;
#ifdef IRIDESCENCE_TEXTURE
vec2 iridescenceMapData=texture2D(iridescenceSampler,vIridescenceUV+uvOffset).rg*vIridescenceInfos.y;
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
vec2 iridescenceThicknessMapData=texture2D(iridescenceThicknessSampler,vIridescenceThicknessUV+uvOffset).rg*vIridescenceInfos.w;
#endif
iridescenceBlock(
vIridescenceParams,
NdotV,
specularEnvironmentR0,
#ifdef IRIDESCENCE_TEXTURE
iridescenceMapData,
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
iridescenceThicknessMapData,
#endif
#ifdef CLEARCOAT
NdotVUnclamped,
#ifdef CLEARCOAT_TEXTURE
clearCoatMapData,
#endif
#endif
iridescenceOut
);
float iridescenceIntensity=iridescenceOut.iridescenceIntensity;
specularEnvironmentR0=iridescenceOut.specularEnvironmentR0;
#endif
clearcoatOutParams clearcoatOut;
#ifdef CLEARCOAT
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
vec4 clearCoatMapRoughnessData=texture2D(clearCoatRoughnessSampler,vClearCoatRoughnessUV+uvOffset)*vClearCoatInfos.w;
#endif
#if defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
vec4 clearCoatTintMapData=texture2D(clearCoatTintSampler,vClearCoatTintUV+uvOffset);
#endif
#ifdef CLEARCOAT_BUMP
vec4 clearCoatBumpMapData=texture2D(clearCoatBumpSampler,vClearCoatBumpUV+uvOffset);
#endif
clearcoatBlock(
vPositionW,
geometricNormalW,
viewDirectionW,
vClearCoatParams,
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
clearCoatMapRoughnessData,
#endif
specularEnvironmentR0,
#ifdef CLEARCOAT_TEXTURE
clearCoatMapData,
#endif
#ifdef CLEARCOAT_TINT
vClearCoatTintParams,
clearCoatColorAtDistance,
vClearCoatRefractionParams,
#ifdef CLEARCOAT_TINT_TEXTURE
clearCoatTintMapData,
#endif
#endif
#ifdef CLEARCOAT_BUMP
vClearCoatBumpInfos,
clearCoatBumpMapData,
vClearCoatBumpUV,
#if defined(TANGENT) && defined(NORMAL)
vTBN,
#else
vClearCoatTangentSpaceParams,
#endif
#ifdef OBJECTSPACE_NORMALMAP
normalMatrix,
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
faceNormal,
#endif
#ifdef REFLECTION
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
vLightingIntensity,
reflectionSampler,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
ambientMonochrome,
#endif
#endif
#if defined(CLEARCOAT_BUMP) || defined(TWOSIDEDLIGHTING)
(gl_FrontFacing ? 1. : -1.),
#endif
clearcoatOut
);
#else
clearcoatOut.specularEnvironmentR0=specularEnvironmentR0;
#endif
#include<pbrBlockReflectance>
subSurfaceOutParams subSurfaceOut;
#ifdef SUBSURFACE
#ifdef SS_THICKNESSANDMASK_TEXTURE
vec4 thicknessMap=texture2D(thicknessSampler,vThicknessUV+uvOffset);
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
vec4 refractionIntensityMap=texture2D(refractionIntensitySampler,vRefractionIntensityUV+uvOffset);
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
vec4 translucencyIntensityMap=texture2D(translucencyIntensitySampler,vTranslucencyIntensityUV+uvOffset);
#endif
subSurfaceBlock(
vSubSurfaceIntensity,
vThicknessParam,
vTintColor,
normalW,
specularEnvironmentReflectance,
#ifdef SS_THICKNESSANDMASK_TEXTURE
thicknessMap,
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
refractionIntensityMap,
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
translucencyIntensityMap,
#endif
#ifdef REFLECTION
#ifdef SS_TRANSLUCENCY
reflectionMatrix,
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
reflectionOut.irradianceVector,
#endif
#if defined(REALTIME_FILTERING)
reflectionSampler,
vReflectionFilteringInfo,
#endif
#endif
#ifdef USEIRRADIANCEMAP
irradianceSampler,
#endif
#endif
#endif
#if defined(SS_REFRACTION) || defined(SS_TRANSLUCENCY)
surfaceAlbedo,
#endif
#ifdef SS_REFRACTION
vPositionW,
viewDirectionW,
view,
vRefractionInfos,
refractionMatrix,
vRefractionMicrosurfaceInfos,
vLightingIntensity,
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
alpha,
#endif
#ifdef SS_LODINREFRACTIONALPHA
NdotVUnclamped,
#endif
#ifdef SS_LINEARSPECULARREFRACTION
roughness,
#endif
alphaG,
refractionSampler,
#ifndef LODBASEDMICROSFURACE
refractionSamplerLow,
refractionSamplerHigh,
#endif
#ifdef ANISOTROPIC
anisotropicOut,
#endif
#ifdef REALTIME_FILTERING
vRefractionFilteringInfo,
#endif
#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC
vRefractionPosition,
vRefractionSize,
#endif
#endif
#ifdef SS_TRANSLUCENCY
vDiffusionDistance,
#endif
subSurfaceOut
);
#ifdef SS_REFRACTION
surfaceAlbedo=subSurfaceOut.surfaceAlbedo;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
alpha=subSurfaceOut.alpha;
#endif
#endif
#else
subSurfaceOut.specularEnvironmentReflectance=specularEnvironmentReflectance;
#endif
#include<pbrBlockDirectLighting>
#include<lightFragment>[0..maxSimultaneousLights]
#include<pbrBlockFinalLitComponents>
#endif 
#include<pbrBlockFinalUnlitComponents>
#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION
#include<pbrBlockFinalColorComposition>
#include<logDepthFragment>
#include<fogFragment>(color,finalColor)
#include<pbrBlockImageProcessing>
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef PREPASS
float writeGeometryInfo=finalColor.a>0.4 ? 1.0 : 0.0;
#ifdef PREPASS_POSITION
gl_FragData[PREPASS_POSITION_INDEX]=vec4(vPositionW,writeGeometryInfo);
#endif
#ifdef PREPASS_VELOCITY
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;
vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;
vec2 velocity=abs(a-b);
velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;
gl_FragData[PREPASS_VELOCITY_INDEX]=vec4(velocity,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_ALBEDO_SQRT
vec3 sqAlbedo=sqrt(surfaceAlbedo); 
#endif
#ifdef PREPASS_IRRADIANCE
vec3 irradiance=finalDiffuse;
#ifndef UNLIT
#ifdef REFLECTION
irradiance+=finalIrradiance;
#endif
#endif
#ifdef SS_SCATTERING
gl_FragData[0]=vec4(finalColor.rgb-irradiance,finalColor.a); 
irradiance/=sqAlbedo;
#else
gl_FragData[0]=finalColor; 
float scatteringDiffusionProfile=255.;
#endif
gl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(clamp(irradiance,vec3(0.),vec3(1.)),writeGeometryInfo*scatteringDiffusionProfile/255.); 
#else
gl_FragData[0]=vec4(finalColor.rgb,finalColor.a);
#endif
#ifdef PREPASS_DEPTH
gl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_NORMAL
gl_FragData[PREPASS_NORMAL_INDEX]=vec4((view*vec4(normalW,0.0)).rgb,writeGeometryInfo); 
#endif
#ifdef PREPASS_ALBEDO_SQRT
gl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(sqAlbedo,writeGeometryInfo); 
#endif
#ifdef PREPASS_REFLECTIVITY
#ifndef UNLIT
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toGammaSpace(specularEnvironmentR0),microSurface)*writeGeometryInfo;
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4( 0.0,0.0,0.0,1.0 )*writeGeometryInfo;
#endif
#endif
#endif
#if !defined(PREPASS) || defined(WEBGL2)
gl_FragColor=finalColor;
#endif
#include<oitFragment>
#if ORDER_INDEPENDENT_TRANSPARENCY
if (fragDepth==nearestDepth) {
frontColor.rgb+=finalColor.rgb*finalColor.a*alphaMultiplier;
frontColor.a=1.0-alphaMultiplier*(1.0-finalColor.a);
} else {
backColor+=finalColor;
}
#endif
#include<pbrDebug>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;k.ShadersStore[Ma]=Na;const Oa="pbrVertexDeclaration",ya=`uniform mat4 view;
uniform mat4 viewProjection;
#ifdef ALBEDO
uniform mat4 albedoMatrix;
uniform vec2 vAlbedoInfos;
#endif
#ifdef AMBIENT
uniform mat4 ambientMatrix;
uniform vec4 vAmbientInfos;
#endif
#ifdef OPACITY
uniform mat4 opacityMatrix;
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
uniform mat4 emissiveMatrix;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
uniform mat4 lightmapMatrix;
#endif
#ifdef REFLECTIVITY 
uniform vec3 vReflectivityInfos;
uniform mat4 reflectivityMatrix;
#endif
#ifdef METALLIC_REFLECTANCE
uniform vec2 vMetallicReflectanceInfos;
uniform mat4 metallicReflectanceMatrix;
#endif
#ifdef REFLECTANCE
uniform vec2 vReflectanceInfos;
uniform mat4 reflectanceMatrix;
#endif
#ifdef MICROSURFACEMAP
uniform vec2 vMicroSurfaceSamplerInfos;
uniform mat4 microSurfaceSamplerMatrix;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform mat4 bumpMatrix;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
uniform mat4 reflectionMatrix;
#endif
#ifdef CLEARCOAT
#if defined(CLEARCOAT_TEXTURE) || defined(CLEARCOAT_TEXTURE_ROUGHNESS)
uniform vec4 vClearCoatInfos;
#endif
#ifdef CLEARCOAT_TEXTURE
uniform mat4 clearCoatMatrix;
#endif
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS
uniform mat4 clearCoatRoughnessMatrix;
#endif
#ifdef CLEARCOAT_BUMP
uniform vec2 vClearCoatBumpInfos;
uniform mat4 clearCoatBumpMatrix;
#endif
#ifdef CLEARCOAT_TINT_TEXTURE
uniform vec2 vClearCoatTintInfos;
uniform mat4 clearCoatTintMatrix;
#endif
#endif
#ifdef IRIDESCENCE
#if defined(IRIDESCENCE_TEXTURE) || defined(IRIDESCENCE_THICKNESS_TEXTURE)
uniform vec4 vIridescenceInfos;
#endif
#ifdef IRIDESCENCE_TEXTURE
uniform mat4 iridescenceMatrix;
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
uniform mat4 iridescenceThicknessMatrix;
#endif
#endif
#ifdef ANISOTROPIC
#ifdef ANISOTROPIC_TEXTURE
uniform vec2 vAnisotropyInfos;
uniform mat4 anisotropyMatrix;
#endif
#endif
#ifdef SHEEN
#if defined(SHEEN_TEXTURE) || defined(SHEEN_TEXTURE_ROUGHNESS)
uniform vec4 vSheenInfos;
#endif
#ifdef SHEEN_TEXTURE
uniform mat4 sheenMatrix;
#endif
#ifdef SHEEN_TEXTURE_ROUGHNESS
uniform mat4 sheenRoughnessMatrix;
#endif
#endif
#ifdef SUBSURFACE
#ifdef SS_REFRACTION
uniform vec4 vRefractionInfos;
uniform mat4 refractionMatrix;
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
uniform vec2 vThicknessInfos;
uniform mat4 thicknessMatrix;
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
uniform vec2 vRefractionIntensityInfos;
uniform mat4 refractionIntensityMatrix;
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
uniform vec2 vTranslucencyIntensityInfos;
uniform mat4 translucencyIntensityMatrix;
#endif
#endif
#ifdef NORMAL
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
uniform vec3 vSphericalL00;
uniform vec3 vSphericalL1_1;
uniform vec3 vSphericalL10;
uniform vec3 vSphericalL11;
uniform vec3 vSphericalL2_2;
uniform vec3 vSphericalL2_1;
uniform vec3 vSphericalL20;
uniform vec3 vSphericalL21;
uniform vec3 vSphericalL22;
#else
uniform vec3 vSphericalX;
uniform vec3 vSphericalY;
uniform vec3 vSphericalZ;
uniform vec3 vSphericalXX_ZZ;
uniform vec3 vSphericalYY_ZZ;
uniform vec3 vSphericalZZ;
uniform vec3 vSphericalXY;
uniform vec3 vSphericalYZ;
uniform vec3 vSphericalZX;
#endif
#endif
#endif
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
uniform mat4 detailMatrix;
#endif
#define ADDITIONAL_VERTEX_DECLARATION
`;k.IncludesShadersStore[Oa]=ya;const ba="pbrVertexShader",La=`precision highp float;
#include<__decl__pbrVertex>
#define CUSTOM_VERTEX_BEGIN
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef TANGENT
attribute vec4 tangent;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#include<uvAttributeDeclaration>[2..7]
#include<mainUVVaryingDeclaration>[1..7]
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<prePassVertexDeclaration>
#include<samplerVertexDeclaration>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo)
#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)
#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)
#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)
#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)
#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)
#include<samplerVertexDeclaration>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity)
#include<samplerVertexDeclaration>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler)
#include<samplerVertexDeclaration>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance)
#include<samplerVertexDeclaration>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance)
#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)
#ifdef CLEARCOAT
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat)
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness)
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump)
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint)
#endif
#ifdef IRIDESCENCE
#include<samplerVertexDeclaration>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence)
#include<samplerVertexDeclaration>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness)
#endif
#ifdef SHEEN
#include<samplerVertexDeclaration>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen)
#include<samplerVertexDeclaration>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness)
#endif
#ifdef ANISOTROPIC
#include<samplerVertexDeclaration>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy)
#endif
#ifdef SUBSURFACE
#include<samplerVertexDeclaration>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness)
#include<samplerVertexDeclaration>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity)
#include<samplerVertexDeclaration>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity)
#endif
varying vec3 vPositionW;
#if DEBUGMODE>0
varying vec4 vClipSpacePosition;
#endif
#ifdef NORMAL
varying vec3 vNormalW;
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
varying vec3 vEnvironmentIrradiance;
#include<harmonicsFunctions>
#endif
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<bumpVertexDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#endif
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#include<logDepthDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec3 positionUpdated=position;
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#ifdef TANGENT
vec4 tangentUpdated=tangent;
#endif
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
vPositionUVW=positionUpdated;
#endif
#define CUSTOM_VERTEX_UPDATE_POSITION
#define CUSTOM_VERTEX_UPDATE_NORMAL
#include<instancesVertex>
#if defined(PREPASS) && defined(PREPASS_VELOCITY) && !defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
vPositionW=vec3(worldPos);
#include<prePassVertex>
#ifdef NORMAL
mat3 normalWorld=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vNormalW=normalUpdated/vec3(dot(normalWorld[0],normalWorld[0]),dot(normalWorld[1],normalWorld[1]),dot(normalWorld[2],normalWorld[2]));
vNormalW=normalize(normalWorld*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normalWorld=transposeMat3(inverseMat3(normalWorld));
#endif
vNormalW=normalize(normalWorld*normalUpdated);
#endif
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
vec3 reflectionVector=vec3(reflectionMatrix*vec4(vNormalW,0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
vEnvironmentIrradiance=computeEnvironmentIrradiance(reflectionVector);
#endif
#endif
#define CUSTOM_VERTEX_UPDATE_WORLDPOS
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {
gl_Position=viewProjection*worldPos;
} else {
gl_Position=viewProjectionR*worldPos;
}
#else
gl_Position=viewProjection*worldPos;
#endif
#if DEBUGMODE>0
vClipSpacePosition=gl_Position;
#endif
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
vDirectionW=normalize(vec3(finalWorld*vec4(positionUpdated,0.0)));
#endif
#ifndef UV1
vec2 uvUpdated=vec2(0.,0.);
#endif
#ifdef MAINUV1
vMainUV1=uvUpdated;
#endif
#include<uvVariableDeclaration>[2..7]
#include<samplerVertexImplementation>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo,_MATRIXNAME_,albedo,_INFONAME_,AlbedoInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity,_MATRIXNAME_,reflectivity,_INFONAME_,ReflectivityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler,_MATRIXNAME_,microSurfaceSampler,_INFONAME_,MicroSurfaceSamplerInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance,_MATRIXNAME_,metallicReflectance,_INFONAME_,MetallicReflectanceInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance,_MATRIXNAME_,reflectance,_INFONAME_,ReflectanceInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)
#ifdef CLEARCOAT
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat,_MATRIXNAME_,clearCoat,_INFONAME_,ClearCoatInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness,_MATRIXNAME_,clearCoatRoughness,_INFONAME_,ClearCoatInfos.z)
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump,_MATRIXNAME_,clearCoatBump,_INFONAME_,ClearCoatBumpInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint,_MATRIXNAME_,clearCoatTint,_INFONAME_,ClearCoatTintInfos.x)
#endif
#ifdef IRIDESCENCE
#include<samplerVertexImplementation>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence,_MATRIXNAME_,iridescence,_INFONAME_,IridescenceInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness,_MATRIXNAME_,iridescenceThickness,_INFONAME_,IridescenceInfos.z)
#endif
#ifdef SHEEN
#include<samplerVertexImplementation>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen,_MATRIXNAME_,sheen,_INFONAME_,SheenInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness,_MATRIXNAME_,sheen,_INFONAME_,SheenInfos.z)
#endif
#ifdef ANISOTROPIC
#include<samplerVertexImplementation>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy,_MATRIXNAME_,anisotropy,_INFONAME_,AnisotropyInfos.x)
#endif
#ifdef SUBSURFACE
#include<samplerVertexImplementation>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness,_MATRIXNAME_,thickness,_INFONAME_,ThicknessInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity,_MATRIXNAME_,refractionIntensity,_INFONAME_,RefractionIntensityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity,_MATRIXNAME_,translucencyIntensity,_INFONAME_,TranslucencyIntensityInfos.x)
#endif
#include<bumpVertex>
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}`;k.ShadersStore[ba]=La;class Pa extends Ke{constructor(){super(...arguments),this.CLEARCOAT=!1,this.CLEARCOAT_DEFAULTIOR=!1,this.CLEARCOAT_TEXTURE=!1,this.CLEARCOAT_TEXTURE_ROUGHNESS=!1,this.CLEARCOAT_TEXTUREDIRECTUV=0,this.CLEARCOAT_TEXTURE_ROUGHNESSDIRECTUV=0,this.CLEARCOAT_BUMP=!1,this.CLEARCOAT_BUMPDIRECTUV=0,this.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,this.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL=!1,this.CLEARCOAT_REMAP_F0=!1,this.CLEARCOAT_TINT=!1,this.CLEARCOAT_TINT_TEXTURE=!1,this.CLEARCOAT_TINT_TEXTUREDIRECTUV=0,this.CLEARCOAT_TINT_GAMMATEXTURE=!1}}class ae extends st{constructor(e,t=!0){super(e,"PBRClearCoat",100,new Pa,t),this._isEnabled=!1,this.isEnabled=!1,this.intensity=1,this.roughness=0,this._indexOfRefraction=ae._DefaultIndexOfRefraction,this.indexOfRefraction=ae._DefaultIndexOfRefraction,this._texture=null,this.texture=null,this._useRoughnessFromMainTexture=!0,this.useRoughnessFromMainTexture=!0,this._textureRoughness=null,this.textureRoughness=null,this._remapF0OnInterfaceChange=!0,this.remapF0OnInterfaceChange=!0,this._bumpTexture=null,this.bumpTexture=null,this._isTintEnabled=!1,this.isTintEnabled=!1,this.tintColor=V.White(),this.tintColorAtDistance=1,this.tintThickness=1,this._tintTexture=null,this.tintTexture=null,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}isReadyForSubMesh(e,t,i){if(!this._isEnabled)return!0;const n=this._material._disableBumpMap;return!(e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.ClearCoatTextureEnabled&&!this._texture.isReadyOrNotBlocking()||this._textureRoughness&&x.ClearCoatTextureEnabled&&!this._textureRoughness.isReadyOrNotBlocking()||i.getCaps().standardDerivatives&&this._bumpTexture&&x.ClearCoatBumpTextureEnabled&&!n&&!this._bumpTexture.isReady()||this._isTintEnabled&&this._tintTexture&&x.ClearCoatTintTextureEnabled&&!this._tintTexture.isReadyOrNotBlocking()))}prepareDefinesBeforeAttributes(e,t){var i;this._isEnabled?(e.CLEARCOAT=!0,e.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE=this._useRoughnessFromMainTexture,e.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL=this._texture!==null&&this._texture._texture===((i=this._textureRoughness)===null||i===void 0?void 0:i._texture)&&this._texture.checkTransformsAreIdentical(this._textureRoughness),e.CLEARCOAT_REMAP_F0=this._remapF0OnInterfaceChange,e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.ClearCoatTextureEnabled?P.PrepareDefinesForMergedUV(this._texture,e,"CLEARCOAT_TEXTURE"):e.CLEARCOAT_TEXTURE=!1,this._textureRoughness&&x.ClearCoatTextureEnabled?P.PrepareDefinesForMergedUV(this._textureRoughness,e,"CLEARCOAT_TEXTURE_ROUGHNESS"):e.CLEARCOAT_TEXTURE_ROUGHNESS=!1,this._bumpTexture&&x.ClearCoatBumpTextureEnabled?P.PrepareDefinesForMergedUV(this._bumpTexture,e,"CLEARCOAT_BUMP"):e.CLEARCOAT_BUMP=!1,e.CLEARCOAT_DEFAULTIOR=this._indexOfRefraction===ae._DefaultIndexOfRefraction,this._isTintEnabled?(e.CLEARCOAT_TINT=!0,this._tintTexture&&x.ClearCoatTintTextureEnabled?(P.PrepareDefinesForMergedUV(this._tintTexture,e,"CLEARCOAT_TINT_TEXTURE"),e.CLEARCOAT_TINT_GAMMATEXTURE=this._tintTexture.gammaSpace):e.CLEARCOAT_TINT_TEXTURE=!1):(e.CLEARCOAT_TINT=!1,e.CLEARCOAT_TINT_TEXTURE=!1))):(e.CLEARCOAT=!1,e.CLEARCOAT_TEXTURE=!1,e.CLEARCOAT_TEXTURE_ROUGHNESS=!1,e.CLEARCOAT_BUMP=!1,e.CLEARCOAT_TINT=!1,e.CLEARCOAT_TINT_TEXTURE=!1,e.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,e.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL=!1,e.CLEARCOAT_DEFAULTIOR=!1,e.CLEARCOAT_TEXTUREDIRECTUV=0,e.CLEARCOAT_TEXTURE_ROUGHNESSDIRECTUV=0,e.CLEARCOAT_BUMPDIRECTUV=0,e.CLEARCOAT_REMAP_F0=!1,e.CLEARCOAT_TINT_TEXTUREDIRECTUV=0,e.CLEARCOAT_TINT_GAMMATEXTURE=!1)}bindForSubMesh(e,t,i,n){var s,r,o,l,c,f,u,h;if(!this._isEnabled)return;const _=n.materialDefines,d=this._material.isFrozen,E=this._material._disableBumpMap,p=this._material._invertNormalMapX,g=this._material._invertNormalMapY,R=_.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL;if(!e.useUbo||!d||!e.isSync){R&&x.ClearCoatTextureEnabled?(e.updateFloat4("vClearCoatInfos",this._texture.coordinatesIndex,this._texture.level,-1,-1),P.BindTextureMatrix(this._texture,e,"clearCoat")):(this._texture||this._textureRoughness)&&x.ClearCoatTextureEnabled&&(e.updateFloat4("vClearCoatInfos",(r=(s=this._texture)===null||s===void 0?void 0:s.coordinatesIndex)!==null&&r!==void 0?r:0,(l=(o=this._texture)===null||o===void 0?void 0:o.level)!==null&&l!==void 0?l:0,(f=(c=this._textureRoughness)===null||c===void 0?void 0:c.coordinatesIndex)!==null&&f!==void 0?f:0,(h=(u=this._textureRoughness)===null||u===void 0?void 0:u.level)!==null&&h!==void 0?h:0),this._texture&&P.BindTextureMatrix(this._texture,e,"clearCoat"),this._textureRoughness&&!R&&!_.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE&&P.BindTextureMatrix(this._textureRoughness,e,"clearCoatRoughness")),this._bumpTexture&&i.getCaps().standardDerivatives&&x.ClearCoatTextureEnabled&&!E&&(e.updateFloat2("vClearCoatBumpInfos",this._bumpTexture.coordinatesIndex,this._bumpTexture.level),P.BindTextureMatrix(this._bumpTexture,e,"clearCoatBump"),t._mirroredCameraPosition?e.updateFloat2("vClearCoatTangentSpaceParams",p?1:-1,g?1:-1):e.updateFloat2("vClearCoatTangentSpaceParams",p?-1:1,g?-1:1)),this._tintTexture&&x.ClearCoatTintTextureEnabled&&(e.updateFloat2("vClearCoatTintInfos",this._tintTexture.coordinatesIndex,this._tintTexture.level),P.BindTextureMatrix(this._tintTexture,e,"clearCoatTint")),e.updateFloat2("vClearCoatParams",this.intensity,this.roughness);const M=1-this._indexOfRefraction,b=1+this._indexOfRefraction,O=Math.pow(-M/b,2),I=1/this._indexOfRefraction;e.updateFloat4("vClearCoatRefractionParams",O,I,M,b),this._isTintEnabled&&(e.updateFloat4("vClearCoatTintParams",this.tintColor.r,this.tintColor.g,this.tintColor.b,Math.max(1e-5,this.tintThickness)),e.updateFloat("clearCoatColorAtDistance",Math.max(1e-5,this.tintColorAtDistance)))}t.texturesEnabled&&(this._texture&&x.ClearCoatTextureEnabled&&e.setTexture("clearCoatSampler",this._texture),this._textureRoughness&&!R&&!_.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE&&x.ClearCoatTextureEnabled&&e.setTexture("clearCoatRoughnessSampler",this._textureRoughness),this._bumpTexture&&i.getCaps().standardDerivatives&&x.ClearCoatBumpTextureEnabled&&!E&&e.setTexture("clearCoatBumpSampler",this._bumpTexture),this._isTintEnabled&&this._tintTexture&&x.ClearCoatTintTextureEnabled&&e.setTexture("clearCoatTintSampler",this._tintTexture))}hasTexture(e){return this._texture===e||this._textureRoughness===e||this._bumpTexture===e||this._tintTexture===e}getActiveTextures(e){this._texture&&e.push(this._texture),this._textureRoughness&&e.push(this._textureRoughness),this._bumpTexture&&e.push(this._bumpTexture),this._tintTexture&&e.push(this._tintTexture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture),this._textureRoughness&&this._textureRoughness.animations&&this._textureRoughness.animations.length>0&&e.push(this._textureRoughness),this._bumpTexture&&this._bumpTexture.animations&&this._bumpTexture.animations.length>0&&e.push(this._bumpTexture),this._tintTexture&&this._tintTexture.animations&&this._tintTexture.animations.length>0&&e.push(this._tintTexture)}dispose(e){var t,i,n,s;e&&((t=this._texture)===null||t===void 0||t.dispose(),(i=this._textureRoughness)===null||i===void 0||i.dispose(),(n=this._bumpTexture)===null||n===void 0||n.dispose(),(s=this._tintTexture)===null||s===void 0||s.dispose())}getClassName(){return"PBRClearCoatConfiguration"}addFallbacks(e,t,i){return e.CLEARCOAT_BUMP&&t.addFallback(i++,"CLEARCOAT_BUMP"),e.CLEARCOAT_TINT&&t.addFallback(i++,"CLEARCOAT_TINT"),e.CLEARCOAT&&t.addFallback(i++,"CLEARCOAT"),i}getSamplers(e){e.push("clearCoatSampler","clearCoatRoughnessSampler","clearCoatBumpSampler","clearCoatTintSampler")}getUniforms(){return{ubo:[{name:"vClearCoatParams",size:2,type:"vec2"},{name:"vClearCoatRefractionParams",size:4,type:"vec4"},{name:"vClearCoatInfos",size:4,type:"vec4"},{name:"clearCoatMatrix",size:16,type:"mat4"},{name:"clearCoatRoughnessMatrix",size:16,type:"mat4"},{name:"vClearCoatBumpInfos",size:2,type:"vec2"},{name:"vClearCoatTangentSpaceParams",size:2,type:"vec2"},{name:"clearCoatBumpMatrix",size:16,type:"mat4"},{name:"vClearCoatTintParams",size:4,type:"vec4"},{name:"clearCoatColorAtDistance",size:1,type:"float"},{name:"vClearCoatTintInfos",size:2,type:"vec2"},{name:"clearCoatTintMatrix",size:16,type:"mat4"}]}}}ae._DefaultIndexOfRefraction=1.5;m([T(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"isEnabled",void 0);m([T()],ae.prototype,"intensity",void 0);m([T()],ae.prototype,"roughness",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"indexOfRefraction",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"texture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"useRoughnessFromMainTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"textureRoughness",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"remapF0OnInterfaceChange",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"bumpTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"isTintEnabled",void 0);m([be()],ae.prototype,"tintColor",void 0);m([T()],ae.prototype,"tintColorAtDistance",void 0);m([T()],ae.prototype,"tintThickness",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],ae.prototype,"tintTexture",void 0);class Da extends Ke{constructor(){super(...arguments),this.IRIDESCENCE=!1,this.IRIDESCENCE_TEXTURE=!1,this.IRIDESCENCE_TEXTUREDIRECTUV=0,this.IRIDESCENCE_THICKNESS_TEXTURE=!1,this.IRIDESCENCE_THICKNESS_TEXTUREDIRECTUV=0,this.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE=!1}}class me extends st{constructor(e,t=!0){super(e,"PBRIridescence",110,new Da,t),this._isEnabled=!1,this.isEnabled=!1,this.intensity=1,this.minimumThickness=me._DefaultMinimumThickness,this.maximumThickness=me._DefaultMaximumThickness,this.indexOfRefraction=me._DefaultIndexOfRefraction,this._texture=null,this.texture=null,this._thicknessTexture=null,this.thicknessTexture=null,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}isReadyForSubMesh(e,t){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.IridescenceTextureEnabled&&!this._texture.isReadyOrNotBlocking()||this._thicknessTexture&&x.IridescenceTextureEnabled&&!this._thicknessTexture.isReadyOrNotBlocking())):!0}prepareDefinesBeforeAttributes(e,t){var i;this._isEnabled?(e.IRIDESCENCE=!0,e.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE=this._texture!==null&&this._texture._texture===((i=this._thicknessTexture)===null||i===void 0?void 0:i._texture)&&this._texture.checkTransformsAreIdentical(this._thicknessTexture),e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.IridescenceTextureEnabled?P.PrepareDefinesForMergedUV(this._texture,e,"IRIDESCENCE_TEXTURE"):e.IRIDESCENCE_TEXTURE=!1,!e.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE&&this._thicknessTexture&&x.IridescenceTextureEnabled?P.PrepareDefinesForMergedUV(this._thicknessTexture,e,"IRIDESCENCE_THICKNESS_TEXTURE"):e.IRIDESCENCE_THICKNESS_TEXTURE=!1)):(e.IRIDESCENCE=!1,e.IRIDESCENCE_TEXTURE=!1,e.IRIDESCENCE_THICKNESS_TEXTURE=!1,e.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE=!1,e.IRIDESCENCE_TEXTUREDIRECTUV=0,e.IRIDESCENCE_THICKNESS_TEXTUREDIRECTUV=0)}bindForSubMesh(e,t,i,n){var s,r,o,l,c,f,u,h;if(!this._isEnabled)return;const _=n.materialDefines,d=this._material.isFrozen,E=_.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE;(!e.useUbo||!d||!e.isSync)&&(E&&x.IridescenceTextureEnabled?(e.updateFloat4("vIridescenceInfos",this._texture.coordinatesIndex,this._texture.level,-1,-1),P.BindTextureMatrix(this._texture,e,"iridescence")):(this._texture||this._thicknessTexture)&&x.IridescenceTextureEnabled&&(e.updateFloat4("vIridescenceInfos",(r=(s=this._texture)===null||s===void 0?void 0:s.coordinatesIndex)!==null&&r!==void 0?r:0,(l=(o=this._texture)===null||o===void 0?void 0:o.level)!==null&&l!==void 0?l:0,(f=(c=this._thicknessTexture)===null||c===void 0?void 0:c.coordinatesIndex)!==null&&f!==void 0?f:0,(h=(u=this._thicknessTexture)===null||u===void 0?void 0:u.level)!==null&&h!==void 0?h:0),this._texture&&P.BindTextureMatrix(this._texture,e,"iridescence"),this._thicknessTexture&&!E&&!_.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE&&P.BindTextureMatrix(this._thicknessTexture,e,"iridescenceThickness")),e.updateFloat4("vIridescenceParams",this.intensity,this.indexOfRefraction,this.minimumThickness,this.maximumThickness)),t.texturesEnabled&&(this._texture&&x.IridescenceTextureEnabled&&e.setTexture("iridescenceSampler",this._texture),this._thicknessTexture&&!E&&!_.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE&&x.IridescenceTextureEnabled&&e.setTexture("iridescenceThicknessSampler",this._thicknessTexture))}hasTexture(e){return this._texture===e||this._thicknessTexture===e}getActiveTextures(e){this._texture&&e.push(this._texture),this._thicknessTexture&&e.push(this._thicknessTexture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture),this._thicknessTexture&&this._thicknessTexture.animations&&this._thicknessTexture.animations.length>0&&e.push(this._thicknessTexture)}dispose(e){var t,i;e&&((t=this._texture)===null||t===void 0||t.dispose(),(i=this._thicknessTexture)===null||i===void 0||i.dispose())}getClassName(){return"PBRIridescenceConfiguration"}addFallbacks(e,t,i){return e.IRIDESCENCE&&t.addFallback(i++,"IRIDESCENCE"),i}getSamplers(e){e.push("iridescenceSampler","iridescenceThicknessSampler")}getUniforms(){return{ubo:[{name:"vIridescenceParams",size:4,type:"vec4"},{name:"vIridescenceInfos",size:4,type:"vec4"},{name:"iridescenceMatrix",size:16,type:"mat4"},{name:"iridescenceThicknessMatrix",size:16,type:"mat4"}]}}}me._DefaultMinimumThickness=100;me._DefaultMaximumThickness=400;me._DefaultIndexOfRefraction=1.3;m([T(),C("_markAllSubMeshesAsTexturesDirty")],me.prototype,"isEnabled",void 0);m([T()],me.prototype,"intensity",void 0);m([T()],me.prototype,"minimumThickness",void 0);m([T()],me.prototype,"maximumThickness",void 0);m([T()],me.prototype,"indexOfRefraction",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],me.prototype,"texture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],me.prototype,"thicknessTexture",void 0);class Fa extends Ke{constructor(){super(...arguments),this.ANISOTROPIC=!1,this.ANISOTROPIC_TEXTURE=!1,this.ANISOTROPIC_TEXTUREDIRECTUV=0,this.MAINUV1=!1}}class pt extends st{constructor(e,t=!0){super(e,"PBRAnisotropic",110,new Fa,t),this._isEnabled=!1,this.isEnabled=!1,this.intensity=1,this.direction=new ft(1,0),this._texture=null,this.texture=null,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}isReadyForSubMesh(e,t){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&this._texture&&x.AnisotropicTextureEnabled&&!this._texture.isReadyOrNotBlocking()):!0}prepareDefinesBeforeAttributes(e,t,i){this._isEnabled?(e.ANISOTROPIC=this._isEnabled,this._isEnabled&&!i.isVerticesDataPresent(y.TangentKind)&&(e._needUVs=!0,e.MAINUV1=!0),e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.AnisotropicTextureEnabled?P.PrepareDefinesForMergedUV(this._texture,e,"ANISOTROPIC_TEXTURE"):e.ANISOTROPIC_TEXTURE=!1)):(e.ANISOTROPIC=!1,e.ANISOTROPIC_TEXTURE=!1,e.ANISOTROPIC_TEXTUREDIRECTUV=0,e.MAINUV1=!1)}bindForSubMesh(e,t){if(!this._isEnabled)return;const i=this._material.isFrozen;(!e.useUbo||!i||!e.isSync)&&(this._texture&&x.AnisotropicTextureEnabled&&(e.updateFloat2("vAnisotropyInfos",this._texture.coordinatesIndex,this._texture.level),P.BindTextureMatrix(this._texture,e,"anisotropy")),e.updateFloat3("vAnisotropy",this.direction.x,this.direction.y,this.intensity)),t.texturesEnabled&&this._texture&&x.AnisotropicTextureEnabled&&e.setTexture("anisotropySampler",this._texture)}hasTexture(e){return this._texture===e}getActiveTextures(e){this._texture&&e.push(this._texture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture)}dispose(e){e&&this._texture&&this._texture.dispose()}getClassName(){return"PBRAnisotropicConfiguration"}addFallbacks(e,t,i){return e.ANISOTROPIC&&t.addFallback(i++,"ANISOTROPIC"),i}getSamplers(e){e.push("anisotropySampler")}getUniforms(){return{ubo:[{name:"vAnisotropy",size:3,type:"vec3"},{name:"vAnisotropyInfos",size:2,type:"vec2"},{name:"anisotropyMatrix",size:16,type:"mat4"}]}}}m([T(),C("_markAllSubMeshesAsTexturesDirty")],pt.prototype,"isEnabled",void 0);m([T()],pt.prototype,"intensity",void 0);m([rs()],pt.prototype,"direction",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],pt.prototype,"texture",void 0);class Ba extends Ke{constructor(){super(...arguments),this.SHEEN=!1,this.SHEEN_TEXTURE=!1,this.SHEEN_GAMMATEXTURE=!1,this.SHEEN_TEXTURE_ROUGHNESS=!1,this.SHEEN_TEXTUREDIRECTUV=0,this.SHEEN_TEXTURE_ROUGHNESSDIRECTUV=0,this.SHEEN_LINKWITHALBEDO=!1,this.SHEEN_ROUGHNESS=!1,this.SHEEN_ALBEDOSCALING=!1,this.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,this.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL=!1}}class Le extends st{constructor(e,t=!0){super(e,"Sheen",120,new Ba,t),this._isEnabled=!1,this.isEnabled=!1,this._linkSheenWithAlbedo=!1,this.linkSheenWithAlbedo=!1,this.intensity=1,this.color=V.White(),this._texture=null,this.texture=null,this._useRoughnessFromMainTexture=!0,this.useRoughnessFromMainTexture=!0,this._roughness=null,this.roughness=null,this._textureRoughness=null,this.textureRoughness=null,this._albedoScaling=!1,this.albedoScaling=!1,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}isReadyForSubMesh(e,t){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.SheenTextureEnabled&&!this._texture.isReadyOrNotBlocking()||this._textureRoughness&&x.SheenTextureEnabled&&!this._textureRoughness.isReadyOrNotBlocking())):!0}prepareDefinesBeforeAttributes(e,t){var i;this._isEnabled?(e.SHEEN=!0,e.SHEEN_LINKWITHALBEDO=this._linkSheenWithAlbedo,e.SHEEN_ROUGHNESS=this._roughness!==null,e.SHEEN_ALBEDOSCALING=this._albedoScaling,e.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE=this._useRoughnessFromMainTexture,e.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL=this._texture!==null&&this._texture._texture===((i=this._textureRoughness)===null||i===void 0?void 0:i._texture)&&this._texture.checkTransformsAreIdentical(this._textureRoughness),e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&x.SheenTextureEnabled?(P.PrepareDefinesForMergedUV(this._texture,e,"SHEEN_TEXTURE"),e.SHEEN_GAMMATEXTURE=this._texture.gammaSpace):e.SHEEN_TEXTURE=!1,this._textureRoughness&&x.SheenTextureEnabled?P.PrepareDefinesForMergedUV(this._textureRoughness,e,"SHEEN_TEXTURE_ROUGHNESS"):e.SHEEN_TEXTURE_ROUGHNESS=!1)):(e.SHEEN=!1,e.SHEEN_TEXTURE=!1,e.SHEEN_TEXTURE_ROUGHNESS=!1,e.SHEEN_LINKWITHALBEDO=!1,e.SHEEN_ROUGHNESS=!1,e.SHEEN_ALBEDOSCALING=!1,e.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,e.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL=!1,e.SHEEN_GAMMATEXTURE=!1,e.SHEEN_TEXTUREDIRECTUV=0,e.SHEEN_TEXTURE_ROUGHNESSDIRECTUV=0)}bindForSubMesh(e,t,i,n){var s,r,o,l,c,f,u,h;if(!this._isEnabled)return;const _=n.materialDefines,d=this._material.isFrozen,E=_.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL;(!e.useUbo||!d||!e.isSync)&&(E&&x.SheenTextureEnabled?(e.updateFloat4("vSheenInfos",this._texture.coordinatesIndex,this._texture.level,-1,-1),P.BindTextureMatrix(this._texture,e,"sheen")):(this._texture||this._textureRoughness)&&x.SheenTextureEnabled&&(e.updateFloat4("vSheenInfos",(r=(s=this._texture)===null||s===void 0?void 0:s.coordinatesIndex)!==null&&r!==void 0?r:0,(l=(o=this._texture)===null||o===void 0?void 0:o.level)!==null&&l!==void 0?l:0,(f=(c=this._textureRoughness)===null||c===void 0?void 0:c.coordinatesIndex)!==null&&f!==void 0?f:0,(h=(u=this._textureRoughness)===null||u===void 0?void 0:u.level)!==null&&h!==void 0?h:0),this._texture&&P.BindTextureMatrix(this._texture,e,"sheen"),this._textureRoughness&&!E&&!_.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE&&P.BindTextureMatrix(this._textureRoughness,e,"sheenRoughness")),e.updateFloat4("vSheenColor",this.color.r,this.color.g,this.color.b,this.intensity),this._roughness!==null&&e.updateFloat("vSheenRoughness",this._roughness)),t.texturesEnabled&&(this._texture&&x.SheenTextureEnabled&&e.setTexture("sheenSampler",this._texture),this._textureRoughness&&!E&&!_.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE&&x.SheenTextureEnabled&&e.setTexture("sheenRoughnessSampler",this._textureRoughness))}hasTexture(e){return this._texture===e||this._textureRoughness===e}getActiveTextures(e){this._texture&&e.push(this._texture),this._textureRoughness&&e.push(this._textureRoughness)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture),this._textureRoughness&&this._textureRoughness.animations&&this._textureRoughness.animations.length>0&&e.push(this._textureRoughness)}dispose(e){var t,i;e&&((t=this._texture)===null||t===void 0||t.dispose(),(i=this._textureRoughness)===null||i===void 0||i.dispose())}getClassName(){return"PBRSheenConfiguration"}addFallbacks(e,t,i){return e.SHEEN&&t.addFallback(i++,"SHEEN"),i}getSamplers(e){e.push("sheenSampler","sheenRoughnessSampler")}getUniforms(){return{ubo:[{name:"vSheenColor",size:4,type:"vec4"},{name:"vSheenRoughness",size:1,type:"float"},{name:"vSheenInfos",size:4,type:"vec4"},{name:"sheenMatrix",size:16,type:"mat4"},{name:"sheenRoughnessMatrix",size:16,type:"mat4"}]}}}m([T(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"isEnabled",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"linkSheenWithAlbedo",void 0);m([T()],Le.prototype,"intensity",void 0);m([be()],Le.prototype,"color",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"texture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"useRoughnessFromMainTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"roughness",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"textureRoughness",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],Le.prototype,"albedoScaling",void 0);class Ua extends Ke{constructor(){super(...arguments),this.SUBSURFACE=!1,this.SS_REFRACTION=!1,this.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=!1,this.SS_TRANSLUCENCY=!1,this.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=!1,this.SS_SCATTERING=!1,this.SS_THICKNESSANDMASK_TEXTURE=!1,this.SS_THICKNESSANDMASK_TEXTUREDIRECTUV=0,this.SS_HAS_THICKNESS=!1,this.SS_REFRACTIONINTENSITY_TEXTURE=!1,this.SS_REFRACTIONINTENSITY_TEXTUREDIRECTUV=0,this.SS_TRANSLUCENCYINTENSITY_TEXTURE=!1,this.SS_TRANSLUCENCYINTENSITY_TEXTUREDIRECTUV=0,this.SS_REFRACTIONMAP_3D=!1,this.SS_REFRACTIONMAP_OPPOSITEZ=!1,this.SS_LODINREFRACTIONALPHA=!1,this.SS_GAMMAREFRACTION=!1,this.SS_RGBDREFRACTION=!1,this.SS_LINEARSPECULARREFRACTION=!1,this.SS_LINKREFRACTIONTOTRANSPARENCY=!1,this.SS_ALBEDOFORREFRACTIONTINT=!1,this.SS_ALBEDOFORTRANSLUCENCYTINT=!1,this.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=!1,this.SS_USE_THICKNESS_AS_DEPTH=!1,this.SS_MASK_FROM_THICKNESS_TEXTURE=!1,this.SS_USE_GLTF_TEXTURES=!1}}class te extends st{constructor(e,t=!0){super(e,"PBRSubSurface",130,new Ua,t),this._isRefractionEnabled=!1,this.isRefractionEnabled=!1,this._isTranslucencyEnabled=!1,this.isTranslucencyEnabled=!1,this._isScatteringEnabled=!1,this.isScatteringEnabled=!1,this._scatteringDiffusionProfileIndex=0,this.refractionIntensity=1,this.translucencyIntensity=1,this.useAlbedoToTintRefraction=!1,this.useAlbedoToTintTranslucency=!1,this._thicknessTexture=null,this.thicknessTexture=null,this._refractionTexture=null,this.refractionTexture=null,this._indexOfRefraction=1.5,this.indexOfRefraction=1.5,this._volumeIndexOfRefraction=-1,this._invertRefractionY=!1,this.invertRefractionY=!1,this._linkRefractionWithTransparency=!1,this.linkRefractionWithTransparency=!1,this.minimumThickness=0,this.maximumThickness=1,this.useThicknessAsDepth=!1,this.tintColor=V.White(),this.tintColorAtDistance=1,this.diffusionDistance=V.White(),this._useMaskFromThicknessTexture=!1,this.useMaskFromThicknessTexture=!1,this._refractionIntensityTexture=null,this.refractionIntensityTexture=null,this._translucencyIntensityTexture=null,this.translucencyIntensityTexture=null,this._useGltfStyleTextures=!1,this.useGltfStyleTextures=!1,this._scene=e.getScene(),this.registerForExtraEvents=!0,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1],this._internalMarkScenePrePassDirty=e._dirtyCallbacks[32]}get scatteringDiffusionProfile(){return this._scene.subSurfaceConfiguration?this._scene.subSurfaceConfiguration.ssDiffusionProfileColors[this._scatteringDiffusionProfileIndex]:null}set scatteringDiffusionProfile(e){!this._scene.enableSubSurfaceForPrePass()||e&&(this._scatteringDiffusionProfileIndex=this._scene.subSurfaceConfiguration.addDiffusionProfile(e))}get volumeIndexOfRefraction(){return this._volumeIndexOfRefraction>=1?this._volumeIndexOfRefraction:this._indexOfRefraction}set volumeIndexOfRefraction(e){e>=1?this._volumeIndexOfRefraction=e:this._volumeIndexOfRefraction=-1}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isRefractionEnabled||this._isTranslucencyEnabled||this._isScatteringEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}_markScenePrePassDirty(){this._internalMarkAllSubMeshesAsTexturesDirty(),this._internalMarkScenePrePassDirty()}isReadyForSubMesh(e,t){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled)return!0;if(e._areTexturesDirty&&t.texturesEnabled){if(this._thicknessTexture&&x.ThicknessTextureEnabled&&!this._thicknessTexture.isReadyOrNotBlocking())return!1;const i=this._getRefractionTexture(t);if(i&&x.RefractionTextureEnabled&&!i.isReadyOrNotBlocking())return!1}return!0}prepareDefinesBeforeAttributes(e,t){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled){e.SUBSURFACE=!1,e.SS_TRANSLUCENCY=!1,e.SS_SCATTERING=!1,e.SS_REFRACTION=!1,e.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_THICKNESSANDMASK_TEXTURE=!1,e.SS_THICKNESSANDMASK_TEXTUREDIRECTUV=0,e.SS_HAS_THICKNESS=!1,e.SS_REFRACTIONINTENSITY_TEXTURE=!1,e.SS_REFRACTIONINTENSITY_TEXTUREDIRECTUV=0,e.SS_TRANSLUCENCYINTENSITY_TEXTURE=!1,e.SS_TRANSLUCENCYINTENSITY_TEXTUREDIRECTUV=0,e.SS_REFRACTIONMAP_3D=!1,e.SS_REFRACTIONMAP_OPPOSITEZ=!1,e.SS_LODINREFRACTIONALPHA=!1,e.SS_GAMMAREFRACTION=!1,e.SS_RGBDREFRACTION=!1,e.SS_LINEARSPECULARREFRACTION=!1,e.SS_LINKREFRACTIONTOTRANSPARENCY=!1,e.SS_ALBEDOFORREFRACTIONTINT=!1,e.SS_ALBEDOFORTRANSLUCENCYTINT=!1,e.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=!1,e.SS_USE_THICKNESS_AS_DEPTH=!1,e.SS_MASK_FROM_THICKNESS_TEXTURE=!1,e.SS_USE_GLTF_TEXTURES=!1;return}if(e._areTexturesDirty){e.SUBSURFACE=!0,e.SS_TRANSLUCENCY=this._isTranslucencyEnabled,e.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_SCATTERING=this._isScatteringEnabled,e.SS_THICKNESSANDMASK_TEXTURE=!1,e.SS_REFRACTIONINTENSITY_TEXTURE=!1,e.SS_TRANSLUCENCYINTENSITY_TEXTURE=!1,e.SS_HAS_THICKNESS=!1,e.SS_MASK_FROM_THICKNESS_TEXTURE=!1,e.SS_USE_GLTF_TEXTURES=!1,e.SS_REFRACTION=!1,e.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_REFRACTIONMAP_3D=!1,e.SS_GAMMAREFRACTION=!1,e.SS_RGBDREFRACTION=!1,e.SS_LINEARSPECULARREFRACTION=!1,e.SS_REFRACTIONMAP_OPPOSITEZ=!1,e.SS_LODINREFRACTIONALPHA=!1,e.SS_LINKREFRACTIONTOTRANSPARENCY=!1,e.SS_ALBEDOFORREFRACTIONTINT=!1,e.SS_ALBEDOFORTRANSLUCENCYTINT=!1,e.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=!1,e.SS_USE_THICKNESS_AS_DEPTH=!1;const i=!!this._thicknessTexture&&!!this._refractionIntensityTexture&&this._refractionIntensityTexture.checkTransformsAreIdentical(this._thicknessTexture)&&this._refractionIntensityTexture._texture===this._thicknessTexture._texture,n=!!this._thicknessTexture&&!!this._translucencyIntensityTexture&&this._translucencyIntensityTexture.checkTransformsAreIdentical(this._thicknessTexture)&&this._translucencyIntensityTexture._texture===this._thicknessTexture._texture,s=(i||!this._refractionIntensityTexture)&&(n||!this._translucencyIntensityTexture);if(e._areTexturesDirty&&t.texturesEnabled&&(this._thicknessTexture&&x.ThicknessTextureEnabled&&P.PrepareDefinesForMergedUV(this._thicknessTexture,e,"SS_THICKNESSANDMASK_TEXTURE"),this._refractionIntensityTexture&&x.RefractionIntensityTextureEnabled&&!s&&P.PrepareDefinesForMergedUV(this._refractionIntensityTexture,e,"SS_REFRACTIONINTENSITY_TEXTURE"),this._translucencyIntensityTexture&&x.TranslucencyIntensityTextureEnabled&&!s&&P.PrepareDefinesForMergedUV(this._translucencyIntensityTexture,e,"SS_TRANSLUCENCYINTENSITY_TEXTURE")),e.SS_HAS_THICKNESS=this.maximumThickness-this.minimumThickness!==0,e.SS_MASK_FROM_THICKNESS_TEXTURE=(this._useMaskFromThicknessTexture||!!this._refractionIntensityTexture||!!this._translucencyIntensityTexture)&&s,e.SS_USE_GLTF_TEXTURES=this._useGltfStyleTextures,e.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=(this._useMaskFromThicknessTexture||!!this._refractionIntensityTexture)&&s,e.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=(this._useMaskFromThicknessTexture||!!this._translucencyIntensityTexture)&&s,this._isRefractionEnabled&&t.texturesEnabled){const r=this._getRefractionTexture(t);r&&x.RefractionTextureEnabled&&(e.SS_REFRACTION=!0,e.SS_REFRACTIONMAP_3D=r.isCube,e.SS_GAMMAREFRACTION=r.gammaSpace,e.SS_RGBDREFRACTION=r.isRGBD,e.SS_LINEARSPECULARREFRACTION=r.linearSpecularLOD,e.SS_REFRACTIONMAP_OPPOSITEZ=r.invertZ,e.SS_LODINREFRACTIONALPHA=r.lodLevelInAlpha,e.SS_LINKREFRACTIONTOTRANSPARENCY=this._linkRefractionWithTransparency,e.SS_ALBEDOFORREFRACTIONTINT=this.useAlbedoToTintRefraction,e.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=r.isCube&&r.boundingBoxSize,e.SS_USE_THICKNESS_AS_DEPTH=this.useThicknessAsDepth)}this._isTranslucencyEnabled&&(e.SS_ALBEDOFORTRANSLUCENCYTINT=this.useAlbedoToTintTranslucency)}}hardBindForSubMesh(e,t,i,n){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled)return;n.getRenderingMesh().getWorldMatrix().decompose(F.Vector3[0]);const s=Math.max(Math.abs(F.Vector3[0].x),Math.abs(F.Vector3[0].y),Math.abs(F.Vector3[0].z));e.updateFloat2("vThicknessParam",this.minimumThickness*s,(this.maximumThickness-this.minimumThickness)*s)}bindForSubMesh(e,t,i,n){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled)return;const s=n.materialDefines,r=this._material.isFrozen,o=this._material.realTimeFiltering,l=s.LODBASEDMICROSFURACE,c=this._getRefractionTexture(t);if(!e.useUbo||!r||!e.isSync){if(this._thicknessTexture&&x.ThicknessTextureEnabled&&(e.updateFloat2("vThicknessInfos",this._thicknessTexture.coordinatesIndex,this._thicknessTexture.level),P.BindTextureMatrix(this._thicknessTexture,e,"thickness")),this._refractionIntensityTexture&&x.RefractionIntensityTextureEnabled&&s.SS_REFRACTIONINTENSITY_TEXTURE&&(e.updateFloat2("vRefractionIntensityInfos",this._refractionIntensityTexture.coordinatesIndex,this._refractionIntensityTexture.level),P.BindTextureMatrix(this._refractionIntensityTexture,e,"refractionIntensity")),this._translucencyIntensityTexture&&x.TranslucencyIntensityTextureEnabled&&s.SS_TRANSLUCENCYINTENSITY_TEXTURE&&(e.updateFloat2("vTranslucencyIntensityInfos",this._translucencyIntensityTexture.coordinatesIndex,this._translucencyIntensityTexture.level),P.BindTextureMatrix(this._translucencyIntensityTexture,e,"translucencyIntensity")),c&&x.RefractionTextureEnabled){e.updateMatrix("refractionMatrix",c.getReflectionTextureMatrix());let f=1;c.isCube||c.depth&&(f=c.depth);const u=c.getSize().width,h=this.volumeIndexOfRefraction;if(e.updateFloat4("vRefractionInfos",c.level,1/h,f,this._invertRefractionY?-1:1),e.updateFloat4("vRefractionMicrosurfaceInfos",u,c.lodGenerationScale,c.lodGenerationOffset,1/this.indexOfRefraction),o&&e.updateFloat2("vRefractionFilteringInfo",u,xe.Log2(u)),c.boundingBoxSize){const _=c;e.updateVector3("vRefractionPosition",_.boundingBoxPosition),e.updateVector3("vRefractionSize",_.boundingBoxSize)}}this._isScatteringEnabled&&e.updateFloat("scatteringDiffusionProfile",this._scatteringDiffusionProfileIndex),e.updateColor3("vDiffusionDistance",this.diffusionDistance),e.updateFloat4("vTintColor",this.tintColor.r,this.tintColor.g,this.tintColor.b,Math.max(1e-5,this.tintColorAtDistance)),e.updateFloat3("vSubSurfaceIntensity",this.refractionIntensity,this.translucencyIntensity,0)}t.texturesEnabled&&(this._thicknessTexture&&x.ThicknessTextureEnabled&&e.setTexture("thicknessSampler",this._thicknessTexture),this._refractionIntensityTexture&&x.RefractionIntensityTextureEnabled&&s.SS_REFRACTIONINTENSITY_TEXTURE&&e.setTexture("refractionIntensitySampler",this._refractionIntensityTexture),this._translucencyIntensityTexture&&x.TranslucencyIntensityTextureEnabled&&s.SS_TRANSLUCENCYINTENSITY_TEXTURE&&e.setTexture("translucencyIntensitySampler",this._translucencyIntensityTexture),c&&x.RefractionTextureEnabled&&(l?e.setTexture("refractionSampler",c):(e.setTexture("refractionSampler",c._lodTextureMid||c),e.setTexture("refractionSamplerLow",c._lodTextureLow||c),e.setTexture("refractionSamplerHigh",c._lodTextureHigh||c))))}_getRefractionTexture(e){return this._refractionTexture?this._refractionTexture:this._isRefractionEnabled?e.environmentTexture:null}get disableAlphaBlending(){return this._isRefractionEnabled&&this._linkRefractionWithTransparency}fillRenderTargetTextures(e){x.RefractionTextureEnabled&&this._refractionTexture&&this._refractionTexture.isRenderTarget&&e.push(this._refractionTexture)}hasTexture(e){return this._thicknessTexture===e||this._refractionTexture===e}hasRenderTargetTextures(){return!!(x.RefractionTextureEnabled&&this._refractionTexture&&this._refractionTexture.isRenderTarget)}getActiveTextures(e){this._thicknessTexture&&e.push(this._thicknessTexture),this._refractionTexture&&e.push(this._refractionTexture)}getAnimatables(e){this._thicknessTexture&&this._thicknessTexture.animations&&this._thicknessTexture.animations.length>0&&e.push(this._thicknessTexture),this._refractionTexture&&this._refractionTexture.animations&&this._refractionTexture.animations.length>0&&e.push(this._refractionTexture)}dispose(e){e&&(this._thicknessTexture&&this._thicknessTexture.dispose(),this._refractionTexture&&this._refractionTexture.dispose())}getClassName(){return"PBRSubSurfaceConfiguration"}addFallbacks(e,t,i){return e.SS_SCATTERING&&t.addFallback(i++,"SS_SCATTERING"),e.SS_TRANSLUCENCY&&t.addFallback(i++,"SS_TRANSLUCENCY"),i}getSamplers(e){e.push("thicknessSampler","refractionIntensitySampler","translucencyIntensitySampler","refractionSampler","refractionSamplerLow","refractionSamplerHigh")}getUniforms(){return{ubo:[{name:"vRefractionMicrosurfaceInfos",size:4,type:"vec4"},{name:"vRefractionFilteringInfo",size:2,type:"vec2"},{name:"vTranslucencyIntensityInfos",size:2,type:"vec2"},{name:"vRefractionInfos",size:4,type:"vec4"},{name:"refractionMatrix",size:16,type:"mat4"},{name:"vThicknessInfos",size:2,type:"vec2"},{name:"vRefractionIntensityInfos",size:2,type:"vec2"},{name:"thicknessMatrix",size:16,type:"mat4"},{name:"refractionIntensityMatrix",size:16,type:"mat4"},{name:"translucencyIntensityMatrix",size:16,type:"mat4"},{name:"vThicknessParam",size:2,type:"vec2"},{name:"vDiffusionDistance",size:3,type:"vec3"},{name:"vTintColor",size:4,type:"vec4"},{name:"vSubSurfaceIntensity",size:3,type:"vec3"},{name:"vRefractionPosition",size:3,type:"vec3"},{name:"vRefractionSize",size:3,type:"vec3"},{name:"scatteringDiffusionProfile",size:1,type:"float"}]}}}m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"isRefractionEnabled",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"isTranslucencyEnabled",void 0);m([T(),C("_markScenePrePassDirty")],te.prototype,"isScatteringEnabled",void 0);m([T()],te.prototype,"_scatteringDiffusionProfileIndex",void 0);m([T()],te.prototype,"refractionIntensity",void 0);m([T()],te.prototype,"translucencyIntensity",void 0);m([T()],te.prototype,"useAlbedoToTintRefraction",void 0);m([T()],te.prototype,"useAlbedoToTintTranslucency",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"thicknessTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"refractionTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"indexOfRefraction",void 0);m([T()],te.prototype,"_volumeIndexOfRefraction",void 0);m([C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"volumeIndexOfRefraction",null);m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"invertRefractionY",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"linkRefractionWithTransparency",void 0);m([T()],te.prototype,"minimumThickness",void 0);m([T()],te.prototype,"maximumThickness",void 0);m([T()],te.prototype,"useThicknessAsDepth",void 0);m([be()],te.prototype,"tintColor",void 0);m([T()],te.prototype,"tintColorAtDistance",void 0);m([be()],te.prototype,"diffusionDistance",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"useMaskFromThicknessTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"refractionIntensityTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"translucencyIntensityTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],te.prototype,"useGltfStyleTextures",void 0);const qe={effect:null,subMesh:null};class Xi extends Ke{constructor(e){super(e),this.PBR=!0,this.NUM_SAMPLES="0",this.REALTIME_FILTERING=!1,this.MAINUV1=!1,this.MAINUV2=!1,this.MAINUV3=!1,this.MAINUV4=!1,this.MAINUV5=!1,this.MAINUV6=!1,this.UV1=!1,this.UV2=!1,this.UV3=!1,this.UV4=!1,this.UV5=!1,this.UV6=!1,this.ALBEDO=!1,this.GAMMAALBEDO=!1,this.ALBEDODIRECTUV=0,this.VERTEXCOLOR=!1,this.BAKED_VERTEX_ANIMATION_TEXTURE=!1,this.AMBIENT=!1,this.AMBIENTDIRECTUV=0,this.AMBIENTINGRAYSCALE=!1,this.OPACITY=!1,this.VERTEXALPHA=!1,this.OPACITYDIRECTUV=0,this.OPACITYRGB=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.ALPHABLEND=!1,this.ALPHAFROMALBEDO=!1,this.ALPHATESTVALUE="0.5",this.SPECULAROVERALPHA=!1,this.RADIANCEOVERALPHA=!1,this.ALPHAFRESNEL=!1,this.LINEARALPHAFRESNEL=!1,this.PREMULTIPLYALPHA=!1,this.EMISSIVE=!1,this.EMISSIVEDIRECTUV=0,this.GAMMAEMISSIVE=!1,this.REFLECTIVITY=!1,this.REFLECTIVITY_GAMMA=!1,this.REFLECTIVITYDIRECTUV=0,this.SPECULARTERM=!1,this.MICROSURFACEFROMREFLECTIVITYMAP=!1,this.MICROSURFACEAUTOMATIC=!1,this.LODBASEDMICROSFURACE=!1,this.MICROSURFACEMAP=!1,this.MICROSURFACEMAPDIRECTUV=0,this.METALLICWORKFLOW=!1,this.ROUGHNESSSTOREINMETALMAPALPHA=!1,this.ROUGHNESSSTOREINMETALMAPGREEN=!1,this.METALLNESSSTOREINMETALMAPBLUE=!1,this.AOSTOREINMETALMAPRED=!1,this.METALLIC_REFLECTANCE=!1,this.METALLIC_REFLECTANCE_GAMMA=!1,this.METALLIC_REFLECTANCEDIRECTUV=0,this.METALLIC_REFLECTANCE_USE_ALPHA_ONLY=!1,this.REFLECTANCE=!1,this.REFLECTANCE_GAMMA=!1,this.REFLECTANCEDIRECTUV=0,this.ENVIRONMENTBRDF=!1,this.ENVIRONMENTBRDF_RGBD=!1,this.NORMAL=!1,this.TANGENT=!1,this.BUMP=!1,this.BUMPDIRECTUV=0,this.OBJECTSPACE_NORMALMAP=!1,this.PARALLAX=!1,this.PARALLAXOCCLUSION=!1,this.NORMALXYSCALE=!0,this.LIGHTMAP=!1,this.LIGHTMAPDIRECTUV=0,this.USELIGHTMAPASSHADOWMAP=!1,this.GAMMALIGHTMAP=!1,this.RGBDLIGHTMAP=!1,this.REFLECTION=!1,this.REFLECTIONMAP_3D=!1,this.REFLECTIONMAP_SPHERICAL=!1,this.REFLECTIONMAP_PLANAR=!1,this.REFLECTIONMAP_CUBIC=!1,this.USE_LOCAL_REFLECTIONMAP_CUBIC=!1,this.REFLECTIONMAP_PROJECTION=!1,this.REFLECTIONMAP_SKYBOX=!1,this.REFLECTIONMAP_EXPLICIT=!1,this.REFLECTIONMAP_EQUIRECTANGULAR=!1,this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,this.INVERTCUBICMAP=!1,this.USESPHERICALFROMREFLECTIONMAP=!1,this.USEIRRADIANCEMAP=!1,this.USESPHERICALINVERTEX=!1,this.REFLECTIONMAP_OPPOSITEZ=!1,this.LODINREFLECTIONALPHA=!1,this.GAMMAREFLECTION=!1,this.RGBDREFLECTION=!1,this.LINEARSPECULARREFLECTION=!1,this.RADIANCEOCCLUSION=!1,this.HORIZONOCCLUSION=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.INSTANCESCOLOR=!1,this.PREPASS=!1,this.PREPASS_IRRADIANCE=!1,this.PREPASS_IRRADIANCE_INDEX=-1,this.PREPASS_ALBEDO_SQRT=!1,this.PREPASS_ALBEDO_SQRT_INDEX=-1,this.PREPASS_DEPTH=!1,this.PREPASS_DEPTH_INDEX=-1,this.PREPASS_NORMAL=!1,this.PREPASS_NORMAL_INDEX=-1,this.PREPASS_POSITION=!1,this.PREPASS_POSITION_INDEX=-1,this.PREPASS_VELOCITY=!1,this.PREPASS_VELOCITY_INDEX=-1,this.PREPASS_REFLECTIVITY=!1,this.PREPASS_REFLECTIVITY_INDEX=-1,this.SCENE_MRT_COUNT=0,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.BONETEXTURE=!1,this.BONES_VELOCITY_ENABLED=!1,this.NONUNIFORMSCALING=!1,this.MORPHTARGETS=!1,this.MORPHTARGETS_NORMAL=!1,this.MORPHTARGETS_TANGENT=!1,this.MORPHTARGETS_UV=!1,this.NUM_MORPH_INFLUENCERS=0,this.MORPHTARGETS_TEXTURE=!1,this.IMAGEPROCESSING=!1,this.VIGNETTE=!1,this.VIGNETTEBLENDMODEMULTIPLY=!1,this.VIGNETTEBLENDMODEOPAQUE=!1,this.TONEMAPPING=!1,this.TONEMAPPING_ACES=!1,this.CONTRAST=!1,this.COLORCURVES=!1,this.COLORGRADING=!1,this.COLORGRADING3D=!1,this.SAMPLER3DGREENDEPTH=!1,this.SAMPLER3DBGRMAP=!1,this.DITHER=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.EXPOSURE=!1,this.MULTIVIEW=!1,this.ORDER_INDEPENDENT_TRANSPARENCY=!1,this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS=!1,this.USEPHYSICALLIGHTFALLOFF=!1,this.USEGLTFLIGHTFALLOFF=!1,this.TWOSIDEDLIGHTING=!1,this.SHADOWFLOAT=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.LOGARITHMICDEPTH=!1,this.FORCENORMALFORWARD=!1,this.SPECULARAA=!1,this.UNLIT=!1,this.DEBUGMODE=0,this.rebuild()}reset(){super.reset(),this.ALPHATESTVALUE="0.5",this.PBR=!0,this.NORMALXYSCALE=!0}}class W extends os{constructor(e,t){super(e,t),this._directIntensity=1,this._emissiveIntensity=1,this._environmentIntensity=1,this._specularIntensity=1,this._lightingInfos=new qi(this._directIntensity,this._emissiveIntensity,this._environmentIntensity,this._specularIntensity),this._disableBumpMap=!1,this._albedoTexture=null,this._ambientTexture=null,this._ambientTextureStrength=1,this._ambientTextureImpactOnAnalyticalLights=W.DEFAULT_AO_ON_ANALYTICAL_LIGHTS,this._opacityTexture=null,this._reflectionTexture=null,this._emissiveTexture=null,this._reflectivityTexture=null,this._metallicTexture=null,this._metallic=null,this._roughness=null,this._metallicF0Factor=1,this._metallicReflectanceColor=V.White(),this._useOnlyMetallicFromMetallicReflectanceTexture=!1,this._metallicReflectanceTexture=null,this._reflectanceTexture=null,this._microSurfaceTexture=null,this._bumpTexture=null,this._lightmapTexture=null,this._ambientColor=new V(0,0,0),this._albedoColor=new V(1,1,1),this._reflectivityColor=new V(1,1,1),this._reflectionColor=new V(1,1,1),this._emissiveColor=new V(0,0,0),this._microSurface=.9,this._useLightmapAsShadowmap=!1,this._useHorizonOcclusion=!0,this._useRadianceOcclusion=!0,this._useAlphaFromAlbedoTexture=!1,this._useSpecularOverAlpha=!0,this._useMicroSurfaceFromReflectivityMapAlpha=!1,this._useRoughnessFromMetallicTextureAlpha=!0,this._useRoughnessFromMetallicTextureGreen=!1,this._useMetallnessFromMetallicTextureBlue=!1,this._useAmbientOcclusionFromMetallicTextureRed=!1,this._useAmbientInGrayScale=!1,this._useAutoMicroSurfaceFromReflectivityMap=!1,this._lightFalloff=W.LIGHTFALLOFF_PHYSICAL,this._useRadianceOverAlpha=!0,this._useObjectSpaceNormalMap=!1,this._useParallax=!1,this._useParallaxOcclusion=!1,this._parallaxScaleBias=.05,this._disableLighting=!1,this._maxSimultaneousLights=4,this._invertNormalMapX=!1,this._invertNormalMapY=!1,this._twoSidedLighting=!1,this._alphaCutOff=.4,this._forceAlphaTest=!1,this._useAlphaFresnel=!1,this._useLinearAlphaFresnel=!1,this._environmentBRDFTexture=null,this._forceIrradianceInFragment=!1,this._realTimeFiltering=!1,this._realTimeFilteringQuality=8,this._forceNormalForward=!1,this._enableSpecularAntiAliasing=!1,this._imageProcessingObserver=null,this._renderTargets=new gt(16),this._globalAmbientColor=new V(0,0,0),this._useLogarithmicDepth=!1,this._unlit=!1,this._debugMode=0,this.debugMode=0,this._debugLimit=-1,this._debugFactor=1,this._cacheHasRenderTargetTextures=!1,this.brdf=new oe(this),this.clearCoat=new ae(this),this.iridescence=new me(this),this.anisotropy=new pt(this),this.sheen=new Le(this),this.subSurface=new te(this),this.detailMap=new ls(this),this._attachImageProcessingConfiguration(null),this.getRenderTargetTextures=()=>(this._renderTargets.reset(),x.ReflectionTextureEnabled&&this._reflectionTexture&&this._reflectionTexture.isRenderTarget&&this._renderTargets.push(this._reflectionTexture),this._eventInfo.renderTargets=this._renderTargets,this._callbackPluginEventFillRenderTargetTextures(this._eventInfo),this._renderTargets),this._environmentBRDFTexture=hn(this.getScene()),this.prePassConfiguration=new bi}get realTimeFiltering(){return this._realTimeFiltering}set realTimeFiltering(e){this._realTimeFiltering=e,this.markAsDirty(1)}get realTimeFilteringQuality(){return this._realTimeFilteringQuality}set realTimeFilteringQuality(e){this._realTimeFilteringQuality=e,this.markAsDirty(1)}get canRenderToMRT(){return!0}_attachImageProcessingConfiguration(e){e!==this._imageProcessingConfiguration&&(this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),e?this._imageProcessingConfiguration=e:this._imageProcessingConfiguration=this.getScene().imageProcessingConfiguration,this._imageProcessingConfiguration&&(this._imageProcessingObserver=this._imageProcessingConfiguration.onUpdateParameters.add(()=>{this._markAllSubMeshesAsImageProcessingDirty()})))}get hasRenderTargetTextures(){return x.ReflectionTextureEnabled&&this._reflectionTexture&&this._reflectionTexture.isRenderTarget?!0:this._cacheHasRenderTargetTextures}get isPrePassCapable(){return!this.disableDepthWrite}getClassName(){return"PBRBaseMaterial"}get useLogarithmicDepth(){return this._useLogarithmicDepth}set useLogarithmicDepth(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported}get _disableAlphaBlending(){var e;return this._transparencyMode===W.PBRMATERIAL_OPAQUE||this._transparencyMode===W.PBRMATERIAL_ALPHATEST||((e=this.subSurface)===null||e===void 0?void 0:e.disableAlphaBlending)}needAlphaBlending(){return this._disableAlphaBlending?!1:this.alpha<1||this._opacityTexture!=null||this._shouldUseAlphaFromAlbedoTexture()}needAlphaTesting(){var e;return this._forceAlphaTest?!0:!((e=this.subSurface)===null||e===void 0)&&e.disableAlphaBlending?!1:this._hasAlphaChannel()&&(this._transparencyMode==null||this._transparencyMode===W.PBRMATERIAL_ALPHATEST)}_shouldUseAlphaFromAlbedoTexture(){return this._albedoTexture!=null&&this._albedoTexture.hasAlpha&&this._useAlphaFromAlbedoTexture&&this._transparencyMode!==W.PBRMATERIAL_OPAQUE}_hasAlphaChannel(){return this._albedoTexture!=null&&this._albedoTexture.hasAlpha||this._opacityTexture!=null}getAlphaTestTexture(){return this._albedoTexture}isReadyForSubMesh(e,t,i){if(this._uniformBufferLayoutBuilt||this.buildUniformLayout(),t.effect&&this.isFrozen&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===i)return!0;t.materialDefines||(this._callbackPluginEventGeneric(Dt.GetDefineNames,this._eventInfo),t.materialDefines=new Xi(this._eventInfo.defineNames));const n=t.materialDefines;if(this._isReadyForSubMesh(t))return!0;const s=this.getScene(),r=s.getEngine();if(n._areTexturesDirty&&(this._eventInfo.hasRenderTargetTextures=!1,this._callbackPluginEventHasRenderTargetTextures(this._eventInfo),this._cacheHasRenderTargetTextures=this._eventInfo.hasRenderTargetTextures,s.texturesEnabled)){if(this._albedoTexture&&x.DiffuseTextureEnabled&&!this._albedoTexture.isReadyOrNotBlocking()||this._ambientTexture&&x.AmbientTextureEnabled&&!this._ambientTexture.isReadyOrNotBlocking()||this._opacityTexture&&x.OpacityTextureEnabled&&!this._opacityTexture.isReadyOrNotBlocking())return!1;const f=this._getReflectionTexture();if(f&&x.ReflectionTextureEnabled&&(!f.isReadyOrNotBlocking()||f.irradianceTexture&&!f.irradianceTexture.isReadyOrNotBlocking())||this._lightmapTexture&&x.LightmapTextureEnabled&&!this._lightmapTexture.isReadyOrNotBlocking()||this._emissiveTexture&&x.EmissiveTextureEnabled&&!this._emissiveTexture.isReadyOrNotBlocking())return!1;if(x.SpecularTextureEnabled){if(this._metallicTexture){if(!this._metallicTexture.isReadyOrNotBlocking())return!1}else if(this._reflectivityTexture&&!this._reflectivityTexture.isReadyOrNotBlocking())return!1;if(this._metallicReflectanceTexture&&!this._metallicReflectanceTexture.isReadyOrNotBlocking()||this._reflectanceTexture&&!this._reflectanceTexture.isReadyOrNotBlocking()||this._microSurfaceTexture&&!this._microSurfaceTexture.isReadyOrNotBlocking())return!1}if(r.getCaps().standardDerivatives&&this._bumpTexture&&x.BumpTextureEnabled&&!this._disableBumpMap&&!this._bumpTexture.isReady()||this._environmentBRDFTexture&&x.ReflectionTextureEnabled&&!this._environmentBRDFTexture.isReady())return!1}if(this._eventInfo.isReadyForSubMesh=!0,this._eventInfo.defines=n,this._callbackPluginEventIsReadyForSubMesh(this._eventInfo),!this._eventInfo.isReadyForSubMesh||n._areImageProcessingDirty&&this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.isReady())return!1;!r.getCaps().standardDerivatives&&!e.isVerticesDataPresent(y.NormalKind)&&(e.createNormals(!0),H.Warn("PBRMaterial: Normals have been created for the mesh: "+e.name));const o=t.effect,l=n._areLightsDisposed;let c=this._prepareEffect(e,n,this.onCompiled,this.onError,i,null,t.getRenderingMesh().hasThinInstances);if(c)if(this._onEffectCreatedObservable&&(qe.effect=c,qe.subMesh=t,this._onEffectCreatedObservable.notifyObservers(qe)),this.allowShaderHotSwapping&&o&&!c.isReady()){if(c=o,n.markAsUnprocessed(),l)return n._areLightsDisposed=!0,!1}else s.resetCachedMaterial(),t.setEffect(c,n,this._materialContext);return!t.effect||!t.effect.isReady()?!1:(n._renderId=s.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!i,s.performancePriority!==cs.BackwardCompatible&&(this.checkReadyOnlyOnce=!0),!0)}isMetallicWorkflow(){return!!(this._metallic!=null||this._roughness!=null||this._metallicTexture)}_prepareEffect(e,t,i=null,n=null,s=null,r=null,o){if(this._prepareDefines(e,t,s,r,o),!t.isDirty)return null;t.markAsProcessed();const c=this.getScene().getEngine(),f=new ds;let u=0;t.USESPHERICALINVERTEX&&f.addFallback(u++,"USESPHERICALINVERTEX"),t.FOG&&f.addFallback(u,"FOG"),t.SPECULARAA&&f.addFallback(u,"SPECULARAA"),t.POINTSIZE&&f.addFallback(u,"POINTSIZE"),t.LOGARITHMICDEPTH&&f.addFallback(u,"LOGARITHMICDEPTH"),t.PARALLAX&&f.addFallback(u,"PARALLAX"),t.PARALLAXOCCLUSION&&f.addFallback(u++,"PARALLAXOCCLUSION"),t.ENVIRONMENTBRDF&&f.addFallback(u++,"ENVIRONMENTBRDF"),t.TANGENT&&f.addFallback(u++,"TANGENT"),t.BUMP&&f.addFallback(u++,"BUMP"),u=P.HandleFallbacksForShadows(t,f,this._maxSimultaneousLights,u++),t.SPECULARTERM&&f.addFallback(u++,"SPECULARTERM"),t.USESPHERICALFROMREFLECTIONMAP&&f.addFallback(u++,"USESPHERICALFROMREFLECTIONMAP"),t.USEIRRADIANCEMAP&&f.addFallback(u++,"USEIRRADIANCEMAP"),t.LIGHTMAP&&f.addFallback(u++,"LIGHTMAP"),t.NORMAL&&f.addFallback(u++,"NORMAL"),t.AMBIENT&&f.addFallback(u++,"AMBIENT"),t.EMISSIVE&&f.addFallback(u++,"EMISSIVE"),t.VERTEXCOLOR&&f.addFallback(u++,"VERTEXCOLOR"),t.MORPHTARGETS&&f.addFallback(u++,"MORPHTARGETS"),t.MULTIVIEW&&f.addFallback(0,"MULTIVIEW");const h=[y.PositionKind];t.NORMAL&&h.push(y.NormalKind),t.TANGENT&&h.push(y.TangentKind);for(let M=1;M<=6;++M)t["UV"+M]&&h.push(`uv${M===1?"":M}`);t.VERTEXCOLOR&&h.push(y.ColorKind),t.INSTANCESCOLOR&&h.push(y.ColorInstanceKind),P.PrepareAttributesForBones(h,e,t,f),P.PrepareAttributesForInstances(h,t),P.PrepareAttributesForMorphTargets(h,e,t),P.PrepareAttributesForBakedVertexAnimation(h,e,t);let _="pbr";const d=["world","view","viewProjection","vEyePosition","vLightsType","vAmbientColor","vAlbedoColor","vReflectivityColor","vMetallicReflectanceFactors","vEmissiveColor","visibility","vReflectionColor","vFogInfos","vFogColor","pointSize","vAlbedoInfos","vAmbientInfos","vOpacityInfos","vReflectionInfos","vReflectionPosition","vReflectionSize","vEmissiveInfos","vReflectivityInfos","vReflectionFilteringInfo","vMetallicReflectanceInfos","vReflectanceInfos","vMicroSurfaceSamplerInfos","vBumpInfos","vLightmapInfos","mBones","albedoMatrix","ambientMatrix","opacityMatrix","reflectionMatrix","emissiveMatrix","reflectivityMatrix","normalMatrix","microSurfaceSamplerMatrix","bumpMatrix","lightmapMatrix","metallicReflectanceMatrix","reflectanceMatrix","vLightingIntensity","logarithmicDepthConstant","vSphericalX","vSphericalY","vSphericalZ","vSphericalXX_ZZ","vSphericalYY_ZZ","vSphericalZZ","vSphericalXY","vSphericalYZ","vSphericalZX","vSphericalL00","vSphericalL1_1","vSphericalL10","vSphericalL11","vSphericalL2_2","vSphericalL2_1","vSphericalL20","vSphericalL21","vSphericalL22","vReflectionMicrosurfaceInfos","vTangentSpaceParams","boneTextureWidth","vDebugMode","morphTargetTextureInfo","morphTargetTextureIndices"],E=["albedoSampler","reflectivitySampler","ambientSampler","emissiveSampler","bumpSampler","lightmapSampler","opacitySampler","reflectionSampler","reflectionSamplerLow","reflectionSamplerHigh","irradianceSampler","microSurfaceSampler","environmentBrdfSampler","boneSampler","metallicReflectanceSampler","reflectanceSampler","morphTargets","oitDepthSampler","oitFrontColorSampler"],p=["Material","Scene","Mesh"];this._eventInfo.fallbacks=f,this._eventInfo.fallbackRank=u,this._eventInfo.defines=t,this._eventInfo.uniforms=d,this._eventInfo.attributes=h,this._eventInfo.samplers=E,this._eventInfo.uniformBuffersNames=p,this._eventInfo.customCode=void 0,this._eventInfo.mesh=e,this._callbackPluginEventGeneric(Dt.PrepareEffect,this._eventInfo),bi.AddUniforms(d),fs(d),Ft&&(Ft.PrepareUniforms(d,t),Ft.PrepareSamplers(E,t)),P.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:p,samplers:E,defines:t,maxSimultaneousLights:this._maxSimultaneousLights});const g={};this.customShaderNameResolve&&(_=this.customShaderNameResolve(_,d,p,E,t,h,g));const R=t.toString();return c.createEffect(_,{attributes:h,uniformsNames:d,uniformBuffersNames:p,samplers:E,defines:R,fallbacks:f,onCompiled:i,onError:n,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights,maxSimultaneousMorphTargets:t.NUM_MORPH_INFLUENCERS},processFinalCode:g.processFinalCode,processCodeAfterIncludes:this._eventInfo.customCode,multiTarget:t.PREPASS},c)}_prepareDefines(e,t,i=null,n=null,s=!1){var r;const o=this.getScene(),l=o.getEngine();P.PrepareDefinesForLights(o,e,t,!0,this._maxSimultaneousLights,this._disableLighting),t._needNormals=!0,P.PrepareDefinesForMultiview(o,t);const c=this.needAlphaBlendingForMesh(e)&&this.getScene().useOrderIndependentTransparency;if(P.PrepareDefinesForPrePass(o,t,this.canRenderToMRT&&!c),P.PrepareDefinesForOIT(o,t,c),t.METALLICWORKFLOW=this.isMetallicWorkflow(),t._areTexturesDirty){if(t._needUVs=!1,o.texturesEnabled){t.ALBEDODIRECTUV=0,t.AMBIENTDIRECTUV=0,t.OPACITYDIRECTUV=0,t.EMISSIVEDIRECTUV=0,t.REFLECTIVITYDIRECTUV=0,t.MICROSURFACEMAPDIRECTUV=0,t.METALLIC_REFLECTANCEDIRECTUV=0,t.REFLECTANCEDIRECTUV=0,t.BUMPDIRECTUV=0,t.LIGHTMAPDIRECTUV=0,l.getCaps().textureLOD&&(t.LODBASEDMICROSFURACE=!0),this._albedoTexture&&x.DiffuseTextureEnabled?(P.PrepareDefinesForMergedUV(this._albedoTexture,t,"ALBEDO"),t.GAMMAALBEDO=this._albedoTexture.gammaSpace):t.ALBEDO=!1,this._ambientTexture&&x.AmbientTextureEnabled?(P.PrepareDefinesForMergedUV(this._ambientTexture,t,"AMBIENT"),t.AMBIENTINGRAYSCALE=this._useAmbientInGrayScale):t.AMBIENT=!1,this._opacityTexture&&x.OpacityTextureEnabled?(P.PrepareDefinesForMergedUV(this._opacityTexture,t,"OPACITY"),t.OPACITYRGB=this._opacityTexture.getAlphaFromRGB):t.OPACITY=!1;const f=this._getReflectionTexture();if(f&&x.ReflectionTextureEnabled){switch(t.REFLECTION=!0,t.GAMMAREFLECTION=f.gammaSpace,t.RGBDREFLECTION=f.isRGBD,t.LODINREFLECTIONALPHA=f.lodLevelInAlpha,t.LINEARSPECULARREFLECTION=f.linearSpecularLOD,this.realTimeFiltering&&this.realTimeFilteringQuality>0?(t.NUM_SAMPLES=""+this.realTimeFilteringQuality,l._features.needTypeSuffixInShaderConstants&&(t.NUM_SAMPLES=t.NUM_SAMPLES+"u"),t.REALTIME_FILTERING=!0):t.REALTIME_FILTERING=!1,f.coordinatesMode===B.INVCUBIC_MODE&&(t.INVERTCUBICMAP=!0),t.REFLECTIONMAP_3D=f.isCube,t.REFLECTIONMAP_OPPOSITEZ=t.REFLECTIONMAP_3D&&this.getScene().useRightHandedSystem?!f.invertZ:f.invertZ,t.REFLECTIONMAP_CUBIC=!1,t.REFLECTIONMAP_EXPLICIT=!1,t.REFLECTIONMAP_PLANAR=!1,t.REFLECTIONMAP_PROJECTION=!1,t.REFLECTIONMAP_SKYBOX=!1,t.REFLECTIONMAP_SPHERICAL=!1,t.REFLECTIONMAP_EQUIRECTANGULAR=!1,t.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,t.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,f.coordinatesMode){case B.EXPLICIT_MODE:t.REFLECTIONMAP_EXPLICIT=!0;break;case B.PLANAR_MODE:t.REFLECTIONMAP_PLANAR=!0;break;case B.PROJECTION_MODE:t.REFLECTIONMAP_PROJECTION=!0;break;case B.SKYBOX_MODE:t.REFLECTIONMAP_SKYBOX=!0;break;case B.SPHERICAL_MODE:t.REFLECTIONMAP_SPHERICAL=!0;break;case B.EQUIRECTANGULAR_MODE:t.REFLECTIONMAP_EQUIRECTANGULAR=!0;break;case B.FIXED_EQUIRECTANGULAR_MODE:t.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!0;break;case B.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:t.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!0;break;case B.CUBIC_MODE:case B.INVCUBIC_MODE:default:t.REFLECTIONMAP_CUBIC=!0,t.USE_LOCAL_REFLECTIONMAP_CUBIC=!!f.boundingBoxSize;break}f.coordinatesMode!==B.SKYBOX_MODE&&(f.irradianceTexture?(t.USEIRRADIANCEMAP=!0,t.USESPHERICALFROMREFLECTIONMAP=!1):f.isCube&&(t.USESPHERICALFROMREFLECTIONMAP=!0,t.USEIRRADIANCEMAP=!1,this._forceIrradianceInFragment||this.realTimeFiltering||l.getCaps().maxVaryingVectors<=8?t.USESPHERICALINVERTEX=!1:t.USESPHERICALINVERTEX=!0))}else t.REFLECTION=!1,t.REFLECTIONMAP_3D=!1,t.REFLECTIONMAP_SPHERICAL=!1,t.REFLECTIONMAP_PLANAR=!1,t.REFLECTIONMAP_CUBIC=!1,t.USE_LOCAL_REFLECTIONMAP_CUBIC=!1,t.REFLECTIONMAP_PROJECTION=!1,t.REFLECTIONMAP_SKYBOX=!1,t.REFLECTIONMAP_EXPLICIT=!1,t.REFLECTIONMAP_EQUIRECTANGULAR=!1,t.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,t.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,t.INVERTCUBICMAP=!1,t.USESPHERICALFROMREFLECTIONMAP=!1,t.USEIRRADIANCEMAP=!1,t.USESPHERICALINVERTEX=!1,t.REFLECTIONMAP_OPPOSITEZ=!1,t.LODINREFLECTIONALPHA=!1,t.GAMMAREFLECTION=!1,t.RGBDREFLECTION=!1,t.LINEARSPECULARREFLECTION=!1;if(this._lightmapTexture&&x.LightmapTextureEnabled?(P.PrepareDefinesForMergedUV(this._lightmapTexture,t,"LIGHTMAP"),t.USELIGHTMAPASSHADOWMAP=this._useLightmapAsShadowmap,t.GAMMALIGHTMAP=this._lightmapTexture.gammaSpace,t.RGBDLIGHTMAP=this._lightmapTexture.isRGBD):t.LIGHTMAP=!1,this._emissiveTexture&&x.EmissiveTextureEnabled?(P.PrepareDefinesForMergedUV(this._emissiveTexture,t,"EMISSIVE"),t.GAMMAEMISSIVE=this._emissiveTexture.gammaSpace):t.EMISSIVE=!1,x.SpecularTextureEnabled){if(this._metallicTexture?(P.PrepareDefinesForMergedUV(this._metallicTexture,t,"REFLECTIVITY"),t.ROUGHNESSSTOREINMETALMAPALPHA=this._useRoughnessFromMetallicTextureAlpha,t.ROUGHNESSSTOREINMETALMAPGREEN=!this._useRoughnessFromMetallicTextureAlpha&&this._useRoughnessFromMetallicTextureGreen,t.METALLNESSSTOREINMETALMAPBLUE=this._useMetallnessFromMetallicTextureBlue,t.AOSTOREINMETALMAPRED=this._useAmbientOcclusionFromMetallicTextureRed,t.REFLECTIVITY_GAMMA=!1):this._reflectivityTexture?(P.PrepareDefinesForMergedUV(this._reflectivityTexture,t,"REFLECTIVITY"),t.MICROSURFACEFROMREFLECTIVITYMAP=this._useMicroSurfaceFromReflectivityMapAlpha,t.MICROSURFACEAUTOMATIC=this._useAutoMicroSurfaceFromReflectivityMap,t.REFLECTIVITY_GAMMA=this._reflectivityTexture.gammaSpace):t.REFLECTIVITY=!1,this._metallicReflectanceTexture||this._reflectanceTexture){const u=this._metallicReflectanceTexture!==null&&this._metallicReflectanceTexture._texture===((r=this._reflectanceTexture)===null||r===void 0?void 0:r._texture)&&this._metallicReflectanceTexture.checkTransformsAreIdentical(this._reflectanceTexture);t.METALLIC_REFLECTANCE_USE_ALPHA_ONLY=this._useOnlyMetallicFromMetallicReflectanceTexture&&!u,this._metallicReflectanceTexture?(P.PrepareDefinesForMergedUV(this._metallicReflectanceTexture,t,"METALLIC_REFLECTANCE"),t.METALLIC_REFLECTANCE_GAMMA=this._metallicReflectanceTexture.gammaSpace):t.METALLIC_REFLECTANCE=!1,this._reflectanceTexture&&!u&&(!this._metallicReflectanceTexture||this._metallicReflectanceTexture&&this._useOnlyMetallicFromMetallicReflectanceTexture)?(P.PrepareDefinesForMergedUV(this._reflectanceTexture,t,"REFLECTANCE"),t.REFLECTANCE_GAMMA=this._reflectanceTexture.gammaSpace):t.REFLECTANCE=!1}else t.METALLIC_REFLECTANCE=!1,t.REFLECTANCE=!1;this._microSurfaceTexture?P.PrepareDefinesForMergedUV(this._microSurfaceTexture,t,"MICROSURFACEMAP"):t.MICROSURFACEMAP=!1}else t.REFLECTIVITY=!1,t.MICROSURFACEMAP=!1;l.getCaps().standardDerivatives&&this._bumpTexture&&x.BumpTextureEnabled&&!this._disableBumpMap?(P.PrepareDefinesForMergedUV(this._bumpTexture,t,"BUMP"),this._useParallax&&this._albedoTexture&&x.DiffuseTextureEnabled?(t.PARALLAX=!0,t.PARALLAXOCCLUSION=!!this._useParallaxOcclusion):t.PARALLAX=!1,t.OBJECTSPACE_NORMALMAP=this._useObjectSpaceNormalMap):(t.BUMP=!1,t.PARALLAX=!1,t.PARALLAXOCCLUSION=!1,t.PARALLAOBJECTSPACE_NORMALMAP=!1),this._environmentBRDFTexture&&x.ReflectionTextureEnabled?(t.ENVIRONMENTBRDF=!0,t.ENVIRONMENTBRDF_RGBD=this._environmentBRDFTexture.isRGBD):(t.ENVIRONMENTBRDF=!1,t.ENVIRONMENTBRDF_RGBD=!1),this._shouldUseAlphaFromAlbedoTexture()?t.ALPHAFROMALBEDO=!0:t.ALPHAFROMALBEDO=!1}t.SPECULAROVERALPHA=this._useSpecularOverAlpha,this._lightFalloff===W.LIGHTFALLOFF_STANDARD?(t.USEPHYSICALLIGHTFALLOFF=!1,t.USEGLTFLIGHTFALLOFF=!1):this._lightFalloff===W.LIGHTFALLOFF_GLTF?(t.USEPHYSICALLIGHTFALLOFF=!1,t.USEGLTFLIGHTFALLOFF=!0):(t.USEPHYSICALLIGHTFALLOFF=!0,t.USEGLTFLIGHTFALLOFF=!1),t.RADIANCEOVERALPHA=this._useRadianceOverAlpha,!this.backFaceCulling&&this._twoSidedLighting?t.TWOSIDEDLIGHTING=!0:t.TWOSIDEDLIGHTING=!1,t.SPECULARAA=l.getCaps().standardDerivatives&&this._enableSpecularAntiAliasing}(t._areTexturesDirty||t._areMiscDirty)&&(t.ALPHATESTVALUE=`${this._alphaCutOff}${this._alphaCutOff%1===0?".":""}`,t.PREMULTIPLYALPHA=this.alphaMode===7||this.alphaMode===8,t.ALPHABLEND=this.needAlphaBlendingForMesh(e),t.ALPHAFRESNEL=this._useAlphaFresnel||this._useLinearAlphaFresnel,t.LINEARALPHAFRESNEL=this._useLinearAlphaFresnel),t._areImageProcessingDirty&&this._imageProcessingConfiguration&&this._imageProcessingConfiguration.prepareDefines(t),t.FORCENORMALFORWARD=this._forceNormalForward,t.RADIANCEOCCLUSION=this._useRadianceOcclusion,t.HORIZONOCCLUSION=this._useHorizonOcclusion,t._areMiscDirty&&(P.PrepareDefinesForMisc(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e)||this._forceAlphaTest,t),t.UNLIT=this._unlit||(this.pointsCloud||this.wireframe)&&!e.isVerticesDataPresent(y.NormalKind),t.DEBUGMODE=this._debugMode),P.PrepareDefinesForFrameBoundValues(o,l,this,t,!!i,n,s),this._eventInfo.defines=t,this._eventInfo.mesh=e,this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo),P.PrepareDefinesForAttributes(e,t,!0,!0,!0,this._transparencyMode!==W.PBRMATERIAL_OPAQUE),this._callbackPluginEventPrepareDefines(this._eventInfo)}forceCompilation(e,t,i){const n={clipPlane:!1,useInstances:!1,...i};this._uniformBufferLayoutBuilt||this.buildUniformLayout(),this._callbackPluginEventGeneric(Dt.GetDefineNames,this._eventInfo);const s=new Xi(this._eventInfo.defineNames),r=this._prepareEffect(e,s,void 0,void 0,n.useInstances,n.clipPlane,e.hasThinInstances);this._onEffectCreatedObservable&&(qe.effect=r,qe.subMesh=null,this._onEffectCreatedObservable.notifyObservers(qe)),r.isReady()?t&&t(this):r.onCompileObservable.add(()=>{t&&t(this)})}buildUniformLayout(){const e=this._uniformBuffer;e.addUniform("vAlbedoInfos",2),e.addUniform("vAmbientInfos",4),e.addUniform("vOpacityInfos",2),e.addUniform("vEmissiveInfos",2),e.addUniform("vLightmapInfos",2),e.addUniform("vReflectivityInfos",3),e.addUniform("vMicroSurfaceSamplerInfos",2),e.addUniform("vReflectionInfos",2),e.addUniform("vReflectionFilteringInfo",2),e.addUniform("vReflectionPosition",3),e.addUniform("vReflectionSize",3),e.addUniform("vBumpInfos",3),e.addUniform("albedoMatrix",16),e.addUniform("ambientMatrix",16),e.addUniform("opacityMatrix",16),e.addUniform("emissiveMatrix",16),e.addUniform("lightmapMatrix",16),e.addUniform("reflectivityMatrix",16),e.addUniform("microSurfaceSamplerMatrix",16),e.addUniform("bumpMatrix",16),e.addUniform("vTangentSpaceParams",2),e.addUniform("reflectionMatrix",16),e.addUniform("vReflectionColor",3),e.addUniform("vAlbedoColor",4),e.addUniform("vLightingIntensity",4),e.addUniform("vReflectionMicrosurfaceInfos",3),e.addUniform("pointSize",1),e.addUniform("vReflectivityColor",4),e.addUniform("vEmissiveColor",3),e.addUniform("vAmbientColor",3),e.addUniform("vDebugMode",2),e.addUniform("vMetallicReflectanceFactors",4),e.addUniform("vMetallicReflectanceInfos",2),e.addUniform("metallicReflectanceMatrix",16),e.addUniform("vReflectanceInfos",2),e.addUniform("reflectanceMatrix",16),e.addUniform("vSphericalL00",3),e.addUniform("vSphericalL1_1",3),e.addUniform("vSphericalL10",3),e.addUniform("vSphericalL11",3),e.addUniform("vSphericalL2_2",3),e.addUniform("vSphericalL2_1",3),e.addUniform("vSphericalL20",3),e.addUniform("vSphericalL21",3),e.addUniform("vSphericalL22",3),e.addUniform("vSphericalX",3),e.addUniform("vSphericalY",3),e.addUniform("vSphericalZ",3),e.addUniform("vSphericalXX_ZZ",3),e.addUniform("vSphericalYY_ZZ",3),e.addUniform("vSphericalZZ",3),e.addUniform("vSphericalXY",3),e.addUniform("vSphericalYZ",3),e.addUniform("vSphericalZX",3),super.buildUniformLayout()}bindForSubMesh(e,t,i){var n,s,r,o;const l=this.getScene(),c=i.materialDefines;if(!c)return;const f=i.effect;if(!f)return;this._activeEffect=f,t.getMeshUniformBuffer().bindToEffect(f,"Mesh"),t.transferToEffect(e);const u=l.getEngine();this._uniformBuffer.bindToEffect(f,"Material"),this.prePassConfiguration.bindForSubMesh(this._activeEffect,l,t,e,this.isFrozen),this._eventInfo.subMesh=i,this._callbackPluginEventHardBindForSubMesh(this._eventInfo),c.OBJECTSPACE_NORMALMAP&&(e.toNormalMatrix(this._normalMatrix),this.bindOnlyNormalMatrix(this._normalMatrix));const h=this._mustRebind(l,f,t.visibility);P.BindBonesParameters(t,this._activeEffect,this.prePassConfiguration);let _=null;const d=this._uniformBuffer;if(h){if(this.bindViewProjection(f),_=this._getReflectionTexture(),!d.useUbo||!this.isFrozen||!d.isSync){if(l.texturesEnabled){if(this._albedoTexture&&x.DiffuseTextureEnabled&&(d.updateFloat2("vAlbedoInfos",this._albedoTexture.coordinatesIndex,this._albedoTexture.level),P.BindTextureMatrix(this._albedoTexture,d,"albedo")),this._ambientTexture&&x.AmbientTextureEnabled&&(d.updateFloat4("vAmbientInfos",this._ambientTexture.coordinatesIndex,this._ambientTexture.level,this._ambientTextureStrength,this._ambientTextureImpactOnAnalyticalLights),P.BindTextureMatrix(this._ambientTexture,d,"ambient")),this._opacityTexture&&x.OpacityTextureEnabled&&(d.updateFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),P.BindTextureMatrix(this._opacityTexture,d,"opacity")),_&&x.ReflectionTextureEnabled){if(d.updateMatrix("reflectionMatrix",_.getReflectionTextureMatrix()),d.updateFloat2("vReflectionInfos",_.level,0),_.boundingBoxSize){const E=_;d.updateVector3("vReflectionPosition",E.boundingBoxPosition),d.updateVector3("vReflectionSize",E.boundingBoxSize)}if(this.realTimeFiltering){const E=_.getSize().width;d.updateFloat2("vReflectionFilteringInfo",E,xe.Log2(E))}if(!c.USEIRRADIANCEMAP){const E=_.sphericalPolynomial;if(c.USESPHERICALFROMREFLECTIONMAP&&E)if(c.SPHERICAL_HARMONICS){const p=E.preScaledHarmonics;d.updateVector3("vSphericalL00",p.l00),d.updateVector3("vSphericalL1_1",p.l1_1),d.updateVector3("vSphericalL10",p.l10),d.updateVector3("vSphericalL11",p.l11),d.updateVector3("vSphericalL2_2",p.l2_2),d.updateVector3("vSphericalL2_1",p.l2_1),d.updateVector3("vSphericalL20",p.l20),d.updateVector3("vSphericalL21",p.l21),d.updateVector3("vSphericalL22",p.l22)}else d.updateFloat3("vSphericalX",E.x.x,E.x.y,E.x.z),d.updateFloat3("vSphericalY",E.y.x,E.y.y,E.y.z),d.updateFloat3("vSphericalZ",E.z.x,E.z.y,E.z.z),d.updateFloat3("vSphericalXX_ZZ",E.xx.x-E.zz.x,E.xx.y-E.zz.y,E.xx.z-E.zz.z),d.updateFloat3("vSphericalYY_ZZ",E.yy.x-E.zz.x,E.yy.y-E.zz.y,E.yy.z-E.zz.z),d.updateFloat3("vSphericalZZ",E.zz.x,E.zz.y,E.zz.z),d.updateFloat3("vSphericalXY",E.xy.x,E.xy.y,E.xy.z),d.updateFloat3("vSphericalYZ",E.yz.x,E.yz.y,E.yz.z),d.updateFloat3("vSphericalZX",E.zx.x,E.zx.y,E.zx.z)}d.updateFloat3("vReflectionMicrosurfaceInfos",_.getSize().width,_.lodGenerationScale,_.lodGenerationOffset)}this._emissiveTexture&&x.EmissiveTextureEnabled&&(d.updateFloat2("vEmissiveInfos",this._emissiveTexture.coordinatesIndex,this._emissiveTexture.level),P.BindTextureMatrix(this._emissiveTexture,d,"emissive")),this._lightmapTexture&&x.LightmapTextureEnabled&&(d.updateFloat2("vLightmapInfos",this._lightmapTexture.coordinatesIndex,this._lightmapTexture.level),P.BindTextureMatrix(this._lightmapTexture,d,"lightmap")),x.SpecularTextureEnabled&&(this._metallicTexture?(d.updateFloat3("vReflectivityInfos",this._metallicTexture.coordinatesIndex,this._metallicTexture.level,this._ambientTextureStrength),P.BindTextureMatrix(this._metallicTexture,d,"reflectivity")):this._reflectivityTexture&&(d.updateFloat3("vReflectivityInfos",this._reflectivityTexture.coordinatesIndex,this._reflectivityTexture.level,1),P.BindTextureMatrix(this._reflectivityTexture,d,"reflectivity")),this._metallicReflectanceTexture&&(d.updateFloat2("vMetallicReflectanceInfos",this._metallicReflectanceTexture.coordinatesIndex,this._metallicReflectanceTexture.level),P.BindTextureMatrix(this._metallicReflectanceTexture,d,"metallicReflectance")),this._reflectanceTexture&&c.REFLECTANCE&&(d.updateFloat2("vReflectanceInfos",this._reflectanceTexture.coordinatesIndex,this._reflectanceTexture.level),P.BindTextureMatrix(this._reflectanceTexture,d,"reflectance")),this._microSurfaceTexture&&(d.updateFloat2("vMicroSurfaceSamplerInfos",this._microSurfaceTexture.coordinatesIndex,this._microSurfaceTexture.level),P.BindTextureMatrix(this._microSurfaceTexture,d,"microSurfaceSampler"))),this._bumpTexture&&u.getCaps().standardDerivatives&&x.BumpTextureEnabled&&!this._disableBumpMap&&(d.updateFloat3("vBumpInfos",this._bumpTexture.coordinatesIndex,this._bumpTexture.level,this._parallaxScaleBias),P.BindTextureMatrix(this._bumpTexture,d,"bump"),l._mirroredCameraPosition?d.updateFloat2("vTangentSpaceParams",this._invertNormalMapX?1:-1,this._invertNormalMapY?1:-1):d.updateFloat2("vTangentSpaceParams",this._invertNormalMapX?-1:1,this._invertNormalMapY?-1:1))}if(this.pointsCloud&&d.updateFloat("pointSize",this.pointSize),c.METALLICWORKFLOW){at.Color3[0].r=this._metallic===void 0||this._metallic===null?1:this._metallic,at.Color3[0].g=this._roughness===void 0||this._roughness===null?1:this._roughness,d.updateColor4("vReflectivityColor",at.Color3[0],1);const E=(s=(n=this.subSurface)===null||n===void 0?void 0:n._indexOfRefraction)!==null&&s!==void 0?s:1.5,p=1,g=Math.pow((E-p)/(E+p),2);this._metallicReflectanceColor.scaleToRef(g*this._metallicF0Factor,at.Color3[0]);const R=this._metallicF0Factor;d.updateColor4("vMetallicReflectanceFactors",at.Color3[0],R)}else d.updateColor4("vReflectivityColor",this._reflectivityColor,this._microSurface);d.updateColor3("vEmissiveColor",x.EmissiveTextureEnabled?this._emissiveColor:V.BlackReadOnly),d.updateColor3("vReflectionColor",this._reflectionColor),!c.SS_REFRACTION&&((r=this.subSurface)===null||r===void 0?void 0:r._linkRefractionWithTransparency)?d.updateColor4("vAlbedoColor",this._albedoColor,1):d.updateColor4("vAlbedoColor",this._albedoColor,this.alpha),this._lightingInfos.x=this._directIntensity,this._lightingInfos.y=this._emissiveIntensity,this._lightingInfos.z=this._environmentIntensity*l.environmentIntensity,this._lightingInfos.w=this._specularIntensity,d.updateVector4("vLightingIntensity",this._lightingInfos),l.ambientColor.multiplyToRef(this._ambientColor,this._globalAmbientColor),d.updateColor3("vAmbientColor",this._globalAmbientColor),d.updateFloat2("vDebugMode",this._debugLimit,this._debugFactor)}l.texturesEnabled&&(this._albedoTexture&&x.DiffuseTextureEnabled&&d.setTexture("albedoSampler",this._albedoTexture),this._ambientTexture&&x.AmbientTextureEnabled&&d.setTexture("ambientSampler",this._ambientTexture),this._opacityTexture&&x.OpacityTextureEnabled&&d.setTexture("opacitySampler",this._opacityTexture),_&&x.ReflectionTextureEnabled&&(c.LODBASEDMICROSFURACE?d.setTexture("reflectionSampler",_):(d.setTexture("reflectionSampler",_._lodTextureMid||_),d.setTexture("reflectionSamplerLow",_._lodTextureLow||_),d.setTexture("reflectionSamplerHigh",_._lodTextureHigh||_)),c.USEIRRADIANCEMAP&&d.setTexture("irradianceSampler",_.irradianceTexture)),c.ENVIRONMENTBRDF&&d.setTexture("environmentBrdfSampler",this._environmentBRDFTexture),this._emissiveTexture&&x.EmissiveTextureEnabled&&d.setTexture("emissiveSampler",this._emissiveTexture),this._lightmapTexture&&x.LightmapTextureEnabled&&d.setTexture("lightmapSampler",this._lightmapTexture),x.SpecularTextureEnabled&&(this._metallicTexture?d.setTexture("reflectivitySampler",this._metallicTexture):this._reflectivityTexture&&d.setTexture("reflectivitySampler",this._reflectivityTexture),this._metallicReflectanceTexture&&d.setTexture("metallicReflectanceSampler",this._metallicReflectanceTexture),this._reflectanceTexture&&c.REFLECTANCE&&d.setTexture("reflectanceSampler",this._reflectanceTexture),this._microSurfaceTexture&&d.setTexture("microSurfaceSampler",this._microSurfaceTexture)),this._bumpTexture&&u.getCaps().standardDerivatives&&x.BumpTextureEnabled&&!this._disableBumpMap&&d.setTexture("bumpSampler",this._bumpTexture)),this.getScene().useOrderIndependentTransparency&&this.needAlphaBlendingForMesh(t)&&this.getScene().depthPeelingRenderer.bind(f),this._eventInfo.subMesh=i,this._callbackPluginEventBindForSubMesh(this._eventInfo),hs(this._activeEffect,this,l),this.bindEyePosition(f)}else l.getEngine()._features.needToAlwaysBindUniformBuffers&&(this._needToBindSceneUbo=!0);(h||!this.isFrozen)&&(l.lightsEnabled&&!this._disableLighting&&P.BindLights(l,t,this._activeEffect,c,this._maxSimultaneousLights),(l.fogEnabled&&t.applyFog&&l.fogMode!==us.FOGMODE_NONE||_||t.receiveShadows||c.PREPASS)&&this.bindView(f),P.BindFogParameters(l,t,this._activeEffect,!0),c.NUM_MORPH_INFLUENCERS&&P.BindMorphTargetParameters(t,this._activeEffect),c.BAKED_VERTEX_ANIMATION_TEXTURE&&((o=t.bakedVertexAnimationManager)===null||o===void 0||o.bind(f,c.INSTANCES)),this._imageProcessingConfiguration.bind(this._activeEffect),P.BindLogDepth(c,this._activeEffect,l)),this._afterBind(t,this._activeEffect),d.update()}getAnimatables(){const e=super.getAnimatables();return this._albedoTexture&&this._albedoTexture.animations&&this._albedoTexture.animations.length>0&&e.push(this._albedoTexture),this._ambientTexture&&this._ambientTexture.animations&&this._ambientTexture.animations.length>0&&e.push(this._ambientTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),this._reflectionTexture&&this._reflectionTexture.animations&&this._reflectionTexture.animations.length>0&&e.push(this._reflectionTexture),this._emissiveTexture&&this._emissiveTexture.animations&&this._emissiveTexture.animations.length>0&&e.push(this._emissiveTexture),this._metallicTexture&&this._metallicTexture.animations&&this._metallicTexture.animations.length>0?e.push(this._metallicTexture):this._reflectivityTexture&&this._reflectivityTexture.animations&&this._reflectivityTexture.animations.length>0&&e.push(this._reflectivityTexture),this._bumpTexture&&this._bumpTexture.animations&&this._bumpTexture.animations.length>0&&e.push(this._bumpTexture),this._lightmapTexture&&this._lightmapTexture.animations&&this._lightmapTexture.animations.length>0&&e.push(this._lightmapTexture),e}_getReflectionTexture(){return this._reflectionTexture?this._reflectionTexture:this.getScene().environmentTexture}getActiveTextures(){const e=super.getActiveTextures();return this._albedoTexture&&e.push(this._albedoTexture),this._ambientTexture&&e.push(this._ambientTexture),this._opacityTexture&&e.push(this._opacityTexture),this._reflectionTexture&&e.push(this._reflectionTexture),this._emissiveTexture&&e.push(this._emissiveTexture),this._reflectivityTexture&&e.push(this._reflectivityTexture),this._metallicTexture&&e.push(this._metallicTexture),this._metallicReflectanceTexture&&e.push(this._metallicReflectanceTexture),this._reflectanceTexture&&e.push(this._reflectanceTexture),this._microSurfaceTexture&&e.push(this._microSurfaceTexture),this._bumpTexture&&e.push(this._bumpTexture),this._lightmapTexture&&e.push(this._lightmapTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._albedoTexture===e||this._ambientTexture===e||this._opacityTexture===e||this._reflectionTexture===e||this._emissiveTexture===e||this._reflectivityTexture===e||this._metallicTexture===e||this._metallicReflectanceTexture===e||this._reflectanceTexture===e||this._microSurfaceTexture===e||this._bumpTexture===e||this._lightmapTexture===e)}setPrePassRenderer(){var e;if(!(!((e=this.subSurface)===null||e===void 0)&&e.isScatteringEnabled))return!1;const t=this.getScene().enableSubSurfaceForPrePass();return t&&(t.enabled=!0),!0}dispose(e,t){var i,n,s,r,o,l,c,f,u,h,_,d;t&&(this._environmentBRDFTexture&&this.getScene().environmentBRDFTexture!==this._environmentBRDFTexture&&this._environmentBRDFTexture.dispose(),(i=this._albedoTexture)===null||i===void 0||i.dispose(),(n=this._ambientTexture)===null||n===void 0||n.dispose(),(s=this._opacityTexture)===null||s===void 0||s.dispose(),(r=this._reflectionTexture)===null||r===void 0||r.dispose(),(o=this._emissiveTexture)===null||o===void 0||o.dispose(),(l=this._metallicTexture)===null||l===void 0||l.dispose(),(c=this._reflectivityTexture)===null||c===void 0||c.dispose(),(f=this._bumpTexture)===null||f===void 0||f.dispose(),(u=this._lightmapTexture)===null||u===void 0||u.dispose(),(h=this._metallicReflectanceTexture)===null||h===void 0||h.dispose(),(_=this._reflectanceTexture)===null||_===void 0||_.dispose(),(d=this._microSurfaceTexture)===null||d===void 0||d.dispose()),this._renderTargets.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),super.dispose(e,t)}}W.PBRMATERIAL_OPAQUE=le.MATERIAL_OPAQUE;W.PBRMATERIAL_ALPHATEST=le.MATERIAL_ALPHATEST;W.PBRMATERIAL_ALPHABLEND=le.MATERIAL_ALPHABLEND;W.PBRMATERIAL_ALPHATESTANDBLEND=le.MATERIAL_ALPHATESTANDBLEND;W.DEFAULT_AO_ON_ANALYTICAL_LIGHTS=0;W.LIGHTFALLOFF_PHYSICAL=0;W.LIGHTFALLOFF_GLTF=1;W.LIGHTFALLOFF_STANDARD=2;m([as()],W.prototype,"_imageProcessingConfiguration",void 0);m([C("_markAllSubMeshesAsMiscDirty")],W.prototype,"debugMode",void 0);m([T()],W.prototype,"useLogarithmicDepth",null);class S extends W{constructor(e,t){super(e,t),this.directIntensity=1,this.emissiveIntensity=1,this.environmentIntensity=1,this.specularIntensity=1,this.disableBumpMap=!1,this.ambientTextureStrength=1,this.ambientTextureImpactOnAnalyticalLights=S.DEFAULT_AO_ON_ANALYTICAL_LIGHTS,this.metallicF0Factor=1,this.metallicReflectanceColor=V.White(),this.useOnlyMetallicFromMetallicReflectanceTexture=!1,this.ambientColor=new V(0,0,0),this.albedoColor=new V(1,1,1),this.reflectivityColor=new V(1,1,1),this.reflectionColor=new V(1,1,1),this.emissiveColor=new V(0,0,0),this.microSurface=1,this.useLightmapAsShadowmap=!1,this.useAlphaFromAlbedoTexture=!1,this.forceAlphaTest=!1,this.alphaCutOff=.4,this.useSpecularOverAlpha=!0,this.useMicroSurfaceFromReflectivityMapAlpha=!1,this.useRoughnessFromMetallicTextureAlpha=!0,this.useRoughnessFromMetallicTextureGreen=!1,this.useMetallnessFromMetallicTextureBlue=!1,this.useAmbientOcclusionFromMetallicTextureRed=!1,this.useAmbientInGrayScale=!1,this.useAutoMicroSurfaceFromReflectivityMap=!1,this.useRadianceOverAlpha=!0,this.useObjectSpaceNormalMap=!1,this.useParallax=!1,this.useParallaxOcclusion=!1,this.parallaxScaleBias=.05,this.disableLighting=!1,this.forceIrradianceInFragment=!1,this.maxSimultaneousLights=4,this.invertNormalMapX=!1,this.invertNormalMapY=!1,this.twoSidedLighting=!1,this.useAlphaFresnel=!1,this.useLinearAlphaFresnel=!1,this.environmentBRDFTexture=null,this.forceNormalForward=!1,this.enableSpecularAntiAliasing=!1,this.useHorizonOcclusion=!0,this.useRadianceOcclusion=!0,this.unlit=!1,this._environmentBRDFTexture=hn(this.getScene())}get refractionTexture(){return this.subSurface.refractionTexture}set refractionTexture(e){this.subSurface.refractionTexture=e,e?this.subSurface.isRefractionEnabled=!0:this.subSurface.linkRefractionWithTransparency||(this.subSurface.isRefractionEnabled=!1)}get indexOfRefraction(){return this.subSurface.indexOfRefraction}set indexOfRefraction(e){this.subSurface.indexOfRefraction=e}get invertRefractionY(){return this.subSurface.invertRefractionY}set invertRefractionY(e){this.subSurface.invertRefractionY=e}get linkRefractionWithTransparency(){return this.subSurface.linkRefractionWithTransparency}set linkRefractionWithTransparency(e){this.subSurface.linkRefractionWithTransparency=e,e&&(this.subSurface.isRefractionEnabled=!0)}get usePhysicalLightFalloff(){return this._lightFalloff===W.LIGHTFALLOFF_PHYSICAL}set usePhysicalLightFalloff(e){e!==this.usePhysicalLightFalloff&&(this._markAllSubMeshesAsTexturesDirty(),e?this._lightFalloff=W.LIGHTFALLOFF_PHYSICAL:this._lightFalloff=W.LIGHTFALLOFF_STANDARD)}get useGLTFLightFalloff(){return this._lightFalloff===W.LIGHTFALLOFF_GLTF}set useGLTFLightFalloff(e){e!==this.useGLTFLightFalloff&&(this._markAllSubMeshesAsTexturesDirty(),e?this._lightFalloff=W.LIGHTFALLOFF_GLTF:this._lightFalloff=W.LIGHTFALLOFF_STANDARD)}get imageProcessingConfiguration(){return this._imageProcessingConfiguration}set imageProcessingConfiguration(e){this._attachImageProcessingConfiguration(e),this._markAllSubMeshesAsTexturesDirty()}get cameraColorCurvesEnabled(){return this.imageProcessingConfiguration.colorCurvesEnabled}set cameraColorCurvesEnabled(e){this.imageProcessingConfiguration.colorCurvesEnabled=e}get cameraColorGradingEnabled(){return this.imageProcessingConfiguration.colorGradingEnabled}set cameraColorGradingEnabled(e){this.imageProcessingConfiguration.colorGradingEnabled=e}get cameraToneMappingEnabled(){return this._imageProcessingConfiguration.toneMappingEnabled}set cameraToneMappingEnabled(e){this._imageProcessingConfiguration.toneMappingEnabled=e}get cameraExposure(){return this._imageProcessingConfiguration.exposure}set cameraExposure(e){this._imageProcessingConfiguration.exposure=e}get cameraContrast(){return this._imageProcessingConfiguration.contrast}set cameraContrast(e){this._imageProcessingConfiguration.contrast=e}get cameraColorGradingTexture(){return this._imageProcessingConfiguration.colorGradingTexture}set cameraColorGradingTexture(e){this._imageProcessingConfiguration.colorGradingTexture=e}get cameraColorCurves(){return this._imageProcessingConfiguration.colorCurves}set cameraColorCurves(e){this._imageProcessingConfiguration.colorCurves=e}getClassName(){return"PBRMaterial"}clone(e){const t=Oe.Clone(()=>new S(e,this.getScene()),this);return t.id=e,t.name=e,this.stencil.copyTo(t.stencil),this.clearCoat.copyTo(t.clearCoat),this.anisotropy.copyTo(t.anisotropy),this.brdf.copyTo(t.brdf),this.sheen.copyTo(t.sheen),this.subSurface.copyTo(t.subSurface),t}serialize(){const e=super.serialize();return e.customType="BABYLON.PBRMaterial",e.clearCoat=this.clearCoat.serialize(),e.anisotropy=this.anisotropy.serialize(),e.brdf=this.brdf.serialize(),e.sheen=this.sheen.serialize(),e.subSurface=this.subSurface.serialize(),e.iridescence=this.iridescence.serialize(),e}static Parse(e,t,i){const n=Oe.Parse(()=>new S(e.name,t),e,t,i);return e.stencil&&n.stencil.parse(e.stencil,t,i),e.clearCoat&&n.clearCoat.parse(e.clearCoat,t,i),e.anisotropy&&n.anisotropy.parse(e.anisotropy,t,i),e.brdf&&n.brdf.parse(e.brdf,t,i),e.sheen&&n.sheen.parse(e.sheen,t,i),e.subSurface&&n.subSurface.parse(e.subSurface,t,i),e.iridescence&&n.iridescence.parse(e.iridescence,t,i),n}}S.PBRMATERIAL_OPAQUE=W.PBRMATERIAL_OPAQUE;S.PBRMATERIAL_ALPHATEST=W.PBRMATERIAL_ALPHATEST;S.PBRMATERIAL_ALPHABLEND=W.PBRMATERIAL_ALPHABLEND;S.PBRMATERIAL_ALPHATESTANDBLEND=W.PBRMATERIAL_ALPHATESTANDBLEND;S.DEFAULT_AO_ON_ANALYTICAL_LIGHTS=W.DEFAULT_AO_ON_ANALYTICAL_LIGHTS;m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"directIntensity",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"emissiveIntensity",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"environmentIntensity",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"specularIntensity",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"disableBumpMap",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"albedoTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"ambientTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"ambientTextureStrength",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"ambientTextureImpactOnAnalyticalLights",void 0);m([ee(),C("_markAllSubMeshesAsTexturesAndMiscDirty")],S.prototype,"opacityTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"reflectionTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"emissiveTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"reflectivityTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"metallicTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"metallic",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"roughness",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"metallicF0Factor",void 0);m([be(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"metallicReflectanceColor",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useOnlyMetallicFromMetallicReflectanceTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"metallicReflectanceTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"reflectanceTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"microSurfaceTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"bumpTexture",void 0);m([ee(),C("_markAllSubMeshesAsTexturesDirty",null)],S.prototype,"lightmapTexture",void 0);m([be("ambient"),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"ambientColor",void 0);m([be("albedo"),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"albedoColor",void 0);m([be("reflectivity"),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"reflectivityColor",void 0);m([be("reflection"),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"reflectionColor",void 0);m([be("emissive"),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"emissiveColor",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"microSurface",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useLightmapAsShadowmap",void 0);m([T(),C("_markAllSubMeshesAsTexturesAndMiscDirty")],S.prototype,"useAlphaFromAlbedoTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesAndMiscDirty")],S.prototype,"forceAlphaTest",void 0);m([T(),C("_markAllSubMeshesAsTexturesAndMiscDirty")],S.prototype,"alphaCutOff",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useSpecularOverAlpha",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useMicroSurfaceFromReflectivityMapAlpha",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useRoughnessFromMetallicTextureAlpha",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useRoughnessFromMetallicTextureGreen",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useMetallnessFromMetallicTextureBlue",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useAmbientOcclusionFromMetallicTextureRed",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useAmbientInGrayScale",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useAutoMicroSurfaceFromReflectivityMap",void 0);m([T()],S.prototype,"usePhysicalLightFalloff",null);m([T()],S.prototype,"useGLTFLightFalloff",null);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useRadianceOverAlpha",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useObjectSpaceNormalMap",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useParallax",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useParallaxOcclusion",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"parallaxScaleBias",void 0);m([T(),C("_markAllSubMeshesAsLightsDirty")],S.prototype,"disableLighting",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"forceIrradianceInFragment",void 0);m([T(),C("_markAllSubMeshesAsLightsDirty")],S.prototype,"maxSimultaneousLights",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"invertNormalMapX",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"invertNormalMapY",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"twoSidedLighting",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useAlphaFresnel",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useLinearAlphaFresnel",void 0);m([C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"environmentBRDFTexture",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"forceNormalForward",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"enableSpecularAntiAliasing",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useHorizonOcclusion",void 0);m([T(),C("_markAllSubMeshesAsTexturesDirty")],S.prototype,"useRadianceOcclusion",void 0);m([T(),C("_markAllSubMeshesAsMiscDirty")],S.prototype,"unlit",void 0);xt("BABYLON.PBRMaterial",S);class Ye{constructor(e,t=0,i=null){this.name=e,this.animations=new Array,this._positions=null,this._normals=null,this._tangents=null,this._uvs=null,this._uniqueId=0,this.onInfluenceChanged=new Y,this._onDataLayoutChanged=new Y,this._animationPropertiesOverride=null,this._scene=i||tt.LastCreatedScene,this.influence=t,this._scene&&(this._uniqueId=this._scene.getUniqueId())}get influence(){return this._influence}set influence(e){if(this._influence===e)return;const t=this._influence;this._influence=e,this.onInfluenceChanged.hasObservers()&&this.onInfluenceChanged.notifyObservers(t===0||e===0)}get animationPropertiesOverride(){return!this._animationPropertiesOverride&&this._scene?this._scene.animationPropertiesOverride:this._animationPropertiesOverride}set animationPropertiesOverride(e){this._animationPropertiesOverride=e}get uniqueId(){return this._uniqueId}get hasPositions(){return!!this._positions}get hasNormals(){return!!this._normals}get hasTangents(){return!!this._tangents}get hasUVs(){return!!this._uvs}setPositions(e){const t=this.hasPositions;this._positions=e,t!==this.hasPositions&&this._onDataLayoutChanged.notifyObservers(void 0)}getPositions(){return this._positions}setNormals(e){const t=this.hasNormals;this._normals=e,t!==this.hasNormals&&this._onDataLayoutChanged.notifyObservers(void 0)}getNormals(){return this._normals}setTangents(e){const t=this.hasTangents;this._tangents=e,t!==this.hasTangents&&this._onDataLayoutChanged.notifyObservers(void 0)}getTangents(){return this._tangents}setUVs(e){const t=this.hasUVs;this._uvs=e,t!==this.hasUVs&&this._onDataLayoutChanged.notifyObservers(void 0)}getUVs(){return this._uvs}clone(){const e=Oe.Clone(()=>new Ye(this.name,this.influence,this._scene),this);return e._positions=this._positions,e._normals=this._normals,e._tangents=this._tangents,e._uvs=this._uvs,e}serialize(){const e={};return e.name=this.name,e.influence=this.influence,e.positions=Array.prototype.slice.call(this.getPositions()),this.id!=null&&(e.id=this.id),this.hasNormals&&(e.normals=Array.prototype.slice.call(this.getNormals())),this.hasTangents&&(e.tangents=Array.prototype.slice.call(this.getTangents())),this.hasUVs&&(e.uvs=Array.prototype.slice.call(this.getUVs())),Oe.AppendSerializedAnimations(this,e),e}getClassName(){return"MorphTarget"}static Parse(e,t){const i=new Ye(e.name,e.influence);if(i.setPositions(e.positions),e.id!=null&&(i.id=e.id),e.normals&&i.setNormals(e.normals),e.tangents&&i.setTangents(e.tangents),e.uvs&&i.setUVs(e.uvs),e.animations){for(let n=0;n<e.animations.length;n++){const s=e.animations[n],r=Ci("BABYLON.Animation");r&&i.animations.push(r.Parse(s))}e.autoAnimate&&t&&t.beginAnimation(i,e.autoAnimateFrom,e.autoAnimateTo,e.autoAnimateLoop,e.autoAnimateSpeed||1)}return i}static FromMesh(e,t,i){t||(t=e.name);const n=new Ye(t,i,e.getScene());return n.setPositions(e.getVerticesData(y.PositionKind)),e.isVerticesDataPresent(y.NormalKind)&&n.setNormals(e.getVerticesData(y.NormalKind)),e.isVerticesDataPresent(y.TangentKind)&&n.setTangents(e.getVerticesData(y.TangentKind)),e.isVerticesDataPresent(y.UVKind)&&n.setUVs(e.getVerticesData(y.UVKind)),n}}m([T()],Ye.prototype,"id",void 0);class Ii extends B{constructor(e,t,i,n,s,r,o=!0,l=!1,c=B.TRILINEAR_SAMPLINGMODE,f=0){super(null,r,!o,l),this.format=s,this._texture=r.getEngine().createRawTexture2DArray(e,t,i,n,s,o,l,c,null,f),this._depth=n,this.is2DArray=!0}get depth(){return this._depth}update(e){!this._texture||this._getEngine().updateRawTexture2DArray(this._texture,e,this._texture.format,this._texture.invertY,null,this._texture.type)}static CreateRGBATexture(e,t,i,n,s,r=!0,o=!1,l=3,c=0){return new Ii(e,t,i,n,5,s,r,o,l,c)}}class et{constructor(e=null){if(this._targets=new Array,this._targetInfluenceChangedObservers=new Array,this._targetDataLayoutChangedObservers=new Array,this._activeTargets=new gt(16),this._supportsNormals=!1,this._supportsTangents=!1,this._supportsUVs=!1,this._vertexCount=0,this._textureVertexStride=0,this._textureWidth=0,this._textureHeight=1,this._uniqueId=0,this._tempInfluences=new Array,this._canUseTextureForTargets=!1,this._blockCounter=0,this._parentContainer=null,this.optimizeInfluencers=!0,this.enableNormalMorphing=!0,this.enableTangentMorphing=!0,this.enableUVMorphing=!0,this._useTextureToStoreTargets=!0,e||(e=tt.LastCreatedScene),this._scene=e,this._scene){this._scene.morphTargetManagers.push(this),this._uniqueId=this._scene.getUniqueId();const t=this._scene.getEngine().getCaps();this._canUseTextureForTargets=t.canUseGLVertexID&&t.textureFloat&&t.maxVertexTextureImageUnits>0&&t.texture2DArrayMaxLayerCount>1}}set areUpdatesFrozen(e){e?this._blockCounter++:(this._blockCounter--,this._blockCounter<=0&&(this._blockCounter=0,this._syncActiveTargets(!0)))}get areUpdatesFrozen(){return this._blockCounter>0}get uniqueId(){return this._uniqueId}get vertexCount(){return this._vertexCount}get supportsNormals(){return this._supportsNormals&&this.enableNormalMorphing}get supportsTangents(){return this._supportsTangents&&this.enableTangentMorphing}get supportsUVs(){return this._supportsUVs&&this.enableUVMorphing}get numTargets(){return this._targets.length}get numInfluencers(){return this._activeTargets.length}get influences(){return this._influences}get useTextureToStoreTargets(){return this._useTextureToStoreTargets}set useTextureToStoreTargets(e){this._useTextureToStoreTargets=e}get isUsingTextureForTargets(){return et.EnableTextureStorage&&this.useTextureToStoreTargets&&this._canUseTextureForTargets}getActiveTarget(e){return this._activeTargets.data[e]}getTarget(e){return this._targets[e]}addTarget(e){this._targets.push(e),this._targetInfluenceChangedObservers.push(e.onInfluenceChanged.add(t=>{this._syncActiveTargets(t)})),this._targetDataLayoutChangedObservers.push(e._onDataLayoutChanged.add(()=>{this._syncActiveTargets(!0)})),this._syncActiveTargets(!0)}removeTarget(e){const t=this._targets.indexOf(e);t>=0&&(this._targets.splice(t,1),e.onInfluenceChanged.remove(this._targetInfluenceChangedObservers.splice(t,1)[0]),e._onDataLayoutChanged.remove(this._targetDataLayoutChangedObservers.splice(t,1)[0]),this._syncActiveTargets(!0))}_bind(e){e.setFloat3("morphTargetTextureInfo",this._textureVertexStride,this._textureWidth,this._textureHeight),e.setFloatArray("morphTargetTextureIndices",this._morphTargetTextureIndices),e.setTexture("morphTargets",this._targetStoreTexture)}clone(){const e=new et(this._scene);for(const t of this._targets)e.addTarget(t.clone());return e.enableNormalMorphing=this.enableNormalMorphing,e.enableTangentMorphing=this.enableTangentMorphing,e.enableUVMorphing=this.enableUVMorphing,e}serialize(){const e={};e.id=this.uniqueId,e.targets=[];for(const t of this._targets)e.targets.push(t.serialize());return e}_syncActiveTargets(e){if(this.areUpdatesFrozen)return;let t=0;this._activeTargets.reset(),this._supportsNormals=!0,this._supportsTangents=!0,this._supportsUVs=!0,this._vertexCount=0,(!this._morphTargetTextureIndices||this._morphTargetTextureIndices.length!==this._targets.length)&&(this._morphTargetTextureIndices=new Float32Array(this._targets.length));let i=-1;for(const n of this._targets){if(i++,n.influence===0&&this.optimizeInfluencers)continue;this._activeTargets.push(n),this._morphTargetTextureIndices[t]=i,this._tempInfluences[t++]=n.influence,this._supportsNormals=this._supportsNormals&&n.hasNormals,this._supportsTangents=this._supportsTangents&&n.hasTangents,this._supportsUVs=this._supportsUVs&&n.hasUVs;const s=n.getPositions();if(s){const r=s.length/3;if(this._vertexCount===0)this._vertexCount=r;else if(this._vertexCount!==r){H.Error("Incompatible target. Targets must all have the same vertices count.");return}}}(!this._influences||this._influences.length!==t)&&(this._influences=new Float32Array(t));for(let n=0;n<t;n++)this._influences[n]=this._tempInfluences[n];e&&this.synchronize()}synchronize(){if(!(!this._scene||this.areUpdatesFrozen)){if(this.isUsingTextureForTargets&&this._vertexCount){this._textureVertexStride=1,this._supportsNormals&&this._textureVertexStride++,this._supportsTangents&&this._textureVertexStride++,this._supportsUVs&&this._textureVertexStride++,this._textureWidth=this._vertexCount*this._textureVertexStride,this._textureHeight=1;const e=this._scene.getEngine().getCaps().maxTextureSize;this._textureWidth>e&&(this._textureHeight=Math.ceil(this._textureWidth/e),this._textureWidth=e);let t=!0;if(this._targetStoreTexture){const i=this._targetStoreTexture.getSize();i.width===this._textureWidth&&i.height===this._textureHeight&&this._targetStoreTexture.depth===this._targets.length&&(t=!1)}if(t){this._targetStoreTexture&&this._targetStoreTexture.dispose();const i=this._targets.length,n=new Float32Array(i*this._textureWidth*this._textureHeight*4);let s=0;for(let r=0;r<i;r++){const o=this._targets[r],l=o.getPositions(),c=o.getNormals(),f=o.getUVs(),u=o.getTangents();if(!l){r===0&&H.Error("Invalid morph target. Target must have positions.");return}s=r*this._textureWidth*this._textureHeight*4;for(let h=0;h<this._vertexCount;h++)n[s]=l[h*3],n[s+1]=l[h*3+1],n[s+2]=l[h*3+2],s+=4,c&&(n[s]=c[h*3],n[s+1]=c[h*3+1],n[s+2]=c[h*3+2],s+=4),f&&(n[s]=f[h*2],n[s+1]=f[h*2+1],s+=4),u&&(n[s]=u[h*3],n[s+1]=u[h*3+1],n[s+2]=u[h*3+2],s+=4)}this._targetStoreTexture=Ii.CreateRGBATexture(n,this._textureWidth,this._textureHeight,i,this._scene,!1,!1,1,1)}}for(const e of this._scene.meshes)e.morphTargetManager===this&&e._syncGeometryWithMorphTargetManager()}}dispose(){if(this._targetStoreTexture&&this._targetStoreTexture.dispose(),this._targetStoreTexture=null,this._scene&&(this._scene.removeMorphTargetManager(this),this._parentContainer)){const e=this._parentContainer.morphTargetManagers.indexOf(this);e>-1&&this._parentContainer.morphTargetManagers.splice(e,1),this._parentContainer=null}}static Parse(e,t){const i=new et(t);i._uniqueId=e.id;for(const n of e.targets)i.addTarget(Ye.Parse(n,t));return i}}et.EnableTextureStorage=!0;function Yi(a,e,t,i){return A.FromArray(e,t).scaleInPlace(i)}function wa(a,e,t,i){return Ee.FromArray(e,t).scaleInPlace(i)}function Ga(a,e,t,i){const n=new Array(a._numMorphTargets);for(let s=0;s<n.length;s++)n[s]=e[t++]*i;return n}class At{constructor(e,t,i,n){this.type=e,this.name=t,this.getValue=i,this.getStride=n}_buildAnimation(e,t,i){const n=new U(e,this.name,t,this.type);return n.setKeys(i),n}}class Gt extends At{buildAnimations(e,t,i,n,s){s(e._babylonTransformNode,this._buildAnimation(t,i,n))}}class Va extends At{buildAnimations(e,t,i,n,s){if(e._numMorphTargets)for(let r=0;r<e._numMorphTargets;r++){const o=new U(`${t}_${r}`,this.name,i,this.type);if(o.setKeys(n.map(l=>({frame:l.frame,inTangent:l.inTangent?l.inTangent[r]:void 0,value:l.value[r],outTangent:l.outTangent?l.outTangent[r]:void 0,interpolation:l.interpolation}))),e._primitiveBabylonMeshes){for(const l of e._primitiveBabylonMeshes)if(l.morphTargetManager){const c=l.morphTargetManager.getTarget(r),f=o.clone();c.animations.push(f),s(c,f)}}}}}const ct={translation:[new Gt(U.ANIMATIONTYPE_VECTOR3,"position",Yi,()=>3)],rotation:[new Gt(U.ANIMATIONTYPE_QUATERNION,"rotationQuaternion",wa,()=>4)],scale:[new Gt(U.ANIMATIONTYPE_VECTOR3,"scaling",Yi,()=>3)],weights:[new Va(U.ANIMATIONTYPE_FLOAT,"influence",Ga,a=>a._numMorphTargets)]};function dn(...a){const e=t=>t&&typeof t=="object";return a.reduce((t,i)=>(Object.keys(i).forEach(n=>{const s=t[n],r=i[n];Array.isArray(s)&&Array.isArray(r)?t[n]=s.concat(...r):e(s)&&e(r)?t[n]=dn(s,r):t[n]=r}),t),{})}class L{static Get(e,t,i){if(!t||i==null||!t[i])throw new Error(`${e}: Failed to find index (${i})`);return t[i]}static Assign(e){if(e)for(let t=0;t<e.length;t++)e[t].index=t}}class v{constructor(e){this._completePromises=new Array,this._assetContainer=null,this._babylonLights=[],this._disableInstancedMesh=0,this._extensions=new Array,this._disposed=!1,this._rootUrl=null,this._fileName=null,this._uniqueRootUrl=null,this._bin=null,this._rootBabylonMesh=null,this._defaultBabylonMaterialData={},this._postSceneLoadActions=new Array,this._parent=e}static RegisterExtension(e,t){v.UnregisterExtension(e)&&H.Warn(`Extension with the name '${e}' already exists`),v._RegisteredExtensions[e]={factory:t}}static UnregisterExtension(e){return v._RegisteredExtensions[e]?(delete v._RegisteredExtensions[e],!0):!1}get gltf(){if(!this._gltf)throw new Error("glTF JSON is not available");return this._gltf}get bin(){return this._bin}get parent(){return this._parent}get babylonScene(){if(!this._babylonScene)throw new Error("Scene is not available");return this._babylonScene}get rootBabylonMesh(){return this._rootBabylonMesh}dispose(){this._disposed||(this._disposed=!0,this._completePromises.length=0,this._extensions.forEach(e=>e.dispose&&e.dispose()),this._extensions.length=0,this._gltf=null,this._bin=null,this._babylonScene=null,this._rootBabylonMesh=null,this._defaultBabylonMaterialData={},this._postSceneLoadActions.length=0,this._parent.dispose())}importMeshAsync(e,t,i,n,s,r,o=""){return Promise.resolve().then(()=>{this._babylonScene=t,this._assetContainer=i,this._loadData(n);let l=null;if(e){const c={};if(this._gltf.nodes)for(const u of this._gltf.nodes)u.name&&(c[u.name]=u.index);l=(e instanceof Array?e:[e]).map(u=>{const h=c[u];if(h===void 0)throw new Error(`Failed to find node '${u}'`);return h})}return this._loadAsync(s,o,l,()=>({meshes:this._getMeshes(),particleSystems:[],skeletons:this._getSkeletons(),animationGroups:this._getAnimationGroups(),lights:this._babylonLights,transformNodes:this._getTransformNodes(),geometries:this._getGeometries()}))})}loadAsync(e,t,i,n,s=""){return Promise.resolve().then(()=>(this._babylonScene=e,this._loadData(t),this._loadAsync(i,s,null,()=>{})))}_loadAsync(e,t,i,n){return Promise.resolve().then(()=>{this._rootUrl=e,this._uniqueRootUrl=!e.startsWith("file:")&&t?e:`${e}${Date.now()}/`,this._fileName=t,this._loadExtensions(),this._checkExtensions();const s=`${Ae[Ae.LOADING]} => ${Ae[Ae.READY]}`,r=`${Ae[Ae.LOADING]} => ${Ae[Ae.COMPLETE]}`;this._parent._startPerformanceCounter(s),this._parent._startPerformanceCounter(r),this._parent._setState(Ae.LOADING),this._extensionsOnLoading();const o=new Array,l=this._babylonScene.blockMaterialDirtyMechanism;if(this._babylonScene.blockMaterialDirtyMechanism=!0,!this.parent.loadOnlyMaterials){if(i)o.push(this.loadSceneAsync("/nodes",{nodes:i,index:-1}));else if(this._gltf.scene!=null||this._gltf.scenes&&this._gltf.scenes[0]){const f=L.Get("/scene",this._gltf.scenes,this._gltf.scene||0);o.push(this.loadSceneAsync(`/scenes/${f.index}`,f))}}if(!this.parent.skipMaterials&&this.parent.loadAllMaterials&&this._gltf.materials)for(let f=0;f<this._gltf.materials.length;++f){const u=this._gltf.materials[f],h="/materials/"+f,_=le.TriangleFillMode;o.push(this._loadMaterialAsync(h,u,null,_,()=>{}))}return this._babylonScene.blockMaterialDirtyMechanism=l,this._parent.compileMaterials&&o.push(this._compileMaterialsAsync()),this._parent.compileShadowGenerators&&o.push(this._compileShadowGeneratorsAsync()),Promise.all(o).then(()=>(this._rootBabylonMesh&&this._rootBabylonMesh.setEnabled(!0),this._extensionsOnReady(),this._parent._setState(Ae.READY),this._startAnimations(),n())).then(f=>(this._parent._endPerformanceCounter(s),w.SetImmediate(()=>{this._disposed||Promise.all(this._completePromises).then(()=>{this._parent._endPerformanceCounter(r),this._parent._setState(Ae.COMPLETE),this._parent.onCompleteObservable.notifyObservers(void 0),this._parent.onCompleteObservable.clear(),this.dispose()},u=>{this._parent.onErrorObservable.notifyObservers(u),this._parent.onErrorObservable.clear(),this.dispose()})}),f))}).catch(s=>{throw this._disposed||(this._parent.onErrorObservable.notifyObservers(s),this._parent.onErrorObservable.clear(),this.dispose()),s})}_loadData(e){if(this._gltf=e.json,this._setupData(),e.bin){const t=this._gltf.buffers;if(t&&t[0]&&!t[0].uri){const i=t[0];(i.byteLength<e.bin.byteLength-3||i.byteLength>e.bin.byteLength)&&H.Warn(`Binary buffer length (${i.byteLength}) from JSON does not match chunk length (${e.bin.byteLength})`),this._bin=e.bin}else H.Warn("Unexpected BIN chunk")}}_setupData(){if(L.Assign(this._gltf.accessors),L.Assign(this._gltf.animations),L.Assign(this._gltf.buffers),L.Assign(this._gltf.bufferViews),L.Assign(this._gltf.cameras),L.Assign(this._gltf.images),L.Assign(this._gltf.materials),L.Assign(this._gltf.meshes),L.Assign(this._gltf.nodes),L.Assign(this._gltf.samplers),L.Assign(this._gltf.scenes),L.Assign(this._gltf.skins),L.Assign(this._gltf.textures),this._gltf.nodes){const e={};for(const i of this._gltf.nodes)if(i.children)for(const n of i.children)e[n]=i.index;const t=this._createRootNode();for(const i of this._gltf.nodes){const n=e[i.index];i.parent=n===void 0?t:this._gltf.nodes[n]}}}_loadExtensions(){for(const e in v._RegisteredExtensions){const t=v._RegisteredExtensions[e].factory(this);t.name!==e&&H.Warn(`The name of the glTF loader extension instance does not match the registered name: ${t.name} !== ${e}`),this._extensions.push(t),this._parent.onExtensionLoadedObservable.notifyObservers(t)}this._extensions.sort((e,t)=>(e.order||Number.MAX_VALUE)-(t.order||Number.MAX_VALUE)),this._parent.onExtensionLoadedObservable.clear()}_checkExtensions(){if(this._gltf.extensionsRequired){for(const e of this._gltf.extensionsRequired)if(!this._extensions.some(i=>i.name===e&&i.enabled))throw new Error(`Require extension ${e} is not available`)}}_createRootNode(){this._babylonScene._blockEntityCollection=!!this._assetContainer,this._rootBabylonMesh=new ne("__root__",this._babylonScene),this._rootBabylonMesh._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,this._rootBabylonMesh.setEnabled(!1);const e={_babylonTransformNode:this._rootBabylonMesh,index:-1};switch(this._parent.coordinateSystemMode){case ht.AUTO:{this._babylonScene.useRightHandedSystem||(e.rotation=[0,1,0,0],e.scale=[1,1,-1],v._LoadTransform(e,this._rootBabylonMesh));break}case ht.FORCE_RIGHT_HANDED:{this._babylonScene.useRightHandedSystem=!0;break}default:throw new Error(`Invalid coordinate system mode (${this._parent.coordinateSystemMode})`)}return this._parent.onMeshLoadedObservable.notifyObservers(this._rootBabylonMesh),e}loadSceneAsync(e,t){const i=this._extensionsLoadSceneAsync(e,t);if(i)return i;const n=new Array;if(this.logOpen(`${e} ${t.name||""}`),t.nodes)for(const s of t.nodes){const r=L.Get(`${e}/nodes/${s}`,this._gltf.nodes,s);n.push(this.loadNodeAsync(`/nodes/${r.index}`,r,o=>{o.parent=this._rootBabylonMesh}))}for(const s of this._postSceneLoadActions)s();return n.push(this._loadAnimationsAsync()),this.logClose(),Promise.all(n).then(()=>{})}_forEachPrimitive(e,t){if(e._primitiveBabylonMeshes)for(const i of e._primitiveBabylonMeshes)t(i)}_getGeometries(){const e=new Array,t=this._gltf.nodes;if(t)for(const i of t)this._forEachPrimitive(i,n=>{const s=n.geometry;s&&e.indexOf(s)===-1&&e.push(s)});return e}_getMeshes(){const e=new Array;this._rootBabylonMesh&&e.push(this._rootBabylonMesh);const t=this._gltf.nodes;if(t)for(const i of t)this._forEachPrimitive(i,n=>{e.push(n)});return e}_getTransformNodes(){const e=new Array,t=this._gltf.nodes;if(t)for(const i of t)i._babylonTransformNode&&i._babylonTransformNode.getClassName()==="TransformNode"&&e.push(i._babylonTransformNode),i._babylonTransformNodeForSkin&&e.push(i._babylonTransformNodeForSkin);return e}_getSkeletons(){const e=new Array,t=this._gltf.skins;if(t)for(const i of t)i._data&&e.push(i._data.babylonSkeleton);return e}_getAnimationGroups(){const e=new Array,t=this._gltf.animations;if(t)for(const i of t)i._babylonAnimationGroup&&e.push(i._babylonAnimationGroup);return e}_startAnimations(){switch(this._parent.animationStartMode){case Je.NONE:break;case Je.FIRST:{const e=this._getAnimationGroups();e.length!==0&&e[0].start(!0);break}case Je.ALL:{const e=this._getAnimationGroups();for(const t of e)t.start(!0);break}default:{H.Error(`Invalid animation start mode (${this._parent.animationStartMode})`);return}}}loadNodeAsync(e,t,i=()=>{}){const n=this._extensionsLoadNodeAsync(e,t,i);if(n)return n;if(t._babylonTransformNode)throw new Error(`${e}: Invalid recursive node hierarchy`);const s=new Array;this.logOpen(`${e} ${t.name||""}`);const r=o=>{if(v.AddPointerMetadata(o,e),v._LoadTransform(t,o),t.camera!=null){const l=L.Get(`${e}/camera`,this._gltf.cameras,t.camera);s.push(this.loadCameraAsync(`/cameras/${l.index}`,l,c=>{c.parent=o}))}if(t.children)for(const l of t.children){const c=L.Get(`${e}/children/${l}`,this._gltf.nodes,l);s.push(this.loadNodeAsync(`/nodes/${c.index}`,c,f=>{f.parent=o}))}i(o)};if(t.mesh==null||t.skin!=null){const o=t.name||`node${t.index}`;this._babylonScene._blockEntityCollection=!!this._assetContainer;const l=new Li(o,this._babylonScene);l._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,t.mesh==null?t._babylonTransformNode=l:t._babylonTransformNodeForSkin=l,r(l)}if(t.mesh!=null)if(t.skin==null){const o=L.Get(`${e}/mesh`,this._gltf.meshes,t.mesh);s.push(this._loadMeshAsync(`/meshes/${o.index}`,t,o,r))}else{const o=L.Get(`${e}/mesh`,this._gltf.meshes,t.mesh);s.push(this._loadMeshAsync(`/meshes/${o.index}`,t,o,l=>{const c=t._babylonTransformNodeForSkin;l.metadata=dn(c.metadata,l.metadata||{});const f=L.Get(`${e}/skin`,this._gltf.skins,t.skin);s.push(this._loadSkinAsync(`/skins/${f.index}`,t,f,u=>{this._forEachPrimitive(t,h=>{h.skeleton=u}),this._postSceneLoadActions.push(()=>{if(f.skeleton!=null){const h=L.Get(`/skins/${f.index}/skeleton`,this._gltf.nodes,f.skeleton).parent;t.index===h.index?l.parent=c.parent:l.parent=h._babylonTransformNode}else l.parent=this._rootBabylonMesh;this._parent.onSkinLoadedObservable.notifyObservers({node:c,skinnedNode:l})})}))}))}return this.logClose(),Promise.all(s).then(()=>(this._forEachPrimitive(t,o=>{o.geometry&&o.geometry.useBoundingInfoFromGeometry?o._updateBoundingInfo():o.refreshBoundingInfo(!0)}),t._babylonTransformNode))}_loadMeshAsync(e,t,i,n){const s=i.primitives;if(!s||!s.length)throw new Error(`${e}: Primitives are missing`);s[0].index==null&&L.Assign(s);const r=new Array;this.logOpen(`${e} ${i.name||""}`);const o=t.name||`node${t.index}`;if(s.length===1){const l=i.primitives[0];r.push(this._loadMeshPrimitiveAsync(`${e}/primitives/${l.index}`,o,t,i,l,c=>{t._babylonTransformNode=c,t._primitiveBabylonMeshes=[c]}))}else{this._babylonScene._blockEntityCollection=!!this._assetContainer,t._babylonTransformNode=new Li(o,this._babylonScene),t._babylonTransformNode._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,t._primitiveBabylonMeshes=[];for(const l of s)r.push(this._loadMeshPrimitiveAsync(`${e}/primitives/${l.index}`,`${o}_primitive${l.index}`,t,i,l,c=>{c.parent=t._babylonTransformNode,t._primitiveBabylonMeshes.push(c)}))}return n(t._babylonTransformNode),this.logClose(),Promise.all(r).then(()=>t._babylonTransformNode)}_loadMeshPrimitiveAsync(e,t,i,n,s,r){const o=this._extensionsLoadMeshPrimitiveAsync(e,t,i,n,s,r);if(o)return o;this.logOpen(`${e}`);const l=this._disableInstancedMesh===0&&this._parent.createInstances&&i.skin==null&&!n.primitives[0].targets;let c,f;if(l&&s._instanceData)this._babylonScene._blockEntityCollection=!!this._assetContainer,c=s._instanceData.babylonSourceMesh.createInstance(t),c._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,f=s._instanceData.promise;else{const u=new Array;this._babylonScene._blockEntityCollection=!!this._assetContainer;const h=new ne(t,this._babylonScene);h._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,h.overrideMaterialSideOrientation=this._babylonScene.useRightHandedSystem?le.CounterClockWiseSideOrientation:le.ClockWiseSideOrientation,this._createMorphTargets(e,i,n,s,h),u.push(this._loadVertexDataAsync(e,s,h).then(d=>this._loadMorphTargetsAsync(e,s,h,d).then(()=>{this._disposed||(this._babylonScene._blockEntityCollection=!!this._assetContainer,d.applyToMesh(h),d._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1)})));const _=v._GetDrawMode(e,s.mode);if(s.material==null){let d=this._defaultBabylonMaterialData[_];d||(d=this._createDefaultMaterial("__GLTFLoader._default",_),this._parent.onMaterialLoadedObservable.notifyObservers(d),this._defaultBabylonMaterialData[_]=d),h.material=d}else if(!this.parent.skipMaterials){const d=L.Get(`${e}/material`,this._gltf.materials,s.material);u.push(this._loadMaterialAsync(`/materials/${d.index}`,d,h,_,E=>{h.material=E}))}f=Promise.all(u),l&&(s._instanceData={babylonSourceMesh:h,promise:f}),c=h}return v.AddPointerMetadata(c,e),this._parent.onMeshLoadedObservable.notifyObservers(c),r(c),this.logClose(),f.then(()=>c)}_loadVertexDataAsync(e,t,i){const n=this._extensionsLoadVertexDataAsync(e,t,i);if(n)return n;const s=t.attributes;if(!s)throw new Error(`${e}: Attributes are missing`);const r=new Array,o=new Ri(i.name,this._babylonScene);if(t.indices==null)i.isUnIndexed=!0;else{const c=L.Get(`${e}/indices`,this._gltf.accessors,t.indices);r.push(this._loadIndicesAccessorAsync(`/accessors/${c.index}`,c).then(f=>{o.setIndices(f)}))}const l=(c,f,u)=>{if(s[c]==null)return;i._delayInfo=i._delayInfo||[],i._delayInfo.indexOf(f)===-1&&i._delayInfo.push(f);const h=L.Get(`${e}/attributes/${c}`,this._gltf.accessors,s[c]);r.push(this._loadVertexAccessorAsync(`/accessors/${h.index}`,h,f).then(_=>{if(_.getKind()===y.PositionKind&&!this.parent.alwaysComputeBoundingBox&&!i.skeleton){const d=h.min,E=h.max;if(d!==void 0&&E!==void 0){if(h.normalized&&h.componentType!==5126){let R=1;switch(h.componentType){case 5120:R=127;break;case 5121:R=255;break;case 5122:R=32767;break;case 5123:R=65535;break}for(let M=0;M<3;++M)d[M]=Math.max(d[M]/R,-1),E[M]=Math.max(E[M]/R,-1)}const p=F.Vector3[0],g=F.Vector3[1];p.copyFromFloats(...d),g.copyFromFloats(...E),o._boundingInfo=new As(p,g),o.useBoundingInfoFromGeometry=!0}}o.setVerticesBuffer(_,h.count)})),f==y.MatricesIndicesExtraKind&&(i.numBoneInfluencers=8),u&&u(h)};return l("POSITION",y.PositionKind),l("NORMAL",y.NormalKind),l("TANGENT",y.TangentKind),l("TEXCOORD_0",y.UVKind),l("TEXCOORD_1",y.UV2Kind),l("TEXCOORD_2",y.UV3Kind),l("TEXCOORD_3",y.UV4Kind),l("TEXCOORD_4",y.UV5Kind),l("TEXCOORD_5",y.UV6Kind),l("JOINTS_0",y.MatricesIndicesKind),l("WEIGHTS_0",y.MatricesWeightsKind),l("JOINTS_1",y.MatricesIndicesExtraKind),l("WEIGHTS_1",y.MatricesWeightsExtraKind),l("COLOR_0",y.ColorKind,c=>{c.type==="VEC4"&&(i.hasVertexAlpha=!0)}),Promise.all(r).then(()=>o)}_createMorphTargets(e,t,i,n,s){if(!n.targets)return;if(t._numMorphTargets==null)t._numMorphTargets=n.targets.length;else if(n.targets.length!==t._numMorphTargets)throw new Error(`${e}: Primitives do not have the same number of targets`);const r=i.extras?i.extras.targetNames:null;s.morphTargetManager=new et(s.getScene()),s.morphTargetManager.areUpdatesFrozen=!0;for(let o=0;o<n.targets.length;o++){const l=t.weights?t.weights[o]:i.weights?i.weights[o]:0,c=r?r[o]:`morphTarget${o}`;s.morphTargetManager.addTarget(new Ye(c,l,s.getScene()))}}_loadMorphTargetsAsync(e,t,i,n){if(!t.targets)return Promise.resolve();const s=new Array,r=i.morphTargetManager;for(let o=0;o<r.numTargets;o++){const l=r.getTarget(o);s.push(this._loadMorphTargetVertexDataAsync(`${e}/targets/${o}`,n,t.targets[o],l))}return Promise.all(s).then(()=>{r.areUpdatesFrozen=!1})}_loadMorphTargetVertexDataAsync(e,t,i,n){const s=new Array,r=(o,l,c)=>{if(i[o]==null)return;const f=t.getVertexBuffer(l);if(!f)return;const u=L.Get(`${e}/${o}`,this._gltf.accessors,i[o]);s.push(this._loadFloatAccessorAsync(`/accessors/${u.index}`,u).then(h=>{c(f,h)}))};return r("POSITION",y.PositionKind,(o,l)=>{const c=new Float32Array(l.length);o.forEach(l.length,(f,u)=>{c[u]=l[u]+f}),n.setPositions(c)}),r("NORMAL",y.NormalKind,(o,l)=>{const c=new Float32Array(l.length);o.forEach(c.length,(f,u)=>{c[u]=l[u]+f}),n.setNormals(c)}),r("TANGENT",y.TangentKind,(o,l)=>{const c=new Float32Array(l.length/3*4);let f=0;o.forEach(l.length/3*4,(u,h)=>{(h+1)%4!==0&&(c[f]=l[f]+u,f++)}),n.setTangents(c)}),Promise.all(s).then(()=>{})}static _LoadTransform(e,t){if(e.skin!=null)return;let i=A.Zero(),n=Ee.Identity(),s=A.One();e.matrix?X.FromArray(e.matrix).decompose(s,n,i):(e.translation&&(i=A.FromArray(e.translation)),e.rotation&&(n=Ee.FromArray(e.rotation)),e.scale&&(s=A.FromArray(e.scale))),t.position=i,t.rotationQuaternion=n,t.scaling=s}_loadSkinAsync(e,t,i,n){const s=this._extensionsLoadSkinAsync(e,t,i);if(s)return s;if(i._data)return n(i._data.babylonSkeleton),i._data.promise;const r=`skeleton${i.index}`;this._babylonScene._blockEntityCollection=!!this._assetContainer;const o=new it(i.name||r,r,this._babylonScene);o._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,this._loadBones(e,i,o);const l=this._loadSkinInverseBindMatricesDataAsync(e,i).then(c=>{this._updateBoneMatrices(o,c)});return i._data={babylonSkeleton:o,promise:l},n(o),l}_loadBones(e,t,i){if(t.skeleton==null||this._parent.alwaysComputeSkeletonRootNode){const s=this._findSkeletonRootNode(`${e}/joints`,t.joints);if(s)if(t.skeleton===void 0)t.skeleton=s.index;else{const r=(l,c)=>{for(;c.parent;c=c.parent)if(c.parent===l)return!0;return!1},o=L.Get(`${e}/skeleton`,this._gltf.nodes,t.skeleton);o!==s&&!r(o,s)&&(H.Warn(`${e}/skeleton: Overriding with nearest common ancestor as skeleton node is not a common root`),t.skeleton=s.index)}else H.Warn(`${e}: Failed to find common root`)}const n={};for(const s of t.joints){const r=L.Get(`${e}/joints/${s}`,this._gltf.nodes,s);this._loadBone(r,t,i,n)}}_findSkeletonRootNode(e,t){if(t.length===0)return null;const i={};for(const s of t){const r=new Array;let o=L.Get(`${e}/${s}`,this._gltf.nodes,s);for(;o.index!==-1;)r.unshift(o),o=o.parent;i[s]=r}let n=null;for(let s=0;;++s){let r=i[t[0]];if(s>=r.length)return n;const o=r[s];for(let l=1;l<t.length;++l)if(r=i[t[l]],s>=r.length||o!==r[s])return n;n=o}}_loadBone(e,t,i,n){let s=n[e.index];if(s)return s;let r=null;e.index!==t.skeleton&&(e.parent&&e.parent.index!==-1?r=this._loadBone(e.parent,t,i,n):t.skeleton!==void 0&&H.Warn(`/skins/${t.index}/skeleton: Skeleton node is not a common root`));const o=t.joints.indexOf(e.index);return s=new ze(e.name||`joint${e.index}`,i,r,this._getNodeMatrix(e),null,null,o),n[e.index]=s,this._postSceneLoadActions.push(()=>{s.linkTransformNode(e._babylonTransformNode)}),s}_loadSkinInverseBindMatricesDataAsync(e,t){if(t.inverseBindMatrices==null)return Promise.resolve(null);const i=L.Get(`${e}/inverseBindMatrices`,this._gltf.accessors,t.inverseBindMatrices);return this._loadFloatAccessorAsync(`/accessors/${i.index}`,i)}_updateBoneMatrices(e,t){for(const i of e.bones){const n=X.Identity(),s=i._index;t&&s!==-1&&(X.FromArrayToRef(t,s*16,n),n.invertToRef(n));const r=i.getParent();r&&n.multiplyToRef(r.getInvertedAbsoluteTransform(),n),i.updateMatrix(n,!1,!1),i._updateDifferenceMatrix(void 0,!1)}}_getNodeMatrix(e){return e.matrix?X.FromArray(e.matrix):X.Compose(e.scale?A.FromArray(e.scale):A.One(),e.rotation?Ee.FromArray(e.rotation):Ee.Identity(),e.translation?A.FromArray(e.translation):A.Zero())}loadCameraAsync(e,t,i=()=>{}){const n=this._extensionsLoadCameraAsync(e,t,i);if(n)return n;const s=new Array;this.logOpen(`${e} ${t.name||""}`),this._babylonScene._blockEntityCollection=!!this._assetContainer;const r=new We(t.name||`camera${t.index}`,A.Zero(),this._babylonScene,!1);switch(r._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,r.ignoreParentScaling=!0,t._babylonCamera=r,r.rotation=new A(0,Math.PI,0),t.type){case"perspective":{const o=t.perspective;if(!o)throw new Error(`${e}: Camera perspective properties are missing`);r.fov=o.yfov,r.minZ=o.znear,r.maxZ=o.zfar||0;break}case"orthographic":{if(!t.orthographic)throw new Error(`${e}: Camera orthographic properties are missing`);r.mode=$i.ORTHOGRAPHIC_CAMERA,r.orthoLeft=-t.orthographic.xmag,r.orthoRight=t.orthographic.xmag,r.orthoBottom=-t.orthographic.ymag,r.orthoTop=t.orthographic.ymag,r.minZ=t.orthographic.znear,r.maxZ=t.orthographic.zfar;break}default:throw new Error(`${e}: Invalid camera type (${t.type})`)}return v.AddPointerMetadata(r,e),this._parent.onCameraLoadedObservable.notifyObservers(r),i(r),this.logClose(),Promise.all(s).then(()=>r)}_loadAnimationsAsync(){const e=this._gltf.animations;if(!e)return Promise.resolve();const t=new Array;for(let i=0;i<e.length;i++){const n=e[i];t.push(this.loadAnimationAsync(`/animations/${n.index}`,n).then(s=>{s.targetedAnimations.length===0&&s.dispose()}))}return Promise.all(t).then(()=>{})}loadAnimationAsync(e,t){const i=this._extensionsLoadAnimationAsync(e,t);if(i)return i;this._babylonScene._blockEntityCollection=!!this._assetContainer;const n=new _s(t.name||`animation${t.index}`,this._babylonScene);n._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,t._babylonAnimationGroup=n;const s=new Array;L.Assign(t.channels),L.Assign(t.samplers);for(const r of t.channels)s.push(this._loadAnimationChannelAsync(`${e}/channels/${r.index}`,e,t,r,(o,l)=>{o.animations=o.animations||[],o.animations.push(l),n.addTargetedAnimation(l,o)}));return Promise.all(s).then(()=>(n.normalize(0),n))}_loadAnimationChannelAsync(e,t,i,n,s){const r=this._extensionsLoadAnimationChannelAsync(e,t,i,n,s);if(r)return r;if(n.target.node==null)return Promise.resolve();const o=L.Get(`${e}/target/node`,this._gltf.nodes,n.target.node);if(n.target.path==="weights"&&!o._numMorphTargets||n.target.path!=="weights"&&!o._babylonTransformNode)return Promise.resolve();let l;switch(n.target.path){case"translation":{l=ct.translation;break}case"rotation":{l=ct.rotation;break}case"scale":{l=ct.scale;break}case"weights":{l=ct.weights;break}default:throw new Error(`${e}/target/path: Invalid value (${n.target.path})`)}const c={target:o,properties:l};return this._loadAnimationChannelFromTargetInfoAsync(e,t,i,n,c,s)}_loadAnimationChannelFromTargetInfoAsync(e,t,i,n,s,r){const o=this.parent.targetFps,l=1/o,c=L.Get(`${e}/sampler`,i.samplers,n.sampler);return this._loadAnimationSamplerAsync(`${t}/samplers/${n.sampler}`,c).then(f=>{let u=0;for(const h of s.properties){const _=h.getStride(s.target),d=f.input,E=f.output,p=new Array(d.length);let g=0;switch(f.interpolation){case"STEP":{for(let R=0;R<d.length;R++){const M=h.getValue(s.target,E,g,1);g+=_,p[R]={frame:d[R]*o,value:M,interpolation:Es.STEP}}break}case"CUBICSPLINE":{for(let R=0;R<d.length;R++){const M=h.getValue(s.target,E,g,l);g+=_;const b=h.getValue(s.target,E,g,1);g+=_;const O=h.getValue(s.target,E,g,l);g+=_,p[R]={frame:d[R]*o,inTangent:M,value:b,outTangent:O}}break}case"LINEAR":{for(let R=0;R<d.length;R++){const M=h.getValue(s.target,E,g,1);g+=_,p[R]={frame:d[R]*o,value:M}}break}}if(g>0){const R=`${i.name||`animation${i.index}`}_channel${n.index}_${u}`;h.buildAnimations(s.target,R,o,p,(M,b)=>{++u,r(M,b)})}}})}_loadAnimationSamplerAsync(e,t){if(t._data)return t._data;const i=t.interpolation||"LINEAR";switch(i){case"STEP":case"LINEAR":case"CUBICSPLINE":break;default:throw new Error(`${e}/interpolation: Invalid value (${t.interpolation})`)}const n=L.Get(`${e}/input`,this._gltf.accessors,t.input),s=L.Get(`${e}/output`,this._gltf.accessors,t.output);return t._data=Promise.all([this._loadFloatAccessorAsync(`/accessors/${n.index}`,n),this._loadFloatAccessorAsync(`/accessors/${s.index}`,s)]).then(([r,o])=>({input:r,interpolation:i,output:o})),t._data}loadBufferAsync(e,t,i,n){const s=this._extensionsLoadBufferAsync(e,t,i,n);if(s)return s;if(!t._data)if(t.uri)t._data=this.loadUriAsync(`${e}/uri`,t,t.uri);else{if(!this._bin)throw new Error(`${e}: Uri is missing or the binary glTF is missing its binary chunk`);t._data=this._bin.readAsync(0,t.byteLength)}return t._data.then(r=>{try{return new Uint8Array(r.buffer,r.byteOffset+i,n)}catch(o){throw new Error(`${e}: ${o.message}`)}})}loadBufferViewAsync(e,t){const i=this._extensionsLoadBufferViewAsync(e,t);if(i)return i;if(t._data)return t._data;const n=L.Get(`${e}/buffer`,this._gltf.buffers,t.buffer);return t._data=this.loadBufferAsync(`/buffers/${n.index}`,n,t.byteOffset||0,t.byteLength),t._data}_loadAccessorAsync(e,t,i){if(t._data)return t._data;const n=v._GetNumComponents(e,t.type),s=n*y.GetTypeByteLength(t.componentType),r=n*t.count;if(t.bufferView==null)t._data=Promise.resolve(new i(r));else{const o=L.Get(`${e}/bufferView`,this._gltf.bufferViews,t.bufferView);t._data=this.loadBufferViewAsync(`/bufferViews/${o.index}`,o).then(l=>{if(t.componentType===5126&&!t.normalized&&(!o.byteStride||o.byteStride===s))return v._GetTypedArray(e,t.componentType,l,t.byteOffset,r);{const c=new i(r);return y.ForEach(l,t.byteOffset||0,o.byteStride||s,n,t.componentType,c.length,t.normalized||!1,(f,u)=>{c[u]=f}),c}})}if(t.sparse){const o=t.sparse;t._data=t._data.then(l=>{const c=l,f=L.Get(`${e}/sparse/indices/bufferView`,this._gltf.bufferViews,o.indices.bufferView),u=L.Get(`${e}/sparse/values/bufferView`,this._gltf.bufferViews,o.values.bufferView);return Promise.all([this.loadBufferViewAsync(`/bufferViews/${f.index}`,f),this.loadBufferViewAsync(`/bufferViews/${u.index}`,u)]).then(([h,_])=>{const d=v._GetTypedArray(`${e}/sparse/indices`,o.indices.componentType,h,o.indices.byteOffset,o.count),E=n*o.count;let p;if(t.componentType===5126&&!t.normalized)p=v._GetTypedArray(`${e}/sparse/values`,t.componentType,_,o.values.byteOffset,E);else{const R=v._GetTypedArray(`${e}/sparse/values`,t.componentType,_,o.values.byteOffset,E);p=new i(E),y.ForEach(R,0,s,n,t.componentType,p.length,t.normalized||!1,(M,b)=>{p[b]=M})}let g=0;for(let R=0;R<d.length;R++){let M=d[R]*n;for(let b=0;b<n;b++)c[M++]=p[g++]}return c})})}return t._data}_loadFloatAccessorAsync(e,t){return this._loadAccessorAsync(e,t,Float32Array)}_loadIndicesAccessorAsync(e,t){if(t.type!=="SCALAR")throw new Error(`${e}/type: Invalid value ${t.type}`);if(t.componentType!==5121&&t.componentType!==5123&&t.componentType!==5125)throw new Error(`${e}/componentType: Invalid value ${t.componentType}`);if(t._data)return t._data;if(t.sparse){const i=v._GetTypedArrayConstructor(`${e}/componentType`,t.componentType);t._data=this._loadAccessorAsync(e,t,i)}else{const i=L.Get(`${e}/bufferView`,this._gltf.bufferViews,t.bufferView);t._data=this.loadBufferViewAsync(`/bufferViews/${i.index}`,i).then(n=>v._GetTypedArray(e,t.componentType,n,t.byteOffset,t.count))}return t._data}_loadVertexBufferViewAsync(e){if(e._babylonBuffer)return e._babylonBuffer;const t=this._babylonScene.getEngine();return e._babylonBuffer=this.loadBufferViewAsync(`/bufferViews/${e.index}`,e).then(i=>new tn(t,i,!1)),e._babylonBuffer}_loadVertexAccessorAsync(e,t,i){var n;if(!((n=t._babylonVertexBuffer)===null||n===void 0)&&n[i])return t._babylonVertexBuffer[i];t._babylonVertexBuffer||(t._babylonVertexBuffer={});const s=this._babylonScene.getEngine();if(t.sparse)t._babylonVertexBuffer[i]=this._loadFloatAccessorAsync(e,t).then(r=>new y(s,r,i,!1));else if(i===y.MatricesIndicesKind||i===y.MatricesIndicesExtraKind)t._babylonVertexBuffer[i]=this._loadFloatAccessorAsync(e,t).then(r=>new y(s,r,i,!1));else{const r=L.Get(`${e}/bufferView`,this._gltf.bufferViews,t.bufferView);t._babylonVertexBuffer[i]=this._loadVertexBufferViewAsync(r).then(o=>{const l=v._GetNumComponents(e,t.type);return new y(s,o,i,!1,!1,r.byteStride,!1,t.byteOffset,l,t.componentType,t.normalized,!0,1,!0)})}return t._babylonVertexBuffer[i]}_loadMaterialMetallicRoughnessPropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const n=new Array;return t&&(t.baseColorFactor?(i.albedoColor=V.FromArray(t.baseColorFactor),i.alpha=t.baseColorFactor[3]):i.albedoColor=V.White(),i.metallic=t.metallicFactor==null?1:t.metallicFactor,i.roughness=t.roughnessFactor==null?1:t.roughnessFactor,t.baseColorTexture&&n.push(this.loadTextureInfoAsync(`${e}/baseColorTexture`,t.baseColorTexture,s=>{s.name=`${i.name} (Base Color)`,i.albedoTexture=s})),t.metallicRoughnessTexture&&(t.metallicRoughnessTexture.nonColorData=!0,n.push(this.loadTextureInfoAsync(`${e}/metallicRoughnessTexture`,t.metallicRoughnessTexture,s=>{s.name=`${i.name} (Metallic Roughness)`,i.metallicTexture=s})),i.useMetallnessFromMetallicTextureBlue=!0,i.useRoughnessFromMetallicTextureGreen=!0,i.useRoughnessFromMetallicTextureAlpha=!1)),Promise.all(n).then(()=>{})}_loadMaterialAsync(e,t,i,n,s=()=>{}){const r=this._extensionsLoadMaterialAsync(e,t,i,n,s);if(r)return r;t._data=t._data||{};let o=t._data[n];if(!o){this.logOpen(`${e} ${t.name||""}`);const l=this.createMaterial(e,t,n);o={babylonMaterial:l,babylonMeshes:[],promise:this.loadMaterialPropertiesAsync(e,t,l)},t._data[n]=o,v.AddPointerMetadata(l,e),this._parent.onMaterialLoadedObservable.notifyObservers(l),this.logClose()}return i&&(o.babylonMeshes.push(i),i.onDisposeObservable.addOnce(()=>{const l=o.babylonMeshes.indexOf(i);l!==-1&&o.babylonMeshes.splice(l,1)})),s(o.babylonMaterial),o.promise.then(()=>o.babylonMaterial)}_createDefaultMaterial(e,t){this._babylonScene._blockEntityCollection=!!this._assetContainer;const i=new S(e,this._babylonScene);return i._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,i.fillMode=t,i.enableSpecularAntiAliasing=!0,i.useRadianceOverAlpha=!this._parent.transparencyAsCoverage,i.useSpecularOverAlpha=!this._parent.transparencyAsCoverage,i.transparencyMode=S.PBRMATERIAL_OPAQUE,i.metallic=1,i.roughness=1,i}createMaterial(e,t,i){const n=this._extensionsCreateMaterial(e,t,i);if(n)return n;const s=t.name||`material${t.index}`;return this._createDefaultMaterial(s,i)}loadMaterialPropertiesAsync(e,t,i){const n=this._extensionsLoadMaterialPropertiesAsync(e,t,i);if(n)return n;const s=new Array;return s.push(this.loadMaterialBasePropertiesAsync(e,t,i)),t.pbrMetallicRoughness&&s.push(this._loadMaterialMetallicRoughnessPropertiesAsync(`${e}/pbrMetallicRoughness`,t.pbrMetallicRoughness,i)),this.loadMaterialAlphaProperties(e,t,i),Promise.all(s).then(()=>{})}loadMaterialBasePropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const n=new Array;return i.emissiveColor=t.emissiveFactor?V.FromArray(t.emissiveFactor):new V(0,0,0),t.doubleSided&&(i.backFaceCulling=!1,i.twoSidedLighting=!0),t.normalTexture&&(t.normalTexture.nonColorData=!0,n.push(this.loadTextureInfoAsync(`${e}/normalTexture`,t.normalTexture,s=>{s.name=`${i.name} (Normal)`,i.bumpTexture=s})),i.invertNormalMapX=!this._babylonScene.useRightHandedSystem,i.invertNormalMapY=this._babylonScene.useRightHandedSystem,t.normalTexture.scale!=null&&i.bumpTexture&&(i.bumpTexture.level=t.normalTexture.scale),i.forceIrradianceInFragment=!0),t.occlusionTexture&&(t.occlusionTexture.nonColorData=!0,n.push(this.loadTextureInfoAsync(`${e}/occlusionTexture`,t.occlusionTexture,s=>{s.name=`${i.name} (Occlusion)`,i.ambientTexture=s})),i.useAmbientInGrayScale=!0,t.occlusionTexture.strength!=null&&(i.ambientTextureStrength=t.occlusionTexture.strength)),t.emissiveTexture&&n.push(this.loadTextureInfoAsync(`${e}/emissiveTexture`,t.emissiveTexture,s=>{s.name=`${i.name} (Emissive)`,i.emissiveTexture=s})),Promise.all(n).then(()=>{})}loadMaterialAlphaProperties(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);switch(t.alphaMode||"OPAQUE"){case"OPAQUE":{i.transparencyMode=S.PBRMATERIAL_OPAQUE;break}case"MASK":{i.transparencyMode=S.PBRMATERIAL_ALPHATEST,i.alphaCutOff=t.alphaCutoff==null?.5:t.alphaCutoff,i.albedoTexture&&(i.albedoTexture.hasAlpha=!0);break}case"BLEND":{i.transparencyMode=S.PBRMATERIAL_ALPHABLEND,i.albedoTexture&&(i.albedoTexture.hasAlpha=!0,i.useAlphaFromAlbedoTexture=!0);break}default:throw new Error(`${e}/alphaMode: Invalid value (${t.alphaMode})`)}}loadTextureInfoAsync(e,t,i=()=>{}){const n=this._extensionsLoadTextureInfoAsync(e,t,i);if(n)return n;if(this.logOpen(`${e}`),t.texCoord>=6)throw new Error(`${e}/texCoord: Invalid value (${t.texCoord})`);const s=L.Get(`${e}/index`,this._gltf.textures,t.index);s._textureInfo=t;const r=this._loadTextureAsync(`/textures/${t.index}`,s,o=>{o.coordinatesIndex=t.texCoord||0,v.AddPointerMetadata(o,e),this._parent.onTextureLoadedObservable.notifyObservers(o),i(o)});return this.logClose(),r}_loadTextureAsync(e,t,i=()=>{}){const n=this._extensionsLoadTextureAsync(e,t,i);if(n)return n;this.logOpen(`${e} ${t.name||""}`);const s=t.sampler==null?v.DefaultSampler:L.Get(`${e}/sampler`,this._gltf.samplers,t.sampler),r=L.Get(`${e}/source`,this._gltf.images,t.source),o=this._createTextureAsync(e,s,r,i,void 0,!t._textureInfo.nonColorData);return this.logClose(),o}_createTextureAsync(e,t,i,n=()=>{},s,r){const o=this._loadSampler(`/samplers/${t.index}`,t),l=new Array,c=new lt;this._babylonScene._blockEntityCollection=!!this._assetContainer;const f={noMipmap:o.noMipMaps,invertY:!1,samplingMode:o.samplingMode,onLoad:()=>{this._disposed||c.resolve()},onError:(h,_)=>{this._disposed||c.reject(new Error(`${e}: ${_&&_.message?_.message:h||"Failed to load texture"}`))},mimeType:i.mimeType,loaderOptions:s,useSRGBBuffer:!!r&&this._parent.useSRGBBuffers},u=new B(null,this._babylonScene,f);return u._parentContainer=this._assetContainer,this._babylonScene._blockEntityCollection=!1,l.push(c.promise),l.push(this.loadImageAsync(`/images/${i.index}`,i).then(h=>{const _=i.uri||`${this._fileName}#image${i.index}`,d=`data:${this._uniqueRootUrl}${_}`;u.updateURL(d,h)})),u.wrapU=o.wrapU,u.wrapV=o.wrapV,n(u),Promise.all(l).then(()=>u)}_loadSampler(e,t){return t._data||(t._data={noMipMaps:t.minFilter===9728||t.minFilter===9729,samplingMode:v._GetTextureSamplingMode(e,t),wrapU:v._GetTextureWrapMode(`${e}/wrapS`,t.wrapS),wrapV:v._GetTextureWrapMode(`${e}/wrapT`,t.wrapT)}),t._data}loadImageAsync(e,t){if(!t._data){if(this.logOpen(`${e} ${t.name||""}`),t.uri)t._data=this.loadUriAsync(`${e}/uri`,t,t.uri);else{const i=L.Get(`${e}/bufferView`,this._gltf.bufferViews,t.bufferView);t._data=this.loadBufferViewAsync(`/bufferViews/${i.index}`,i)}this.logClose()}return t._data}loadUriAsync(e,t,i){const n=this._extensionsLoadUriAsync(e,t,i);if(n)return n;if(!v._ValidateUri(i))throw new Error(`${e}: '${i}' is invalid`);if(ms(i)){const s=new Uint8Array(ji(i));return this.log(`${e}: Decoded ${i.substr(0,64)}... (${s.length} bytes)`),Promise.resolve(s)}return this.log(`${e}: Loading ${i}`),this._parent.preprocessUrlAsync(this._rootUrl+i).then(s=>new Promise((r,o)=>{this._parent._loadFile(this._babylonScene,s,l=>{this._disposed||(this.log(`${e}: Loaded ${i} (${l.byteLength} bytes)`),r(new Uint8Array(l)))},!0,l=>{o(new ps(`${e}: Failed to load '${i}'${l?": "+l.status+" "+l.statusText:""}`,l))})}))}static AddPointerMetadata(e,t){const i=e.metadata=e.metadata||{},n=i.gltf=i.gltf||{};(n.pointers=n.pointers||[]).push(t)}static _GetTextureWrapMode(e,t){switch(t=t==null?10497:t,t){case 33071:return B.CLAMP_ADDRESSMODE;case 33648:return B.MIRROR_ADDRESSMODE;case 10497:return B.WRAP_ADDRESSMODE;default:return H.Warn(`${e}: Invalid value (${t})`),B.WRAP_ADDRESSMODE}}static _GetTextureSamplingMode(e,t){const i=t.magFilter==null?9729:t.magFilter,n=t.minFilter==null?9987:t.minFilter;if(i===9729)switch(n){case 9728:return B.LINEAR_NEAREST;case 9729:return B.LINEAR_LINEAR;case 9984:return B.LINEAR_NEAREST_MIPNEAREST;case 9985:return B.LINEAR_LINEAR_MIPNEAREST;case 9986:return B.LINEAR_NEAREST_MIPLINEAR;case 9987:return B.LINEAR_LINEAR_MIPLINEAR;default:return H.Warn(`${e}/minFilter: Invalid value (${n})`),B.LINEAR_LINEAR_MIPLINEAR}else switch(i!==9728&&H.Warn(`${e}/magFilter: Invalid value (${i})`),n){case 9728:return B.NEAREST_NEAREST;case 9729:return B.NEAREST_LINEAR;case 9984:return B.NEAREST_NEAREST_MIPNEAREST;case 9985:return B.NEAREST_LINEAR_MIPNEAREST;case 9986:return B.NEAREST_NEAREST_MIPLINEAR;case 9987:return B.NEAREST_LINEAR_MIPLINEAR;default:return H.Warn(`${e}/minFilter: Invalid value (${n})`),B.NEAREST_NEAREST_MIPNEAREST}}static _GetTypedArrayConstructor(e,t){switch(t){case 5120:return Int8Array;case 5121:return Uint8Array;case 5122:return Int16Array;case 5123:return Uint16Array;case 5125:return Uint32Array;case 5126:return Float32Array;default:throw new Error(`${e}: Invalid component type ${t}`)}}static _GetTypedArray(e,t,i,n,s){const r=i.buffer;n=i.byteOffset+(n||0);const o=v._GetTypedArrayConstructor(`${e}/componentType`,t),l=y.GetTypeByteLength(t);return n%l!==0?(H.Warn(`${e}: Copying buffer as byte offset (${n}) is not a multiple of component type byte length (${l})`),new o(r.slice(n,n+s*l),0)):new o(r,n,s)}static _GetNumComponents(e,t){switch(t){case"SCALAR":return 1;case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"MAT2":return 4;case"MAT3":return 9;case"MAT4":return 16}throw new Error(`${e}: Invalid type (${t})`)}static _ValidateUri(e){return w.IsBase64(e)||e.indexOf("..")===-1}static _GetDrawMode(e,t){switch(t==null&&(t=4),t){case 0:return le.PointListDrawMode;case 1:return le.LineListDrawMode;case 2:return le.LineLoopDrawMode;case 3:return le.LineStripDrawMode;case 4:return le.TriangleFillMode;case 5:return le.TriangleStripDrawMode;case 6:return le.TriangleFanDrawMode}throw new Error(`${e}: Invalid mesh primitive mode (${t})`)}_compileMaterialsAsync(){this._parent._startPerformanceCounter("Compile materials");const e=new Array;if(this._gltf.materials){for(const t of this._gltf.materials)if(t._data)for(const i in t._data){const n=t._data[i];for(const s of n.babylonMeshes){s.computeWorldMatrix(!0);const r=n.babylonMaterial;e.push(r.forceCompilationAsync(s)),e.push(r.forceCompilationAsync(s,{useInstances:!0})),this._parent.useClipPlane&&(e.push(r.forceCompilationAsync(s,{clipPlane:!0})),e.push(r.forceCompilationAsync(s,{clipPlane:!0,useInstances:!0})))}}}return Promise.all(e).then(()=>{this._parent._endPerformanceCounter("Compile materials")})}_compileShadowGeneratorsAsync(){this._parent._startPerformanceCounter("Compile shadow generators");const e=new Array,t=this._babylonScene.lights;for(const i of t){const n=i.getShadowGenerator();n&&e.push(n.forceCompilationAsync())}return Promise.all(e).then(()=>{this._parent._endPerformanceCounter("Compile shadow generators")})}_forEachExtensions(e){for(const t of this._extensions)t.enabled&&e(t)}_applyExtensions(e,t,i){for(const n of this._extensions)if(n.enabled){const s=`${n.name}.${t}`,r=e;r._activeLoaderExtensionFunctions=r._activeLoaderExtensionFunctions||{};const o=r._activeLoaderExtensionFunctions;if(!o[s]){o[s]=!0;try{const l=i(n);if(l)return l}finally{delete o[s]}}}return null}_extensionsOnLoading(){this._forEachExtensions(e=>e.onLoading&&e.onLoading())}_extensionsOnReady(){this._forEachExtensions(e=>e.onReady&&e.onReady())}_extensionsLoadSceneAsync(e,t){return this._applyExtensions(t,"loadScene",i=>i.loadSceneAsync&&i.loadSceneAsync(e,t))}_extensionsLoadNodeAsync(e,t,i){return this._applyExtensions(t,"loadNode",n=>n.loadNodeAsync&&n.loadNodeAsync(e,t,i))}_extensionsLoadCameraAsync(e,t,i){return this._applyExtensions(t,"loadCamera",n=>n.loadCameraAsync&&n.loadCameraAsync(e,t,i))}_extensionsLoadVertexDataAsync(e,t,i){return this._applyExtensions(t,"loadVertexData",n=>n._loadVertexDataAsync&&n._loadVertexDataAsync(e,t,i))}_extensionsLoadMeshPrimitiveAsync(e,t,i,n,s,r){return this._applyExtensions(s,"loadMeshPrimitive",o=>o._loadMeshPrimitiveAsync&&o._loadMeshPrimitiveAsync(e,t,i,n,s,r))}_extensionsLoadMaterialAsync(e,t,i,n,s){return this._applyExtensions(t,"loadMaterial",r=>r._loadMaterialAsync&&r._loadMaterialAsync(e,t,i,n,s))}_extensionsCreateMaterial(e,t,i){return this._applyExtensions(t,"createMaterial",n=>n.createMaterial&&n.createMaterial(e,t,i))}_extensionsLoadMaterialPropertiesAsync(e,t,i){return this._applyExtensions(t,"loadMaterialProperties",n=>n.loadMaterialPropertiesAsync&&n.loadMaterialPropertiesAsync(e,t,i))}_extensionsLoadTextureInfoAsync(e,t,i){return this._applyExtensions(t,"loadTextureInfo",n=>n.loadTextureInfoAsync&&n.loadTextureInfoAsync(e,t,i))}_extensionsLoadTextureAsync(e,t,i){return this._applyExtensions(t,"loadTexture",n=>n._loadTextureAsync&&n._loadTextureAsync(e,t,i))}_extensionsLoadAnimationAsync(e,t){return this._applyExtensions(t,"loadAnimation",i=>i.loadAnimationAsync&&i.loadAnimationAsync(e,t))}_extensionsLoadAnimationChannelAsync(e,t,i,n,s){return this._applyExtensions(i,"loadAnimationChannel",r=>r._loadAnimationChannelAsync&&r._loadAnimationChannelAsync(e,t,i,n,s))}_extensionsLoadSkinAsync(e,t,i){return this._applyExtensions(i,"loadSkin",n=>n._loadSkinAsync&&n._loadSkinAsync(e,t,i))}_extensionsLoadUriAsync(e,t,i){return this._applyExtensions(t,"loadUri",n=>n._loadUriAsync&&n._loadUriAsync(e,t,i))}_extensionsLoadBufferViewAsync(e,t){return this._applyExtensions(t,"loadBufferView",i=>i.loadBufferViewAsync&&i.loadBufferViewAsync(e,t))}_extensionsLoadBufferAsync(e,t,i,n){return this._applyExtensions(t,"loadBuffer",s=>s.loadBufferAsync&&s.loadBufferAsync(e,t,i,n))}static LoadExtensionAsync(e,t,i,n){if(!t.extensions)return null;const r=t.extensions[i];return r?n(`${e}/extensions/${i}`,r):null}static LoadExtraAsync(e,t,i,n){if(!t.extras)return null;const r=t.extras[i];return r?n(`${e}/extras/${i}`,r):null}isExtensionUsed(e){return!!this._gltf.extensionsUsed&&this._gltf.extensionsUsed.indexOf(e)!==-1}logOpen(e){this._parent._logOpen(e)}logClose(){this._parent._logClose()}log(e){this._parent._log(e)}startPerformanceCounter(e){this._parent._startPerformanceCounter(e)}endPerformanceCounter(e){this._parent._endPerformanceCounter(e)}}v._RegisteredExtensions={};v.DefaultSampler={index:-1};q._CreateGLTF2Loader=a=>new v(a);const Ha="rgbdEncodePixelShader",ka=`varying vec2 vUV;
uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);
}`;k.ShadersStore[Ha]=ka;const Xa="image/png";function zi(a,e,t,i,n,s,r,o,l,c,f){return new Promise((u,h)=>{if(t){const _=e.createTexture(null,!0,!0,null,1,null,d=>{h(d)},a);i.getEffect().executeWhenCompiled(()=>{i.externalTextureSamplerBinding=!0,i.onApply=d=>{d._bindTexture("textureSampler",_),d.setFloat2("scale",1,e._features.needsInvertingBitmap&&a instanceof ImageBitmap?-1:1)},e.scenes.length&&(e.scenes[0].postProcessManager.directRender([i],c,!0,s,r),e.restoreDefaultFramebuffer(),_.dispose(),URL.revokeObjectURL(n),u())})}else{if(e._uploadImageToTexture(f,a,s,r),o){const _=l[r];_&&e._uploadImageToTexture(_._texture,a,s,0)}u()}})}function Wi(a,e,t=Xa){if(!w.IsExponentOfTwo(a.width))throw new Error("Texture size must be a power of two");const i=xe.ILog2(a.width)+1,n=a.getEngine();let s=!1,r=!1,o=null,l=null,c=null;const f=n.getCaps();if(a.format=5,a.type=0,a.generateMipMaps=!0,a._cachedAnisotropicFilteringLevel=null,n.updateTextureSamplingMode(3,a),f.textureLOD?n._features.supportRenderAndCopyToLodForFloatTextures?f.textureHalfFloatRender&&f.textureHalfFloatLinearFiltering?(s=!0,a.type=2):f.textureFloatRender&&f.textureFloatLinearFiltering&&(s=!0,a.type=1):s=!1:(s=!1,r=!0,c={}),s)o=new K("rgbdDecode","rgbdDecode",null,null,1,null,3,n,!1,void 0,a.type,void 0,null,!1),a._isRGBD=!1,a.invertY=!1,l=n.createRenderTargetCubeTexture(a.width,{generateDepthBuffer:!1,generateMipMaps:!0,generateStencilBuffer:!1,samplingMode:3,type:a.type,format:5});else if(a._isRGBD=!0,a.invertY=!0,r){const _=a._lodGenerationScale,d=a._lodGenerationOffset;for(let E=0;E<3;E++){const p=E/2,g=1-p,R=d,M=(i-1)*_+d,b=R+(M-R)*g,O=Math.round(Math.min(Math.max(b,0),M)),I=new Et(n,Ne.Temp);I.isCube=!0,I.invertY=!0,I.generateMipMaps=!1,n.updateTextureSamplingMode(2,I);const N=new Mt(null);switch(N._isCube=!0,N._texture=I,c[O]=N,E){case 0:a._lodTextureLow=N;break;case 1:a._lodTextureMid=N;break;case 2:a._lodTextureHigh=N;break}}}const u=[];for(let h=0;h<e.length;h++)for(let _=0;_<6;_++){const d=e[h][_],E=new Blob([d],{type:t}),p=URL.createObjectURL(E);let g;if(typeof Image>"u"||n._features.forceBitmapOverHTMLImageElement)g=n.createImageBitmap(E,{premultiplyAlpha:"none"}).then(R=>zi(R,n,s,o,p,_,h,r,c,l,a));else{const R=new Image;R.src=p,g=new Promise((M,b)=>{R.onload=()=>{zi(R,n,s,o,p,_,h,r,c,l,a).then(()=>M()).catch(O=>{b(O)})},R.onerror=O=>{b(O)}})}u.push(g)}if(e.length<i){let h;const _=Math.pow(2,i-1-e.length),d=_*_*4;switch(a.type){case 0:{h=new Uint8Array(d);break}case 2:{h=new Uint16Array(d);break}case 1:{h=new Float32Array(d);break}}for(let E=e.length;E<i;E++)for(let p=0;p<6;p++)n._uploadArrayBufferViewToTexture(a,h,p,E)}return Promise.all(u).then(()=>{l&&(n._releaseTexture(a),l._swapAndDie(a)),o&&o.dispose(),r&&(a._lodTextureHigh&&a._lodTextureHigh._texture&&(a._lodTextureHigh._texture.isReady=!0),a._lodTextureMid&&a._lodTextureMid._texture&&(a._lodTextureMid._texture.isReady=!0),a._lodTextureLow&&a._lodTextureLow._texture&&(a._lodTextureLow._texture.isReady=!0))})}function Ya(a,e,t,i,n){const s=a.getEngine().createRawCubeTexture(null,a.width,a.format,a.type,a.generateMipMaps,a.invertY,a.samplingMode,a._compression),r=Wi(s,e).then(()=>a);return a.onRebuildCallback=o=>({proxy:r,isReady:!0,isAsync:!0}),a._source=Ne.CubeRawRGBD,a._bufferViewArrayArray=e,a._lodGenerationScale=i,a._lodGenerationOffset=n,a._sphericalPolynomial=t,Wi(a,e).then(()=>(a.isReady=!0,a))}ce.prototype._createDepthStencilCubeTexture=function(a,e,t){const i=new Et(this,Ne.DepthStencil);if(i.isCube=!0,this.webGLVersion===1)return H.Error("Depth cube texture is not supported by WebGL 1."),i;const n={bilinearFiltering:!1,comparisonFunction:0,generateStencil:!1,...e},s=this._gl;this._bindTextureDirectly(s.TEXTURE_CUBE_MAP,i,!0),this._setupDepthStencilTexture(i,a,n.generateStencil,n.bilinearFiltering,n.comparisonFunction),t._depthStencilTexture=i,t._depthStencilTextureWithStencil=n.generateStencil;for(let r=0;r<6;r++)n.generateStencil?s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,s.DEPTH24_STENCIL8,a,a,0,s.DEPTH_STENCIL,s.UNSIGNED_INT_24_8,null):s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,s.DEPTH_COMPONENT24,a,a,0,s.DEPTH_COMPONENT,s.UNSIGNED_INT,null);return this._bindTextureDirectly(s.TEXTURE_CUBE_MAP,null),this._internalTexturesCache.push(i),i};ce.prototype._partialLoadFile=function(a,e,t,i,n=null){const s=o=>{t[e]=o,t._internalCount++,t._internalCount===6&&i(t)},r=(o,l)=>{n&&o&&n(o.status+" "+o.statusText,l)};this._loadFile(a,s,void 0,void 0,!0,r)};ce.prototype._cascadeLoadFiles=function(a,e,t,i=null){const n=[];n._internalCount=0;for(let s=0;s<6;s++)this._partialLoadFile(t[s],s,n,e,i)};ce.prototype._cascadeLoadImgs=function(a,e,t,i,n=null,s){const r=[];r._internalCount=0;for(let o=0;o<6;o++)this._partialLoadImg(i[o],o,r,a,e,t,n,s)};ce.prototype._partialLoadImg=function(a,e,t,i,n,s,r=null,o){const l=Ts();gs(a,u=>{t[e]=u,t._internalCount++,i&&i.removePendingData(l),t._internalCount===6&&s&&s(n,t)},(u,h)=>{i&&i.removePendingData(l),r&&r(u,h)},i?i.offlineProvider:null,o),i&&i.addPendingData(l)};ce.prototype._setCubeMapTextureParams=function(a,e,t){const i=this._gl;i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MIN_FILTER,e?i.LINEAR_MIPMAP_LINEAR:i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),a.samplingMode=e?3:2,e&&this.getCaps().textureMaxLevel&&t!==void 0&&t>0&&(i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,t),a._maxLodLevel=t),this._bindTextureDirectly(i.TEXTURE_CUBE_MAP,null)};ce.prototype.createCubeTextureBase=function(a,e,t,i,n=null,s=null,r,o=null,l=!1,c=0,f=0,u=null,h=null,_=null,d=!1){const E=u||new Et(this,Ne.Cube);E.isCube=!0,E.url=a,E.generateMipMaps=!i,E._lodGenerationScale=c,E._lodGenerationOffset=f,E._useSRGBBuffer=!!d&&this._caps.supportSRGBBuffers&&(this.webGLVersion>1||this.isWebGPU||!!i),this._doNotHandleContextLost||(E._extension=o,E._files=t);const p=a;this._transformTextureUrl&&!u&&(a=this._transformTextureUrl(a));const g=a.split("?")[0],R=g.lastIndexOf("."),M=o||(R>-1?g.substring(R).toLowerCase():"");let b=null;for(const I of ce._TextureLoaders)if(I.canLoad(M)){b=I;break}const O=(I,N)=>{a===p?s&&I&&s(I.status+" "+I.statusText,N):(H.Warn(`Failed to load ${a}, falling back to the ${p}`),this.createCubeTextureBase(p,e,t,!!i,n,s,r,o,l,c,f,E,h,_,d))};if(b){const I=N=>{h&&h(E,N),b.loadCubeData(N,E,l,n,s)};t&&t.length===6?b.supportCascades?this._cascadeLoadFiles(e,N=>I(N.map(G=>new Uint8Array(G))),t,s):s?s("Textures type does not support cascades."):H.Warn("Texture loader does not support cascades."):this._loadFile(a,N=>I(new Uint8Array(N)),void 0,void 0,!0,O)}else{if(!t)throw new Error("Cannot load cubemap because files were not defined");this._cascadeLoadImgs(e,E,(I,N)=>{_&&_(I,N)},t,s)}return this._internalTexturesCache.push(E),E};ce.prototype.createCubeTexture=function(a,e,t,i,n=null,s=null,r,o=null,l=!1,c=0,f=0,u=null,h,_=!1){const d=this._gl;return this.createCubeTextureBase(a,e,t,!!i,n,s,r,o,l,c,f,u,E=>this._bindTextureDirectly(d.TEXTURE_CUBE_MAP,E,!0),(E,p)=>{const g=this.needPOTTextures?ce.GetExponentOfTwo(p[0].width,this._caps.maxCubemapTextureSize):p[0].width,R=g,M=[d.TEXTURE_CUBE_MAP_POSITIVE_X,d.TEXTURE_CUBE_MAP_POSITIVE_Y,d.TEXTURE_CUBE_MAP_POSITIVE_Z,d.TEXTURE_CUBE_MAP_NEGATIVE_X,d.TEXTURE_CUBE_MAP_NEGATIVE_Y,d.TEXTURE_CUBE_MAP_NEGATIVE_Z];this._bindTextureDirectly(d.TEXTURE_CUBE_MAP,E,!0),this._unpackFlipY(!1);const b=r?this._getInternalFormat(r,E._useSRGBBuffer):E._useSRGBBuffer?d.SRGB8_ALPHA8:d.RGBA;let O=r?this._getInternalFormat(r):d.RGBA;E._useSRGBBuffer&&this.webGLVersion===1&&(O=b);for(let I=0;I<M.length;I++)if(p[I].width!==g||p[I].height!==R){if(this._prepareWorkingCanvas(),!this._workingCanvas||!this._workingContext){H.Warn("Cannot create canvas to resize texture.");return}this._workingCanvas.width=g,this._workingCanvas.height=R,this._workingContext.drawImage(p[I],0,0,p[I].width,p[I].height,0,0,g,R),d.texImage2D(M[I],0,b,O,d.UNSIGNED_BYTE,this._workingCanvas)}else d.texImage2D(M[I],0,b,O,d.UNSIGNED_BYTE,p[I]);i||d.generateMipmap(d.TEXTURE_CUBE_MAP),this._setCubeMapTextureParams(E,!i),E.width=g,E.height=R,E.isReady=!0,r&&(E.format=r),E.onLoadedObservable.notifyObservers(E),E.onLoadedObservable.clear(),n&&n()},!!_)};class ge extends Mt{constructor(e,t,i=null,n=!1,s=null,r=null,o=null,l=5,c=!1,f=null,u=!1,h=.8,_=0,d,E){var p;super(t),this._lodScale=.8,this._lodOffset=0,this.onLoadObservable=new Y,this.boundingBoxPosition=A.Zero(),this._rotationY=0,this._files=null,this._forcedExtension=null,this._extensions=null,this.name=e,this.url=e,this._noMipmap=n,this.hasAlpha=!1,this._format=l,this.isCube=!0,this._textureMatrix=X.Identity(),this._createPolynomials=u,this.coordinatesMode=B.CUBIC_MODE,this._extensions=i,this._files=s,this._forcedExtension=f,this._loaderOptions=d,this._useSRGBBuffer=E,this._lodScale=h,this._lodOffset=_,!(!e&&!s)&&this.updateURL(e,f,r,c,o,i,(p=this.getScene())===null||p===void 0?void 0:p.useDelayedTextureLoading,s)}set boundingBoxSize(e){if(this._boundingBoxSize&&this._boundingBoxSize.equals(e))return;this._boundingBoxSize=e;const t=this.getScene();t&&t.markAllMaterialsAsDirty(1)}get boundingBoxSize(){return this._boundingBoxSize}set rotationY(e){this._rotationY=e,this.setReflectionTextureMatrix(X.RotationY(this._rotationY))}get rotationY(){return this._rotationY}get noMipmap(){return this._noMipmap}get forcedExtension(){return this._forcedExtension}static CreateFromImages(e,t,i){let n="";return e.forEach(s=>n+=s),new ge(n,t,null,i,e)}static CreateFromPrefilteredData(e,t,i=null,n=!0){const s=t.useDelayedTextureLoading;t.useDelayedTextureLoading=!1;const r=new ge(e,t,null,!1,null,null,null,void 0,!0,i,n);return t.useDelayedTextureLoading=s,r}getClassName(){return"CubeTexture"}updateURL(e,t,i=null,n=!1,s=null,r=null,o=!1,l=null){(!this.name||this.name.startsWith("data:"))&&(this.name=e),this.url=e,t&&(this._forcedExtension=t);const c=e.lastIndexOf("."),f=t||(c>-1?e.substring(c).toLowerCase():""),u=f.indexOf(".dds")===0,h=f.indexOf(".env")===0,_=f.indexOf(".basis")===0;if(h?(this.gammaSpace=!1,this._prefiltered=!1,this.anisotropicFilteringLevel=1):(this._prefiltered=n,n&&(this.gammaSpace=!1,this.anisotropicFilteringLevel=1)),l)this._files=l;else if(!_&&!h&&!u&&!r&&(r=["_px.jpg","_py.jpg","_pz.jpg","_nx.jpg","_ny.jpg","_nz.jpg"]),this._files=this._files||[],this._files.length=0,r){for(let d=0;d<r.length;d++)this._files.push(e+r[d]);this._extensions=r}o?(this.delayLoadState=4,this._delayedOnLoad=i,this._delayedOnError=s):this._loadTexture(i,s)}delayLoad(e){this.delayLoadState===4&&(e&&(this._forcedExtension=e),this.delayLoadState=1,this._loadTexture(this._delayedOnLoad,this._delayedOnError))}getReflectionTextureMatrix(){return this._textureMatrix}setReflectionTextureMatrix(e){var t;e.updateFlag!==this._textureMatrix.updateFlag&&(e.isIdentity()!==this._textureMatrix.isIdentity()&&((t=this.getScene())===null||t===void 0||t.markAllMaterialsAsDirty(1,i=>i.getActiveTextures().indexOf(this)!==-1)),this._textureMatrix=e)}_loadTexture(e=null,t=null){var i;const n=this.getScene(),s=this._texture;this._texture=this._getFromCache(this.url,this._noMipmap,void 0,void 0,this._useSRGBBuffer,this.isCube);const r=()=>{var l;this.onLoadObservable.notifyObservers(this),s&&(s.dispose(),(l=this.getScene())===null||l===void 0||l.markAllMaterialsAsDirty(1)),e&&e()},o=(l,c)=>{this._loadingError=!0,this._errorObject={message:l,exception:c},t&&t(l,c),B.OnTextureLoadErrorObservable.notifyObservers(this)};this._texture?this._texture.isReady?w.SetImmediate(()=>r()):this._texture.onLoadedObservable.add(()=>r()):(this._prefiltered?this._texture=this._getEngine().createPrefilteredCubeTexture(this.url,n,this._lodScale,this._lodOffset,e,o,this._format,this._forcedExtension,this._createPolynomials):this._texture=this._getEngine().createCubeTexture(this.url,n,this._files,this._noMipmap,e,o,this._format,this._forcedExtension,!1,this._lodScale,this._lodOffset,null,this._loaderOptions,!!this._useSRGBBuffer),(i=this._texture)===null||i===void 0||i.onLoadedObservable.add(()=>this.onLoadObservable.notifyObservers(this)))}static Parse(e,t,i){const n=Oe.Parse(()=>{let s=!1;return e.prefiltered&&(s=e.prefiltered),new ge(i+e.name,t,e.extensions,!1,e.files||null,null,null,void 0,s,e.forcedExtension)},e,t);if(e.boundingBoxPosition&&(n.boundingBoxPosition=A.FromArray(e.boundingBoxPosition)),e.boundingBoxSize&&(n.boundingBoxSize=A.FromArray(e.boundingBoxSize)),e.animations)for(let s=0;s<e.animations.length;s++){const r=e.animations[s],o=Ci("BABYLON.Animation");o&&n.animations.push(o.Parse(r))}return n}clone(){let e=0;const t=Oe.Clone(()=>{const i=new ge(this.url,this.getScene()||this._getEngine(),this._extensions,this._noMipmap,this._files);return e=i.uniqueId,i},this);return t.uniqueId=e,t}}m([T()],ge.prototype,"url",void 0);m([T("rotationY")],ge.prototype,"rotationY",null);m([T("files")],ge.prototype,"_files",void 0);m([T("forcedExtension")],ge.prototype,"_forcedExtension",void 0);m([T("extensions")],ge.prototype,"_extensions",void 0);m([Rs("textureMatrix")],ge.prototype,"_textureMatrix",void 0);B._CubeTextureParser=ge.Parse;xt("BABYLON.CubeTexture",ge);class vi extends ge{constructor(e,t,i,n=5,s=0,r=!1,o=!1,l=3,c=null){super("",e),this._texture=e.getEngine().createRawCubeTexture(t,i,n,s,r,o,l,c)}update(e,t,i,n,s=null){this._texture.getEngine().updateRawCubeTexture(this._texture,e,t,i,n,s)}updateRGBDAsync(e,t=null,i=.8,n=0){return Ya(this._texture,e,t,i,n).then(()=>{})}clone(){return Oe.Clone(()=>{const e=this.getScene(),t=this._texture,i=new vi(e,t._bufferViewArray,t.width,t.format,t.type,t.generateMipMaps,t.invertY,t.samplingMode,t._compression);return t.source===Ne.CubeRawRGBD&&i.updateRGBDAsync(t._bufferViewArrayArray,t._sphericalPolynomial,t._lodGenerationScale,t._lodGenerationOffset),i},this)}}const zt="EXT_lights_image_based";class _n{constructor(e){this.name=zt,this._loader=e,this.enabled=this._loader.isExtensionUsed(zt)}dispose(){this._loader=null,delete this._lights}onLoading(){const e=this._loader.gltf.extensions;if(e&&e[this.name]){const t=e[this.name];this._lights=t.lights}}loadSceneAsync(e,t){return v.LoadExtensionAsync(e,t,this.name,(i,n)=>{const s=new Array;s.push(this._loader.loadSceneAsync(e,t)),this._loader.logOpen(`${i}`);const r=L.Get(`${i}/light`,this._lights,n.light);return s.push(this._loadLightAsync(`/extensions/${this.name}/lights/${n.light}`,r).then(o=>{this._loader.babylonScene.environmentTexture=o})),this._loader.logClose(),Promise.all(s).then(()=>{})})}_loadLightAsync(e,t){if(!t._loaded){const i=new Array;this._loader.logOpen(`${e}`);const n=new Array(t.specularImages.length);for(let s=0;s<t.specularImages.length;s++){const r=t.specularImages[s];n[s]=new Array(r.length);for(let o=0;o<r.length;o++){const l=`${e}/specularImages/${s}/${o}`;this._loader.logOpen(`${l}`);const c=r[o],f=L.Get(l,this._loader.gltf.images,c);i.push(this._loader.loadImageAsync(`/images/${c}`,f).then(u=>{n[s][o]=u})),this._loader.logClose()}}this._loader.logClose(),t._loaded=Promise.all(i).then(()=>{const s=new vi(this._loader.babylonScene,null,t.specularImageSize);if(s.name=t.name||"environment",t._babylonTexture=s,t.intensity!=null&&(s.level=t.intensity),t.rotation){let c=Ee.FromArray(t.rotation);this._loader.babylonScene.useRightHandedSystem||(c=Ee.Inverse(c)),X.FromQuaternionToRef(c,s.getReflectionTextureMatrix())}if(!t.irradianceCoefficients)throw new Error(`${e}: Irradiance coefficients are missing`);const r=nt.FromArray(t.irradianceCoefficients);r.scaleInPlace(t.intensity),r.convertIrradianceToLambertianRadiance();const o=dt.FromHarmonics(r),l=(n.length-1)/xe.Log2(t.specularImageSize);return s.updateRGBDAsync(n,o,l)})}return t._loaded.then(()=>t._babylonTexture)}}v.RegisterExtension(zt,a=>new _n(a));ne.prototype.thinInstanceAdd=function(a,e=!0){if(!this.getScene().getEngine().getCaps().instancedArrays)return H.Error("Thin Instances are not supported on this device as Instanced Array extension not supported"),-1;this._thinInstanceUpdateBufferSize("matrix",Array.isArray(a)?a.length:1);const t=this._thinInstanceDataStorage.instancesCount;if(Array.isArray(a))for(let i=0;i<a.length;++i)this.thinInstanceSetMatrixAt(this._thinInstanceDataStorage.instancesCount++,a[i],i===a.length-1&&e);else this.thinInstanceSetMatrixAt(this._thinInstanceDataStorage.instancesCount++,a,e);return t};ne.prototype.thinInstanceAddSelf=function(a=!0){return this.thinInstanceAdd(X.IdentityReadOnly,a)};ne.prototype.thinInstanceRegisterAttribute=function(a,e){a===y.ColorKind&&(a=y.ColorInstanceKind),this.removeVerticesData(a),this._thinInstanceInitializeUserStorage(),this._userThinInstanceBuffersStorage.strides[a]=e,this._userThinInstanceBuffersStorage.sizes[a]=e*Math.max(32,this._thinInstanceDataStorage.instancesCount),this._userThinInstanceBuffersStorage.data[a]=new Float32Array(this._userThinInstanceBuffersStorage.sizes[a]),this._userThinInstanceBuffersStorage.vertexBuffers[a]=new y(this.getEngine(),this._userThinInstanceBuffersStorage.data[a],a,!0,!1,e,!0),this.setVerticesBuffer(this._userThinInstanceBuffersStorage.vertexBuffers[a])};ne.prototype.thinInstanceSetMatrixAt=function(a,e,t=!0){if(!this._thinInstanceDataStorage.matrixData||a>=this._thinInstanceDataStorage.instancesCount)return!1;const i=this._thinInstanceDataStorage.matrixData;return e.copyToArray(i,a*16),this._thinInstanceDataStorage.worldMatrices&&(this._thinInstanceDataStorage.worldMatrices[a]=e),t&&(this.thinInstanceBufferUpdated("matrix"),this.doNotSyncBoundingInfo||this.thinInstanceRefreshBoundingInfo(!1)),!0};ne.prototype.thinInstanceSetAttributeAt=function(a,e,t,i=!0){return a===y.ColorKind&&(a=y.ColorInstanceKind),!this._userThinInstanceBuffersStorage||!this._userThinInstanceBuffersStorage.data[a]||e>=this._thinInstanceDataStorage.instancesCount?!1:(this._thinInstanceUpdateBufferSize(a,0),this._userThinInstanceBuffersStorage.data[a].set(t,e*this._userThinInstanceBuffersStorage.strides[a]),i&&this.thinInstanceBufferUpdated(a),!0)};Object.defineProperty(ne.prototype,"thinInstanceCount",{get:function(){return this._thinInstanceDataStorage.instancesCount},set:function(a){var e,t;const i=(e=this._thinInstanceDataStorage.matrixData)!==null&&e!==void 0?e:(t=this.source)===null||t===void 0?void 0:t._thinInstanceDataStorage.matrixData,n=i?i.length/16:0;a<=n&&(this._thinInstanceDataStorage.instancesCount=a)},enumerable:!0,configurable:!0});ne.prototype._thinInstanceCreateMatrixBuffer=function(a,e,t=!1){a===y.ColorKind&&(a=y.ColorInstanceKind);const i=new tn(this.getEngine(),e,!t,16,!1,!0);for(let n=0;n<4;n++)this.setVerticesBuffer(i.createVertexBuffer(a+n,n*4,4));return i};ne.prototype.thinInstanceSetBuffer=function(a,e,t=0,i=!1){var n,s,r;t=t||16,a==="matrix"?((n=this._thinInstanceDataStorage.matrixBuffer)===null||n===void 0||n.dispose(),this._thinInstanceDataStorage.matrixBuffer=null,this._thinInstanceDataStorage.matrixBufferSize=e?e.length:32*t,this._thinInstanceDataStorage.matrixData=e,this._thinInstanceDataStorage.worldMatrices=null,e!==null?(this._thinInstanceDataStorage.instancesCount=e.length/t,this._thinInstanceDataStorage.matrixBuffer=this._thinInstanceCreateMatrixBuffer("world",e,i),this.doNotSyncBoundingInfo||this.thinInstanceRefreshBoundingInfo(!1)):(this._thinInstanceDataStorage.instancesCount=0,this.doNotSyncBoundingInfo||this.refreshBoundingInfo())):a==="previousMatrix"?((s=this._thinInstanceDataStorage.previousMatrixBuffer)===null||s===void 0||s.dispose(),this._thinInstanceDataStorage.previousMatrixBuffer=null,this._thinInstanceDataStorage.previousMatrixData=e,e!==null&&(this._thinInstanceDataStorage.previousMatrixBuffer=this._thinInstanceCreateMatrixBuffer("previousWorld",e,i))):(a===y.ColorKind&&(a=y.ColorInstanceKind),e===null?!((r=this._userThinInstanceBuffersStorage)===null||r===void 0)&&r.data[a]&&(this.removeVerticesData(a),delete this._userThinInstanceBuffersStorage.data[a],delete this._userThinInstanceBuffersStorage.strides[a],delete this._userThinInstanceBuffersStorage.sizes[a],delete this._userThinInstanceBuffersStorage.vertexBuffers[a]):(this._thinInstanceInitializeUserStorage(),this._userThinInstanceBuffersStorage.data[a]=e,this._userThinInstanceBuffersStorage.strides[a]=t,this._userThinInstanceBuffersStorage.sizes[a]=e.length,this._userThinInstanceBuffersStorage.vertexBuffers[a]=new y(this.getEngine(),e,a,!i,!1,t,!0),this.setVerticesBuffer(this._userThinInstanceBuffersStorage.vertexBuffers[a])))};ne.prototype.thinInstanceBufferUpdated=function(a){var e,t,i;a==="matrix"?(e=this._thinInstanceDataStorage.matrixBuffer)===null||e===void 0||e.updateDirectly(this._thinInstanceDataStorage.matrixData,0,this._thinInstanceDataStorage.instancesCount):a==="previousMatrix"?(t=this._thinInstanceDataStorage.previousMatrixBuffer)===null||t===void 0||t.updateDirectly(this._thinInstanceDataStorage.previousMatrixData,0,this._thinInstanceDataStorage.instancesCount):(a===y.ColorKind&&(a=y.ColorInstanceKind),!((i=this._userThinInstanceBuffersStorage)===null||i===void 0)&&i.vertexBuffers[a]&&this._userThinInstanceBuffersStorage.vertexBuffers[a].updateDirectly(this._userThinInstanceBuffersStorage.data[a],0))};ne.prototype.thinInstancePartialBufferUpdate=function(a,e,t){var i;a==="matrix"?this._thinInstanceDataStorage.matrixBuffer&&this._thinInstanceDataStorage.matrixBuffer.updateDirectly(e,t):(a===y.ColorKind&&(a=y.ColorInstanceKind),!((i=this._userThinInstanceBuffersStorage)===null||i===void 0)&&i.vertexBuffers[a]&&this._userThinInstanceBuffersStorage.vertexBuffers[a].updateDirectly(e,t))};ne.prototype.thinInstanceGetWorldMatrices=function(){if(!this._thinInstanceDataStorage.matrixData||!this._thinInstanceDataStorage.matrixBuffer)return[];const a=this._thinInstanceDataStorage.matrixData;if(!this._thinInstanceDataStorage.worldMatrices){this._thinInstanceDataStorage.worldMatrices=new Array;for(let e=0;e<this._thinInstanceDataStorage.instancesCount;++e)this._thinInstanceDataStorage.worldMatrices[e]=X.FromArray(a,e*16)}return this._thinInstanceDataStorage.worldMatrices};ne.prototype.thinInstanceRefreshBoundingInfo=function(a=!1,e=!1,t=!1){if(!this._thinInstanceDataStorage.matrixData||!this._thinInstanceDataStorage.matrixBuffer)return;const i=this._thinInstanceDataStorage.boundingVectors;a&&(i.length=0,this.refreshBoundingInfo(e,t));const n=this.getBoundingInfo(),s=this._thinInstanceDataStorage.matrixData;if(i.length===0)for(let r=0;r<n.boundingBox.vectors.length;++r)i.push(n.boundingBox.vectors[r].clone());F.Vector3[0].setAll(Number.POSITIVE_INFINITY),F.Vector3[1].setAll(Number.NEGATIVE_INFINITY);for(let r=0;r<this._thinInstanceDataStorage.instancesCount;++r){X.FromArrayToRef(s,r*16,F.Matrix[0]);for(let o=0;o<i.length;++o)A.TransformCoordinatesToRef(i[o],F.Matrix[0],F.Vector3[2]),F.Vector3[0].minimizeInPlace(F.Vector3[2]),F.Vector3[1].maximizeInPlace(F.Vector3[2])}n.reConstruct(F.Vector3[0],F.Vector3[1]),this._updateBoundingInfo()};ne.prototype._thinInstanceUpdateBufferSize=function(a,e=1){var t,i,n;a===y.ColorKind&&(a=y.ColorInstanceKind);const s=a==="matrix";if(!s&&(!this._userThinInstanceBuffersStorage||!this._userThinInstanceBuffersStorage.strides[a]))return;const r=s?16:this._userThinInstanceBuffersStorage.strides[a],o=s?this._thinInstanceDataStorage.matrixBufferSize:this._userThinInstanceBuffersStorage.sizes[a];let l=s?this._thinInstanceDataStorage.matrixData:this._userThinInstanceBuffersStorage.data[a];const c=(this._thinInstanceDataStorage.instancesCount+e)*r;let f=o;for(;f<c;)f*=2;if(!l||o!=f){if(!l)l=new Float32Array(f);else{const u=new Float32Array(f);u.set(l,0),l=u}s?((t=this._thinInstanceDataStorage.matrixBuffer)===null||t===void 0||t.dispose(),this._thinInstanceDataStorage.matrixBuffer=this._thinInstanceCreateMatrixBuffer("world",l,!1),this._thinInstanceDataStorage.matrixData=l,this._thinInstanceDataStorage.matrixBufferSize=f,this._scene.needsPreviousWorldMatrices&&!this._thinInstanceDataStorage.previousMatrixData&&((i=this._thinInstanceDataStorage.previousMatrixBuffer)===null||i===void 0||i.dispose(),this._thinInstanceDataStorage.previousMatrixBuffer=this._thinInstanceCreateMatrixBuffer("previousWorld",l,!1))):((n=this._userThinInstanceBuffersStorage.vertexBuffers[a])===null||n===void 0||n.dispose(),this._userThinInstanceBuffersStorage.data[a]=l,this._userThinInstanceBuffersStorage.sizes[a]=f,this._userThinInstanceBuffersStorage.vertexBuffers[a]=new y(this.getEngine(),l,a,!0,!1,r,!0),this.setVerticesBuffer(this._userThinInstanceBuffersStorage.vertexBuffers[a]))}};ne.prototype._thinInstanceInitializeUserStorage=function(){this._userThinInstanceBuffersStorage||(this._userThinInstanceBuffersStorage={data:{},sizes:{},vertexBuffers:{},strides:{}})};ne.prototype._disposeThinInstanceSpecificData=function(){var a;!((a=this._thinInstanceDataStorage)===null||a===void 0)&&a.matrixBuffer&&(this._thinInstanceDataStorage.matrixBuffer.dispose(),this._thinInstanceDataStorage.matrixBuffer=null)};const Wt="EXT_mesh_gpu_instancing";class En{constructor(e){this.name=Wt,this._loader=e,this.enabled=this._loader.isExtensionUsed(Wt)}dispose(){this._loader=null}loadNodeAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{this._loader._disableInstancedMesh++;const r=this._loader.loadNodeAsync(`/nodes/${t.index}`,t,i);if(this._loader._disableInstancedMesh--,!t._primitiveBabylonMeshes)return r;const o=new Array;let l=0;const c=f=>{if(s.attributes[f]==null){o.push(Promise.resolve(null));return}const u=L.Get(`${n}/attributes/${f}`,this._loader.gltf.accessors,s.attributes[f]);if(o.push(this._loader._loadFloatAccessorAsync(`/accessors/${u.bufferView}`,u)),l===0)l=u.count;else if(l!==u.count)throw new Error(`${n}/attributes: Instance buffer accessors do not have the same count.`)};return c("TRANSLATION"),c("ROTATION"),c("SCALE"),r.then(f=>Promise.all(o).then(([u,h,_])=>{const d=new Float32Array(l*16);F.Vector3[0].copyFromFloats(0,0,0),F.Quaternion[0].copyFromFloats(0,0,0,1),F.Vector3[1].copyFromFloats(1,1,1);for(let E=0;E<l;++E)u&&A.FromArrayToRef(u,E*3,F.Vector3[0]),h&&Ee.FromArrayToRef(h,E*4,F.Quaternion[0]),_&&A.FromArrayToRef(_,E*3,F.Vector3[1]),X.ComposeToRef(F.Vector3[1],F.Quaternion[0],F.Vector3[0],F.Matrix[0]),F.Matrix[0].copyToArray(d,E*16);for(const E of t._primitiveBabylonMeshes)E.thinInstanceSetBuffer("matrix",d,16,!0);return f}))})}}v.RegisterExtension(Wt,a=>new En(a));class Ue{constructor(){const e=Ue.Configuration.decoder;this._decoderModulePromise=w.LoadScriptAsync(w.GetAbsoluteUrl(e.url)).then(()=>MeshoptDecoder.ready)}static get Default(){return Ue._Default||(Ue._Default=new Ue),Ue._Default}dispose(){delete this._decoderModulePromise}decodeGltfBufferAsync(e,t,i,n,s){return this._decoderModulePromise.then(()=>{const r=new Uint8Array(t*i);return MeshoptDecoder.decodeGltfBuffer(r,t,i,e,n,s),r})}}Ue.Configuration={decoder:{url:"https://preview.babylonjs.com/meshopt_decoder.js"}};Ue._Default=null;const Kt="EXT_meshopt_compression";class mn{constructor(e){this.name=Kt,this.enabled=e.isExtensionUsed(Kt),this._loader=e}dispose(){this._loader=null}loadBufferViewAsync(e,t){return v.LoadExtensionAsync(e,t,this.name,(i,n)=>{const s=t;if(s._meshOptData)return s._meshOptData;const r=L.Get(`${e}/buffer`,this._loader.gltf.buffers,n.buffer);return s._meshOptData=this._loader.loadBufferAsync(`/buffers/${r.index}`,r,n.byteOffset||0,n.byteLength).then(o=>Ue.Default.decodeGltfBufferAsync(o,n.count,n.byteStride,n.mode,n.filter)),s._meshOptData})}}v.RegisterExtension(Kt,a=>new mn(a));const Qt="EXT_texture_webp";class pn{constructor(e){this.name=Qt,this._loader=e,this.enabled=e.isExtensionUsed(Qt)}dispose(){this._loader=null}_loadTextureAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=t.sampler==null?v.DefaultSampler:L.Get(`${e}/sampler`,this._loader.gltf.samplers,t.sampler),o=L.Get(`${n}/source`,this._loader.gltf.images,s.source);return this._loader._createTextureAsync(e,r,o,l=>{i(l)},void 0,!t._textureInfo.nonColorData)})}}v.RegisterExtension(Qt,a=>new pn(a));class za{constructor(e){this._pendingActions=new Array,this._workerInfos=e.map(t=>({workerPromise:Promise.resolve(t),idle:!0}))}dispose(){for(const e of this._workerInfos)e.workerPromise.then(t=>{t.terminate()});this._workerInfos.length=0,this._pendingActions.length=0}push(e){this._executeOnIdleWorker(e)||this._pendingActions.push(e)}_executeOnIdleWorker(e){for(const t of this._workerInfos)if(t.idle)return this._execute(t,e),!0;return!1}_execute(e,t){e.idle=!1,e.workerPromise.then(i=>{t(i,()=>{const n=this._pendingActions.shift();n?this._execute(e,n):e.idle=!0})})}}class Lt extends za{constructor(e,t,i=Lt.DefaultOptions){super([]),this._maxWorkers=e,this._createWorkerAsync=t,this._options=i}push(e){if(!this._executeOnIdleWorker(e))if(this._workerInfos.length<this._maxWorkers){const t={workerPromise:this._createWorkerAsync(),idle:!1};this._workerInfos.push(t),this._execute(t,e)}else this._pendingActions.push(e)}_execute(e,t){e.timeoutId&&(clearTimeout(e.timeoutId),delete e.timeoutId),super._execute(e,(i,n)=>{t(i,()=>{n(),e.idle&&(e.timeoutId=setTimeout(()=>{e.workerPromise.then(r=>{r.terminate()});const s=this._workerInfos.indexOf(e);s!==-1&&this._workerInfos.splice(s,1)},this._options.idleTimeElapsedBeforeRelease))})})}}Lt.DefaultOptions={idleTimeElapsedBeforeRelease:1e3};function Wa(a){return new Promise(e=>{DracoDecoderModule({wasmBinary:a}).then(t=>{e({module:t})})})}function jt(a,e,t,i,n,s){const r=new a.DecoderBuffer;r.Init(e,e.byteLength);const o=new a.Decoder;let l,c;try{const f=o.GetEncodedGeometryType(r);switch(f){case a.TRIANGULAR_MESH:l=new a.Mesh,c=o.DecodeBufferToMesh(r,l);break;case a.POINT_CLOUD:l=new a.PointCloud,c=o.DecodeBufferToPointCloud(r,l);break;default:throw new Error(`Invalid geometry type ${f}`)}if(!c.ok()||!l.ptr)throw new Error(c.error_msg());if(f===a.TRIANGULAR_MESH){const _=l.num_faces()*3,d=_*4,E=a._malloc(d);try{o.GetTrianglesUInt32Array(l,d,E);const p=new Uint32Array(_);p.set(new Uint32Array(a.HEAPF32.buffer,E,_)),i(p)}finally{a._free(E)}}const u=(h,_,d=1)=>{const E=_.num_components(),p=l.num_points(),g=p*E,R=g*Float32Array.BYTES_PER_ELEMENT,M=a._malloc(R);try{o.GetAttributeDataArrayForAllPoints(l,_,a.DT_FLOAT32,R,M);const b=new Float32Array(a.HEAPF32.buffer,M,g);if(h==="color"&&E===3){const O=new Float32Array(p*4);for(let I=0,N=0;I<O.length;I+=4,N+=E)O[I+0]=b[N+0],O[I+1]=b[N+1],O[I+2]=b[N+2],O[I+3]=1;n(h,O)}else{const O=new Float32Array(g);if(O.set(new Float32Array(a.HEAPF32.buffer,M,g)),d!==1)for(let I=0;I<O.length;I++)O[I]=O[I]/d;n(h,O)}}finally{a._free(M)}};if(t)for(const h in t){const _=t[h],d=o.GetAttributeByUniqueId(l,_),E=s&&s[h]||1;u(h,d,E)}else{const h={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"};for(const _ in h){const d=o.GetAttributeId(l,a[h[_]]);if(d!==-1){const E=o.GetAttribute(l,d);u(_,E)}}}}finally{l&&a.destroy(l),a.destroy(o),a.destroy(r)}}function Ka(){let a;onmessage=e=>{const t=e.data;switch(t.id){case"init":{const i=t.decoder;i.url&&(importScripts(i.url),a=DracoDecoderModule({wasmBinary:i.wasmBinary})),postMessage("done");break}case"decodeMesh":{if(!a)throw new Error("Draco decoder module is not available");a.then(i=>{jt(i,t.dataView,t.attributes,n=>{postMessage({id:"indices",value:n},[n.buffer])},(n,s)=>{postMessage({id:n,value:s},[s.buffer])}),postMessage("done")});break}}}}class Te{constructor(e=Te.DefaultNumWorkers){const t=Te.Configuration.decoder,i=t.wasmUrl&&t.wasmBinaryUrl&&typeof WebAssembly=="object"?{url:w.GetAbsoluteUrl(t.wasmUrl),wasmBinaryPromise:w.LoadFileAsync(w.GetAbsoluteUrl(t.wasmBinaryUrl))}:{url:w.GetAbsoluteUrl(t.fallbackUrl),wasmBinaryPromise:Promise.resolve(void 0)};e&&typeof Worker=="function"&&typeof URL=="function"?this._workerPoolPromise=i.wasmBinaryPromise.then(n=>{const s=`${jt}(${Ka})()`,r=URL.createObjectURL(new Blob([s],{type:"application/javascript"}));return new Lt(e,()=>new Promise((o,l)=>{const c=new Worker(r),f=h=>{c.removeEventListener("error",f),c.removeEventListener("message",u),l(h)},u=h=>{h.data==="done"&&(c.removeEventListener("error",f),c.removeEventListener("message",u),o(c))};c.addEventListener("error",f),c.addEventListener("message",u),c.postMessage({id:"init",decoder:{url:i.url,wasmBinary:n}})}))}):this._decoderModulePromise=i.wasmBinaryPromise.then(n=>{if(!i.url)throw new Error("Draco decoder module is not available");return w.LoadScriptAsync(i.url).then(()=>Wa(n))})}static get DecoderAvailable(){const e=Te.Configuration.decoder;return!!(e.wasmUrl&&e.wasmBinaryUrl&&typeof WebAssembly=="object"||e.fallbackUrl)}static GetDefaultNumWorkers(){return typeof navigator!="object"||!navigator.hardwareConcurrency?1:Math.min(Math.floor(navigator.hardwareConcurrency*.5),4)}static get Default(){return Te._Default||(Te._Default=new Te),Te._Default}dispose(){this._workerPoolPromise&&this._workerPoolPromise.then(e=>{e.dispose()}),delete this._workerPoolPromise,delete this._decoderModulePromise}whenReadyAsync(){return this._workerPoolPromise?this._workerPoolPromise.then(()=>{}):this._decoderModulePromise?this._decoderModulePromise.then(()=>{}):Promise.resolve()}decodeMeshAsync(e,t,i){const n=e instanceof ArrayBuffer?new Uint8Array(e):e;if(this._workerPoolPromise)return this._workerPoolPromise.then(s=>new Promise((r,o)=>{s.push((l,c)=>{const f=new Ht,u=d=>{l.removeEventListener("error",u),l.removeEventListener("message",h),o(d),c()},h=d=>{if(d.data==="done")l.removeEventListener("error",u),l.removeEventListener("message",h),r(f),c();else if(d.data.id==="indices")f.indices=d.data.value;else{const E=i&&i[d.data.id]?i[d.data.id]:1;if(E!==1)for(let p=0;p<d.data.value.length;p++)d.data.value[p]=d.data.value[p]/E;f.set(d.data.value,d.data.id)}};l.addEventListener("error",u),l.addEventListener("message",h);const _=new Uint8Array(n.byteLength);_.set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),l.postMessage({id:"decodeMesh",dataView:_,attributes:t},[_.buffer])})}));if(this._decoderModulePromise)return this._decoderModulePromise.then(s=>{const r=new Ht;return jt(s.module,n,t,o=>{r.indices=o},(o,l)=>{r.set(l,o)},i),r});throw new Error("Draco decoder module is not available")}}Te.Configuration={decoder:{wasmUrl:"https://preview.babylonjs.com/draco_wasm_wrapper_gltf.js",wasmBinaryUrl:"https://preview.babylonjs.com/draco_decoder_gltf.wasm",fallbackUrl:"https://preview.babylonjs.com/draco_decoder_gltf.js"}};Te.DefaultNumWorkers=Te.GetDefaultNumWorkers();Te._Default=null;const qt="KHR_draco_mesh_compression";class An{constructor(e){this.name=qt,this._loader=e,this.enabled=Te.DecoderAvailable&&this._loader.isExtensionUsed(qt)}dispose(){delete this.dracoCompression,this._loader=null}_loadVertexDataAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{if(t.mode!=null){if(t.mode!==5&&t.mode!==4)throw new Error(`${e}: Unsupported mode ${t.mode}`);if(t.mode===5)throw new Error(`${e}: Mode ${t.mode} is not currently supported`)}const r={},o={},l=(f,u)=>{const h=s.attributes[f];if(h===void 0||t.attributes[f]===void 0)return;r[u]=h;const _=L.Get(`${e}/attributes/${f}`,this._loader.gltf.accessors,t.attributes[f]);if(_.normalized&&_.componentType!==5126){let d=1;switch(_.componentType){case 5120:d=127;break;case 5121:d=255;break;case 5122:d=32767;break;case 5123:d=65535;break}o[u]=d}i._delayInfo=i._delayInfo||[],i._delayInfo.indexOf(u)===-1&&i._delayInfo.push(u)};l("POSITION",y.PositionKind),l("NORMAL",y.NormalKind),l("TANGENT",y.TangentKind),l("TEXCOORD_0",y.UVKind),l("TEXCOORD_1",y.UV2Kind),l("TEXCOORD_2",y.UV3Kind),l("TEXCOORD_3",y.UV4Kind),l("TEXCOORD_4",y.UV5Kind),l("TEXCOORD_5",y.UV6Kind),l("JOINTS_0",y.MatricesIndicesKind),l("WEIGHTS_0",y.MatricesWeightsKind),l("COLOR_0",y.ColorKind);const c=L.Get(n,this._loader.gltf.bufferViews,s.bufferView);return c._dracoBabylonGeometry||(c._dracoBabylonGeometry=this._loader.loadBufferViewAsync(`/bufferViews/${c.index}`,c).then(f=>(this.dracoCompression||Te.Default).decodeMeshAsync(f,r,o).then(h=>{const _=new Ri(i.name,this._loader.babylonScene);return h.applyToGeometry(_),_}).catch(h=>{throw new Error(`${e}: ${h.message}`)}))),c._dracoBabylonGeometry})}}v.RegisterExtension(qt,a=>new An(a));const Zt="KHR_lights_punctual";class Tn{constructor(e){this.name=Zt,this._loader=e,this.enabled=this._loader.isExtensionUsed(Zt)}dispose(){this._loader=null,delete this._lights}onLoading(){const e=this._loader.gltf.extensions;if(e&&e[this.name]){const t=e[this.name];this._lights=t.lights,L.Assign(this._lights)}}loadNodeAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>this._loader.loadNodeAsync(e,t,r=>{let o;const l=L.Get(n,this._lights,s.light),c=l.name||r.name;switch(this._loader.babylonScene._blockEntityCollection=!!this._loader._assetContainer,l.type){case"directional":{o=new Ce(c,A.Backward(),this._loader.babylonScene);break}case"point":{o=new mt(c,A.Zero(),this._loader.babylonScene);break}case"spot":{const f=new pe(c,A.Zero(),A.Backward(),0,1,this._loader.babylonScene);f.angle=(l.spot&&l.spot.outerConeAngle||Math.PI/4)*2,f.innerAngle=(l.spot&&l.spot.innerConeAngle||0)*2,o=f;break}default:throw this._loader.babylonScene._blockEntityCollection=!1,new Error(`${n}: Invalid light type (${l.type})`)}o._parentContainer=this._loader._assetContainer,this._loader.babylonScene._blockEntityCollection=!1,l._babylonLight=o,o.falloffType=_t.FALLOFF_GLTF,o.diffuse=l.color?V.FromArray(l.color):V.White(),o.intensity=l.intensity==null?1:l.intensity,o.range=l.range==null?Number.MAX_VALUE:l.range,o.parent=r,this._loader._babylonLights.push(o),v.AddPointerMetadata(o,n),i(r)}))}}v.RegisterExtension(Zt,a=>new Tn(a));const Jt="KHR_materials_pbrSpecularGlossiness";class gn{constructor(e){this.name=Jt,this.order=200,this._loader=e,this.enabled=this._loader.isExtensionUsed(Jt)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialBasePropertiesAsync(e,t,i)),r.push(this._loadSpecularGlossinessPropertiesAsync(n,t,s,i)),this._loader.loadMaterialAlphaProperties(e,t,i),Promise.all(r).then(()=>{})})}_loadSpecularGlossinessPropertiesAsync(e,t,i,n){if(!(n instanceof S))throw new Error(`${e}: Material type not supported`);const s=new Array;return n.metallic=null,n.roughness=null,i.diffuseFactor?(n.albedoColor=V.FromArray(i.diffuseFactor),n.alpha=i.diffuseFactor[3]):n.albedoColor=V.White(),n.reflectivityColor=i.specularFactor?V.FromArray(i.specularFactor):V.White(),n.microSurface=i.glossinessFactor==null?1:i.glossinessFactor,i.diffuseTexture&&s.push(this._loader.loadTextureInfoAsync(`${e}/diffuseTexture`,i.diffuseTexture,r=>{r.name=`${n.name} (Diffuse)`,n.albedoTexture=r})),i.specularGlossinessTexture&&(s.push(this._loader.loadTextureInfoAsync(`${e}/specularGlossinessTexture`,i.specularGlossinessTexture,r=>{r.name=`${n.name} (Specular Glossiness)`,n.reflectivityTexture=r,n.reflectivityTexture.hasAlpha=!0})),n.useMicroSurfaceFromReflectivityMapAlpha=!0),Promise.all(s).then(()=>{})}}v.RegisterExtension(Jt,a=>new gn(a));const $t="KHR_materials_unlit";class Rn{constructor(e){this.name=$t,this.order=210,this._loader=e,this.enabled=this._loader.isExtensionUsed($t)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,()=>this._loadUnlitPropertiesAsync(e,t,i))}_loadUnlitPropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const n=new Array;i.unlit=!0;const s=t.pbrMetallicRoughness;return s&&(s.baseColorFactor?(i.albedoColor=V.FromArray(s.baseColorFactor),i.alpha=s.baseColorFactor[3]):i.albedoColor=V.White(),s.baseColorTexture&&n.push(this._loader.loadTextureInfoAsync(`${e}/baseColorTexture`,s.baseColorTexture,r=>{r.name=`${i.name} (Base Color)`,i.albedoTexture=r}))),t.doubleSided&&(i.backFaceCulling=!1,i.twoSidedLighting=!0),this._loader.loadMaterialAlphaProperties(e,t,i),Promise.all(n).then(()=>{})}}v.RegisterExtension($t,a=>new Rn(a));const ei="KHR_materials_clearcoat";class Cn{constructor(e){this.name=ei,this.order=190,this._loader=e,this.enabled=this._loader.isExtensionUsed(ei)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadClearCoatPropertiesAsync(n,s,i)),Promise.all(r).then(()=>{})})}_loadClearCoatPropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const n=new Array;return i.clearCoat.isEnabled=!0,i.clearCoat.useRoughnessFromMainTexture=!1,i.clearCoat.remapF0OnInterfaceChange=!1,t.clearcoatFactor!=null?i.clearCoat.intensity=t.clearcoatFactor:i.clearCoat.intensity=0,t.clearcoatTexture&&n.push(this._loader.loadTextureInfoAsync(`${e}/clearcoatTexture`,t.clearcoatTexture,s=>{s.name=`${i.name} (ClearCoat Intensity)`,i.clearCoat.texture=s})),t.clearcoatRoughnessFactor!=null?i.clearCoat.roughness=t.clearcoatRoughnessFactor:i.clearCoat.roughness=0,t.clearcoatRoughnessTexture&&(t.clearcoatRoughnessTexture.nonColorData=!0,n.push(this._loader.loadTextureInfoAsync(`${e}/clearcoatRoughnessTexture`,t.clearcoatRoughnessTexture,s=>{s.name=`${i.name} (ClearCoat Roughness)`,i.clearCoat.textureRoughness=s}))),t.clearcoatNormalTexture&&(t.clearcoatNormalTexture.nonColorData=!0,n.push(this._loader.loadTextureInfoAsync(`${e}/clearcoatNormalTexture`,t.clearcoatNormalTexture,s=>{s.name=`${i.name} (ClearCoat Normal)`,i.clearCoat.bumpTexture=s})),i.invertNormalMapX=!i.getScene().useRightHandedSystem,i.invertNormalMapY=i.getScene().useRightHandedSystem,t.clearcoatNormalTexture.scale!=null&&(i.clearCoat.bumpTexture.level=t.clearcoatNormalTexture.scale)),Promise.all(n).then(()=>{})}}v.RegisterExtension(ei,a=>new Cn(a));const ti="KHR_materials_iridescence";class Sn{constructor(e){this.name=ti,this.order=195,this._loader=e,this.enabled=this._loader.isExtensionUsed(ti)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadIridescencePropertiesAsync(n,s,i)),Promise.all(r).then(()=>{})})}_loadIridescencePropertiesAsync(e,t,i){var n,s,r,o,l;if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const c=new Array;return i.iridescence.isEnabled=!0,i.iridescence.intensity=(n=t.iridescenceFactor)!==null&&n!==void 0?n:0,i.iridescence.indexOfRefraction=(r=(s=t.iridescenceIor)!==null&&s!==void 0?s:t.iridescenceIOR)!==null&&r!==void 0?r:1.3,i.iridescence.minimumThickness=(o=t.iridescenceThicknessMinimum)!==null&&o!==void 0?o:100,i.iridescence.maximumThickness=(l=t.iridescenceThicknessMaximum)!==null&&l!==void 0?l:400,t.iridescenceTexture&&c.push(this._loader.loadTextureInfoAsync(`${e}/iridescenceTexture`,t.iridescenceTexture,f=>{f.name=`${i.name} (Iridescence Intensity)`,i.iridescence.texture=f})),t.iridescenceThicknessTexture&&c.push(this._loader.loadTextureInfoAsync(`${e}/iridescenceThicknessTexture`,t.iridescenceThicknessTexture,f=>{f.name=`${i.name} (Iridescence Thickness)`,i.iridescence.thicknessTexture=f})),Promise.all(c).then(()=>{})}}v.RegisterExtension(ti,a=>new Sn(a));const ii="KHR_materials_emissive_strength";class In{constructor(e){this.name=ii,this.order=170,this._loader=e,this.enabled=this._loader.isExtensionUsed(ii)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>this._loader.loadMaterialPropertiesAsync(e,t,i).then(()=>{this._loadEmissiveProperties(n,s,i)}))}_loadEmissiveProperties(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);t.emissiveStrength!==void 0&&i.emissiveColor.scaleToRef(t.emissiveStrength,i.emissiveColor)}}v.RegisterExtension(ii,a=>new In(a));const ni="KHR_materials_sheen";class vn{constructor(e){this.name=ni,this.order=190,this._loader=e,this.enabled=this._loader.isExtensionUsed(ni)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadSheenPropertiesAsync(n,s,i)),Promise.all(r).then(()=>{})})}_loadSheenPropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const n=new Array;return i.sheen.isEnabled=!0,i.sheen.intensity=1,t.sheenColorFactor!=null?i.sheen.color=V.FromArray(t.sheenColorFactor):i.sheen.color=V.Black(),t.sheenColorTexture&&n.push(this._loader.loadTextureInfoAsync(`${e}/sheenColorTexture`,t.sheenColorTexture,s=>{s.name=`${i.name} (Sheen Color)`,i.sheen.texture=s})),t.sheenRoughnessFactor!==void 0?i.sheen.roughness=t.sheenRoughnessFactor:i.sheen.roughness=0,t.sheenRoughnessTexture&&(t.sheenRoughnessTexture.nonColorData=!0,n.push(this._loader.loadTextureInfoAsync(`${e}/sheenRoughnessTexture`,t.sheenRoughnessTexture,s=>{s.name=`${i.name} (Sheen Roughness)`,i.sheen.textureRoughness=s}))),i.sheen.albedoScaling=!0,i.sheen.useRoughnessFromMainTexture=!1,Promise.all(n).then(()=>{})}}v.RegisterExtension(ni,a=>new vn(a));const si="KHR_materials_specular";class xn{constructor(e){this.name=si,this.order=190,this._loader=e,this.enabled=this._loader.isExtensionUsed(si)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadSpecularPropertiesAsync(n,s,i)),Promise.all(r).then(()=>{})})}_loadSpecularPropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const n=new Array;return t.specularFactor!==void 0&&(i.metallicF0Factor=t.specularFactor),t.specularColorFactor!==void 0&&(i.metallicReflectanceColor=V.FromArray(t.specularColorFactor)),t.specularTexture&&(t.specularTexture.nonColorData=!0,n.push(this._loader.loadTextureInfoAsync(`${e}/specularTexture`,t.specularTexture,s=>{s.name=`${i.name} (Specular F0 Strength)`,i.metallicReflectanceTexture=s,i.useOnlyMetallicFromMetallicReflectanceTexture=!0}))),t.specularColorTexture&&n.push(this._loader.loadTextureInfoAsync(`${e}/specularColorTexture`,t.specularColorTexture,s=>{s.name=`${i.name} (Specular F0 Color)`,i.reflectanceTexture=s})),Promise.all(n).then(()=>{})}}v.RegisterExtension(si,a=>new xn(a));const ri="KHR_materials_ior";class Tt{constructor(e){this.name=ri,this.order=180,this._loader=e,this.enabled=this._loader.isExtensionUsed(ri)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadIorPropertiesAsync(n,s,i)),Promise.all(r).then(()=>{})})}_loadIorPropertiesAsync(e,t,i){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);return t.ior!==void 0?i.indexOfRefraction=t.ior:i.indexOfRefraction=Tt._DEFAULT_IOR,Promise.resolve()}}Tt._DEFAULT_IOR=1.5;v.RegisterExtension(ri,a=>new Tt(a));const de="KHR_materials_variants";class Be{constructor(e){this.name=de,this._loader=e,this.enabled=this._loader.isExtensionUsed(de)}dispose(){this._loader=null}static GetAvailableVariants(e){const t=this._GetExtensionMetadata(e);return t?Object.keys(t.variants):[]}getAvailableVariants(e){return Be.GetAvailableVariants(e)}static SelectVariant(e,t){const i=this._GetExtensionMetadata(e);if(!i)throw new Error(`Cannot select variant on a glTF mesh that does not have the ${de} extension`);const n=s=>{const r=i.variants[s];if(r)for(const o of r)o.mesh.material=o.material};if(t instanceof Array)for(const s of t)n(s);else n(t);i.lastSelected=t}selectVariant(e,t){return Be.SelectVariant(e,t)}static Reset(e){const t=this._GetExtensionMetadata(e);if(!t)throw new Error(`Cannot reset on a glTF mesh that does not have the ${de} extension`);for(const i of t.original)i.mesh.material=i.material;t.lastSelected=null}reset(e){return Be.Reset(e)}static GetLastSelectedVariant(e){const t=this._GetExtensionMetadata(e);if(!t)throw new Error(`Cannot get the last selected variant on a glTF mesh that does not have the ${de} extension`);return t.lastSelected}getLastSelectedVariant(e){return Be.GetLastSelectedVariant(e)}static _GetExtensionMetadata(e){var t,i;return((i=(t=e==null?void 0:e.metadata)===null||t===void 0?void 0:t.gltf)===null||i===void 0?void 0:i[de])||null}onLoading(){const e=this._loader.gltf.extensions;if(e&&e[this.name]){const t=e[this.name];this._variants=t.variants}}_loadMeshPrimitiveAsync(e,t,i,n,s,r){return v.LoadExtensionAsync(e,s,this.name,(o,l)=>{const c=new Array;return c.push(this._loader._loadMeshPrimitiveAsync(e,t,i,n,s,f=>{if(r(f),f instanceof ne){const u=v._GetDrawMode(e,s.mode),h=this._loader.rootBabylonMesh,_=h?h.metadata=h.metadata||{}:{},d=_.gltf=_.gltf||{},E=d[de]=d[de]||{lastSelected:null,original:[],variants:{}};E.original.push({mesh:f,material:f.material});for(let p=0;p<l.mappings.length;++p){const g=l.mappings[p],R=L.Get(`${o}/mappings/${p}/material`,this._loader.gltf.materials,g.material);c.push(this._loader._loadMaterialAsync(`#/materials/${g.material}`,R,f,u,M=>{for(let b=0;b<g.variants.length;++b){const O=g.variants[b],I=L.Get(`/extensions/${de}/variants/${O}`,this._variants,O);E.variants[I.name]=E.variants[I.name]||[],E.variants[I.name].push({mesh:f,material:M}),f.onClonedObservable.add(N=>{const G=N;let Q=null,J=G;do{if(J=J.parent,!J)return;Q=Be._GetExtensionMetadata(J)}while(Q===null);if(h&&Q===Be._GetExtensionMetadata(h)){J.metadata={};for(const se in h.metadata)J.metadata[se]=h.metadata[se];J.metadata.gltf=[];for(const se in h.metadata.gltf)J.metadata.gltf[se]=h.metadata.gltf[se];J.metadata.gltf[de]={lastSelected:null,original:[],variants:{}};for(const se of Q.original)J.metadata.gltf[de].original.push({mesh:se.mesh,material:se.material});for(const se in Q.variants)if(Object.prototype.hasOwnProperty.call(Q.variants,se)){J.metadata.gltf[de].variants[se]=[];for(const Ni of Q.variants[se])J.metadata.gltf[de].variants[se].push({mesh:Ni.mesh,material:Ni.material})}Q=J.metadata.gltf[de]}for(const se of Q.original)se.mesh===f&&(se.mesh=G);for(const se of Q.variants[I.name])se.mesh===f&&(se.mesh=G)})}}))}}})),Promise.all(c).then(([f])=>f)})}}v.RegisterExtension(de,a=>new Be(a));class xi{constructor(e,t){this._opaqueRenderTarget=null,this._opaqueMeshesCache=[],this._transparentMeshesCache=[],this._materialObservers={},this._options={...xi._GetDefaultOptions(),...e},this._scene=t,this._scene._transmissionHelper=this,this.onErrorObservable=new Y,this._scene.onDisposeObservable.addOnce(()=>{this.dispose()}),this._parseScene(),this._setupRenderTargets()}static _GetDefaultOptions(){return{renderSize:1024,samples:4,lodGenerationScale:1,lodGenerationOffset:-4,renderTargetTextureType:ke.TEXTURETYPE_HALF_FLOAT,generateMipmaps:!0}}updateOptions(e){if(!Object.keys(e).filter(s=>this._options[s]!==e[s]).length)return;const i={...this._options,...e},n=this._options;this._options=i,i.renderSize!==n.renderSize||i.renderTargetTextureType!==n.renderTargetTextureType||i.generateMipmaps!==n.generateMipmaps||!this._opaqueRenderTarget?this._setupRenderTargets():(this._opaqueRenderTarget.samples=i.samples,this._opaqueRenderTarget.lodGenerationScale=i.lodGenerationScale,this._opaqueRenderTarget.lodGenerationOffset=i.lodGenerationOffset)}getOpaqueTarget(){return this._opaqueRenderTarget}_shouldRenderAsTransmission(e){return e?!!(e instanceof S&&e.subSurface.isRefractionEnabled):!1}_addMesh(e){this._materialObservers[e.uniqueId]=e.onMaterialChangedObservable.add(this._onMeshMaterialChanged.bind(this)),w.SetImmediate(()=>{this._shouldRenderAsTransmission(e.material)?(e.material.refractionTexture=this._opaqueRenderTarget,this._transparentMeshesCache.push(e)):this._opaqueMeshesCache.push(e)})}_removeMesh(e){e.onMaterialChangedObservable.remove(this._materialObservers[e.uniqueId]),delete this._materialObservers[e.uniqueId];let t=this._transparentMeshesCache.indexOf(e);t!==-1&&this._transparentMeshesCache.splice(t,1),t=this._opaqueMeshesCache.indexOf(e),t!==-1&&this._opaqueMeshesCache.splice(t,1)}_parseScene(){this._scene.meshes.forEach(this._addMesh.bind(this)),this._scene.onNewMeshAddedObservable.add(this._addMesh.bind(this)),this._scene.onMeshRemovedObservable.add(this._removeMesh.bind(this))}_onMeshMaterialChanged(e){const t=this._transparentMeshesCache.indexOf(e),i=this._opaqueMeshesCache.indexOf(e);this._shouldRenderAsTransmission(e.material)?(e.material instanceof S&&(e.material.subSurface.refractionTexture=this._opaqueRenderTarget),i!==-1?(this._opaqueMeshesCache.splice(i,1),this._transparentMeshesCache.push(e)):t===-1&&this._transparentMeshesCache.push(e)):t!==-1?(this._transparentMeshesCache.splice(t,1),this._opaqueMeshesCache.push(e)):i===-1&&this._opaqueMeshesCache.push(e)}_setupRenderTargets(){var e,t;this._opaqueRenderTarget&&this._opaqueRenderTarget.dispose(),this._opaqueRenderTarget=new Ge("opaqueSceneTexture",this._options.renderSize,this._scene,this._options.generateMipmaps,void 0,this._options.renderTargetTextureType),this._opaqueRenderTarget.ignoreCameraViewport=!0,this._opaqueRenderTarget.renderList=this._opaqueMeshesCache,this._opaqueRenderTarget.clearColor=(t=(e=this._options.clearColor)===null||e===void 0?void 0:e.clone())!==null&&t!==void 0?t:this._scene.clearColor.clone(),this._opaqueRenderTarget.gammaSpace=!1,this._opaqueRenderTarget.lodGenerationScale=this._options.lodGenerationScale,this._opaqueRenderTarget.lodGenerationOffset=this._options.lodGenerationOffset,this._opaqueRenderTarget.samples=this._options.samples;let i,n;this._opaqueRenderTarget.onBeforeBindObservable.add(s=>{n=this._scene.environmentIntensity,this._scene.environmentIntensity=1,i=this._scene.imageProcessingConfiguration.applyByPostProcess,this._options.clearColor?s.clearColor.copyFrom(this._options.clearColor):this._scene.clearColor.toLinearSpaceToRef(s.clearColor),this._scene.imageProcessingConfiguration._applyByPostProcess=!0}),this._opaqueRenderTarget.onAfterUnbindObservable.add(()=>{this._scene.environmentIntensity=n,this._scene.imageProcessingConfiguration._applyByPostProcess=i}),this._transparentMeshesCache.forEach(s=>{this._shouldRenderAsTransmission(s.material)&&(s.material.refractionTexture=this._opaqueRenderTarget)})}dispose(){this._scene._transmissionHelper=void 0,this._opaqueRenderTarget&&(this._opaqueRenderTarget.dispose(),this._opaqueRenderTarget=null),this._transparentMeshesCache=[],this._opaqueMeshesCache=[]}}const ai="KHR_materials_transmission";class Mn{constructor(e){this.name=ai,this.order=175,this._loader=e,this.enabled=this._loader.isExtensionUsed(ai),this.enabled&&(e.parent.transparencyAsCoverage=!0)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialBasePropertiesAsync(e,t,i)),r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadTransparentPropertiesAsync(n,t,i,s)),Promise.all(r).then(()=>{})})}_loadTransparentPropertiesAsync(e,t,i,n){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const s=i;if(s.subSurface.isRefractionEnabled=!0,s.subSurface.volumeIndexOfRefraction=1,s.subSurface.useAlbedoToTintRefraction=!0,n.transmissionFactor!==void 0){s.subSurface.refractionIntensity=n.transmissionFactor;const r=s.getScene();s.subSurface.refractionIntensity&&!r._transmissionHelper&&new xi({},s.getScene())}else return s.subSurface.refractionIntensity=0,s.subSurface.isRefractionEnabled=!1,Promise.resolve();return s.subSurface.minimumThickness=0,s.subSurface.maximumThickness=0,n.transmissionTexture?(n.transmissionTexture.nonColorData=!0,this._loader.loadTextureInfoAsync(`${e}/transmissionTexture`,n.transmissionTexture,void 0).then(r=>{s.subSurface.refractionIntensityTexture=r,s.subSurface.useGltfStyleTextures=!0})):Promise.resolve()}}v.RegisterExtension(ai,a=>new Mn(a));const oi="KHR_materials_translucency";class Nn{constructor(e){this.name=oi,this.order=174,this._loader=e,this.enabled=this._loader.isExtensionUsed(oi),this.enabled&&(e.parent.transparencyAsCoverage=!0)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialBasePropertiesAsync(e,t,i)),r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadTranslucentPropertiesAsync(n,t,i,s)),Promise.all(r).then(()=>{})})}_loadTranslucentPropertiesAsync(e,t,i,n){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);const s=i;if(s.subSurface.isTranslucencyEnabled=!0,s.subSurface.volumeIndexOfRefraction=1,s.subSurface.minimumThickness=0,s.subSurface.maximumThickness=0,s.subSurface.useAlbedoToTintTranslucency=!0,n.translucencyFactor!==void 0)s.subSurface.translucencyIntensity=n.translucencyFactor;else return s.subSurface.translucencyIntensity=0,s.subSurface.isTranslucencyEnabled=!1,Promise.resolve();return n.translucencyTexture?(n.translucencyTexture.nonColorData=!0,this._loader.loadTextureInfoAsync(`${e}/translucencyTexture`,n.translucencyTexture).then(r=>{s.subSurface.translucencyIntensityTexture=r})):Promise.resolve()}}v.RegisterExtension(oi,a=>new Nn(a));const li="KHR_materials_volume";class On{constructor(e){this.name=li,this.order=173,this._loader=e,this.enabled=this._loader.isExtensionUsed(li),this.enabled&&this._loader._disableInstancedMesh++}dispose(){this.enabled&&this._loader._disableInstancedMesh--,this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return r.push(this._loader.loadMaterialBasePropertiesAsync(e,t,i)),r.push(this._loader.loadMaterialPropertiesAsync(e,t,i)),r.push(this._loadVolumePropertiesAsync(n,t,i,s)),Promise.all(r).then(()=>{})})}_loadVolumePropertiesAsync(e,t,i,n){if(!(i instanceof S))throw new Error(`${e}: Material type not supported`);if(!i.subSurface.isRefractionEnabled&&!i.subSurface.isTranslucencyEnabled||!n.thicknessFactor)return Promise.resolve();i.subSurface.volumeIndexOfRefraction=i.indexOfRefraction;const s=n.attenuationDistance!==void 0?n.attenuationDistance:Number.MAX_VALUE;return i.subSurface.tintColorAtDistance=s,n.attenuationColor!==void 0&&n.attenuationColor.length==3&&i.subSurface.tintColor.copyFromFloats(n.attenuationColor[0],n.attenuationColor[1],n.attenuationColor[2]),i.subSurface.minimumThickness=0,i.subSurface.maximumThickness=n.thicknessFactor,i.subSurface.useThicknessAsDepth=!0,n.thicknessTexture?(n.thicknessTexture.nonColorData=!0,this._loader.loadTextureInfoAsync(`${e}/thicknessTexture`,n.thicknessTexture).then(r=>{i.subSurface.thicknessTexture=r,i.subSurface.useGltfStyleTextures=!0})):Promise.resolve()}}v.RegisterExtension(li,a=>new On(a));const ci="KHR_mesh_quantization";class yn{constructor(e){this.name=ci,this.enabled=e.isExtensionUsed(ci)}dispose(){}}v.RegisterExtension(ci,a=>new yn(a));const fi="KHR_texture_basisu";class bn{constructor(e){this.name=fi,this._loader=e,this.enabled=e.isExtensionUsed(fi)}dispose(){this._loader=null}_loadTextureAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=t.sampler==null?v.DefaultSampler:L.Get(`${e}/sampler`,this._loader.gltf.samplers,t.sampler),o=L.Get(`${n}/source`,this._loader.gltf.images,s.source);return this._loader._createTextureAsync(e,r,o,l=>{i(l)},t._textureInfo.nonColorData?{useRGBAIfASTCBC7NotAvailableWhenUASTC:!0}:void 0,!t._textureInfo.nonColorData)})}}v.RegisterExtension(fi,a=>new bn(a));const hi="KHR_texture_transform";class Ln{constructor(e){this.name=hi,this._loader=e,this.enabled=this._loader.isExtensionUsed(hi)}dispose(){this._loader=null}loadTextureInfoAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>this._loader.loadTextureInfoAsync(e,t,r=>{if(!(r instanceof B))throw new Error(`${n}: Texture type not supported`);s.offset&&(r.uOffset=s.offset[0],r.vOffset=s.offset[1]),r.uRotationCenter=0,r.vRotationCenter=0,s.rotation&&(r.wAng=-s.rotation),s.scale&&(r.uScale=s.scale[0],r.vScale=s.scale[1]),s.texCoord!=null&&(r.coordinatesIndex=s.texCoord),i(r)}))}}v.RegisterExtension(hi,a=>new Ln(a));const ui="KHR_xmp_json_ld";class Pn{constructor(e){this.name=ui,this.order=100,this._loader=e,this.enabled=this._loader.isExtensionUsed(ui)}dispose(){this._loader=null}onLoading(){var e,t,i;if(this._loader.rootBabylonMesh===null)return;const n=(e=this._loader.gltf.extensions)===null||e===void 0?void 0:e.KHR_xmp_json_ld,s=(i=(t=this._loader.gltf.asset)===null||t===void 0?void 0:t.extensions)===null||i===void 0?void 0:i.KHR_xmp_json_ld;if(n&&s){const r=+s.packet;n.packets&&r<n.packets.length&&(this._loader.rootBabylonMesh.metadata=this._loader.rootBabylonMesh.metadata||{},this._loader.rootBabylonMesh.metadata.xmp=n.packets[r])}}}v.RegisterExtension(ui,a=>new Pn(a));function Ze(a,e,t,i){return V.FromArray(e,t).scale(i)}function Qa(a,e,t,i){return e[t+3]*i}function $(a,e,t,i){return e[t]*i}function di(a,e,t,i){return-e[t]*i}function St(a,e,t,i){return e[t+1]*i}function Ki(a,e,t,i){return e[t]*i*2}function Vt(a){return{scale:[new j(U.ANIMATIONTYPE_FLOAT,`${a}.uScale`,$,()=>2),new j(U.ANIMATIONTYPE_FLOAT,`${a}.vScale`,St,()=>2)],offset:[new j(U.ANIMATIONTYPE_FLOAT,`${a}.uOffset`,$,()=>2),new j(U.ANIMATIONTYPE_FLOAT,`${a}.vOffset`,St,()=>2)],rotation:[new j(U.ANIMATIONTYPE_FLOAT,`${a}.wAng`,di,()=>1)]}}class Fe extends At{buildAnimations(e,t,i,n,s){s(e._babylonCamera,this._buildAnimation(t,i,n))}}class j extends At{buildAnimations(e,t,i,n,s){for(const r in e._data)s(e._data[r].babylonMaterial,this._buildAnimation(t,i,n))}}class ot extends At{buildAnimations(e,t,i,n,s){s(e._babylonLight,this._buildAnimation(t,i,n))}}const ja={__array__:{__target__:!0,...ct}},qa={__array__:{__target__:!0,orthographic:{xmag:[new Fe(U.ANIMATIONTYPE_FLOAT,"orthoLeft",di,()=>1),new Fe(U.ANIMATIONTYPE_FLOAT,"orthoRight",St,()=>1)],ymag:[new Fe(U.ANIMATIONTYPE_FLOAT,"orthoBottom",di,()=>1),new Fe(U.ANIMATIONTYPE_FLOAT,"orthoTop",St,()=>1)],zfar:[new Fe(U.ANIMATIONTYPE_FLOAT,"maxZ",$,()=>1)],znear:[new Fe(U.ANIMATIONTYPE_FLOAT,"minZ",$,()=>1)]},perspective:{yfov:[new Fe(U.ANIMATIONTYPE_FLOAT,"fov",$,()=>1)],zfar:[new Fe(U.ANIMATIONTYPE_FLOAT,"maxZ",$,()=>1)],znear:[new Fe(U.ANIMATIONTYPE_FLOAT,"minZ",$,()=>1)]}}},Za={__array__:{__target__:!0,pbrMetallicRoughness:{baseColorFactor:[new j(U.ANIMATIONTYPE_COLOR3,"albedoColor",Ze,()=>4),new j(U.ANIMATIONTYPE_FLOAT,"alpha",Qa,()=>4)],metallicFactor:[new j(U.ANIMATIONTYPE_FLOAT,"metallic",$,()=>1)],roughnessFactor:[new j(U.ANIMATIONTYPE_FLOAT,"roughness",$,()=>1)],baseColorTexture:{extensions:{KHR_texture_transform:Vt("albedoTexture")}}},emissiveFactor:[new j(U.ANIMATIONTYPE_COLOR3,"emissiveColor",Ze,()=>3)],normalTexture:{scale:[new j(U.ANIMATIONTYPE_FLOAT,"bumpTexture.level",$,()=>1)]},occlusionTexture:{strength:[new j(U.ANIMATIONTYPE_FLOAT,"ambientTextureStrength",$,()=>1)],extensions:{KHR_texture_transform:Vt("ambientTexture")}},emissiveTexture:{extensions:{KHR_texture_transform:Vt("emissiveTexture")}},extensions:{KHR_materials_ior:{ior:[new j(U.ANIMATIONTYPE_FLOAT,"indexOfRefraction",$,()=>1)]},KHR_materials_clearcoat:{clearcoatFactor:[new j(U.ANIMATIONTYPE_FLOAT,"clearCoat.intensity",$,()=>1)],clearcoatRoughnessFactor:[new j(U.ANIMATIONTYPE_FLOAT,"clearCoat.roughness",$,()=>1)]},KHR_materials_sheen:{sheenColorFactor:[new j(U.ANIMATIONTYPE_COLOR3,"sheen.color",Ze,()=>3)],sheenRoughnessFactor:[new j(U.ANIMATIONTYPE_FLOAT,"sheen.roughness",$,()=>1)]},KHR_materials_specular:{specularFactor:[new j(U.ANIMATIONTYPE_FLOAT,"metallicF0Factor",$,()=>1)],specularColorFactor:[new j(U.ANIMATIONTYPE_COLOR3,"metallicReflectanceColor",Ze,()=>3)]},KHR_materials_emissive_strength:{emissiveStrength:[new j(U.ANIMATIONTYPE_FLOAT,"emissiveIntensity",$,()=>1)]},KHR_materials_transmission:{transmissionFactor:[new j(U.ANIMATIONTYPE_FLOAT,"subSurface.refractionIntensity",$,()=>1)]},KHR_materials_volume:{attenuationColor:[new j(U.ANIMATIONTYPE_COLOR3,"subSurface.tintColor",Ze,()=>3)],attenuationDistance:[new j(U.ANIMATIONTYPE_FLOAT,"subSurface.tintColorAtDistance",$,()=>1)],thicknessFactor:[new j(U.ANIMATIONTYPE_FLOAT,"subSurface.maximumThickness",$,()=>1)]},KHR_materials_iridescence:{iridescenceFactor:[new j(U.ANIMATIONTYPE_FLOAT,"iridescence.intensity",$,()=>1)],iridescenceIor:[new j(U.ANIMATIONTYPE_FLOAT,"iridescence.indexOfRefraction",$,()=>1)],iridescenceThicknessMinimum:[new j(U.ANIMATIONTYPE_FLOAT,"iridescence.minimumThickness",$,()=>1)],iridescenceThicknessMaximum:[new j(U.ANIMATIONTYPE_FLOAT,"iridescence.maximumThickness",$,()=>1)]}}}},Ja={KHR_lights_punctual:{lights:{__array__:{__target__:!0,color:[new ot(U.ANIMATIONTYPE_COLOR3,"diffuse",Ze,()=>3)],intensity:[new ot(U.ANIMATIONTYPE_FLOAT,"intensity",$,()=>1)],range:[new ot(U.ANIMATIONTYPE_FLOAT,"range",$,()=>1)],spot:{innerConeAngle:[new ot(U.ANIMATIONTYPE_FLOAT,"innerAngle",Ki,()=>1)],outerConeAngle:[new ot(U.ANIMATIONTYPE_FLOAT,"angle",Ki,()=>1)]}}}}},$a={nodes:ja,materials:Za,cameras:qa,extensions:Ja},_i="KHR_animation_pointer";class Dn{constructor(e){this.name=_i,this._loader=e}get enabled(){return this._loader.isExtensionUsed(_i)}dispose(){this._loader=null}_loadAnimationChannelAsync(e,t,i,n,s){var r;const o=(r=n.target.extensions)===null||r===void 0?void 0:r.KHR_animation_pointer;if(!o)return null;n.target.path!=="pointer"&&H.Warn(`${e}/target/path: Value (${n.target.path}) must be (pointer) when using the ${this.name} extension`),n.target.node!=null&&H.Warn(`${e}/target/node: Value (${n.target.node}) must not be present when using the ${this.name} extension`);const l=`${e}/extensions/${this.name}`,c=o.pointer;if(!c)throw new Error(`${l}: Pointer is missing`);const f=this._parseAnimationPointer(`${l}/pointer`,c);return f?this._loader._loadAnimationChannelFromTargetInfoAsync(e,t,i,n,f,s):(H.Warn(`${l}/pointer: Invalid pointer (${c}) skipped`),null)}_parseAnimationPointer(e,t){if(!t.startsWith("/"))return H.Warn(`${e}: Value (${t}) must start with a slash`),null;const i=t.split("/");i.shift();let n=$a,s=this._loader.gltf,r;for(const o of i){if(n.__array__)n=n.__array__;else if(n=n[o],!n)return null;s=s&&s[o],n.__target__&&(r=s)}return!r||!Array.isArray(n)?null:{target:r,properties:n}}}v.RegisterExtension(_i,a=>new Dn(a));class Mi{constructor(e,t,i){this.frame=e,this.action=t,this.onlyOnce=i,this.isDone=!1}_clone(){return new Mi(this.frame,this.action,this.onlyOnce)}}class Xe{constructor(e,t,i,n=null,s){var r,o,l,c,f;if(this.autoplay=!1,this._loop=!1,this.useCustomAttenuation=!1,this.isPlaying=!1,this.isPaused=!1,this.refDistance=1,this.rolloffFactor=1,this.maxDistance=100,this.distanceModel="linear",this.metadata=null,this.onEndedObservable=new Y,this._spatialSound=!1,this._panningModel="equalpower",this._playbackRate=1,this._streaming=!1,this._startTime=0,this._startOffset=0,this._position=A.Zero(),this._localDirection=new A(1,0,0),this._volume=1,this._isReadyToPlay=!1,this._isDirectional=!1,this._coneInnerAngle=360,this._coneOuterAngle=360,this._coneOuterGain=0,this._isOutputConnected=!1,this._urlType="Unknown",this.name=e,i=i||tt.LastCreatedScene,!!i)if(this._scene=i,Xe._SceneComponentInitialization(i),this._readyToPlayCallback=n,this._customAttenuationFunction=(u,h,_,d,E)=>h<_?u*(1-h/_):0,s&&(this.autoplay=s.autoplay||!1,this._loop=s.loop||!1,s.volume!==void 0&&(this._volume=s.volume),this._spatialSound=(r=s.spatialSound)!==null&&r!==void 0?r:!1,this.maxDistance=(o=s.maxDistance)!==null&&o!==void 0?o:100,this.useCustomAttenuation=(l=s.useCustomAttenuation)!==null&&l!==void 0?l:!1,this.rolloffFactor=s.rolloffFactor||1,this.refDistance=s.refDistance||1,this.distanceModel=s.distanceModel||"linear",this._playbackRate=s.playbackRate||1,this._streaming=(c=s.streaming)!==null&&c!==void 0?c:!1,this._length=s.length,this._offset=s.offset),((f=D.audioEngine)===null||f===void 0?void 0:f.canUseWebAudio)&&D.audioEngine.audioContext){this._soundGain=D.audioEngine.audioContext.createGain(),this._soundGain.gain.value=this._volume,this._inputAudioNode=this._soundGain,this._outputAudioNode=this._soundGain,this._spatialSound&&this._createSpatialParameters(),this._scene.mainSoundTrack.addSound(this);let u=!0;if(t)try{typeof t=="string"?this._urlType="String":t instanceof ArrayBuffer?this._urlType="ArrayBuffer":t instanceof HTMLMediaElement?this._urlType="MediaElement":t instanceof MediaStream?this._urlType="MediaStream":t instanceof AudioBuffer?this._urlType="AudioBuffer":Array.isArray(t)&&(this._urlType="Array");let h=[],_=!1;switch(this._urlType){case"MediaElement":this._streaming=!0,this._isReadyToPlay=!0,this._streamingSource=D.audioEngine.audioContext.createMediaElementSource(t),this.autoplay&&this.play(0,this._offset,this._length),this._readyToPlayCallback&&this._readyToPlayCallback();break;case"MediaStream":this._streaming=!0,this._isReadyToPlay=!0,this._streamingSource=D.audioEngine.audioContext.createMediaStreamSource(t),this.autoplay&&this.play(0,this._offset,this._length),this._readyToPlayCallback&&this._readyToPlayCallback();break;case"ArrayBuffer":t.byteLength>0&&(_=!0,this._soundLoaded(t));break;case"AudioBuffer":this._audioBufferLoaded(t);break;case"String":h.push(t);case"Array":h.length===0&&(h=t);for(let d=0;d<h.length;d++){const E=h[d];if(_=s&&s.skipCodecCheck||E.indexOf(".mp3",E.length-4)!==-1&&D.audioEngine.isMP3supported||E.indexOf(".ogg",E.length-4)!==-1&&D.audioEngine.isOGGsupported||E.indexOf(".wav",E.length-4)!==-1||E.indexOf(".m4a",E.length-4)!==-1||E.indexOf(".mp4",E.length-4)!==-1||E.indexOf("blob:")!==-1,_){this._streaming?(this._htmlAudioElement=new Audio(E),this._htmlAudioElement.controls=!1,this._htmlAudioElement.loop=this.loop,w.SetCorsBehavior(E,this._htmlAudioElement),this._htmlAudioElement.preload="auto",this._htmlAudioElement.addEventListener("canplaythrough",()=>{this._isReadyToPlay=!0,this.autoplay&&this.play(0,this._offset,this._length),this._readyToPlayCallback&&this._readyToPlayCallback()}),document.body.appendChild(this._htmlAudioElement),this._htmlAudioElement.load()):this._scene._loadFile(E,p=>{this._soundLoaded(p)},void 0,!0,!0,p=>{p&&H.Error("XHR "+p.status+" error on: "+E+"."),H.Error("Sound creation aborted."),this._scene.mainSoundTrack.removeSound(this)});break}}break;default:u=!1;break}u?_||(this._isReadyToPlay=!0,this._readyToPlayCallback&&window.setTimeout(()=>{this._readyToPlayCallback&&this._readyToPlayCallback()},1e3)):H.Error("Parameter must be a URL to the sound, an Array of URLs (.mp3 & .ogg) or an ArrayBuffer of the sound.")}catch{H.Error("Unexpected error. Sound creation aborted."),this._scene.mainSoundTrack.removeSound(this)}}else this._scene.mainSoundTrack.addSound(this),D.audioEngine&&!D.audioEngine.WarnedWebAudioUnsupported&&(H.Error("Web Audio is not supported by your browser."),D.audioEngine.WarnedWebAudioUnsupported=!0),this._readyToPlayCallback&&window.setTimeout(()=>{this._readyToPlayCallback&&this._readyToPlayCallback()},1e3)}get loop(){return this._loop}set loop(e){e!==this._loop&&(this._loop=e,this.updateOptions({loop:e}))}get currentTime(){var e;if(this._htmlAudioElement)return this._htmlAudioElement.currentTime;let t=this._startOffset;return this.isPlaying&&((e=D.audioEngine)===null||e===void 0?void 0:e.audioContext)&&(t+=D.audioEngine.audioContext.currentTime-this._startTime),t}get spatialSound(){return this._spatialSound}set spatialSound(e){var t;this._spatialSound=e,this._spatialSound&&((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&D.audioEngine.audioContext&&this._createSpatialParameters()}dispose(){var e;!((e=D.audioEngine)===null||e===void 0)&&e.canUseWebAudio&&(this.isPlaying&&this.stop(),this._isReadyToPlay=!1,this.soundTrackId===-1?this._scene.mainSoundTrack.removeSound(this):this._scene.soundTracks&&this._scene.soundTracks[this.soundTrackId].removeSound(this),this._soundGain&&(this._soundGain.disconnect(),this._soundGain=null),this._soundPanner&&(this._soundPanner.disconnect(),this._soundPanner=null),this._soundSource&&(this._soundSource.disconnect(),this._soundSource=null),this._audioBuffer=null,this._htmlAudioElement&&(this._htmlAudioElement.pause(),this._htmlAudioElement.src="",document.body.removeChild(this._htmlAudioElement)),this._streamingSource&&this._streamingSource.disconnect(),this._connectedTransformNode&&this._registerFunc&&(this._connectedTransformNode.unregisterAfterWorldMatrixUpdate(this._registerFunc),this._connectedTransformNode=null))}isReady(){return this._isReadyToPlay}getClassName(){return"Sound"}_audioBufferLoaded(e){var t;!(!((t=D.audioEngine)===null||t===void 0)&&t.audioContext)||(this._audioBuffer=e,this._isReadyToPlay=!0,this.autoplay&&this.play(0,this._offset,this._length),this._readyToPlayCallback&&this._readyToPlayCallback())}_soundLoaded(e){var t;!(!((t=D.audioEngine)===null||t===void 0)&&t.audioContext)||D.audioEngine.audioContext.decodeAudioData(e,i=>{this._audioBufferLoaded(i)},i=>{H.Error("Error while decoding audio data for: "+this.name+" / Error: "+i)})}setAudioBuffer(e){var t;!((t=D.audioEngine)===null||t===void 0)&&t.canUseWebAudio&&(this._audioBuffer=e,this._isReadyToPlay=!0)}updateOptions(e){var t,i,n,s,r,o,l,c,f,u;e&&(this.loop=(t=e.loop)!==null&&t!==void 0?t:this.loop,this.maxDistance=(i=e.maxDistance)!==null&&i!==void 0?i:this.maxDistance,this.useCustomAttenuation=(n=e.useCustomAttenuation)!==null&&n!==void 0?n:this.useCustomAttenuation,this.rolloffFactor=(s=e.rolloffFactor)!==null&&s!==void 0?s:this.rolloffFactor,this.refDistance=(r=e.refDistance)!==null&&r!==void 0?r:this.refDistance,this.distanceModel=(o=e.distanceModel)!==null&&o!==void 0?o:this.distanceModel,this._playbackRate=(l=e.playbackRate)!==null&&l!==void 0?l:this._playbackRate,this._length=(c=e.length)!==null&&c!==void 0?c:void 0,this._offset=(f=e.offset)!==null&&f!==void 0?f:void 0,this.setVolume((u=e.volume)!==null&&u!==void 0?u:this._volume),this._updateSpatialParameters(),this.isPlaying&&(this._streaming&&this._htmlAudioElement?(this._htmlAudioElement.playbackRate=this._playbackRate,this._htmlAudioElement.loop!==this.loop&&(this._htmlAudioElement.loop=this.loop)):this._soundSource&&(this._soundSource.playbackRate.value=this._playbackRate,this._soundSource.loop!==this.loop&&(this._soundSource.loop=this.loop),this._offset!==void 0&&this._soundSource.loopStart!==this._offset&&(this._soundSource.loopStart=this._offset),this._length!==void 0&&this._length!==this._soundSource.loopEnd&&(this._soundSource.loopEnd=(this._offset|0)+this._length))))}_createSpatialParameters(){var e,t;((e=D.audioEngine)===null||e===void 0?void 0:e.canUseWebAudio)&&D.audioEngine.audioContext&&(this._scene.headphone&&(this._panningModel="HRTF"),this._soundPanner=(t=this._soundPanner)!==null&&t!==void 0?t:D.audioEngine.audioContext.createPanner(),this._soundPanner&&this._outputAudioNode&&(this._updateSpatialParameters(),this._soundPanner.connect(this._outputAudioNode),this._inputAudioNode=this._soundPanner))}_updateSpatialParameters(){this._spatialSound&&this._soundPanner&&(this.useCustomAttenuation?(this._soundPanner.distanceModel="linear",this._soundPanner.maxDistance=Number.MAX_VALUE,this._soundPanner.refDistance=1,this._soundPanner.rolloffFactor=1,this._soundPanner.panningModel=this._panningModel):(this._soundPanner.distanceModel=this.distanceModel,this._soundPanner.maxDistance=this.maxDistance,this._soundPanner.refDistance=this.refDistance,this._soundPanner.rolloffFactor=this.rolloffFactor,this._soundPanner.panningModel=this._panningModel))}switchPanningModelToHRTF(){this._panningModel="HRTF",this._switchPanningModel()}switchPanningModelToEqualPower(){this._panningModel="equalpower",this._switchPanningModel()}_switchPanningModel(){var e;((e=D.audioEngine)===null||e===void 0?void 0:e.canUseWebAudio)&&this._spatialSound&&this._soundPanner&&(this._soundPanner.panningModel=this._panningModel)}connectToSoundTrackAudioNode(e){var t;((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&this._outputAudioNode&&(this._isOutputConnected&&this._outputAudioNode.disconnect(),this._outputAudioNode.connect(e),this._isOutputConnected=!0)}setDirectionalCone(e,t,i){if(t<e){H.Error("setDirectionalCone(): outer angle of the cone must be superior or equal to the inner angle.");return}this._coneInnerAngle=e,this._coneOuterAngle=t,this._coneOuterGain=i,this._isDirectional=!0,this.isPlaying&&this.loop&&(this.stop(),this.play(0,this._offset,this._length))}get directionalConeInnerAngle(){return this._coneInnerAngle}set directionalConeInnerAngle(e){var t;if(e!=this._coneInnerAngle){if(this._coneOuterAngle<e){H.Error("directionalConeInnerAngle: outer angle of the cone must be superior or equal to the inner angle.");return}this._coneInnerAngle=e,((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&this._spatialSound&&this._soundPanner&&(this._soundPanner.coneInnerAngle=this._coneInnerAngle)}}get directionalConeOuterAngle(){return this._coneOuterAngle}set directionalConeOuterAngle(e){var t;if(e!=this._coneOuterAngle){if(e<this._coneInnerAngle){H.Error("directionalConeOuterAngle: outer angle of the cone must be superior or equal to the inner angle.");return}this._coneOuterAngle=e,((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&this._spatialSound&&this._soundPanner&&(this._soundPanner.coneOuterAngle=this._coneOuterAngle)}}setPosition(e){var t;e.equals(this._position)||(this._position.copyFrom(e),((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&this._spatialSound&&this._soundPanner&&!isNaN(this._position.x)&&!isNaN(this._position.y)&&!isNaN(this._position.z)&&(this._soundPanner.positionX.value=this._position.x,this._soundPanner.positionY.value=this._position.y,this._soundPanner.positionZ.value=this._position.z))}setLocalDirectionToMesh(e){var t;this._localDirection=e,((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&this._connectedTransformNode&&this.isPlaying&&this._updateDirection()}_updateDirection(){if(!this._connectedTransformNode||!this._soundPanner)return;const e=this._connectedTransformNode.getWorldMatrix(),t=A.TransformNormal(this._localDirection,e);t.normalize(),this._soundPanner.orientationX.value=t.x,this._soundPanner.orientationY.value=t.y,this._soundPanner.orientationZ.value=t.z}updateDistanceFromListener(){var e;if(((e=D.audioEngine)===null||e===void 0?void 0:e.canUseWebAudio)&&this._connectedTransformNode&&this.useCustomAttenuation&&this._soundGain&&this._scene.activeCamera){const t=this._connectedTransformNode.getDistanceToCamera(this._scene.activeCamera);this._soundGain.gain.value=this._customAttenuationFunction(this._volume,t,this.maxDistance,this.refDistance,this.rolloffFactor)}}setAttenuationFunction(e){this._customAttenuationFunction=e}play(e,t,i){var n,s,r,o;if(this._isReadyToPlay&&this._scene.audioEnabled&&((n=D.audioEngine)===null||n===void 0?void 0:n.audioContext))try{this._startOffset<0&&(e=-this._startOffset,this._startOffset=0);let l=e?((s=D.audioEngine)===null||s===void 0?void 0:s.audioContext.currentTime)+e:(r=D.audioEngine)===null||r===void 0?void 0:r.audioContext.currentTime;if((!this._soundSource||!this._streamingSource)&&this._spatialSound&&this._soundPanner&&(!isNaN(this._position.x)&&!isNaN(this._position.y)&&!isNaN(this._position.z)&&(this._soundPanner.positionX.value=this._position.x,this._soundPanner.positionY.value=this._position.y,this._soundPanner.positionZ.value=this._position.z),this._isDirectional&&(this._soundPanner.coneInnerAngle=this._coneInnerAngle,this._soundPanner.coneOuterAngle=this._coneOuterAngle,this._soundPanner.coneOuterGain=this._coneOuterGain,this._connectedTransformNode?this._updateDirection():this._soundPanner.setOrientation(this._localDirection.x,this._localDirection.y,this._localDirection.z))),this._streaming){if(this._streamingSource||(this._streamingSource=D.audioEngine.audioContext.createMediaElementSource(this._htmlAudioElement),this._htmlAudioElement.onended=()=>{this._onended()},this._htmlAudioElement.playbackRate=this._playbackRate),this._streamingSource.disconnect(),this._inputAudioNode&&this._streamingSource.connect(this._inputAudioNode),this._htmlAudioElement){const c=()=>{var f,u;if(!((f=D.audioEngine)===null||f===void 0)&&f.unlocked){const h=this._htmlAudioElement.play();h!==void 0&&h.catch(()=>{var _,d;(_=D.audioEngine)===null||_===void 0||_.lock(),(this.loop||this.autoplay)&&((d=D.audioEngine)===null||d===void 0||d.onAudioUnlockedObservable.addOnce(()=>{c()}))})}else(this.loop||this.autoplay)&&((u=D.audioEngine)===null||u===void 0||u.onAudioUnlockedObservable.addOnce(()=>{c()}))};c()}}else{const c=()=>{var f,u,h;if(!((f=D.audioEngine)===null||f===void 0)&&f.audioContext){if(i=i||this._length,t=t||this._offset,this._soundSource){const _=this._soundSource;_.onended=()=>{_.disconnect()}}if(this._soundSource=(u=D.audioEngine)===null||u===void 0?void 0:u.audioContext.createBufferSource(),this._soundSource&&this._inputAudioNode){this._soundSource.buffer=this._audioBuffer,this._soundSource.connect(this._inputAudioNode),this._soundSource.loop=this.loop,t!==void 0&&(this._soundSource.loopStart=t),i!==void 0&&(this._soundSource.loopEnd=(t|0)+i),this._soundSource.playbackRate.value=this._playbackRate,this._soundSource.onended=()=>{this._onended()},l=e?((h=D.audioEngine)===null||h===void 0?void 0:h.audioContext.currentTime)+e:D.audioEngine.audioContext.currentTime;const _=this.isPaused?this._startOffset%this._soundSource.buffer.duration:t||0;this._soundSource.start(l,_,this.loop?void 0:i)}}};((o=D.audioEngine)===null||o===void 0?void 0:o.audioContext.state)==="suspended"?setTimeout(()=>{var f;((f=D.audioEngine)===null||f===void 0?void 0:f.audioContext.state)==="suspended"?(D.audioEngine.lock(),(this.loop||this.autoplay)&&D.audioEngine.onAudioUnlockedObservable.addOnce(()=>{c()})):c()},500):c()}this._startTime=l,this.isPlaying=!0,this.isPaused=!1}catch(l){H.Error("Error while trying to play audio: "+this.name+", "+l.message)}}_onended(){this.isPlaying=!1,this._startOffset=0,this.onended&&this.onended(),this.onEndedObservable.notifyObservers(this)}stop(e){var t;if(this.isPlaying){if(this._streaming)this._htmlAudioElement?(this._htmlAudioElement.pause(),this._htmlAudioElement.currentTime>0&&(this._htmlAudioElement.currentTime=0)):this._streamingSource.disconnect(),this.isPlaying=!1;else if(((t=D.audioEngine)===null||t===void 0?void 0:t.audioContext)&&this._soundSource){const i=e?D.audioEngine.audioContext.currentTime+e:void 0;this._soundSource.stop(i),i===void 0?(this.isPlaying=!1,this._soundSource.onended=()=>{}):this._soundSource.onended=()=>{this.isPlaying=!1},this.isPaused||(this._startOffset=0)}}}pause(){var e;this.isPlaying&&(this.isPaused=!0,this._streaming?(this._htmlAudioElement?this._htmlAudioElement.pause():this._streamingSource.disconnect(),this.isPlaying=!1):!((e=D.audioEngine)===null||e===void 0)&&e.audioContext&&(this.stop(0),this._startOffset+=D.audioEngine.audioContext.currentTime-this._startTime))}setVolume(e,t){var i;((i=D.audioEngine)===null||i===void 0?void 0:i.canUseWebAudio)&&this._soundGain&&(t&&D.audioEngine.audioContext?(this._soundGain.gain.cancelScheduledValues(D.audioEngine.audioContext.currentTime),this._soundGain.gain.setValueAtTime(this._soundGain.gain.value,D.audioEngine.audioContext.currentTime),this._soundGain.gain.linearRampToValueAtTime(e,D.audioEngine.audioContext.currentTime+t)):this._soundGain.gain.value=e),this._volume=e}setPlaybackRate(e){this._playbackRate=e,this.isPlaying&&(this._streaming&&this._htmlAudioElement?this._htmlAudioElement.playbackRate=this._playbackRate:this._soundSource&&(this._soundSource.playbackRate.value=this._playbackRate))}getVolume(){return this._volume}attachToMesh(e){this._connectedTransformNode&&this._registerFunc&&(this._connectedTransformNode.unregisterAfterWorldMatrixUpdate(this._registerFunc),this._registerFunc=null),this._connectedTransformNode=e,this._spatialSound||(this._spatialSound=!0,this._createSpatialParameters(),this.isPlaying&&this.loop&&(this.stop(),this.play(0,this._offset,this._length))),this._onRegisterAfterWorldMatrixUpdate(this._connectedTransformNode),this._registerFunc=t=>this._onRegisterAfterWorldMatrixUpdate(t),this._connectedTransformNode.registerAfterWorldMatrixUpdate(this._registerFunc)}detachFromMesh(){this._connectedTransformNode&&this._registerFunc&&(this._connectedTransformNode.unregisterAfterWorldMatrixUpdate(this._registerFunc),this._registerFunc=null,this._connectedTransformNode=null)}_onRegisterAfterWorldMatrixUpdate(e){var t;if(!e.getBoundingInfo)this.setPosition(e.absolutePosition);else{const n=e.getBoundingInfo();this.setPosition(n.boundingSphere.centerWorld)}((t=D.audioEngine)===null||t===void 0?void 0:t.canUseWebAudio)&&this._isDirectional&&this.isPlaying&&this._updateDirection()}clone(){if(this._streaming)return null;{const e=()=>{this._isReadyToPlay?(i._audioBuffer=this.getAudioBuffer(),i._isReadyToPlay=!0,i.autoplay&&i.play(0,this._offset,this._length)):window.setTimeout(e,300)},t={autoplay:this.autoplay,loop:this.loop,volume:this._volume,spatialSound:this._spatialSound,maxDistance:this.maxDistance,useCustomAttenuation:this.useCustomAttenuation,rolloffFactor:this.rolloffFactor,refDistance:this.refDistance,distanceModel:this.distanceModel},i=new Xe(this.name+"_cloned",new ArrayBuffer(0),this._scene,null,t);return this.useCustomAttenuation&&i.setAttenuationFunction(this._customAttenuationFunction),i.setPosition(this._position),i.setPlaybackRate(this._playbackRate),e(),i}}getAudioBuffer(){return this._audioBuffer}getSoundSource(){return this._soundSource}getSoundGain(){return this._soundGain}serialize(){const e={name:this.name,url:this.name,autoplay:this.autoplay,loop:this.loop,volume:this._volume,spatialSound:this._spatialSound,maxDistance:this.maxDistance,rolloffFactor:this.rolloffFactor,refDistance:this.refDistance,distanceModel:this.distanceModel,playbackRate:this._playbackRate,panningModel:this._panningModel,soundTrackId:this.soundTrackId,metadata:this.metadata};return this._spatialSound&&(this._connectedTransformNode&&(e.connectedMeshId=this._connectedTransformNode.id),e.position=this._position.asArray(),e.refDistance=this.refDistance,e.distanceModel=this.distanceModel,e.isDirectional=this._isDirectional,e.localDirectionToMesh=this._localDirection.asArray(),e.coneInnerAngle=this._coneInnerAngle,e.coneOuterAngle=this._coneOuterAngle,e.coneOuterGain=this._coneOuterGain),e}static Parse(e,t,i,n){const s=e.name;let r;e.url?r=i+e.url:r=i+s;const o={autoplay:e.autoplay,loop:e.loop,volume:e.volume,spatialSound:e.spatialSound,maxDistance:e.maxDistance,rolloffFactor:e.rolloffFactor,refDistance:e.refDistance,distanceModel:e.distanceModel,playbackRate:e.playbackRate};let l;if(!n)l=new Xe(s,r,t,()=>{t.removePendingData(l)},o),t.addPendingData(l);else{const c=()=>{n._isReadyToPlay?(l._audioBuffer=n.getAudioBuffer(),l._isReadyToPlay=!0,l.autoplay&&l.play(0,l._offset,l._length)):window.setTimeout(c,300)};l=new Xe(s,new ArrayBuffer(0),t,null,o),c()}if(e.position){const c=A.FromArray(e.position);l.setPosition(c)}if(e.isDirectional&&(l.setDirectionalCone(e.coneInnerAngle||360,e.coneOuterAngle||360,e.coneOuterGain||0),e.localDirectionToMesh)){const c=A.FromArray(e.localDirectionToMesh);l.setLocalDirectionToMesh(c)}if(e.connectedMeshId){const c=t.getMeshById(e.connectedMeshId);c&&l.attachToMesh(c)}return e.metadata&&(l.metadata=e.metadata),l}}Xe._SceneComponentInitialization=a=>{throw Cs("AudioSceneComponent")};class eo{constructor(e,t,i){if(this.loop=!1,this._coneInnerAngle=360,this._coneOuterAngle=360,this._volume=1,this.isPlaying=!1,this.isPaused=!1,this._sounds=[],this._weights=[],t.length!==i.length)throw new Error("Sounds length does not equal weights length");this.loop=e,this._weights=i;let n=0;for(const r of i)n+=r;const s=n>0?1/n:0;for(let r=0;r<this._weights.length;r++)this._weights[r]*=s;this._sounds=t;for(const r of this._sounds)r.onEndedObservable.add(()=>{this._onended()})}get directionalConeInnerAngle(){return this._coneInnerAngle}set directionalConeInnerAngle(e){if(e!==this._coneInnerAngle){if(this._coneOuterAngle<e){H.Error("directionalConeInnerAngle: outer angle of the cone must be superior or equal to the inner angle.");return}this._coneInnerAngle=e;for(const t of this._sounds)t.directionalConeInnerAngle=e}}get directionalConeOuterAngle(){return this._coneOuterAngle}set directionalConeOuterAngle(e){if(e!==this._coneOuterAngle){if(e<this._coneInnerAngle){H.Error("directionalConeOuterAngle: outer angle of the cone must be superior or equal to the inner angle.");return}this._coneOuterAngle=e;for(const t of this._sounds)t.directionalConeOuterAngle=e}}get volume(){return this._volume}set volume(e){if(e!==this._volume)for(const t of this._sounds)t.setVolume(e)}_onended(){this._currentIndex!==void 0&&(this._sounds[this._currentIndex].autoplay=!1),this.loop&&this.isPlaying?this.play():this.isPlaying=!1}pause(){this.isPaused=!0,this._currentIndex!==void 0&&this._sounds[this._currentIndex].pause()}stop(){this.isPlaying=!1,this._currentIndex!==void 0&&this._sounds[this._currentIndex].stop()}play(e){if(!this.isPaused){this.stop();const i=Math.random();let n=0;for(let s=0;s<this._weights.length;s++)if(n+=this._weights[s],i<=n){this._currentIndex=s;break}}const t=this._sounds[this._currentIndex];t.isReady()?t.play(0,this.isPaused?void 0:e):t.autoplay=!0,this.isPlaying=!0,this.isPaused=!1}}const Ei="MSFT_audio_emitter";class Fn{constructor(e){this.name=Ei,this._loader=e,this.enabled=this._loader.isExtensionUsed(Ei)}dispose(){this._loader=null,this._clips=null,this._emitters=null}onLoading(){const e=this._loader.gltf.extensions;if(e&&e[this.name]){const t=e[this.name];this._clips=t.clips,this._emitters=t.emitters,L.Assign(this._clips),L.Assign(this._emitters)}}loadSceneAsync(e,t){return v.LoadExtensionAsync(e,t,this.name,(i,n)=>{const s=new Array;s.push(this._loader.loadSceneAsync(e,t));for(const r of n.emitters){const o=L.Get(`${i}/emitters`,this._emitters,r);if(o.refDistance!=null||o.maxDistance!=null||o.rolloffFactor!=null||o.distanceModel!=null||o.innerAngle!=null||o.outerAngle!=null)throw new Error(`${i}: Direction or Distance properties are not allowed on emitters attached to a scene`);s.push(this._loadEmitterAsync(`${i}/emitters/${o.index}`,o))}return Promise.all(s).then(()=>{})})}loadNodeAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{const r=new Array;return this._loader.loadNodeAsync(n,t,o=>{for(const l of s.emitters){const c=L.Get(`${n}/emitters`,this._emitters,l);r.push(this._loadEmitterAsync(`${n}/emitters/${c.index}`,c).then(()=>{for(const f of c._babylonSounds)f.attachToMesh(o),(c.innerAngle!=null||c.outerAngle!=null)&&(f.setLocalDirectionToMesh(A.Forward()),f.setDirectionalCone(2*w.ToDegrees(c.innerAngle==null?Math.PI:c.innerAngle),2*w.ToDegrees(c.outerAngle==null?Math.PI:c.outerAngle),0))}))}i(o)}).then(o=>Promise.all(r).then(()=>o))})}loadAnimationAsync(e,t){return v.LoadExtensionAsync(e,t,this.name,(i,n)=>this._loader.loadAnimationAsync(e,t).then(s=>{const r=new Array;L.Assign(n.events);for(const o of n.events)r.push(this._loadAnimationEventAsync(`${i}/events/${o.index}`,e,t,o,s));return Promise.all(r).then(()=>s)}))}_loadClipAsync(e,t){if(t._objectURL)return t._objectURL;let i;if(t.uri)i=this._loader.loadUriAsync(e,t,t.uri);else{const n=L.Get(`${e}/bufferView`,this._loader.gltf.bufferViews,t.bufferView);i=this._loader.loadBufferViewAsync(`/bufferViews/${n.index}`,n)}return t._objectURL=i.then(n=>URL.createObjectURL(new Blob([n],{type:t.mimeType}))),t._objectURL}_loadEmitterAsync(e,t){if(t._babylonSounds=t._babylonSounds||[],!t._babylonData){const i=new Array,n=t.name||`emitter${t.index}`,s={loop:!1,autoplay:!1,volume:t.volume==null?1:t.volume};for(let o=0;o<t.clips.length;o++){const l=`/extensions/${this.name}/clips`,c=L.Get(l,this._clips,t.clips[o].clip);i.push(this._loadClipAsync(`${l}/${t.clips[o].clip}`,c).then(f=>{const u=t._babylonSounds[o]=new Xe(n,f,this._loader.babylonScene,null,s);u.refDistance=t.refDistance||1,u.maxDistance=t.maxDistance||256,u.rolloffFactor=t.rolloffFactor||1,u.distanceModel=t.distanceModel||"exponential"}))}const r=Promise.all(i).then(()=>{const o=t.clips.map(c=>c.weight||1),l=new eo(t.loop||!1,t._babylonSounds,o);t.innerAngle&&(l.directionalConeInnerAngle=2*w.ToDegrees(t.innerAngle)),t.outerAngle&&(l.directionalConeOuterAngle=2*w.ToDegrees(t.outerAngle)),t.volume&&(l.volume=t.volume),t._babylonData.sound=l});t._babylonData={loaded:r}}return t._babylonData.loaded}_getEventAction(e,t,i,n,s){switch(i){case"play":return r=>{const o=(s||0)+(r-n);t.play(o)};case"stop":return()=>{t.stop()};case"pause":return()=>{t.pause()};default:throw new Error(`${e}: Unsupported action ${i}`)}}_loadAnimationEventAsync(e,t,i,n,s){if(s.targetedAnimations.length==0)return Promise.resolve();const r=s.targetedAnimations[0],o=n.emitter,l=L.Get(`/extensions/${this.name}/emitters`,this._emitters,o);return this._loadEmitterAsync(e,l).then(()=>{const c=l._babylonData.sound;if(c){const f=new Mi(n.time,this._getEventAction(e,c,n.action,n.time,n.startOffset));r.animation.addEvent(f),s.onAnimationGroupEndObservable.add(()=>{c.stop()}),s.onAnimationGroupPauseObservable.add(()=>{c.pause()})}})}}v.RegisterExtension(Ei,a=>new Fn(a));const mi="MSFT_lod";class Bn{constructor(e){this.name=mi,this.order=100,this.maxLODsToLoad=10,this.onNodeLODsLoadedObservable=new Y,this.onMaterialLODsLoadedObservable=new Y,this._bufferLODs=new Array,this._nodeIndexLOD=null,this._nodeSignalLODs=new Array,this._nodePromiseLODs=new Array,this._nodeBufferLODs=new Array,this._materialIndexLOD=null,this._materialSignalLODs=new Array,this._materialPromiseLODs=new Array,this._materialBufferLODs=new Array,this._loader=e,this.enabled=this._loader.isExtensionUsed(mi)}dispose(){this._loader=null,this._nodeIndexLOD=null,this._nodeSignalLODs.length=0,this._nodePromiseLODs.length=0,this._nodeBufferLODs.length=0,this._materialIndexLOD=null,this._materialSignalLODs.length=0,this._materialPromiseLODs.length=0,this._materialBufferLODs.length=0,this.onMaterialLODsLoadedObservable.clear(),this.onNodeLODsLoadedObservable.clear()}onReady(){for(let e=0;e<this._nodePromiseLODs.length;e++){const t=Promise.all(this._nodePromiseLODs[e]).then(()=>{e!==0&&(this._loader.endPerformanceCounter(`Node LOD ${e}`),this._loader.log(`Loaded node LOD ${e}`)),this.onNodeLODsLoadedObservable.notifyObservers(e),e!==this._nodePromiseLODs.length-1&&(this._loader.startPerformanceCounter(`Node LOD ${e+1}`),this._loadBufferLOD(this._nodeBufferLODs,e+1),this._nodeSignalLODs[e]&&this._nodeSignalLODs[e].resolve())});this._loader._completePromises.push(t)}for(let e=0;e<this._materialPromiseLODs.length;e++){const t=Promise.all(this._materialPromiseLODs[e]).then(()=>{e!==0&&(this._loader.endPerformanceCounter(`Material LOD ${e}`),this._loader.log(`Loaded material LOD ${e}`)),this.onMaterialLODsLoadedObservable.notifyObservers(e),e!==this._materialPromiseLODs.length-1&&(this._loader.startPerformanceCounter(`Material LOD ${e+1}`),this._loadBufferLOD(this._materialBufferLODs,e+1),this._materialSignalLODs[e]&&this._materialSignalLODs[e].resolve())});this._loader._completePromises.push(t)}}loadSceneAsync(e,t){const i=this._loader.loadSceneAsync(e,t);return this._loadBufferLOD(this._bufferLODs,0),i}loadNodeAsync(e,t,i){return v.LoadExtensionAsync(e,t,this.name,(n,s)=>{let r;const o=this._getLODs(n,t,this._loader.gltf.nodes,s.ids);this._loader.logOpen(`${n}`);for(let l=0;l<o.length;l++){const c=o[l];l!==0&&(this._nodeIndexLOD=l,this._nodeSignalLODs[l]=this._nodeSignalLODs[l]||new lt);const f=h=>{i(h),h.setEnabled(!1)},u=this._loader.loadNodeAsync(`/nodes/${c.index}`,c,f).then(h=>{if(l!==0){const _=o[l-1];_._babylonTransformNode&&(this._disposeTransformNode(_._babylonTransformNode),delete _._babylonTransformNode)}return h.setEnabled(!0),h});this._nodePromiseLODs[l]=this._nodePromiseLODs[l]||[],l===0?r=u:(this._nodeIndexLOD=null,this._nodePromiseLODs[l].push(u))}return this._loader.logClose(),r})}_loadMaterialAsync(e,t,i,n,s){return this._nodeIndexLOD?null:v.LoadExtensionAsync(e,t,this.name,(r,o)=>{let l;const c=this._getLODs(r,t,this._loader.gltf.materials,o.ids);this._loader.logOpen(`${r}`);for(let f=0;f<c.length;f++){const u=c[f];f!==0&&(this._materialIndexLOD=f);const h=this._loader._loadMaterialAsync(`/materials/${u.index}`,u,i,n,_=>{f===0&&s(_)}).then(_=>{if(f!==0){s(_);const d=c[f-1]._data;d[n]&&(this._disposeMaterials([d[n].babylonMaterial]),delete d[n])}return _});this._materialPromiseLODs[f]=this._materialPromiseLODs[f]||[],f===0?l=h:(this._materialIndexLOD=null,this._materialPromiseLODs[f].push(h))}return this._loader.logClose(),l})}_loadUriAsync(e,t,i){if(this._nodeIndexLOD!==null){this._loader.log("deferred");const n=this._nodeIndexLOD-1;return this._nodeSignalLODs[n]=this._nodeSignalLODs[n]||new lt,this._nodeSignalLODs[this._nodeIndexLOD-1].promise.then(()=>this._loader.loadUriAsync(e,t,i))}else if(this._materialIndexLOD!==null){this._loader.log("deferred");const n=this._materialIndexLOD-1;return this._materialSignalLODs[n]=this._materialSignalLODs[n]||new lt,this._materialSignalLODs[n].promise.then(()=>this._loader.loadUriAsync(e,t,i))}return null}loadBufferAsync(e,t,i,n){if(this._loader.parent.useRangeRequests&&!t.uri){if(!this._loader.bin)throw new Error(`${e}: Uri is missing or the binary glTF is missing its binary chunk`);const s=(r,o)=>{const l=i,c=l+n-1;let f=r[o];return f?(f.start=Math.min(f.start,l),f.end=Math.max(f.end,c)):(f={start:l,end:c,loaded:new lt},r[o]=f),f.loaded.promise.then(u=>new Uint8Array(u.buffer,u.byteOffset+i-f.start,n))};return this._loader.log("deferred"),this._nodeIndexLOD!==null?s(this._nodeBufferLODs,this._nodeIndexLOD):this._materialIndexLOD!==null?s(this._materialBufferLODs,this._materialIndexLOD):s(this._bufferLODs,0)}return null}_loadBufferLOD(e,t){const i=e[t];i&&(this._loader.log(`Loading buffer range [${i.start}-${i.end}]`),this._loader.bin.readAsync(i.start,i.end-i.start+1).then(n=>{i.loaded.resolve(n)},n=>{i.loaded.reject(n)}))}_getLODs(e,t,i,n){if(this.maxLODsToLoad<=0)throw new Error("maxLODsToLoad must be greater than zero");const s=new Array;for(let r=n.length-1;r>=0;r--)if(s.push(L.Get(`${e}/ids/${n[r]}`,i,n[r])),s.length===this.maxLODsToLoad)return s;return s.push(t),s}_disposeTransformNode(e){const t=new Array,i=e.material;i&&t.push(i);for(const s of e.getChildMeshes())s.material&&t.push(s.material);e.dispose();const n=t.filter(s=>this._loader.babylonScene.meshes.every(r=>r.material!=s));this._disposeMaterials(n)}_disposeMaterials(e){const t={};for(const i of e){for(const n of i.getActiveTextures())t[n.uniqueId]=n;i.dispose()}for(const i in t)for(const n of this._loader.babylonScene.materials)n.hasTexture(t[i])&&delete t[i];for(const i in t)t[i].dispose()}}v.RegisterExtension(mi,a=>new Bn(a));const pi="MSFT_minecraftMesh";class Un{constructor(e){this.name=pi,this._loader=e,this.enabled=this._loader.isExtensionUsed(pi)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtraAsync(e,t,this.name,(n,s)=>{if(s){if(!(i instanceof S))throw new Error(`${n}: Material type not supported`);const r=this._loader.loadMaterialPropertiesAsync(e,t,i);return i.needAlphaBlending()&&(i.forceDepthWrite=!0,i.separateCullingPass=!0),i.backFaceCulling=i.forceDepthWrite,i.twoSidedLighting=!0,r}return null})}}v.RegisterExtension(pi,a=>new Un(a));const Ai="MSFT_sRGBFactors";class wn{constructor(e){this.name=Ai,this._loader=e,this.enabled=this._loader.isExtensionUsed(Ai)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,t,i){return v.LoadExtraAsync(e,t,this.name,(n,s)=>{if(s){if(!(i instanceof S))throw new Error(`${n}: Material type not supported`);const r=this._loader.loadMaterialPropertiesAsync(e,t,i);return i.albedoTexture||i.albedoColor.toLinearSpaceToRef(i.albedoColor),i.reflectivityTexture||i.reflectivityColor.toLinearSpaceToRef(i.reflectivityColor),r}return null})}}v.RegisterExtension(Ai,a=>new wn(a));const Gn="ExtrasAsMetadata";class Vn{constructor(e){this.name=Gn,this.enabled=!0,this._loader=e}_assignExtras(e,t){if(t.extras&&Object.keys(t.extras).length>0){const i=e.metadata=e.metadata||{},n=i.gltf=i.gltf||{};n.extras=t.extras}}dispose(){this._loader=null}loadNodeAsync(e,t,i){return this._loader.loadNodeAsync(e,t,n=>{this._assignExtras(n,t),i(n)})}loadCameraAsync(e,t,i){return this._loader.loadCameraAsync(e,t,n=>{this._assignExtras(n,t),i(n)})}createMaterial(e,t,i){const n=this._loader.createMaterial(e,t,i);return this._assignExtras(n,t),n}}v.RegisterExtension(Gn,a=>new Vn(a));var so=Object.freeze({__proto__:null,ArrayItem:L,GLTFLoader:v,EXT_lights_image_based:_n,EXT_mesh_gpu_instancing:En,EXT_meshopt_compression:mn,EXT_texture_webp:pn,KHR_draco_mesh_compression:An,KHR_lights:Tn,KHR_materials_pbrSpecularGlossiness:gn,KHR_materials_unlit:Rn,KHR_materials_clearcoat:Cn,KHR_materials_iridescence:Sn,KHR_materials_emissive_strength:In,KHR_materials_sheen:vn,KHR_materials_specular:xn,KHR_materials_ior:Tt,KHR_materials_variants:Be,KHR_materials_transmission:Mn,KHR_materials_translucency:Nn,KHR_materials_volume:On,KHR_mesh_quantization:yn,KHR_texture_basisu:bn,KHR_texture_transform:Ln,KHR_xmp_json_ld:Pn,KHR_animation_pointer:Dn,MSFT_audio_emitter:Fn,MSFT_lod:Bn,MSFT_minecraftMesh:Un,MSFT_sRGBFactors:wn,ExtrasAsMetadata:Vn});export{no as GLTF1,so as GLTF2,q as GLTFFileLoader,Je as GLTFLoaderAnimationStartMode,ht as GLTFLoaderCoordinateSystemMode,Ae as GLTFLoaderState,nn as GLTFValidation};
