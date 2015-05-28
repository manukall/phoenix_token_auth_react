defmodule PhoenixTokenAuthReact.Mailer do
  alias PhoenixTokenAuthReact.Router
  alias PhoenixTokenAuthReact.Endpoint
  @behaviour PhoenixTokenAuth.MailingBehaviour

  def welcome_subject(user), do: "Hello #{user.email}"
  def welcome_body(user, token) do
    """
    Please follow the link below:
    #{Router.Helpers.page_url(Endpoint, :index)}#/users/#{user.id}/confirm/#{token}
    """
  end

  def password_reset_subject(user), do: "Hello #{user.email}"

  def password_reset_body(user, reset_token) do
    """
    Please follow the link below:
    #{Router.Helpers.page_url(Endpoint, :index)}#/users/#{user.id}/reset_password/#{reset_token}
    """
  end

  def new_email_address_subject(_user), do: "Please confirm your email address"

  def new_email_address_body(user, confirmation_token) do
    """
    Please follow the link below:
    #{Router.Helpers.page_url(Endpoint, :index)}#/users/#{user.id}/confirm/#{confirmation_token}
    """
  end

end
