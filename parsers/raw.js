const request = require('sync-request')
const config = require('../config.json')

module.exports = {
	fetchCard: (Trello, card, callback) => {
		let cardTitle = card.name;
		return {
			"id": card.id,
			"title": card.name,
			"desc": card.desc,
			"parserId": card.id,
			"cover": null
		}
	}
}
