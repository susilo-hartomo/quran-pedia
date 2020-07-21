'use strict';
const { Bcryptjs } = require('../helpers/bcryptjs')
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users',
      [
        {
          username: 'John Doe',
          email: 'encus@mail.com',
          password: Bcryptjs.hashing('12345'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Doe',
          email: 'e@mail.com',
          password: Bcryptjs.hashing('12345'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 's',
          email: 's@mail',
          password: '12345',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
