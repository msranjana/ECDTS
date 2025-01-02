const pool=require('../config/db.config');

// Create a new hospital entry
const createHospital=async(req,res)=>{
     let{hospital_name}=req.body; // Extract hospital name from request body.

     try{
         let[result]=await pool.query("INSERT INTO hospital(hospital_name) VALUES(?)", 
             hospital_name 
         );

         return(res.send(`Hospital ${hospital_name} added successfully.`)); // Success message.
     }catch(err){
         console.error(err); // Log any errors.
         return(res.sendStatus(500)); // Respond with internal server status.
     }
};

// Get all hospitals
const getAllHospitals=async(req,res)=>{
     try{
         let[rows]=await pool.query("SELECT * FROM hospital"); // Fetch all hospitals from database.
         
         return(res.json(rows)); // Return fetched rows as JSON response.
     }catch(err){
         console.error(err); // Log any errors.
         return(res.sendStatus(500)); // Respond with internal server status.
     }
};

// Update hospital details by ID
const updateHospital=async(req,res)=>{
     let{hospital_name}=req.body; 
     let{hospitalID}=req.params; 

     try{
         let[result]=await pool.query("UPDATE hospital SET hospital_name=? WHERE hospitalID=?", 
             [hospital_name], 
             [hospitalID]
         );

         if(result.affectedRows===0)
             return(res.sendStatus(404)); 

         return(res.send(`Hospital ${hospitalID} updated successfully.`));
     }catch(err){
         console.error(err); 
         return(res.sendStatus(500));
     }
};

// Delete hospital by ID
const deleteHospital=async(req,res)=>{
     let{hospitalID}=req.params; 

     try{
         let[result]=await pool.query("DELETE FROM hospital WHERE hospitalID=?", 
             hospitalID 
         );

         if(result.affectedRows===0)
             return(res.sendStatus(404));

         return(res.send(`Hospital ${hospitalID} deleted successfully.`));
     }catch(err){
         console.error(err); 
         return(res.sendStatus(500));
     }
};

module.exports={createHospital,getAllHospitals ,updateHospital ,deleteHospital};
