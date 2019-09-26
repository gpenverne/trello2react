# TrelloToReact

## Install
```bash
$ make install
```

## Configure
All configuration is in `config.json`

### Select a parser
Three parsers are available:
- `igdb` to parse video games names (need an apikey from https://igdb.com/)
- `tmdb` to parse movies names (need an apikey from https://www.themoviedb.org/)
- `raw` to use data from trello

### Put trello credentials
You can find your apikey on https://trello.com/app-key/ .
To generate your oauth_token go to https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Trello2React&key=YOUR_API_KEY
Put values in `config.json`

## Use it
### Fetch data from trello
```bash
$ make fetch
```

### Start react server
```bash
$ make start
```

## Build static version
```bash
$ make build
```
