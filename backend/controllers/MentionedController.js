import Mentioned from "../models/MentionedModel.js";

export const getMentioned = async(req, res) =>{
    try {
        const response = await Mentioned.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getMentionedById = async(req, res) =>{
    try {
        const response = await Mentioned.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
