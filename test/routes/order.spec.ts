import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from './../../src/app';
import Order from './../../src/models/order';
import { OrderStatus } from './../../src/models/orderStatus';

chai.use(chaiHttp);
const expect = chai.expect;

const order: Order = {
    id: 1,
    userId: 10,
    // tslint:disable-next-line:object-literal-sort-keys
    quantity: 1,
    shipDate: new Date(),
    status: OrderStatus.Placed,
    complete: true
};

describe('orderRoute', () => {
    it('should respond with status 404 because there is no order', async () => {
        return chai
            .request(app)
            .get(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });
    it('should create a new order and retrieve it back', async () => {
        return chai
            .request(app)
            .post(`/store/orders`)
            .send(order)
            .then(res => {
                expect(res.status).to.be.equal(201);
                expect(res.body.id).to.be.equal(order.id);
                expect(res.body.userId).to.be.equal(order.userId);
                expect(res.body.complete).to.be.equal(order.complete);
            });
    });
    it('should return the order created on the step before', async () => {
        return chai
            .request(app)
            .get(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body.id).to.be.equal(order.id);
                expect(res.body.status).to.be.equal(order.status);
            });
    });
    it('should return the inventory for all users', async () => {
        return chai
            .request(app)
            .get('/store/inventory')
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body[20].length).to.be.equal(1);
            });
    });
    it('should remove an existing order', async () => {
        return chai
            .request(app)
            .delete(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
    });
    it('should return 404 when it is trying to remove an order because the order doesn\'t exist', async () => {
        return chai
            .request(app)
            .delete(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });
});
