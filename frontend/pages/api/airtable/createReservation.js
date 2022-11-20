import { table, getMinifiedItem } from "../../../utils/Airtable";

export default async (req, res) => {

  const { 
    name, 
    surname, 
    email, 
    phone, 
    date, 
    time, 
    reservation, 
    meal, 
    place, 
    privacy, 
    newsletter 
   } = req.body;

    try {

        const newRecords = await table.create([{ fields: { 
            name, 
            surname, 
            email, 
            phone, 
            date, 
            time, 
            reservation, 
            meal, 
            place, 
            privacy, 
            newsletter 
        }}]);
            
        res.status(200).json(getMinifiedItem(newRecords[0]));

    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: "ko" });
        
    }

};