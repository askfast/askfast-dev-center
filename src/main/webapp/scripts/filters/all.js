define(["filters/filters"],function(e){e.filter("translateAdapterAddress",[function(){return function(e){var t=e.myAddress;switch(e.adapterType){case"broadsoft":t=e.myAddress.split("@")[0]}return t}}]),e.filter("translateAdapterType",[function(){return function(e){var t=e.adapterType;switch(t){case"broadsoft":return"Phone";case"xmpp":return"Gtalk";case"email":return"Email";default:return t}}}]),e.filter("getAdapterAddress",["Store",function(e){return function(t){e=e("data");var n=e.get("adapterTypes");return t}}]),e.filter("getAdapterAddress",["Store",function(e){return function(t){e=e("data");var n=e.get("adapterTypes");return t}}]),e.filter("parseTimeStamp",["Moment",function(e){return function(t){return e(t).format("dddd, MMMM Do YYYY, h:mm:ss a")}}])});