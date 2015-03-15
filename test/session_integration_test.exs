defmodule SessionIntegrationTest do
  use ExUnit.Case
  use Hound.Helpers

  alias PhoenixTokenAuthReact.Repo
  alias PhoenixTokenAuthReact.User

  hound_session

  @email "user@example.com"
  @password "123456"

  test "signing up, confirming and logging in" do
    Repo.delete_all User
    navigate_to("/")

    # sign in as non exsiting user
    fill_in("inputEmail", @email)
    fill_in("inputPassword", @password)
    submit("inputPassword")

    element_id = find_element(:css, ".alert")
    assert visible_text(element_id) =~ ~r/unknown_email_or_password/

    # sign up
    find_element(:link_text, "Signup")
    |> click

    fill_in("inputEmail", @email)
    fill_in("inputPassword", @password)
    fill_in("inputPasswordConfirmation", @password)
    submit("inputPassword")

    wait_until fn ->
      assert length(Repo.all(User)) == 1
    end

    element_id = find_element(:css, "h2")
    assert visible_text(element_id) =~ ~r/Please log in below/

    # sign in as unconfirmed user
    fill_in("inputEmail", @email)
    fill_in("inputPassword", @password)
    submit("inputPassword")

    element_id = find_element(:css, ".alert")
    assert visible_text(element_id) =~ ~r/account_not_confirmed/

    # Confirm account
    mail= Application.get_env(:phoenix_token_auth, :mailgun_test_file_path)
    |> File.read!
    |> Poison.decode!
    assert mail["to"] == @email

    Regex.run(~r/http[\S]+/, mail["text"])
    |> List.last
    |> navigate_to

    wait_until fn ->
      user = Repo.one User
      assert user.confirmed_at != nil
    end

    # Log out
    find_element(:link_text, "Logout")
    |> click

    # Log in with wrong password
    find_element(:link_text, "Login")
    |> click
    fill_in("inputEmail", @email)
    fill_in("inputPassword", "wrong")
    submit("inputPassword")
    element_id = find_element(:css, ".alert")
    assert visible_text(element_id) =~ ~r/unknown_email_or_password/

    # Log in
    find_element(:link_text, "Login")
    |> click
    fill_in("inputEmail", @email)
    fill_in("inputPassword", @password)
    submit("inputPassword")

    wait_until fn ->
      assert length(find_all_elements(:link_text, "Logout")) > 0
    end
  end


  defp fill_in(elem_id, value) do
    find_element(:id, elem_id)
    |> fill_field(value)
  end

  defp submit(elem_id) do
    find_element(:id, elem_id)
    |> submit_element
  end

  defp wait_until(sleep \\ 50, retries \\ 10, function)
  defp wait_until(_sleep, 0, function), do: function.()
  defp wait_until(sleep, retries, function) do
    try do
      function.()
    rescue _ in ExUnit.AssertionError ->
        :timer.sleep(sleep)
        wait_until(sleep, retries - 1, function)
    end
  end

end
