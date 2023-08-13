import Replies from "../models/RepliesModel.js";

export const getReplies = async(req, res) =>{
    try {
        const response = await Replies.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getRepliesById = async(req, res) =>{
    try {
        const response = await Replies.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// export const createUser = async(req, res) =>{
//     try {
//         await User.create(req.body);
//         res.status(201).json({msg: "Data Created"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const updateUser = async(req, res) =>{
//     try {
//         await User.update(req.body,{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Data Updated"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const deleteUser = async(req, res) =>{
//     try {
//         await User.destroy({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Data Deleted"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }