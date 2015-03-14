use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :phoenix_webpack, PhoenixWebpack.Endpoint,
  secret_key_base: "2TpfYCIeeLDfXbCFG9aKSO6GzryCwKXAaFtqaJFmKrg9KxiX+SIUnhYJYC/Mb5e1"

# Configure your database
config :phoenix_webpack, PhoenixWebpack.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_webpack_prod"
