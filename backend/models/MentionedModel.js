import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Mentioned = db.define('mentioned',{
    bank: DataTypes.STRING,
    usernameID: DataTypes.STRING,
    username: DataTypes.STRING,
    tweets: DataTypes.STRING,
    tweetsID: DataTypes.STRING,
    dateTime: DataTypes.STRING,
    rt: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,	
    sentiment: DataTypes.STRING
},{
    freezeTableName:true
});

export default Mentioned;

(async()=>{
    await db.sync();
})();
