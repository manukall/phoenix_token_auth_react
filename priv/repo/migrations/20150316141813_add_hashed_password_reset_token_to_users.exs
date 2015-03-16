defmodule PhoenixTokenAuthReact.Repo.Migrations.AddHashedPasswordResetTokenToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :hashed_password_reset_token, :text
    end
  end
end
