import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { default as Order } from './../models/order';
import { OrderStatus } from './../models/orderStatus';

let orders: Array<Order> = [];

export const getOrder = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const order = orders.find(obj => obj.id === id);
    const httpStatusCode = order ? 200 : 404;
    return res.status(httpStatusCode).send(order);
};

export const addOrder = (req: Request, res: Response, next: NextFunction) => {
    const order: Order = {
        id: Math.floor(Math.random() * 100) + 1,
        userId: req.body.userId,
        // tslint:disable-next-line:object-literal-sort-keys
        quantity: req.body.quantity,
        shipDate: req.body.shipDate,
        status: OrderStatus.Placed,
        complete: false
    };

    orders.push(order);
    return res.status(201).send(order);
};

export const removeOrder = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const orderIndex = orders.findIndex(item => item.id === id);

    if (orderIndex === -1) {
        return res.status(404).send();
    }

    orders = orders.filter(item => item.id !== id);
    return res.status(204).send();
};

export const getInventory = (req: Request, res: Response, next: NextFunction) => {
    const grouppedOrders = _.groupBy(orders, 'userId');
    return res.status(200).send(grouppedOrders);
};
