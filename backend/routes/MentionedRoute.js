import express from "express";
import {getMentioned, getMentionedById} from "../controllers/MentionedController.js";

const router = express.Router();

router.get('/mentioned', getMentioned);
router.get('/mentioned/:id', getMentionedById);


// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;