defmodule PhoenixWebpack.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :text
      add :hashed_password, :text
      add :hashed_confirmation_token, :text

      timestamps
    end
  end
end
