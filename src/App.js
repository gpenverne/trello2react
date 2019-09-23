import React from 'react';
import { Admin, Resource } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';
import {GamesList} from './games';

import games from "./collection.json"

var data = {
    "owned": games.filter(game =>  (game.owned && !!game.cover)),
    "wanted": games.filter(game =>  (game.wanted && !!game.cover)),
    "unrecognized": games.filter(game =>  !game.cover)
}
for (var i =0; i < games.length; i++) {
    var gameItem = games[i];
    if (typeof data[gameItem.platform] == 'undefined') {
        data[gameItem.platform] = games.filter(game =>  (game.owned && game.platform === gameItem.platform && !!game.cover));
    }
}

const dataProvider = fakeDataProvider(data)
//const wantedProvider = fakeDataProvider({"games":games.filter(game =>  game.wanted) })

const App = () => (
    <Admin  dataProvider={dataProvider}>
        <Resource name="owned" options={{ label: 'Collectionés'}} list={GamesList}/>
        <Resource name="wanted" options={{ label: 'Recherchés'}} list={GamesList} />
        <Resource name="unrecognized" options={{ label: 'A identifier/classifier'}} list={GamesList} />
        <Resource name="ds" options={{ label: 'DS / 3DS'}} list={GamesList} />
        <Resource name="gba" options={{ label: 'Game boy advance'}} list={GamesList} />
        <Resource name="gbc" options={{ label: 'Game boy color'}} list={GamesList} />
        <Resource name="gb" options={{ label: 'Game boy'}} list={GamesList} />
        <Resource name="md" options={{ label: 'Sega Megadrive'}} list={GamesList} />
        <Resource name="snes" options={{ label: 'Super Nintendo'}} list={GamesList} />
        <Resource name="wii" options={{ label: 'Wii / Wii u'}} list={GamesList} />
    </Admin>
);

export default App
