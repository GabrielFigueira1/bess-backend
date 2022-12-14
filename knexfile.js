module.exports = {

    development: {
        client: 'mysql2',
        connection: {
          host: '127.0.0.1',
          database: 'bess',
          user: 'root',
          password: 'root'
        },
        pool: {
        min: 2,
        max: 10
        },
        useNullAsDefault: true,
      },

  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  
  };
