import { orders, getMinifiedItem } from "../../../utils/Airtable";

export default async (req, res) => {
    //Dati da ricevere e registrare
    const { name, email, products, address, delivery, date, time, total } = req.body;
    try {
        //Crea un nuovo recordo
        const newRecords = await orders.create([{ fields: { name, email, products, address, delivery, date, time, total }}]);    
        res.status(200).json(getMinifiedItem(newRecords[0]));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "ko" });  
    }
};