class UrlMappings {

    static mappings = {
        // Main
        "/**"(view: "/index")

        // API
        "/api/numbers"(controller: "number") { action = [GET: "list", POST: "create"] }
        "/api/numbers/$upid"(controller: "number") { action = [DELETE: "delete"] }

        // External
        "/external/calls"(controller: "call") { action = [GET: "list", POST: "notifyCall"] }
        "/external/numbers/$upid/calls"(controller: "call") { action = [GET: "listWithUpid", DELETE: "deleteWithUpid"] }

        // User dashboard
        "/dashboard/$uid/numbers"(controller: "number") { action = [GET: "listWithUid", POST: "buy"] }
        "/dashboard/numbers/$upid"(controller: "number") { action = [DELETE: "release"] }

        "/dashboard/$uid/adSources"(controller: "adSource") { action = [GET: "list", POST: "buy"] }
        "/dashboard/$uid/campaigns"(controller: "campaign") { action = [GET: "list", POST: "buy"] }
        "/dashboard/$uid/sites"(controller: "site") { action = [GET: "list"] }
        "/dashboard/$uid/workspaces/$action"(controller: "workspace")


        "/dashboard/$uid/reports/$action"(controller: "report")

        // Authentication
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")

        // Errors
        "500"(view: '/error')
    }
}
