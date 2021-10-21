import { useGetIdentity } from 'react-admin';
import { userRoles } from '@app-constants';

export function useGetRole(resourceName) {
    const { identity } = useGetIdentity();
    // const { role  } = identity;

    const isAdmin = userRoles.admin.id === identity?.role.id;
    const isManager = userRoles.manager.id === identity?.role.id;
    const isMaster = userRoles.master.id === identity?.role.id;
    const isCourier = userRoles.courier.id === identity?.role.id;

    return { isAdmin, isManager, isMaster, isCourier };
}
