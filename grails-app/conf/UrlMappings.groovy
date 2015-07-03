class UrlMappings {

    static mappings = {
        // Main
        "/"(view: "/index")

        // API
        "/api/${apiController}/$action"(controller: "${apiController}Service", namespace: "api")

        // External
        "/external/calls"(method: "POST", controller: "call", action: "notifyCall")
        "/external/calls"(method: "GET", controller: "call", action: "all")
        "/external/numbers/$upid/calls"(method: "GET", controller: "call", action: "allWithUpid")
        "/external/numbers/$upid/calls"(method: "DELETE", controller: "call", action: "deleteWithUpid")

        // Admin panel
        "/admin/number/$action?"(controller: "number")
        "/admin/user/$action?"(controller: "secUser")

        // User dashboard
        "/dashboard"(view: "index", controller: "dashboard")
        "/dashboard/call/$action?"(controller: "call")
        "/dashboard/numbers/$action?"(controller: "myNumbers")
        "/dashboard/adsources/$action?"(controller: "adSource")

        // Authentication
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")

        // Errors
        "500"(view: '/error')
        //"/**"(view:'/404')
    }
}
