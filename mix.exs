defmodule PhoenixTokenAuthReact.Mixfile do
  use Mix.Project

  def project do
    [app: :phoenix_token_auth_react,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: ["lib", "web"],
     compilers: [:phoenix] ++ Mix.compilers,
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [mod: {PhoenixTokenAuthReact, []},
     applications: app_list(Mix.env) ]
  end

  defp app_list(:test), do: [:hound | app_list]
  defp app_list(_),     do: app_list
  defp app_list, do: [:phoenix, :cowboy, :logger]

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [{:phoenix, "~> 0.12.0"},
     {:phoenix_ecto, "~> 0.3.2"},
     {:phoenix_live_reload, "~> 0.3.3"},
     {:postgrex, ">= 0.0.0"},
     {:phoenix_token_auth, "0.0.13"},
     # use github mailgun repo for phoenix token auth to have testing mode
     {:cowboy, "~> 1.0"},
     {:hound, ">= 0.6.0", only: :test},
    ]
  end

end
