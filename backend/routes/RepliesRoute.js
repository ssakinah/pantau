import express from "express";
import {getReplies, getRepliesById} from "../controllers/RepliesController.js";

const router = express.Router();

router.get('/replies', getReplies);
router.get('/replies/:id', getRepliesById);


// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;