defmodule PhoenixWebpack.User do
  use Ecto.Model

  schema "users" do
    field  :email,                       :string
    field  :hashed_password,             :string
    field  :hashed_confirmation_token,   :string

    timestamps
  end

end
