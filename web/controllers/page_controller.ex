defmodule PhoenixTokenAuthReact.PageController do
  use PhoenixTokenAuthReact.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end
