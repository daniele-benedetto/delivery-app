export const restaurantOption = {
    placesAvailableInside: 12, 
    placesAvailableOutside: 8,
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
}

export const reservationsData = [
    {
        giorno: '2022-11-19',
        pasto: 0,
        posti: 2,
        luogo: 1,
    },
    {
        giorno: '2022-11-19',
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