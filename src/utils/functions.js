import {filterTypes} from "./Enums";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';

export const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
        default:
            return () => true
    }
}

export const filterOffers = (offers, filters) => {
    let tmpOffers = offers
    filters.forEach(filter => {
        tmpOffers = tmpOffers.filter(offer => (createFilterFunction(filter))(offer))
    })
    return tmpOffers
}

export const getIconFromFilterType = (filter) => {
    switch (filter.type) {
        case filterTypes.MIN_SALARY:
            return <MonetizationOnIcon />
        case filterTypes.MAX_SALARY:
            return <MonetizationOnIcon />
        case filterTypes.COMPANY_NAME:
            return <BusinessIcon />
        case filterTypes.POSITION_NAME:
            return <PersonIcon />
        default:
            return null
    }
}