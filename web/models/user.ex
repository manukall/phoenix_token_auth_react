defmodule PhoenixTokenAuthReact.User do
  use Ecto.Model
  alias PhoenixTokenAuthReact.Router
  alias PhoenixTokenAuthReact.Endpoint

  schema "users" do
    field :email,                       :string
    field :hashed_password,             :string
    field :hashed_confirmation_token,   :string
    field :confirmed_at,                 Ecto.DateTime
    field :hashed_password_reset_token, :string
    field :unconfirmed_email,           :string

    timestamps
  end

  def signup_email_body(user, confirmation_token) do
    """
    Please follow the link below:
    #{Router.Helpers.page_url(Endpoint, :index)}#/users/#{user.id}/confirm/#{confirmation_token}
    """
  end

  def reset_password_email_body(user, reset_token) do
    """
    Please follow the link below:
    #{Router.Helpers.page_url(Endpoint, :index)}#/users/#{user.id}/reset_password/#{reset_token}
    """
  end

  def new_email_address_email_body(user, confirmation_token) do
    """
    Please follow the link below:
    #{Router.Helpers.page_url(Endpoint, :index)}#/users/#{user.id}/confirm/#{confirmation_token}
    """
  end

  def phoenix_token_auth_validator(changeset = %{params: %{"password" => password}}) when password != nil and password != "" do
    if String.length(password) < 6 do
      changeset = Ecto.Changeset.add_error(changeset, :password, :too_short)
    end
    changeset
  end
  def phoenix_token_auth_validator(changeset), do: changeset

end
