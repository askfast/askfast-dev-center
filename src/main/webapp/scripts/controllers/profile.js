define(["controllers/controllers","modals/askfast"],function(e,t){e.controller("profile",["$scope","$rootScope","AskFast","Session","Store",function(e,t,n,r,i){n.caller("info").then(function(e){i("app").save({user:e})})}])});