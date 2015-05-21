use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  secret_key_base: "TAsI1Y1jgyeySuDLgJRUKngnDQlULVtmvGrjH52u5DjxniP8h4FbtqBYVjgZe4jh"

# Configure your database
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_token_auth_react_prod",
  size: 20 # The amount of database connections in the pool

config :phoenix_token_auth,
  email_sender: "prod@mailgun-domain.com",
  mailgun_domain: System.get_env("MAILGUN_DOMAIN"),                                              # domain of your mailgun account
  mailgun_key: System.get_env("MAILGUN_KEY")                                                       # secret key of your mailgun account

config :joken,
  secret_key: "the_very_secret_prod_token"
