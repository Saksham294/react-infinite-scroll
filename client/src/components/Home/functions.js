
export const filterItems = (data, filters) => {
    return data.filter(item => {
        const roleFilter = filters.selectedRoles.length === 0 || filters.selectedRoles.includes(item.jobRole);
        const experienceFilter = (filters.selectedExperience.length === 0 ||
            (item.minExp >= Math.max(...filters.selectedExperience)));
        const remoteFilter = filters.selectedRemote.length === 0 || filters.selectedRemote.includes(item.location.toLowerCase());
        const minBasePayFilter = filters.selectedMinBasePay.length === 0 || item.minJdSalary >= Math.max(...filters.selectedMinBasePay);

        return roleFilter && experienceFilter && remoteFilter && minBasePayFilter;
    });
};