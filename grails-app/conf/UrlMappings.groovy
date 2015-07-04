class UrlMappings {

    static mappings = {
        // Main
        "/"(view: "/index")

        // External
        "/external/calls"(controller: "call") { action = [GET:"list", POST:"notifyCall"] }
        "/external/numbers/$upid/calls"(controller: "call") { action = [GET:"listWithUpid", DELETE:"deleteWithUpid"] }

        // Admin panel
        "/admin/users"(controller: "user") { action = [GET:"list", POST:"create"] }
        "/admin/users/$uid"(controller: "user") { action = [GET:"show", PUT:"update", DELETE:"deleteWithUid"] }

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
    }
}
