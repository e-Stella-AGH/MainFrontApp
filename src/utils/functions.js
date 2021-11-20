import {filterTypes, operators} from "./Enums";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';

export const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

export const getFilterValueByType = (filters, filterType) =>
    filters?.find(filter => filter.type === filterType)?.value

const createFilterFunction = (filter) => {
    switch (filter.type) {
        case filterTypes.MIN_SALARY:
            return (arg) => arg.minSalary >= filter.value
        case filterTypes.MAX_SALARY:
            return (arg) => arg.maxSalary <= filter.value
        case filterTypes.COMPANY_NAME:
            if (filter.value) {
                return (arg) => arg.organization.name.toLowerCase().includes(filter.value.toLowerCase())
            } else {
                return () => true
            }
        case filterTypes.POSITION_NAME:
            if (filter.value) {
                return (arg) => arg.position.toLowerCase().includes(filter.value.toLowerCase())
            } else {
                return () => true
            }
        //add more for applications
        case filterTypes.TAGS:
            if (filter.value && filter.operator) {
                const filterTags = filter.value.map(tag => tag.toLowerCase())
                switch (filter.operator) {
                    case operators.AND:
                        return (arg) => arg.tags.length > 0 && filterTags.every(tag => arg.tags.map(innerTag => innerTag.toLowerCase()).includes(tag))
                    case operators.OR:
                        return (arg) => arg.tags.length > 0 && filterTags.some(tag => arg.tags.map(innerTag => innerTag.toLowerCase()).includes(tag))
                    default:
                        return () => true
                }
            } else {
                return () => true
            }
        case filterTypes.APPLICATION_STAGE:
            return filter.value ? (arg) => filter.value.includes(arg?.status) : () => true
        case filterTypes.PROCESS_STAGE:
            return filter.value ? (arg) => filter.value.includes(arg?.stage?.type) : () => true
        default:
            return () => true
    }
}

export const filterItems = (items, filters) => {
    let tmpItems = items
    filters.forEach(filter => {
        tmpItems = tmpItems.filter(item => (createFilterFunction(filter))(item))
    })
    return tmpItems
}

export const getIconFromFilterType = (filter) => {
    switch (filter.type) {
        case filterTypes.MIN_SALARY:
            return <MonetizationOnIcon id={`min-filter-icon`} />
        case filterTypes.MAX_SALARY:
            return <MonetizationOnIcon id={`max-filter-icon`} />
        case filterTypes.COMPANY_NAME:
            return <BusinessIcon id={`company-filter-icon`} />
        case filterTypes.POSITION_NAME:
            return <PersonIcon id={`position-filter-icon`} />
        default:
            return null
    }
}