defmodule PhoenixTokenAuthReact.Router do
  use Phoenix.Router
  require PhoenixTokenAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug PhoenixTokenAuth.Plug
  end

  scope "/", PhoenixTokenAuthReact do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api/v1" do
    pipe_through :api

    PhoenixTokenAuth.mount
  end

  scope "/api/v1", PhoenixTokenAuthReact do
    pipe_through :api
    pipe_through :authenticated

    resources "secrets", SecretsController, only: [:index]
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixTokenAuthReact do
  #   pipe_through :api
  # end
end
