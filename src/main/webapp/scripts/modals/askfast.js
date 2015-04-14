define(["modals/modals"],function(e){"use strict";e.factory("AskFast",["$resource","$q","$location","$rootScope","Log",function(e,t,n,r,i){var s=e(r.config.host+"/:first/:second/:third/:fourth",{},{register:{method:"GET",params:{first:"register",name:"",username:"",password:"",phone:"",verification:""}},userExists:{method:"GET",params:{first:"user_exists",username:""}},registerVerify:{method:"GET",params:{first:"register_verify",id:"",code:""}},resendVerify:{method:"GET",params:{first:"resend_verify",code:"",verification:""}},login:{method:"GET",params:{first:"login",username:"",password:""}},logout:{method:"GET",params:{first:"logout"}},forgotPass:{method:"PUT",params:{first:"info",second:"forgot_password",third:""}},changePass:{method:"PUT",params:{first:"info",second:"forgot_password",third:"verify",fourth:"",code:"",password:""}},authorizedApp:{method:"GET",params:{first:"authorized_app"}},info:{method:"GET",params:{first:"info"}},getDialog:{method:"GET",params:{first:"dialog"},isArray:!0},createDialog:{method:"POST",params:{first:"dialog"}},updateDialog:{method:"PUT",params:{first:"dialog",second:""}},deleteDialog:{method:"DELETE",params:{first:"dialog"}},getAdapters:{method:"GET",params:{first:"adapter"},isArray:!0},createAdapter:{method:"POST",params:{first:"adapter",second:""}},updateAdapter:{method:"PUT",params:{first:"adapter",second:""}},removeAdapter:{method:"DELETE",params:{first:"adapter",second:""}},freeAdapters:{method:"GET",params:{first:"free_adapters"},isArray:!0},key:{method:"GET",params:{first:"key"}},getAccessToken:{method:"POST",params:{first:"keyserver",second:"token"}},ddr:{method:"GET",params:{first:"ddr",limit:100},isArray:!0},log:{method:"GET",params:{first:"log"},isArray:!0},paymentMethods:{method:"GET",params:{first:"paymentmethod"},isArray:!0},newPayment:{method:"POST",params:{first:"payment"}},getPayments:{method:"GET",params:{first:"payment"},isArray:!0},startDialog:{method:"POST",params:{first:"startDialog",second:"outbound"}}});return s.prototype.caller=function(e,n,r,o){var u=t.defer();n=n||{};try{s[e](n,r,function(e){o&&o.success&&o.success.call(this,e),u.resolve(e)},function(e){o&&o.error&&o.error.call(this,e),u.resolve({error:e})})}catch(a){i.error(a)}return u.promise},new s}])});