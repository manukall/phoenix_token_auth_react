defmodule PhoenixTokenAuthReact.Endpoint do
  use Phoenix.Endpoint, otp_app: :phoenix_token_auth_react

  # Serve at "/" the given assets from "priv/static" directory
  plug Plug.Static,
    at: "/", from: :phoenix_token_auth_react,
    only: ~w(css images js favicon.ico robots.txt)

  plug Plug.Logger

  # Code reloading will only work if the :code_reloader key of
  # the :phoenix application is set to true in your config file.
  if code_reloading? do
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_phoenix_token_auth_react_key",
    signing_salt: "o2gfQ0lF",
    encryption_salt: "iDDXM/C4"

  plug :router, PhoenixTokenAuthReact.Router
end
