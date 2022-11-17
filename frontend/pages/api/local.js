export const restaurantOption = {
    placesAvailableInside: 12, //Posti disponibili all'interno
    placesAvailableOutside: 8, //Posti disponibili all'esterno
    openTimeTest: {
        lunch: {
            start: '12:30',
            finish: '14:00'
        },
        dinner: {
            start: '19:00',
            finish: '22:00'
        },
    },
    openTime: [
        {
            hour: 12,
            minute: 30,
            meal: 1
        },
        {
            hour: 13,
            minute: 0
        },
        {
            hour: 13,
            minute: 30
        },        
        {
            hour: 14,
            minute: 0
        },
        {
            hour: 14,
            minute: 30
        },
        {
            hour: 19,
            minute: 0
        },
        {
            hour: 19,
            minute: 30
        },
        {
            hour: 20,
            minute: 0
        },
        {
            hour: 20,
            minute: 30
        },
        {
            hour: 21,
            minute: 0
        },
        {
            hour: 21,
            minute: 30
        },
        {
            hour: 22,
            minute: 0
        },
    ]
}

export const reservationsData = [
    {
        giorno: '2022-11-16',
        pasto: 0,
        posti: 2,
        luogo: 1,
    },
    {
        giorno: '2022-11-16',
        pasto: 0,
        posti: 6,
        luogo: 1,
    }
];

export const mealData = [
    {
        id: 0,
        time: "Pranzo",
    },
    {
        id: 1,
        time: "Cena",
    }
];

export const placeData = [
    {
        id: 0,
        time: "Interno",
    },
    {
        id: 1,
        time: "Esterno",
    }
];

export const newsletterData = [
    {
        id: "newsletter",
        label: "Newsletter",
        value: 1,
        description: "Iscriviti alla newsletter"
    }
];

export const privacyData = [
    {
        id: "privacy",
        label: "Privacy",
        value: 1,
        description: "Accetta la privacy policy"
    }
];