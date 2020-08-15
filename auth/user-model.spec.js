const db = require('../database/dbConfig');
const Users = require('./user-model');

describe('users model', () => {
    describe('add()', () => {

        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should insert the provided users into the DB', async () => {
            await Users.add({ username: 'anita1', password: 'passTheWord1' });
            await Users.add({ username: 'anita2', password: 'passTheWord2' });

            const users = await db('users');
            expect(users).toHaveLength(2);
        });

        // it('should return what was inserted', async () => {
        //     let user = await Users.add({ username: 'anita1', password: 'passTheWord1' });
        //     expect(user.username).toBe('anita1');

        //     user = await Users.add({ username: 'anita2', password: 'passTheWord2' });
        //     expect(user.username).toBe('anita2');
        // });
    });

    // describe('find()', () => {
    //     it('should get users from the DB', async () => {
    //         await Users.find('/');

    //         const users = await db('users');
    //         expect(res.status).toBe(201);
    //         // expect(users).toHaveLength(2);
    //     });
    // })
});