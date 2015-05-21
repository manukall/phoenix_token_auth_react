defmodule PhoenixTokenAuthReact.Repo.Migrations.AddAuthenticationTokensToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :authentication_tokens, {:array, :string}
    end
  end
end
