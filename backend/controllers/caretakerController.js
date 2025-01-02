const pool=require('../config/db.config');

// Create a new caretaker
const createCaretaker=async(req,res)=>{
     // Destructure fields from request body.
     const{ct_name ,role ,gender ,ct_contact ,qualification,hospital_id}=req.body;

     try{
         // Insert into caretaker table.
         const[result]=await pool.execute(
             'INSERT INTO care_taker(ct_name ,role ,gender ,ct_contact ,qualification,hospital_id ) VALUES (?, ?, ?, ?,?,?)',
             [ct_name ,role ,gender ,ct_contact ,qualification,hospital_id]
         );

         // Respond with success message.
         return(res.status(201)).send(`Caretaker ${ct_name} added successfully.`);
     }catch(err){
         console.error(err); // Log any errors.
         return(res.sendStatus(500)); // Respond with internal server status.
     }
};

// Get all caretakers
const getAllCaretakers=async(req,res)=>{
     try{
         // Execute query to fetch all caretakers.
         let[rows]=await pool.query("SELECT * FROM care_taker");
         return(res.json(rows)); // Return fetched rows as JSON response.
     }catch(err){
         console.error(err); // Log any errors.
         return(res.sendStatus(500)); // Respond with internal server status.
     }
};

// Update a caretaker's details
const updateCaretaker=async(req,res)=>{
     // Destructure caretaker ID from request parameters and other fields from body.
     let{ct_name}=req.body;
     let{ctid}=req.params;

     try{
         // Execute query to update caretaker details.
         let[result]=await pool.query("UPDATE care_taker SET ct_name=? WHERE ctID=?", 
             [ct_name], 
             [ctid]
         );

         // Check if any row was affected; respond accordingly.
         if(result.affectedRows===0)
             return(res.sendStatus(404)); // Not found status.
         
         return(res.send(`Caretaker ${ctid} updated successfully.`)); // Success message.
     }catch(err){
         console.error(err); // Log any errors.
         return(res.sendStatus(500)); // Respond with internal server status.
     }
};

// Delete a caretaker's details
const deleteCaretaker=async(req,res)=>{
     let{ctid}=req.params; // Extract caretaker ID from parameters.

     try{
         let[result]=await pool.query("DELETE FROM care_taker WHERE ctID=?", 
             ctid 
         );

         if(result.affectedRows===0)
             return(res.sendStatus(404)); // Not found status.

         return(res.send(`Caretaker ${ctid} deleted successfully.`)); // Success message.
     }catch(err){
         console.error(err); // Log any errors.
         return(res.sendStatus(500)); // Respond with internal server status.
     }
};

module.exports={createCaretaker,getAllCaretakers ,updateCaretaker ,deleteCaretaker};
