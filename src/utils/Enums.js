export const filterTypes = {
    MIN_SALARY: "Minumum Salary",
    MAX_SALARY: "Maximum Salary",
    COMPANY_NAME: "Company Name",
    POSITION_NAME: "Position Name",
}

const compare = (a, b, name) => {
    if(a[name] < b[name]) return 1
    if(a[name] > b[name]) return -1
    return 0
}
export const offerSort = {
    HIGH_SALARY: {
        name: "Highest Salary",
        apply: offers => offers.sort((a, b) => compare(a, b, "minSalary"))
    },
    LOW_SALARY: {
        name: "Lowest Salary",
        apply: offers => offers.sort((a, b) => -compare(a, b, "maxSalary"))
    },
    NAME: {
        name: "Name",
        apply: offers => offers.sort((a, b) => -compare(a, b, "name"))
    }
}

export const userTypes = {
    JOB_SEEKER: "job_seeker",
    HR: "hr",
    ORGANIZATION: "organization"
}