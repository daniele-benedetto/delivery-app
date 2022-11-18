export default async function handler(req, res) {
    
    const { name, surname, email, phone, date, time, reservation, meal, place, privacy, newsletter } = JSON.parse(req.body);

    if(
        !name ||
        !surname ||
        !email ||
        !phone ||
        !date ||
        !time ||
        !meal ||
        !place ||
        !reservation ||
        !privacy
    ) {
        return res.status(400).json({error: "Tentativo fallito"})
    }

    if(req.method != "POST") {
        return res.status(405).json({error: "Metodo non consentito"})
    }

    const request = await fetch('https://api.airtable.com/v0/appMbmvCneRCat1Cs/reservation', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({fields: {
            name, 
            surname, 
            email, 
            phone, 
            date, 
            time, 
            meal, 
            place, 
            reservation, 
            newsletter, 
            privacy
        }})
    });

    if(request.ok) {
        return res.status(200).json({data: "ok"});
    }
    
    return res.status(400).json({error: "ko"});

}