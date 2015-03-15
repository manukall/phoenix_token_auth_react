defmodule PhoenixTokenAuthReact.Repo.Migrations.CreateSecrets do
  use Ecto.Migration

  def change do
    create table(:secrets) do
      add :text, :text

      timestamps
    end
  end
end
