const database = require('./models');


async function dropTables(sequelize) {
  await sequelize.sync()
    .then(
      ()=>{sequelize.drop(); console.log('TABLES DROPPED!!')}
    )
    .catch(
      (err)=>{console.log(`ERROR: ${err}`)}
    )
}

dropTables(database.sequelize);
