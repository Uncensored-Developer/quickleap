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

    async get(id) {
        try {
          return await this.model.findOne({
            where: {id: id}
          });
        } catch (e) {
          throw e;
        }
    }

    async fetch({limit, offset, order_by, sort, fields}) {
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
        try {
          return await this.model.findAll(param);
        } catch (e) {
          throw e;
        }
    }

    async update(id, data) {
        try {
          await this.model.update(data, {where: {id: id}});
          return data
        } catch (e) {
          throw e;
        }
    }

    async delete(id) {
        try {
          return await this.model.destroy({where: {id: id}});
        } catch (e) {
          throw e;
        }
    }

    async get_attributes() {
        return Object.keys(this.model.rawAttributes);
    }
};
