define(["require","exports","controllers/controllers"],function(e,t,n){"use strict";var r=n.controller("core",["$rootScope","$scope","$q","$route","$location","$timeout","AskFast","Store","moment",function(e,t,n,r,i,s,o,u,a){function l(e,t,n){return e.start?(e.startString=a(e.start).format("HH:mm:ss Z YYYY-MM-DD"),e.duration!==null?e.endString=a(e.start+e.duration).format("HH:mm:ss Z YYYY-MM-DD"):e.endString="-"):(e.startString="-",e.endString="-"),e.fromAddress=e.fromAddress||"-",e.toAddress=e.toAddressString?Object.keys(angular.fromJson(e.toAddressString))[0]:"-",e.ddrTypeString=e.ddrTypeId?c(e.ddrTypeId,t):"-",e.statusPerAddress&&angular.forEach(e.statusPerAddress,function(t,n){e.statusPerAddress[n]={index:n,status:t}}),e.adapterTypeString=e.adapterId?h(e.adapterId,n):"-",e}function c(e,t){return typeof t[e]!="undefined"&&typeof t[e].categoryString!="undefined"?t[e].categoryString:"Unknown"}function h(e,t){return typeof t[e]!="undefined"?f.adapterTypes[t[e]].label:"Unknown"}function p(e){f.Dialog.open(e)}u=u("data");var f=this;f.ddrId=null,f.currentSection="debugger",r.current.params.ddrId&&(f.currentSection="details",f.ddrId=r.current.params.ddrId),f.loading={logs:!0},f.setSection=function(e,t){r.current.params.ddrId&&(f.ddrId=null,i.url("/developer")),t&&(f.ddrId=null),f.currentSection=e,e==="debugger"&&(f.logs=[],f.Log.list())},t.$on("$routeUpdate",function(){r.current.params.ddrId&&f.ddrId===null?(f.ddrId=r.current.params.ddrId,f.currentSection="details",f.Log.detail(f.ddrId)):f.currentSection==="details"&&f.setSection("debugger",!0)}),f.types=["Phone","SMS","Gtalk","Email","Twitter"],f.adapterTypes={call:{label:"Phone",ids:[]},xmpp:{label:"Gtalk",ids:[]},email:{label:"Email",ids:[]},twitter:{label:"Twitter",ids:[]},sms:{label:"SMS",ids:[]}},f.channel={type:null,adapter:null},f.forms={},f.candidates=[],f.channelTypeSelected=function(){var e=[];angular.forEach(f.adapterTypes,function(t){t.label==f.channel.type&&angular.forEach(t.ids,function(t){angular.forEach(f.adapters,function(n){n.configId==t&&e.push(n)})})}),f.candidates=e},f.dialogAuth={open:!1,message:"",messageType:""},f.resetAdapterMenu=function(){f.channel.type=null,f.channel.adapter=null},f.query={category:"all",limit:100,until:a().format("DD/MM/YYYY")},f.Log={data:null,list:function(){var e;f.query.until?e=a(f.query.until,"DD/MM/YYYY").endOf("day").valueOf():e=a().endOf("day").valueOf(),f.loading.logs=!0,o.caller("ddr",{limit:f.query.limit,endTime:e}).then(function(e){var t=u.get("ddrTypes"),n=u.get("adapterMap"),r={call:[],email:[],sms:[],xmpp:[],twitter:[],other:[]},i=[];angular.forEach(e,function(e){i.push(l(e,t,n))}),angular.forEach(i,function(e){var t=!1;angular.forEach(n,function(i,s){e.adapterId==s&&r[n[e.adapterId]]&&(r[n[e.adapterId]].push(e),t=!0)}),t||r.other.push(e)}),this.data=r,this.categorize(),f.loading.logs=!1}.bind(this))},categorize:function(){var e=f.query.category;if(e&&e!=="all")f.logs=this.data[e];else{var t=[],n=this.data;angular.forEach(n,function(e){angular.forEach(e,function(e){t.push(e)})}),f.logs=t}},detail:function(e){function i(e){e.timestamp?e.timeString=a(e.timestamp).format("HH:mm:ss Z YYYY-MM-DD"):e.requestLog&&e.requestLog.timestamp?(e.timestamp=e.requestLog.timestamp,e.timeString=a(e.requestLog.timestamp).format("HH:mm:ss Z YYYY-MM-DD")):e.timeString="Missing timestamp",e.requestLog&&(angular.equals({},e.requestLog.headers)&&(e.requestLog.headers=null),angular.forEach(e.requestLog.parameters,function(t,n){switch(t){case null:e.requestLog.parameters[n]="null";break;case undefined:e.requestLog.parameters[n]="undefined"}}))}var t=u.get("ddrTypes"),r=u.get("adapterMap");n.all([o.caller("ddrRecord",{second:e}),o.caller("httpLog",{second:e})]).then(function(t){var r=n.defer();return angular.equals([],t[1])?o.caller("log",{ddrRecordId:e}).then(function(e){t[1]=e,r.resolve(t)}).catch(function(e){console.warn("error ",e),r.reject(e)}):r.resolve(t),r.promise}).then(function(e){f.ddrDetails=l(e[0],t,r);var n=e[1];angular.forEach(n,function(e){i(e)}),f.logs=n,s(function(){$(".ddr-detail .panel-collapse").collapse({toggle:!1})})}).catch(function(e){console.warn("error ",e)})}},f.ddrId?f.Log.detail(f.ddrId):f.Log.list(),f.Adapter={list:function(e){f.adapterType="",o.caller("getAdapters").then(function(t){angular.forEach(t,function(e){if(e.adapterType in f.adapterTypes){var t=f.adapterTypes[e.adapterType].ids;t.indexOf(e.configId)==-1&&t.push(e.configId)}}),u.save(f.adapterTypes,"adapterTypes"),f.adapters=t,e&&e.call(null,t)})},add:function(e){o.caller("createAdapter",{second:e.configId}).then(function(){this.list(),f.adapterType=""}.bind(this))},query:function(e){o.caller("freeAdapters",{adapterType:e}).then(function(e){f.freeAdapters=e})},remove:function(e){o.caller("removeAdapter",{second:e.configId}).then(function(){this.list()}.bind(this))}},f.Adapter.list(),f.Dialog={list:function(e){o.caller("getDialog").then(function(t){f.dialogs=t,f.loadingDialogs=!0,e&&e.call()})},add:function(e){e.form.name&&e.form.url&&o.caller("createDialog",null,{name:e.form.name,url:e.form.url}).then(function(e){f.addingDialog=!1,this.list(function(){f.setSection("dialogs"),p(e),f.dialogAuth=!1})}.bind(this))},remove:function(e){o.caller("deleteDialog",{third:e.id}).then(function(){f.addingDialog=!1,this.list(function(){f.dialog=null,f.dialogs[0]&&(f.dialog=f.dialogs[0]),f.setSection("dialogs")})}.bind(this))},update:function(e,t){var n={id:e.id,name:e.name,url:e.url,owner:e.owner};angular.isDefined(e.userName)&&angular.isDefined(e.password)&&angular.isDefined(e.useBasicAuth)&&(n.userName=e.userName,n.password=e.password,n.useBasicAuth=e.useBasicAuth),o.caller("updateDialog",{third:e.id},n).then(function(e){t&&(e.error?t.reject(e):t.resolve(e)),this.list()}.bind(this))},updateDetails:function(e){var t=f.dialogs.filter(function(t){return t.id===e.id?!0:!1});e.userName=t[0].userName,e.password=t[0].password,this.update(e)},adapters:{list:function(e,t){var n=[];return angular.forEach(f.adapters,function(r){t&&t.id==r.id?n.push(t):r.dialogId==e&&n.push(r)}),n},update:function(e,t){o.caller("updateAdapter",{second:t},{dialogId:e}).then(function(e){f.Adapter.list()}.bind(this))},add:function(e){this.update(e.id,f.channel.adapter),f.resetAdapterMenu(),f.candidates=[],p(e)},remove:function(e){this.update("",e.configId)}},open:function(e){f.dialog=angular.copy(e),f.Dialog.authentication.notify(null,null,!0),angular.isDefined(f.forms.details)&&(f.forms.details.$setPristine(),this.adapters.list(e.id)&&(f.dialogAdapters=this.adapters.list(e.id)))},authentication:{enable:function(e){if(!e.userName||!e.password){this.notify("Please fill in both a Username and a Password","warning");return}e.useBasicAuth=!0;var t=f.dialogs.filter(function(t){return t.id===e.id?!0:!1});e.name=t[0].name,e.url=t[0].url;var r=n.defer();f.Dialog.update(e,r),r.promise.then(function(e){f.dialogAuth.open=!1,this.notify("Basic Authentication applied successfully","success")}.bind(this)).catch(function(e){console.log("error -> ",e),this.notify("Something went wrong with the request","danger")}.bind(this))},disable:function(e){var t;e.useBasicAuth=!1;var r=f.dialogs.filter(function(t){return t.id===e.id?!0:!1});e.name=r[0].name,e.url=r[0].url,t=angular.copy(e),t.userName=null,t.password=null;var i=n.defer();f.Dialog.update(t,i),i.promise.then(function(e){f.dialogAuth.open=!1,this.notify("Basic Authentication successfully disabled","success")}.bind(f.Dialog.authentication)).catch(function(e){console.log("error -> ",e),this.notify("Something went wrong with the request","danger")}.bind(f.Dialog.authentication))},notify:function(e,t,n){n&&(f.dialogAuth.message=""),f.dialogAuth.message=e,f.dialogAuth.messageType=t,f.authNotifyTimeoutPromise&&s.cancel(f.authNotifyTimeoutPromise),f.authNotifyTimeoutPromise=s(function(){f.dialogAuth.message=""},6e3)},cancel:function(e){var t=f.dialogs.filter(function(t){return t.id===e.id?!0:!1});f.dialog.userName=t[0].userName,f.dialog.password=t[0].password,f.dialogAuth.open=!1,f.forms.auth.$setPristine()}}},f.authenticateDialog=function(e){f.Dialog.authentication.enable(e)},f.disableDialogAuthentication=function(e){f.Dialog.authentication.disable(e)},f.cancelAuthentication=function(e){f.Dialog.authentication.cancel(e)},f.expandAll=function(){$(".ddr-detail .panel-collapse").collapse("show")},f.collapseAll=function(){$(".ddr-detail .panel-collapse").collapse("hide")},f.Dialog.list(function(){f.dialogs.length>0&&f.Dialog.open(f.dialogs[0])})}]);return r});