import { reservations, getMinifiedItem } from "../../../utils/Airtable";

export default async (req, res) => {
    //Dati da ricevere e registrare
    const { name, email, date, time, reservation, meal, place, sub } = req.body;
    try {
        //Crea un nuovo recordo
        const newRecords = await reservations.create([{ fields: { name, email, date, time, reservation, meal, place, sub }}]);
        res.status(200).json(getMinifiedItem(newRecords[0]));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ko" });
    }
};