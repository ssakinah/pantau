import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Tweets = db.define('tweets',{
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

export default Tweets;

(async()=>{
    await db.sync();
})();