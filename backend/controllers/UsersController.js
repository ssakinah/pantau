import Users from "../models/UsersModel.js";

export const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async(req, res) =>{
    try {
        const response = await Users.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
