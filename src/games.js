import React from 'react';
import { Filter, ReferenceInput, SelectInput, List, ImageField, Datagrid, TextInput } from 'react-admin';

export const GamesList = (props) => (
    <List filters={<TitleFilter />} {...props}>
        <Datagrid >
                <ImageField source="cover" />
                <GameTitle source="title" />
                <PlatformComponent source="platform" />
        </Datagrid>
    </List>
);


const GameTitle = ({ record }) => {
    return <div><h3>{`${record.trelloTitle}`}</h3><small>on {`${record.platform}`}</small></div>;
};

const PlatformComponent = ({ record }) => {
    return <a href={`#/${record.platform}`}><img alt={`${record.platform}`} title={`${record.platform}`}  src={`images/${record.platform}.png`} /></a>;
};

const TitleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Title" source="title" reference="games" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
        <ReferenceInput label="Platform" source="platform" reference="games" allowEmpty>
            <SelectInput optionText="platform" />
        </ReferenceInput>
    </Filter>
);
