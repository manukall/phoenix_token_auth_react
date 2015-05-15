# PhoenixTokenAuthReact

This is an example app using [Phoenix](http://www.phoenixframework.org), [phoenix_token_auth](https://github.com/manukall/phoenix_token_auth) and [React](https://facebook.github.io/react/index.html).

Branch master uses phoenix_token_auth's latest hex release and branch development might use a more current version of phoenix_token_auth's master branch.

You need to have a (free) mailgun account to be able to send welcome emails. You'll
need to know your mailgun domain, and HTTP API key.

## Running

* Clone the repository and change into it's directory
* Install dependencies:
```Shell
mix deps.get && npm install
```
* Create and migrate the database (You might also need to change the DB username/password in `config/dev.exs` before you try to run the DB creation and migration tasks.)
```Shell
mix do ecto.create, ecto.migrate
```
* Add some example data
```Shell
mix seed_db
```
* Configure a real mail user, in the same domain as the mailgun domain you configured, in `config/config.exs`.
```Shell
    config :phoenix_token_auth,
      ...
      email_sender: "somebody@your-mailgun-domain.org",
      ...
```
* Start the server
```Shell
MAILGUN_DOMAIN=... MAILGUN_KEY=... mix phoenix.server
```
* Open your browser at [http://localhost:4000](http://localhost:4000) and explore.

## Testing

In order to run `mix test`, which makes use of
[Hound](https://github.com/HashNuke/hound) for testing, you need a local webdriver server
to be running. You can find simple instructions at [https://github.com/HashNuke/hound/wiki/Starting-a-webdriver-server](https://github.com/HashNuke/hound/wiki/Starting-a-webdriver-server)

On OS X with Firefox and Homebrew installed you may install the Selenium web driver and follow the instructions for running it:
```Shell
brew install selenium-server-standalone
```

You may also need to change the DB username/password in `config/test.exs` before you try to run the tests.

## Credits
A lot of inspiration and code were taken from [https://github.com/FancyPixel/small-frontend](https://github.com/FancyPixel/small-frontend).
