define(["modals/modals"],function(e){e.factory("AskFast",["$resource","$q","$location","$rootScope","Log",function(e,t,n,r,i){var s=e(r.config.host+"/:action/:level",{},{register:{method:"GET",params:{action:"register",name:"",username:"",password:"",phone:"",verification:""}},userExists:{method:"GET",params:{action:"user_exists",username:""}},registerVerify:{method:"GET",params:{action:"register_verify",id:"",code:""}},resendVerify:{method:"GET",params:{action:"resend_verify",code:"",verification:""}},login:{method:"GET",params:{action:"login",username:"",password:""}},logout:{method:"GET",params:{action:"logout"}},authorizedApp:{method:"GET",params:{action:"authorized_app"}},info:{method:"GET",params:{action:"info"}},getDialog:{method:"GET",params:{action:"dialog"}},createDialog:{method:"POST",params:{action:"dialog"}},getAdapters:{method:"GET",params:{action:"adapter"}},createAdapter:{method:"POST",params:{action:"adapter",id:""}},freeAdapters:{method:"GET",params:{action:"free_adapters"}},key:{method:"GET",params:{action:"key"}},getAccessToken:{method:"POST",params:{action:"keyserver",level:"token"}},logs:{method:"GET",params:{action:"log"}}});return s.prototype.caller=function(e,n,r,o){var u=t.defer();n=n||{};try{s[e](n,r,function(e){o&&o.success&&o.success.call(this,e),u.resolve(e)},function(e){o&&o.error&&o.error.call(this,e),u.resolve({error:e})})}catch(a){i.error(a)}return u.promise},new s}])});