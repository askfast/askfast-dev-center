define(["app"],function(e){e.config(["$routeProvider","$httpProvider",function(e,t){var n=["$location","Store",function(e,t){t("session").get("info").id=="info"&&e.path("#/login")}];e.when("/register",{templateUrl:"views/register.html",controller:"user",reloadOnSearch:!1}).when("/login",{templateUrl:"views/login.html",controller:"user"}).when("/logout",{templateUrl:"views/logout.html",controller:"user"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"dashboard",resolve:{redirect:n}}).when("/developer",{templateUrl:"views/developer.html",controller:"core",resolve:{redirect:n}}).when("/profile",{templateUrl:"views/profile.html",controller:"profile",resolve:{redirect:n}}).otherwise({redirectTo:"/login"}),t.interceptors.push("Interceptor")}])});