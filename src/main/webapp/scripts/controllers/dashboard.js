define(["controllers/controllers","modals/askfast"],function(e,t){e.controller("dashboard",["$scope","$rootScope","AskFast","Session","Store",function(e,t,n,r,i){n.caller("info").then(function(e){n.caller("key").then(function(t){e.refreshToken=t.refreshToken}),i("app").save({user:e})})}])});