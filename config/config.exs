# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  root: Path.expand("..", __DIR__),
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
  user_model: PhoenixTokenAuthReact.User,
  repo: PhoenixTokenAuthReact.Repo,
  crypto_provider: Comeonin.Bcrypt,
  token_validity_in_minutes: 7 * 24 * 60,
  email_sender: "coolapp@example.com",
  emailing_module: PhoenixTokenAuthReact.Mailer,
  user_model_validator: {PhoenixTokenAuthReact.User, :phoenix_token_auth_validator}

config :joken,
  json_module: PhoenixTokenAuth.PoisonHelper

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
