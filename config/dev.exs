use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  #watchers: [node: ["node_modules/brunch/bin/brunch", "watch"]]
  watchers: [{Path.expand("node_modules/webpack/bin/webpack.js"), ["--watch"]}]


# Watch static and templates for browser reloading.
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Configure your database
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_token_auth_react_dev",
  size: 10 # The amount of database connections in the pool

config :phoenix_token_auth,
  email_sender: "foo@example.com",
  mailgun_domain: System.get_env("MAILGUN_DOMAIN"),                                              # domain of your mailgun account
  mailgun_key: System.get_env("MAILGUN_KEY")                                                       # secret key of your mailgun account

config :joken,
  secret_key: "the_very_secret_dev_token"
