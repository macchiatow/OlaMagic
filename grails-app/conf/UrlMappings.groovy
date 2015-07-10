class UrlMappings {

    static mappings = {
        // Main
        "/"(view: "/index")

        // External
        "/external/calls"(controller: "call") { action = [GET:"list", POST:"notifyCall"] }
        "/external/numbers/$upid/calls"(controller: "call") { action = [GET:"listWithUpid", DELETE:"deleteWithUpid"] }

        // Admin panel
        "/admin"(controller: "user", action: "list")

        "/admin/users/new"(controller: "user", view: "new")
        "/admin/users"(controller: "user") { action = [GET:"list", POST:"create"] }
        "/admin/users/$uid"(controller: "user") { action = [GET:"show", PUT:"update", DELETE:"deleteWithUid"] }

        "/admin/numbers/new"(controller: "number", view: "new")
        "/admin/numbers"(controller: "number") { action = [GET:"list", POST:"create"] }
        "/admin/numbers/$upid"(controller: "number") { action = [GET:"show", DELETE:"deleteWithUpid"] }

        // User dashboard
        "/dashboard/$uid/numbers"(controller: "number") { action = [GET:"listWithUid", POST:"buy"] }
        "/dashboard/numbers/$upid"(controller: "number") { action = [DELETE: "release"] }

        "/dashboard/$uid/adSources"(controller: "adSource") { action = [GET:"list", POST:"buy"] }
        "/dashboard/$uid/campaigns"(controller: "campaign") { action = [GET:"list", POST:"buy"] }
        "/dashboard/$uid/sites"(controller: "site") { action = [GET:"list"] }
        "/dashboard/$uid/workspaces/$action"(controller: "workspace")



        "/dashboard/$uid/reports/$action"(controller: "report")





        // Authentication
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")

        // Errors
        "500"(view: '/error')
    }
}
