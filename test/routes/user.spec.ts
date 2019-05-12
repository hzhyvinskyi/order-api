import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from './../../src/app';
import User from './../../src/models/user';

chai.use(chaiHttp);
const expect = chai.expect;

const user: User = {
    id: Math.floor(Math.random() * 100) + 1,
    username: 'JamesSWER',
    // tslint:disable-next-line:object-literal-sort-keys
    firstName: 'James',
    lastName: 'Doe',
    email: 'saaweow@mail.com',
    password: 'secret',
    phone: '1512521858211',
    userStatus: 1
}

describe('userRoute', () => {
    it('should respond with 404 status because there is no user', async () => {
        return chai
            .request(app)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });
    it('should create a new user and retrieve it back', async () => {
        return chai
            .request(app)
            .post('/users')
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(201);
                expect(res.body.username).to.be.equal(user.username);
            });
    });
    it('should return the user created on the step before', async () => {
        return chai
            .request(app)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body.username).to.be.equal(user.username);
            });
    });
    it('should update the user James', async () => {
        user.username = 'JamesAjatn Updated',
        user.firstName = 'James Updated',
        user.lastName = 'Doe Updated',
        user.email = 'pskatjnkta@updated.com',
        user.password = 'secret',
        user.phone = '235883275025',
        user.userStatus = 12
        return chai
            .request(app)
            .patch('/users/James')
            .send(user)
            .then(res => {
                expect(res.status).to.be.equals(204);
            });
    });
    it('should return the user updated on the step before', async () => {
        return chai
            .request(app)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body.username).to.be.equal(user.username);
                expect(res.body.firstName).to.be.equal(user.firstName);
                expect(res.body.lastName).to.be.equal(user.lastName);
                expect(res.body.email).to.be.equal(user.email);
                expect(res.body.password).to.be.equal(user.password);
                expect(res.body.phone).to.be.equal(user.phone);
                expect(res.body.userStatus).to.be.equal(user.userStatus);
            });
    });
    it('should return 404 because user does not exist', async () => {
        return chai
            .request(app)
            .patch(`/users/Mike`)
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });
    it('should remove an existent user', async () => {
        return chai
            .request(app)
            .delete(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
    });
    it('should return 404 when it is trying to remove an user because the user doesn\'t exist', async () => {
        return chai
            .request(app)
            .delete(`/users/Mike`)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });
});
