use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  http: [port: 4001],
  server: true

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_token_auth_react_test",
  size: 1,
  max_overflow: false

config :hound, app_host: "http://localhost", app_port: 4001

config :phoenix_token_auth,
  mailgun_mode: :test,
  mailgun_test_file_path: "/tmp/ptm.mailgun",
  token_secret: "the_very_secret_token"
