import { table, getMinifiedItem } from "../../../utils/Airtable";

export default async (req, res) => {
    //Aggiorno lo stato della prenotazione a 1
    const { id } = req.body;
    try {
        const updatedRecords = await table.update([{ 
            "id": id,
            "fields": {
                "state": "1"
            }
        }]);
        res.status(200).json(getMinifiedItem(updatedRecords[0]));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ko" });
    }
};