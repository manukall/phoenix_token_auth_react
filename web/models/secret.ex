defmodule PhoenixTokenAuthReact.Secret do
  use PhoenixTokenAuthReact.Web, :model

  schema "secrets" do
    field :text, :string

    timestamps
  end

end
