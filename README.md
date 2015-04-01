# PhoenixTokenAuthReact

This is an example app using [Phoenix](http://www.phoenixframework.org), [phoenix_token_auth](https://github.com/manukall/phoenix_token_auth) and [React](https://facebook.github.io/react/index.html).

Branch master uses phoenix_token_auth's latest hex release and branch development might use a more current version of phoenix_token_auth's master branch.

You need to have a (free) mailgun account to be able to send welcome emails.

## Running

* Clone the repository and change into it's directory
* Install dependencies:
```Shell
mix deps.get && npm install
```
* Create and migrate the database (You might need to change username/password in `config/dev.exs` before)
```Shell
mix do ecto.create, ecto.migrate
```
* Add some example data
```Shell
mix seed_db
```
* Start the server
```Shell
MAILGUN_DOMAIN=... MAILGUN_KEY=... mix phoenix.server
```
* Open your browser at http://localhost:4000 and explore.

## Credits
A lot of inspiration and code were taken from https://github.com/FancyPixel/small-frontend.
