import * as React from 'react';
import { List, Datagrid, TextField, TextInput, TopToolbar, CreateButton, EditButton } from 'react-admin';
import { Route } from 'react-router';
import { useHasAccess } from '@app-hooks';
import { ProductCreate, ProductEdit } from '@app-pages';
import { Drawer } from '@material-ui/core';

const styles = {
    drawerContent: {
        width: 300,
    },
};
const filters = [<TextInput label="Название" source="query" alwaysOn />];

const ProductListActions = ({ basePath }) => (
    <TopToolbar>
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

export default function ProductList(props) {
    const { resource } = props;
    const { edit: canEdit } = useHasAccess(resource);

    const handleClose = () => props.history.push('/product');
    return (
        <>
            <List {...props} title="ServiceTypes" actions={<ProductListActions />} filters={filters}>
                <Datagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="Название" source="name" />
                    {canEdit ? <EditButton label={null} /> : <span></span>}
                </Datagrid>
            </List>
            <Route path="/product/create">
                {({ match }) => (
                    <Drawer open={!!match} anchor="right" onClose={handleClose}>
                        <ProductCreate onCancel={handleClose} {...props} />
                    </Drawer>
                )}
            </Route>
            <Route path="/product/:id">
                {({ match }) => {
                    const isMatch = match && match.params && match.params.id !== 'create';

                    return (
                        <Drawer open={isMatch} anchor="right" onClose={handleClose}>
                            {isMatch ? (
                                <ProductEdit id={match.params.id} onCancel={handleClose} {...props} />
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
