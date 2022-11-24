import { table, getMinifiedItem } from "../../../utils/Airtable";

export default async (req, res) => {

  const { 
    name, 
    email, 
    date, 
    time, 
    reservation, 
    meal, 
    place,
    sub,  
   } = req.body;

    try {

        const newRecords = await table.create([{ fields: { 
            name, 
            email, 
            date, 
            time, 
            reservation, 
            meal, 
            place,
            sub
        }}]);
            
        res.status(200).json(getMinifiedItem(newRecords[0]));

    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: "ko" });
        
    }

};