module.exports = class BaseService {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
          return await this.model.create(data);
        } catch (e) {
          throw e;
        }
    }

    async bulkCreate(data_list) {
        try {
          return await this.model.bulkCreate(data_list);
        } catch (e) {
          throw e;
        }
    }

    async get(query) {
        try {
          return await this.model.findOne({
            where: query
          });
        } catch (e) {
          throw e;
        }
    }

    async fetch({limit, offset, order_by, sort, fields, exclude}) {
        let param = {
          offset: offset, limit: limit,
          order: [
              [order_by, sort.toUpperCase()],
              // [{model: 'Farmer', as: 'Farmer'}, 'id', sort || 'ASC']
          ]
        };
        if (fields) {
          param.where = fields;
        }
        if (exclude) {
          param.attributes = {exclude: exclude};
        }
        try {
          return await this.model.findAll(param);
        } catch (e) {
          throw e;
        }
    }

    async update(query, data) {
        try {
          await this.model.update(data, {where: query});
          return data
        } catch (e) {
          throw e;
        }
    }

    async delete(query) {
        try {
          return await this.model.destroy({where: query});
        } catch (e) {
          throw e;
        }
    }

    async get_attributes() {
        return Object.keys(this.model.rawAttributes);
    }
};
