import { Router } from 'express';
import teamsRouter from './teams.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);


export default router;
