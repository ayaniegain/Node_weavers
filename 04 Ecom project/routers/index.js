import  express from 'express'
const router = express.Router(); //shall i need to import router where it is use?

import v1router from "./v1/index.js";

router.use('/v1',v1router)

export default router
