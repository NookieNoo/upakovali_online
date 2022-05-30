export const getResources = (state) => state.admin.resources;
export const getServicesList = (state) => getResources(state).service.data;
export const getServicesListTotal = (ids) => (state) => {
    const servicesArray = Object.values(getServicesList(state));
    return ids.reduce((pr, cur) => {
        const service = servicesArray.find((it) => it.id === cur);
        return pr + (service?.sum || 0);
    }, 0);
};
