const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min: 1991,
        max: v => { if (v > new Date().getFullYear()) throw new Error('Year is too big') }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}