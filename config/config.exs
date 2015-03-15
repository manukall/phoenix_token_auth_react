# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "irHs4NmgBDnstdtPY3us3DnZwKIVExJU59+Qy2Knb0dIgnr01YEWJnTpLdH3wb+S",
  debug_errors: false,
  pubsub: [name: PhoenixTokenAuthReact.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix_token_auth,
  user_model: PhoenixTokenAuthReact.User,                                                    # ecto model used for authentication
  repo: PhoenixTokenAuthReact.Repo,                                                          # ecto repo
  crypto_provider: Comeonin.Bcrypt,                                          # crypto provider for hashing passwords/tokens. see http://hexdocs.pm/comeonin/
  token_validity_in_minutes: 7 * 24 * 60,                                     # minutes from login until a token expires
  email_sender: "coolapp@example.com",                                         # sender address of emails sent by the app
  welcome_email_subject: fn user -> "Hello #{user.email}" end,               # function returning the subject of a welcome email
  welcome_email_body: &PhoenixTokenAuthReact.User.signup_email_body/2 # function returning the body of a welcome email

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
