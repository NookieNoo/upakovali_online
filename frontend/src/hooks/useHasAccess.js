import get from 'lodash.get';
import { usePermissions } from 'react-admin';

const hasAccess = (permissions, permission) => get(permissions, permission, false);

export function useHasAccess(resourceName) {
    const { permissions } = usePermissions();

    const access = {
        enabled: hasAccess(permissions, `${resourceName}.enabled`),
        list: hasAccess(permissions, `${resourceName}.list`),
        create: hasAccess(permissions, `${resourceName}.create`),
        edit: hasAccess(permissions, `${resourceName}.edit`),
        show: hasAccess(permissions, `${resourceName}.show`),
    };

    return access;
}
