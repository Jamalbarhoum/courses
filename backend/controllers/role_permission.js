const {pool} = require("../models/db")

const CreateRolePermission = (req,res)=>{
    const {role_id,permission_id} = req.body
    const query = `INSERT INTO role_permission (role_id,permission_id) VALUES ($1,$2) RETURNING *`
    const value = [role_id,permission_id]
    pool.query(query,value).then((result)=>{
        res.status(201).json({
            success:true,
            message:"Create new Role Permission",
            result:result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server error",
            error:err
        })
    })
}

const allRolePermission = (req,res)=>{

    const query = `SELECT * FROM role_permission`


    pool.query(query).then((result)=>{
        res.status(200).json({
            success:true,
            message:"all Role Permission",
            result:result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:err
        })
    })





}

module.exports = {CreateRolePermission,allRolePermission}