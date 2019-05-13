import * as bodyParser from 'body-parser';
import express from 'express';
import { ApiRoute } from './routes/api';
import { OrderRoute } from './routes/order';
import { UserRoute } from './routes/user';

class App {
    public app: express.Application;
    private apiRoutes: ApiRoute = new ApiRoute();
    private orderRoutes: OrderRoute = new OrderRoute();
    private userRoutes: UserRoute = new UserRoute();

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.apiRoutes.routes(this.app);
        this.orderRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
    }
}

export default new App().app;
