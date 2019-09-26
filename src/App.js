import React from 'react'
import { Admin, Resource } from 'react-admin'
import fakeDataProvider from 'ra-data-fakerest'
import {TrelloList} from './list'
import collection  from "./collection.json"

let lists = {}
let listArray = []

collection.forEach(item => {
    lists[item.list] = item.list
    listArray.push({label: item.list})
})

let data = [];
for (var prop in lists) {
    if (Object.prototype.hasOwnProperty.call(lists, prop)) {
        data[lists[prop]] = collection.filter(item => (item.list === lists[prop]))
    }
}
const dataProvider = fakeDataProvider(data)
const App = () => (
        <Admin dataProvider={dataProvider}>
        {
            listArray.map(list => (
                <Resource name={list.label} options={{label: `${list.label}`}} list={TrelloList}/>
            ))
        }
        </Admin>
)

export default App
