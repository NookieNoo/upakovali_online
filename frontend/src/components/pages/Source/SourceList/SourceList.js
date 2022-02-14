import * as React from 'react';
import { List, Datagrid, TextField, TextInput, TopToolbar, CreateButton, EditButton } from 'react-admin';
import { Route } from 'react-router';
import { useHasAccess } from '@app-hooks';
import { SourceCreate, SourceEdit } from '@app-pages';
import { Drawer } from '@material-ui/core';

const styles = {
    drawerContent: {
        width: 300,
    },
};
const filters = [<TextInput label="Название" source="query" alwaysOn />];

const SourceListActions = ({ basePath }) => (
    <TopToolbar>
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

export default function SourceList(props) {
    const { resource } = props;
    const { edit: canEdit } = useHasAccess(resource);

    const handleClose = () => props.history.push('/source');
    return (
        <>
            <List {...props} title="Источники" actions={<SourceListActions />} filters={filters}>
                <Datagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="Название" source="name" />
                    {canEdit ? <EditButton label={null} /> : <span></span>}
                </Datagrid>
            </List>
            <Route path="/source/create">
                {({ match }) => (
                    <Drawer open={!!match} anchor="right" onClose={handleClose}>
                        <SourceCreate onCancel={handleClose} {...props} />
                    </Drawer>
                )}
            </Route>
            <Route path="/source/:id">
                {({ match }) => {
                    const isMatch = match && match.params && match.params.id !== 'create';

                    return (
                        <Drawer open={isMatch} anchor="right" onClose={handleClose}>
                            {isMatch ? (
                                <SourceEdit id={match.params.id} onCancel={handleClose} {...props} />
                            ) : (
                                <div style={styles.drawerContent} />
                            )}
                        </Drawer>
                    );
                }}
            </Route>
        </>
    );
}
