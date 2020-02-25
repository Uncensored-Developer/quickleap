const database = require('./models');


async function migrateDB(sequelize) {
  await sequelize.sync({alter: true})
    .then(
      ()=>{console.log('DB MIGRATED!!!')}
    )
    .catch(
      (err)=>{console.log(`ERROR: ${err}`)}
    )
}

migrateDB(database.sequelize);
