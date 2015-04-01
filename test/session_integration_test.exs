defmodule SessionIntegrationTest do
  use ExUnit.Case
  use Hound.Helpers

  alias PhoenixTokenAuthReact.Repo
  alias PhoenixTokenAuthReact.User
  alias PhoenixTokenAuthReact.Secret

  hound_session

  @email "user@example.com"
  @password "123456"
  @secret_text "The very secret text"

  test "signing up, confirming and logging in" do
    Repo.delete_all User
    Repo.delete_all Secret
    Repo.insert %Secret{text: @secret_text}

    navigate_to("/")
    find_element(:css, "body")
    |> visible_text
    |> (fn text -> assert !String.contains?(text, @secret_text) end).()

    # sign in as non exsiting user
    fill_in("inputEmail", @email)
    fill_in("inputPassword", @password)
    submit("inputPassword")

    element_id = find_element(:css, ".alert")
    assert visible_text(element_id) == "Unknown email or password"

    # sign up with a password that's too short
    click_link("Signup")

    fill_in("inputEmail", @email)
    fill_in("inputPassword", "12345")
    fill_in("inputPasswordConfirmation", "12345")
    submit("inputPassword")

    wait_until fn ->
      element_id = find_element(:css, "body")
      assert visible_text(element_id) =~ ~r/too_short/
    end

    # sign up
    click_link("Signup")

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
    assert visible_text(element_id) =~ ~r/Account not confirmed yet. Please follow the instructions we sent you by email./

    # Confirm account
    mail = find_mail
    assert mail["to"] == @email

    Regex.run(~r/http[\S]+/, mail["text"])
    |> List.last
    |> navigate_to

    wait_until fn ->
      user = Repo.one User
      assert user.confirmed_at != nil
    end

    find_element(:css, "body")
    |> visible_text
    |> (fn text -> assert String.contains?(text, @secret_text) end).()

    # Log out
    click_link("Logout")

    # Log in with wrong password
    click_link("Login")
    fill_in("inputEmail", @email)
    fill_in("inputPassword", "wrong")
    submit("inputPassword")
    element_id = find_element(:css, ".alert")
    assert visible_text(element_id) =~ "Unknown email or password"

    # Log in
    click_link("Login")
    fill_in("inputEmail", @email)
    fill_in("inputPassword", @password)
    submit("inputPassword")

    wait_until fn ->
      assert length(find_all_elements(:link_text, "Logout")) > 0
    end

    # Reset password
    click_link("Logout")
    click_link("Login")
    click_link("Forgot password")
    fill_in("inputEmail", @email)
    submit("inputEmail")

    wait_until fn ->
      user = Repo.one User
      assert user.hashed_password_reset_token != nil
    end

    mail = find_mail
    assert mail["to"] == @email

    Regex.run(~r/http[\S]+/, mail["text"])
    |> List.last
    |> navigate_to

    new_password = "new_password"
    fill_in("inputPassword", new_password)
    fill_in("inputPasswordConfirmation", new_password)
    submit("inputPassword")

    wait_until fn ->
      assert length(find_all_elements(:link_text, "Logout")) > 0
    end

    click_link("Logout")
    click_link("Login")
    fill_in("inputEmail", @email)
    fill_in("inputPassword", new_password)
    submit("inputPassword")

    wait_until fn ->
      assert length(find_all_elements(:link_text, "Logout")) > 0
    end

    # change password
    click_link("Account")
    changed_password = "changed_password"
    fill_in("inputPassword", changed_password)
    fill_in("inputPasswordConfirmation", changed_password)
    submit("inputPassword")

    click_link("Logout")
    click_link("Login")
    fill_in("inputEmail", @email)
    fill_in("inputPassword", changed_password)
    submit("inputPassword")

    wait_until fn ->
      assert length(find_all_elements(:link_text, "Logout")) > 0
    end

    # change email
    delete_logged_emails
    click_link("Account")
    changed_email = "changed@example.com"
    fill_in("inputEmail", changed_email)
    submit("inputEmail")

    click_link("Logout")
    click_link("Login")
    fill_in("inputEmail", @email)
    fill_in("inputPassword", changed_password)
    submit("inputPassword")

    wait_until fn ->
      assert length(find_all_elements(:link_text, "Logout")) > 0
    end

    # can't log in with changed email yet
    click_link("Logout")
    click_link("Login")
    fill_in("inputEmail", changed_email)
    fill_in("inputPassword", changed_password)
    submit("inputPassword")
    element_id = find_element(:css, ".alert")
    assert visible_text(element_id) == "Unknown email or password"

    # confirm changed email
    mail = find_mail
    assert mail["to"] == changed_email

    Regex.run(~r/http[\S]+/, mail["text"])
    |> List.last
    |> navigate_to

    wait_until fn ->
      find_element(:css, "body")
      |> visible_text
      |> (fn text -> assert String.contains?(text, @secret_text) end).()
    end
    click_link("Logout")
    click_link("Login")
    fill_in("inputEmail", changed_email)
    fill_in("inputPassword", changed_password)
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

  defp click_link(text) do
    find_element(:link_text, text)
    |> click
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

  defp find_mail do
    Application.get_env(:phoenix_token_auth, :mailgun_test_file_path)
    |> File.read!
    |> Poison.decode!
  end

  defp delete_logged_emails do
    Application.get_env(:phoenix_token_auth, :mailgun_test_file_path)
    |> File.rm
  end

end
