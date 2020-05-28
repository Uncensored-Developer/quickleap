const typedi = require('typedi');
const config = require('../config');
const productInfoService = require('../services/productInfo');


module.exports = (function () {

    const params = (req) => {
        const y = {
            limit: req.query.limit || 10,
            offset: req.query.offset || undefined,
            order_by: req.query.order_by || 'id',
            sort: req.query.sort || 'ASC',
            fields: {}
        };


        for (const key of Object.keys(req.query)) {
            if (!Object.keys(y).includes(key)) {
                y.fields[key] = req.query[key];
            }
        }
        return y
    };

    const checkForInvalidFilter = (allowed_filters, filters, util_instance, res) => {
        for (const key of Object.keys(filters)) {
          if (!allowed_filters.includes(key)) {
              const msg = `invalid filter '${key}'.`;
              util_instance.setError(400, msg);
              return util_instance.send(res)
          }
      }
    };

    const getMarkedUpPrice = (price) => {
        const percent = config.markUp.product / 100;
        return price + (percent * price);
    }

    const getMaxMarkedUpProductPrice = async (ProductId, productGrade) => {
        const productInfoServiceInstance = typedi.Container.get(productInfoService);
        console.log('OOOO')
        const grade = productGrade || 'grade1';
        const filter = {
            limit: 1,
            offset: undefined,
            order_by: 'price',
            sort: 'DESC',
            fields: {
                ProductId,
                grade
            }
        };
        const results = await productInfoServiceInstance.fetch(filter);
        if (productGrade) {   
            return (results.length > 0) ? getMarkedUpPrice(results.pop().price) : null
        } else {
            filter.fields.grade = 'grade2';
            const grade2MaxPrice = await productInfoServiceInstance.fetch(filter);
            filter.fields.grade = 'grade3';
            const grade3MaxPrice = await productInfoServiceInstance.fetch(filter);
            filter.fields.grade = 'export';
            const exportGradeMaxPrice = await productInfoServiceInstance.fetch(filter);

            return {
                export: (exportGradeMaxPrice.length > 0) ? getMarkedUpPrice(exportGradeMaxPrice.pop().price) : null,
                grade1: (results.length > 0) ? getMarkedUpPrice(results.pop().price) : null,
                grade2: (grade2MaxPrice.length > 0) ? getMarkedUpPrice(grade2MaxPrice.pop().price) : null,
                grade3: (grade3MaxPrice.length > 0) ? getMarkedUpPrice(grade3MaxPrice.pop().price) : null
            }
        }
    }

    return {
        getMarkedUpPrice,
        checkForInvalidFilter,
        getMaxMarkedUpProductPrice,
        getParams: params,
    }

})();
