import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import postRouter from './post.route';
import categoryRouter from './category.route';

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
    {
        path: '/posts',
        route: postRouter,
    },
    {
        path: '/categories',
        route: categoryRouter,
    },
];

defaultRoutes.forEach((route) => {
    appRouter.use(route.path, route.route);
});

export default appRouter;
