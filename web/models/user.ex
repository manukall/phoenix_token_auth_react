defmodule PhoenixWebpack.User do
  use Ecto.Model

  schema "users" do
    field  :email,                       :string
    field  :hashed_password,             :string
    field  :hashed_confirmation_token,   :string

    timestamps
  end

  def signup_email_body(user, confirmation_token) do
    """
    Please follow the link below:
http://localhost:4000/#/users/#{user.id}/confirm/#{confirmation_token}
    """
  end

end
