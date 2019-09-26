const config = require('../config.json');
const localData = require('../data.json');
const parser = require('../parsers/'+config.trello.parser+'.js')
const request = require('sync-request');
const fs = require('fs');

const FgGreen = "\x1b[32m"
const FgRed = "\x1b[31m"
const FgCyan = "\x1b[36m"

boardId = config.trello.board_id;
apiKey = config.trello.api_key;
oauthToken = config.trello.oauth_token;

const Trello = require('trello-node-api')(apiKey, oauthToken);
let collectionData = [];
var res = request('GET', `https://api.trello.com/1/board/${boardId}/lists?key=${apiKey}&token=${oauthToken}`);
var data = JSON.parse(res.getBody('utf8'));
var lists = {};
var knownItems = [];

for (var prop in localData) {
    if (Object.prototype.hasOwnProperty.call(localData, prop)) {
        knownItems.push(localData[prop].cardId)
    }
}

data.forEach(function(list){
	lists[list.id] = list.name;
	collectionData[list.name] = {
		'label': list.name,
		'items': []
	};
});

Trello.board.searchCards(boardId).then(function(response) {
	response.forEach(function(cardResponse){
		if (knownItems.indexOf(cardResponse.id) > -1) {
			console.log(FgCyan+cardResponse.name+' already known, skipping...');
			return;
		}
		card = parser.fetchCard(Trello, cardResponse);
		if (!card) {
			console.log(FgCyan+'Unable to find `'+cardResponse.name+'`');
            return;
		}
        if (card.cover) {
			console.log(FgGreen+'Generating picture');
    		var res = request('POST', `https://api.trello.com/1/cards/${card.id}/attachments?key=${apiKey}&token=${oauthToken}`, {
    			json: {
    				url: card.cover
    			}
    		});
        } else {
			console.log(FgCyan+'No picture found');
			card.cover = null;
		}
		var data = JSON.parse(res.getBody('utf8'));
        localData[cardResponse.name] = {
            'cardId': cardResponse.id,
            'title': cardResponse.name,
            'shortUrl': cardResponse.shortUrl,
            'cover': card.cover,
            'list': lists[cardResponse.idList],
			'parserId': card.parserId
        }
		collectionData.push(localData[cardResponse.name]);
		if (data['id']) {
        	cardResponse.idAttachmentCover = data['id'];
		}
		cardResponse.desc = card.desc;
        Trello.card.update(cardResponse.id, cardResponse);
		console.log(FgGreen+cardResponse.name+' updated!');

	});
    fs.writeFileSync('data.json', JSON.stringify(localData, null, 2));
	fs.writeFileSync('src/collection.json', JSON.stringify(collectionData, null, 2));
});
