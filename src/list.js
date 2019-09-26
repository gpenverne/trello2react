import React from 'react'
import {List, ImageField, Datagrid} from 'react-admin'

export const TrelloList = (props) => (
    <List {...props}>
        <Datagrid >
                <ImageField source="cover" />
                <Title source="title" />
        </Datagrid>
    </List>
)


const Title = ({ record }) => {
    return <div><h3>{`${record.title}`}</h3></div>;
}
