const request = require('sync-request')
const config = require('../config.json')

module.exports = {
	fetchCard: (Trello, card, callback) => {
		let cardTitle = card.name
		let apiUrl = `https://api.themoviedb.org/3/search/movie?query=${cardTitle}&api_key=${config.parsers.tmdb.apikey}&language=${config.parsers.tmdb.language}&page=1&include_adult=false`
		var data = JSON.parse(request('GET', apiUrl).getBody('utf8'))
		if (typeof data.results == 'undefined') {
			return
		}
		let result = data.results[0]
		return {
			"id": card.id,
			"title": result.title,
			"desc": result.overview,
			"parserId": result.id,
			"cover": `https://image.tmdb.org/t/p/w500_and_h282_face/${result.poster_path}`
		}
	}
}
