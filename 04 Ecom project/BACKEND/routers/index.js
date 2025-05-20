import  express from 'express'
const router = express.Router(); 

import v1router from "./v1/index.js";

router.use('/v1',v1router)

export default router
