define(["filters/filters"],function(e){e.filter("translateAdapterAddress",["Store",function(e){e=e("data");var t=e.get("adapterTypes"),n={};return function(e){if(e&&e.adapterType)switch(e.adapterType){case"broadsoft":if(/@/.test(e.myAddress))return e.myAddress.split("@")[0];break;default:return e.myAddress}}}]),e.filter("translateAdapterType",[function(){return function(e){var t=e.adapterType;switch(t){case"broadsoft":return"Phone";case"xmpp":return"Gtalk";case"email":return"Email";default:return t}}}]),e.filter("parseTimeStamp",["Moment",function(e){return function(t){return e(t).format("dddd, MMMM Do YYYY, h:mm:ss a")}}]),e.filter("filterAdapters",[function(){return function(e,t){if(e&&t){var n=[];return angular.forEach(e,function(e){e.dialogId==t.id&&n.push(e)}),n}}}]),e.filter("dashboardLogs",[function(){return function(e){if(e){var t=[];return angular.forEach(e,function(e){e.level=="SEVERE"&&t.push(e)}),t}}}])});