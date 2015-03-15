defmodule PhoenixTokenAuthReact.SecretsController do
  use PhoenixTokenAuthReact.Web, :controller

  alias PhoenixTokenAuthReact.Secret

  plug :action

  def index(conn, _params) do
    secrets = Repo.all(Secret)
    json conn, %{secrets: secrets}
  end
end
