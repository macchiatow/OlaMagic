class UrlMappings {

    static mappings = {

        // Users
        "/api/users"(controller: "user") { action = [GET: "list", POST: "create"] }
        "/api/users/$id"(controller: "user") { action = [GET: "show", DELETE: "delete", PUT: "update"] }

        // Workspaces
        "/api/users/$uid/workspaces"(controller: "workspace") { action = [GET: "list", POST: "create"] }
        "/api/workspaces/$id"(controller: "workspace") { action = [UPDATE: "update", DELETE: "delete"] }
        "/api/users/$uid/workspaces/$wid/subscribe"(controller: "workspace") { action = [PUT: "subscribe"] }
        "/api/users/$uid/workspaces/$wid/unsubscribe"(controller: "workspace") { action = [PUT: "unsubscribe"] }
        "/api/users/$uid/workspaces/$wid/change_owner"(controller: "workspace") { action = [PUT: "changeOwner"] }

        // Numbers
        "/api/numbers"(controller: "number") { action = [GET: "list", POST: "create"] }
        "/api/numbers/$upid"(controller: "number") { action = [DELETE: "delete"] }
        "/api/numbers/$upid/release"(controller: "number") { action = [PUT: "release"] }
        "/api/workspaces/$wid/numbers"(controller: "number") { action = [GET: "listMyNumbers"] }
        "/api/workspaces/$wid/numbers/$upid/buy"(controller: "number") { action = [PUT: "buy"] }

        // Calls
        "/api/numbers/$upid/calls"(controller: "call") { action = [GET: "list", DELETE: "clear"] }
        "/api/calls/"(controller: "call") { action = [POST: "create"] }

        // Sites
        "/api/workspaces/$wid/sites"(controller: "site") { action = [GET: "list", POST: "create"] }
        "/api/sites/$sid"(controller: "site") { action = [DELETE: "delete", PUT: "update"] }

        // AdSources
        "/api/sites/$sid/ad_sources"(controller: "adSource") { action = [GET: "list", POST: "create"] }
        "/api/sites/$sid/ad_sources/$aid"(controller: "adSource") { action = [DELETE: "delete", PUT: "update"] }
        "/api/ad_sources/$aid/numbers"(controller: "adSource") { action = [GET: "list"] }
        "/api/ad_sources/$aid/numbers/$upid/add"(controller: "adSource") { action = [POST: "list"] }
        "/api/ad_sources/$aid/numbers/$upid/remove"(controller: "adSource") { action = [POST: "list"] }

        // Campaign
        "/api/sites/$sid/campaigns"(controller: "adSource") { action = [GET: "list", POST: "create"] }
        "/api/sites/$sid/campaigns/$caid"(controller: "adSource") { action = [DELETE: "delete", PUT: "update"] }
        "/api/campaigns/$aid/numbers"(controller: "adSource") { action = [GET: "list"] }
        "/api/campaigns/$aid/numbers/$upid/add"(controller: "adSource") { action = [POST: "list"] }
        "/api/campaigns/$aid/numbers/$upid/remove"(controller: "adSource") { action = [POST: "list"] }

        // Reports
        "/api/reports"(controller: "report")
        "/api/sites/$sid/reports/$rname"(controller: "report")

        // Authentication
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")

        // Errors
        "500"(view: '/error')

        // DB Debug
        "/dbconsole"(view: "/dbconsole")

        // Main
        "/**"(view: "/index")
    }
}
