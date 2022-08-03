import * as React from 'react';
import { List, Datagrid, TextField, TextInput, TopToolbar, CreateButton, EditButton } from 'react-admin';
import { Route } from 'react-router';
import { useHasAccess } from '@app-hooks';
import { AddresseeCreate, AddresseeEdit } from '@app-pages';
import { Drawer } from '@material-ui/core';

const styles = {
    drawerContent: {
        width: 300,
    },
};
const filters = [<TextInput label="Кому" source="query" alwaysOn />];

const AddresseeListActions = ({ basePath }) => (
    <TopToolbar>
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

export default function AddresseeList(props) {
    const { resource } = props;
    const { edit: canEdit } = useHasAccess(resource);

    const handleClose = () => props.history.push('/addressee');
    return (
        <>
            <List {...props} title="Адресаты" actions={<AddresseeListActions />} filters={filters} bulkActionButtons={false}>
                <Datagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="Кому" source="name" />
                    {canEdit ? <EditButton label={null} /> : <span></span>}
                </Datagrid>
            </List>
            <Route path="/addressee/create">
                {({ match }) => (
                    <Drawer open={!!match} anchor="right" onClose={handleClose}>
                        <AddresseeCreate onCancel={handleClose} {...props} />
                    </Drawer>
                )}
            </Route>
            <Route path="/addressee/:id">
                {({ match }) => {
                    const isMatch = match && match.params && match.params.id !== 'create';

                    return (
                        <Drawer open={isMatch} anchor="right" onClose={handleClose}>
                            {isMatch ? (
                                <AddresseeEdit id={match.params.id} onCancel={handleClose} {...props} />
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
