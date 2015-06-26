class UrlMappings {

	static mappings = {
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
