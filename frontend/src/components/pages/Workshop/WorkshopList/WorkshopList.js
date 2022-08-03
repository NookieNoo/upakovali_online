import * as React from 'react';
import { List, Datagrid, TextField, TextInput, TopToolbar, CreateButton, EditButton } from 'react-admin';
import { Route } from 'react-router';
import { useHasAccess } from '@app-hooks';
import { WorkshopCreate, WorkshopEdit } from '@app-pages';
import { Drawer } from '@material-ui/core';

const styles = {
    drawerContent: {
        width: 300,
    },
};
const filters = [<TextInput label="Адрес" source="query" alwaysOn />];

const WorkshopListActions = ({ basePath }) => (
    <TopToolbar>
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

export default function WorkshopList(props) {
    const { resource } = props;
    const { edit: canEdit } = useHasAccess(resource);

    const handleClose = () => props.history.push('/workshop');
    return (
        <>
            <List {...props} title="Мастерские" actions={<WorkshopListActions />} filters={filters} bulkActionButtons={false}>
                <Datagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="Адрес" source="address" />
                    {canEdit ? <EditButton label={null} /> : <span></span>}
                </Datagrid>
            </List>
            <Route path="/workshop/create">
                {({ match }) => (
                    <Drawer open={!!match} anchor="right" onClose={handleClose}>
                        <WorkshopCreate onCancel={handleClose} {...props} />
                    </Drawer>
                )}
            </Route>
            <Route path="/workshop/:id">
                {({ match }) => {
                    const isMatch = match && match.params && match.params.id !== 'create';

                    return (
                        <Drawer open={isMatch} anchor="right" onClose={handleClose}>
                            {isMatch ? (
                                <WorkshopEdit id={match.params.id} onCancel={handleClose} {...props} />
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
