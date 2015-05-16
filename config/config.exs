# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :phoenix_token_auth_react, PhoenixTokenAuthReact.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "zNJJ0oGwckJ4Guhn3SNrxCDzCc/7kA8U1EvBPGjKrjxoXfpwE1v8OBJpZCkKj5He",
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
  welcome_email_subject: fn user -> "Hello #{user.email}" end,
  welcome_email_body: &PhoenixTokenAuthReact.User.signup_email_body/2,
  password_reset_email_subject: fn user -> "Reset password for #{user.email}" end,
  password_reset_email_body: &PhoenixTokenAuthReact.User.reset_password_email_body/2,
  new_email_address_email_subject: fn user -> "Hello #{user.email}" end,
  new_email_address_email_body: &PhoenixTokenAuthReact.User.new_email_address_email_body/2,
  user_model_validator: &PhoenixTokenAuthReact.User.phoenix_token_auth_validator/1

config :joken,
  json_module: PhoenixTokenAuth.PoisonHelper,
  algorithm: :HS256 # Optional. defaults to :HS256

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
