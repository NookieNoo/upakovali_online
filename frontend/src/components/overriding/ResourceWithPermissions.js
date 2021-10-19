import * as React from 'react';
import { Resource } from 'react-admin';
import get from 'lodash.get';
import { usePermissions } from 'react-admin';

const hasAccess = (permissions, permission) => get(permissions, permission, false);

export const ResourceWithPermissions = ({ name, list, create, edit, show, ...props }) => {
    const { permissions } = usePermissions();
    console.log('permissions', permissions);
    const access = {
        enabled: hasAccess(permissions, `${name}.enabled`),
        list: hasAccess(permissions, `${name}.list`),
        create: hasAccess(permissions, `${name}.create`),
        edit: hasAccess(permissions, `${name}.edit`),
        show: hasAccess(permissions, `${name}.show`),
    };

    if (!access.enabled) {
        return null;
    }

    return (
        <Resource
            {...props}
            name={name}
            list={access.list ? list : null}
            create={access.create ? create : null}
            edit={access.edit ? edit : null}
            show={access.show ? show : null}
        />
    );
};
