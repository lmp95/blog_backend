import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';

const appRouter = Router();

const defaultRoutes = [
    {
        path: '',
        route: authRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
];

defaultRoutes.forEach((route) => {
    appRouter.use(route.path, route.route);
});

export default appRouter;
