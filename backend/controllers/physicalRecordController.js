const pool = require('../config/db.config');

// Create a new physical record
const createPhysicalRecord = async (req,res)=>{
   const {child_id,hospital_id,height,width ,check_up_date,bmi} = req.body;

   try{
       const[result]=await pool.execute(
           'INSERT INTO physical_record(child_id,hospital_id,height,width ,check_up_date,bmi ) VALUES (?, ?, ?, ?,?,?)',
           [child_id,hospital_id,height,width ,check_up_date,bmi]
       );

       res.status(201).json({message:'Physical Record added successfully',id:result.insertId});
   }catch(error){
       console.error('Error adding physical record:',error);
       res.status(500).json({error:'An error occurred while adding the physical record.'});
   }
};

// Get all physical records
const getAllPhysicalRecords=async(req,res)=>{
   try{
       const[rows]=await pool.execute('SELECT * FROM physical_record');
       res.status(200).json(rows);
   }catch(error){
       console.error('Error fetching physical records:',error);
       res.status(500).json({error:'An error occurred while fetching physical records.'});
   }
};

// Update a physical record
const updatePhysicalRecord=async(req,res)=>{
   const{physical_id}=req.params;
   const{child_id,hospital_id,height,width ,check_up_date,bmi}=req.body;

   try{
       const[result]=await pool.execute(
           'UPDATE physical_record SET child_id=?,hospital_id=?,height=?,width=?,check_up_date=?,bmi=? WHERE physical_id=?',
           [child_id,hospital_id,height,width ,check_up_date,bmi ,physical_id]
       );

       if(result.affectedRows===0)return res.status(404).json({error:'Physical Record not found'});

       res.json({message:'Physical Record updated successfully'});
   }catch(error){
       console.error('Error updating physical record:',error);
       res.status(500).json({error:'An error occurred while updating the physical record.'});
   }
};

// Delete a physical record
const deletePhysicalRecord=async(req,res)=>{
   const{physical_id}=req.params;

   try{
       const[result]=await pool.execute('DELETE FROM physical_record WHERE physical_id=?',[physical_id]);

       if(result.affectedRows===0)return res.status(404).json({error:'Physical Record not found'});

       res.json({message:'Physical Record deleted successfully'});
   }catch(error){
       console.error('Error deleting physical record:',error);
       res.status(500).json({error:'An error occurred while deleting the physical record.'});
   }
};

module.exports={createPhysicalRecord,getAllPhysicalRecords ,updatePhysicalRecord ,deletePhysicalRecord};
