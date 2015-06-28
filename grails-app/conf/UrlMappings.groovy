class UrlMappings {

	static mappings = {
        // Main
        "/"(view:"/index")

        // API
        "/api/${apiController}/$action"(controller : "${apiController}Service", namespace: "api")

        // Admin panel
        "/admin/number/$action?"(controller: "number")
        "/admin/user/$action?"(controller: "secUser")

        // User dashboard
        "/dashboard"(view: "index", controller: "dashboard")
        "/dashboard/call/$action?"(controller: "call")

        // Authentication
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")

        // Errors
        "500"(view:'/error')
        "/**"(view:'/404')
	}
}
