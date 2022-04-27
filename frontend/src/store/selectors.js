export const getResources = (state) => state.admin.resources;
export const getServicesList = (state) => getResources(state).service.data;
export const getServicesListTotal = (ids) => (state) => {
    // console.log('getServicesListTotal', ids);
    return Object.values(getServicesList(state))
        .filter((it) => ids.includes(it.id))
        .reduce((pr, cur) => pr + cur.sum, 0);
};
