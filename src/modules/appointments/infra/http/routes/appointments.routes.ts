import { Router } from 'express';

import endureAuthenticated from '@modules/users/infra/http/middlewares/endureAuthenticated';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(endureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
