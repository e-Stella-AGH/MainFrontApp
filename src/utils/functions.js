import {filterTypes} from "./Enums";

export const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const getFilterValueByType = (filters, filterType) =>
    filters?.find(filter => filter.type === filterType)?.value

export const createFilterFunction = (filter) => {
    switch (filter.type) {
        case filterTypes.MIN_SALARY:
            return (arg) => arg.minSalary >= filter.value
        case filterTypes.MAX_SALARY:
            return (arg) => arg.maxSalary <= filter.value
        default:
            return () => true
    }
}
