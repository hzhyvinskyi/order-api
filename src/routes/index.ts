import { Application, NextFunction, Request, Response } from 'express';

export class Index {
    public routes(app: Application): void {
        app.route('/index').get((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({ status: 'success' });
        });
    }
}
