const request = require('sync-request')
const config = require('../config.json')
const igdb_credentials = {
    baseURL: 'https://api-v3.igdb.com',
    headers: {
        'user-key': igdb_config['user-kety'],
        'accept': 'application/json'
    }
}

module.exports = {
	fetchCard: (Trello, card, callback) => {
		let cardTitle = card.name
		let apiUrl = `https://api-v3.igdb.com/games/?fields=name,platforms,cover&limit=50&search=${cardTitle}`
		var data = JSON.parse(request('GET', apiUrl, {headers: {
            'user-key': config.parsers.imdb.user-key
        }}).getBody('utf8'))
		if (typeof data.results == 'undefined') {
			return
		}
        let result = data.results[0]
		return {
			"id": card.id,
			"parserId": result.id,
			"title": result.title,
			"desc": result.overview,
			"cover": `https://image.tmdb.org/t/p/w500_and_h282_face/${result.poster_path}`
		}
	}
}
