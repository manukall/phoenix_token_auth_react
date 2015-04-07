Mix.Task.run "ecto.drop"
Mix.Task.run "ecto.create"
Mix.Task.run "ecto.migrate"

ExUnit.start
