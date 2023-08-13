import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    usernameID: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    accCreated: DataTypes.STRING,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER,	
    totalTweets: DataTypes.INTEGER,
    pfp: DataTypes.STRING
},{
    freezeTableName:true
});

export default Users;

(async()=>{
    await db.sync();
})();