/**
* Parser for http://www.omdbapi.com/ - The Open Movie Database
*/
const request = require('sync-request');
const config = require('../config.json');

module.exports = {
	fetchCard: function(Trello, card, callback) {
		let cardTitle = card.name;
		let apiUrl = `https://api.themoviedb.org/3/search/movie?query=${cardTitle}&api_key=${config.parsers.tmdb.apikey}&language=${config.parsers.tmdb.language}&page=1&include_adult=false`
		var data = JSON.parse(request('GET', apiUrl).getBody('utf8'));
		if (typeof data.results == 'undefined') {
			return;
		}
		for(var i=0; i<data.results.length;i++) {
			var result = data.results[i];
			return {
				"id": card.id,
				"db_id": result.id,
				"title": result.title,
				"desc": result.overview,
				"cover": `https://image.tmdb.org/t/p/w500_and_h282_face/${result.poster_path}`
			};
		}

	}
}
