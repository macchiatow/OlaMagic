class UrlMappings {

    static mappings = {

        // Users
        "/api/users"(controller: "user") { action = [GET: "list", POST: "create"] }
        "/api/users/$id"(controller: "user") { action = [GET: "show", DELETE: "delete", PUT: "update"] }
        "/api/users/$email/lookup"(controller: "user") { action = [GET: "lookup"] }

        // Workspaces
        "/api/users/$uid/workspaces"(controller: "workspace") { action = [GET: "list", POST: "create", OPTIONS: "options"] }
        "/api/workspaces"(controller: "workspace") { action = [POST: "create", OPTIONS: "options"] }
        "/api/workspaces/$id"(controller: "workspace") { action = [GET: "show", PUT: "update", DELETE: "delete", OPTIONS: "options"] }
        "/api/users/$uid/workspaces/$wid/subscribe"(controller: "workspace") { action = [POST: "subscribe"] }
        "/api/users/$uid/workspaces/$wid/unsubscribe"(controller: "workspace") { action = [POST: "unsubscribe"] }
        "/api/users/$uid/workspaces/$wid/change_owner"(controller: "workspace") { action = [POST: "changeOwner"] }

        // Numbers
        "/api/numbers"(controller: "number") { action = [GET: "list", POST: "create"] }
        "/api/numbers/$id"(controller: "number") { action = [GET: "show", DELETE: "delete", PUT: "update"] }

        // Calls
        "/api/calls/"(controller: "call") { action = [GET: "list", POST: "create"] }

        // Sites
        "/api/sites/"(controller: "site") { action = [GET: "list", POST: "create"] }
        "/api/sites/$id"(controller: "site") { action = [GET: "show", DELETE: "delete", PUT: "update"] }

        // AdSources
        "/api/adsources"(controller: "adSource") { action = [GET: "list", POST: "create"] }
        "/api/adsources/$id"(controller: "adSource") { action = [GET: "show", DELETE: "delete", PUT: "update"] }

        // Campaign
        "/api/campaigns"(controller: "campaign") { action = [GET: "list", POST: "create"] }
        "/api/campaigns/$id"(controller: "campaign") { action = [GET: "show", DELETE: "delete", PUT: "update"] }

        // Reports
        "/api/reports"(controller: "report")  { action = [GET: "generate"] }

        // Errors
        "500"(view: '/error')

        // DB Debug
        "/dbconsole"(view: "/dbconsole")

        // Main
        "/**"(controller:"index")
    }
}
