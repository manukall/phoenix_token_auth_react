defmodule PhoenixTokenAuthReact.Router do
  use PhoenixTokenAuthReact.Web, :router
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

  scope "/", PhoenixTokenAuthReact do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
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
    pipe_through :authenticated
    pipe_through :api

    resources "secrets", SecretsController, only: [:index]
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixTokenAuthReact do
  #   pipe_through :api
  # end
end
