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
  cache_static_lookup: false,
  watchers: [{Path.expand("node_modules/webpack/bin/webpack.js"), ["--watch"]}]

# Watch static and templates for browser reloading.
# *Note*: Be careful with wildcards. Larger projects
# will use higher CPU in dev as the number of files
# grow. Adjust as necessary.
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  live_reload: [Path.expand("priv/static/js/app.js"),
                Path.expand("priv/static/css/app.css"),
                Path.expand("web/templates/**/*.eex")]

# Enables code reloading for development
config :phoenix, :code_reloader, true

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Configure your database
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_token_auth_react_dev"

config :phoenix_token_auth,
  token_secret: "the_very_secret_token",                                     # secret string used to sign the authentication token
  email_sender: "coolapp@example.com",                                         # sender address of emails sent by the app
  welcome_email_subject: fn user -> "Hello #{user.email}" end,               # function returning the subject of a welcome email
  welcome_email_body: &PhoenixTokenAuthReact.User.signup_email_body/2, # function returning the body of a welcome email
  mailgun_domain: System.get_env("MAILGUN_DOMAIN"),                                              # domain of your mailgun account
  mailgun_key: System.get_env("MAILGUN_KEY")                                                       # secret key of your mailgun account
