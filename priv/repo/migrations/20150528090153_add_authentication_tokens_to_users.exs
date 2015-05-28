defmodule PhoenixTokenAuthReact.Repo.Migrations.AddAuthenticationTokensToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :authentication_tokens, {:array, :string}
    end
  end
end
