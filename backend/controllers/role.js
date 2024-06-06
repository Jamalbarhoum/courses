
const {pool} =require("../models/db");



const createNewRole = (req,res)=>{
    const {role} = req.body
    console.log(role);
    const query = `INSERT INTO Roles (role) VALUES ('${role}') RETURNING *`
    pool.query(query).then((result)=>{
       res.status(201).json({
        successful:true,
        message:"Created new Role",
        result:result.rows
       })
    }).catch((err)=>{
      res.status(500).json({
        successful:false,
        message:"Error",
        err:err
      })
    })
}
const deleteRole = (req,res)=>{
    const {role_id} =req.body
    const query = `delete from Roles where id =${role_id}`

    pool.query(query).then((result)=>{
            console.log({true:"yes"});
            console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
}
const allRoles = (req,res)=>{
const query = `SELECT * FROM Roles`
pool.query(query).then((result)=>{
    res.status(200).json({
        success:true,
        result:result.rows
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"error",
            error:err
        })
    })
})
}


module.exports = {createNewRole,deleteRole,allRoles}