define(["require","exports","controllers/controllers"],function(e,t,n){"use strict";var r=n.controller("logs",["$scope","$route","$location","$timeout","LogsService","moment",function(e,t,n,r,i,s){var o=this;o.ddrId=null,o.currentSection="debugger",t.current.params.ddrId&&(o.currentSection="details",o.ddrId=t.current.params.ddrId),o.loading={logs:!0},o.setSection=function(e,r){t.current.params.ddrId&&(o.ddrId=null,n.url("/logs")),r&&(o.ddrId=null),o.currentSection=e,e==="debugger"&&(o.logs=[],o.Log.list())},e.$on("$routeUpdate",function(){t.current.params.ddrId&&o.ddrId===null?(o.ddrId=t.current.params.ddrId,o.currentSection="details",o.Log.detail(o.ddrId)):o.currentSection==="details"&&o.setSection("debugger",!0)}),o.query={category:"all",limit:100,until:s().format("DD/MM/YYYY")},o.Log={data:null,list:function(){var e;o.query.until?e=s(o.query.until,"DD/MM/YYYY").endOf("day").valueOf():e=s().endOf("day").valueOf(),o.loading.logs=!0,i.list(o.query.limit,e).then(function(e){o.logs=e,o.loading.logs=!1}).catch(function(e){console.log(e)})},categorize:function(){var e=o.query.category;o.logs=i.categorize(e)},detail:function(e){i.detail(e).then(function(e){o.ddrDetails=e[0],o.logs=e[1],r(function(){$(".ddr-detail .panel-collapse").collapse({toggle:!1})})}).catch(function(e){console.warn(e)})}},o.ddrId?o.Log.detail(o.ddrId):o.Log.list(),o.expandAll=function(){$(".ddr-detail .panel-collapse").collapse("show")},o.collapseAll=function(){$(".ddr-detail .panel-collapse").collapse("hide")}}]);return r});