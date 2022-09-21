const knex = require('../models/connection');

module.exports = {
    async readAll(req, res){
      const allData = await knex('info')
        .select('*');
  
      return res.json(allData);
      },
    
    async insertData(req) {
      try {
        const { ocv, corrente, soc, soh, timestamp } = req;
        const data = await knex('info')
          .insert({
            ocv: ocv,
            corrente: parseFloat(corrente),
            soc: parseFloat(soc),
            soh: parseFloat(soh),
            timestamp: parseFloat(timestamp),
          });
  
      } catch (error) {
        console.log(error);
      }
    },
    
    async readLast(req, res){
      const row = await knex('info')
        .first('*')
        .orderBy('id', 'desc')
  
      return res.json(row);
    }
  }