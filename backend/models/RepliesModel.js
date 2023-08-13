import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Replies = db.define('replies',{
    bank: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    usernameID: DataTypes.STRING,
    reply: DataTypes.STRING,
    replyID: DataTypes.STRING,
    dateTime: DataTypes.STRING,
    rt: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,	
    sentiment: DataTypes.STRING,	
    replyURL: DataTypes.STRING,
    tweetID: DataTypes.STRING,
    tweetURL: DataTypes.STRING
},{
    freezeTableName:true
});

export default Replies;

(async()=>{
    await db.sync();
})();