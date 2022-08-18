import * as React from 'react';
import { TopToolbar, EditButton, useNotify, useMutation, useRefresh } from 'react-admin';
import { orderStatuses } from '@app-constants';
import SelectInput from '@app-universal/inputs/SelectInput';
import { useGetRole } from '@app-hooks';
import { makeStyles } from '@material-ui/core/styles';

const getStatusesOptions = (orderStatuses, currentOrderStatus = null, isAdmin = false) => {
    const statusesArray = Object.values(orderStatuses);
    if (isAdmin) return statusesArray;
    const currentStatusIndex = statusesArray.findIndex((it) => it.id === currentOrderStatus);
    return statusesArray.map((it, index) => ({ ...it, disabled: index !== currentStatusIndex + 1 }));
};

const useStyles = makeStyles((theme) => ({
    btn_group: {
        alignItems: 'center',
        display: 'flex'
    }
}));


export const OrderShowActions = (props) => {
    const { basePath, data, resource, isDataLoaded, className } = props;
    const { isAdmin } = useGetRole();
    const [mutate] = useMutation();
    const notify = useNotify();
    const refresh = useRefresh();
    const classes = useStyles();

    const changeStatus = (event) =>
        mutate(
            {
                type: 'updateField',
                resource: 'order',
                payload: {
                    id: data.id,
                    data: { order_status_id: event.target.value },
                },
            },
            {
                undoable: false,
                // action: CRUD_UPDATE_SUCCESS,
                onSuccess: (response) => {
                    //@FIXME Найти способ обновить состояние стора, а не рефетчить всю сущность
                    refresh();
                    notify(response.message, { type: 'info' });
                },
                onFailure: (error) => notify('Не удалось обновить статус', { type: 'warning' }),
            }
        );

    const options = getStatusesOptions(orderStatuses, data?.order_status.id, isAdmin);
//test2
    return (
        <TopToolbar>
            <div className={classes.btn_group}>
                    {isDataLoaded && (
                        <SelectInput
                        label="Статус заказа"
                        // disableValue="not_available"
                        source="order_status.id"
                        options={options}
                        value={data.order_status.id}
                        onChange={changeStatus}
                        optionValueField="id"
                        optionLabelField="name"
                        />
                    )}
                    <EditButton basePath={basePath} record={data}/>
            </div>
        </TopToolbar>
    );
};
