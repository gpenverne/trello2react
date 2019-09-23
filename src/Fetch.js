const config = require('../config.json');
const parser = require('../parsers/'+config.trello.parser+'.js')
const request = require('sync-request');
const fs = require('fs');

boardId = config.trello.board_id;
apiKey = config.trello.api_key;
oauthToken = config.trello.oauth_token;

const Trello = require('trello-node-api')(apiKey, oauthToken);
let localData = {};
var res = request('GET', `https://api.trello.com/1/board/${boardId}/lists?key=${apiKey}&token=${oauthToken}`);
var data = JSON.parse(res.getBody('utf8'));
var lists = {};
data.forEach(function(list){
	lists[list.id] = list.name;
});

Trello.board.searchCards(boardId).then(function(response) {
	response.forEach(function(cardResponse){
		card = parser.fetchCard(Trello, cardResponse);
		if (!card) {
			console.log('Unable to find `'+cardResponse.name+'`');
            return;
		}
        try {
    		var res = request('POST', `https://api.trello.com/1/cards/${card.id}/attachments?key=${apiKey}&token=${oauthToken}`, {
    			json: {
    				url: card.cover
    			}
    		});
        }
        catch(e) {
            return;
        }
		var data = JSON.parse(res.getBody('utf8'));
        localData[cardResponse.name] = {
            'cardId': cardResponse.id,
            'title': cardResponse.name,
            'shortUrl': cardResponse.shortUrl,
            'cover': card.cover,
            'list': lists[cardResponse.idList]
        }
        cardResponse.idAttachmentCover = data['id'];
		cardResponse.desc = card.desc;
        Trello.card.update(cardResponse.id, cardResponse);

	});
    fs.writeFileSync('data.json', JSON.stringify(localData, null, 2));
});
