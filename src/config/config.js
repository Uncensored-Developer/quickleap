module.exports = {
  "development": {
    "username": "postgres",
    "password": "terragon",
    "database": "quickleap",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "postgres",
    "password": "terragon",
    "database": "quickleap_test",
    "host": "localhost",
    "dialect": "postgresql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
// {
//   development: {
//     dialect: 'postgres'
//   }
// }
