export const offers = [
    {
        id: 20,
        name: "Centurion",
        description: "Join IX Legion. Join conquering the Great Britain",
        position: "Centurion",
        minSalary: 10000,
        maxSalary: 25000,
        organization: {
            name: "Pega"
        },
        skills: [
            {
                id: 15,
                level: "MASTER",
                name: "Throw pillum"
            },
            {
                id: 14,
                level: "MASTER",
                name: "Looting",
            }
        ]
    },
    {
        id: 18,
        name: "Project Manager",
        description: "Be manager of your life",
        position: "Senior developer Java",
        minSalary: 15000,
        maxSalary: 25000,
        organization: {
            name: "Qualtrics"
        },
        skills: [
            {
                id: 15,
                level: "MASTER",
                name: "Throw pillum"
            },
            {
                id: 14,
                level: "MASTER",
                name: "Looting",
            }
        ]
    },
    {
        id: 17,
        name: "Senior developer Java",
        description: "Master Java developer",
        position: "Senior developer Java",
        minSalary: 25000,
        maxSalary: 30000,
        organization: {
            name: "Pega"
        },
        skills: [
            {
                id: 15,
                level: "MASTER",
                name: "Throw pillum"
            },
            {
                id: 14,
                level: "MASTER",
                name: "Looting",
            }
        ]
    },
    {
        id: 16,
        name: "Software Engineer Intern",
        description: "The best offer of your live",
        position: "Software Engineer Intern",
        minSalary: 3000,
        maxSalary: 3500,
        organization: {
            name: "Qualtrics"
        },
        skills: [
            {
                id: 15,
                level: "MASTER",
                name: "Throw pillum"
            },
            {
                id: 14,
                level: "MASTER",
                name: "Looting",
            }
        ]
    }
]

export const getApplications = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "id": 72,
                "applicationDate": "2021-08-04",
                "status": "IN_PROGRESS",
                "stage": {"id": 40, "type": "ENDED"},
                "jobSeeker": {
                    "id": 71,
                    "user": {"id": 71, "firstName": "Dawid", "lastName": "Dębowski", "mail": "test@test.com"}
                },
                "seekerFiles": [],
                "offerName": "Centurion",
                "stages": []
            },
            {
                "id": 92,
                "applicationDate": "2021-08-10",
                "status": "ACCEPTED",
                "stage": {"id": 88, "type": "APPLIED"},
                "jobSeeker": {
                    "id": 89,
                    "user": {"id": 89, "firstName": "Dawid", "lastName": "Dębowski", "mail": "test@test.testcom"}
                },
                "seekerFiles": [],
                "offerName": "Centurion",
                "stages": []
            }
        ])
    })
}