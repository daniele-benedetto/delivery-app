import { reservations } from "../../../utils/Airtable";

export default async (req, res) => {
    //Elimina prenotazione tramite id
    const { id } = req.body;
    try {
        const deletedRecords = await reservations.destroy([id]);
        res.status(200).json(deletedRecords);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ko" });
    }
};