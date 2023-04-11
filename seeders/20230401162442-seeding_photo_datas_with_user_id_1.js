'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Photos', [{
      title : "Foto Pertama milik user id 1",
      caption : "Ini adalah foto pertama milik user id 1",
      image_url : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fid-id%2Ffoto%2Ffot",
      UserId : 1,
      createdAt : new Date(),
      updatedAt : new Date()
   },{
      title : "Foto Kedua milik user id 1",
      caption : "Ini adalah foto kedua milik user id 1",
      image_url : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fid-id%2Ffoto%2Ffot",
      UserId : 1,
      createdAt : new Date(),
      updatedAt : new Date()
   },{
      title : "Foto Ketiga milik user id 1",
      caption : "Ini adalah foto ketiga milik user id 1",
      image_url : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fid-id%2Ffoto%2Ffot",
      UserId : 1,
      createdAt : new Date(),
      updatedAt : new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
