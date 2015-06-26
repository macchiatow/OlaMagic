class UrlMappings {

	static mappings = {
        "/api/call/$action"(controller : "callService", namespace: "api")
        "/admin/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")
        "/"(view:"/index")
        "500"(view:'/error')
	}
}
