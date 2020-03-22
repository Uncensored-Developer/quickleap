module.exports = (function () {

    let params = (req) => {
        let y = {
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

    let checkForInvalidFilter = (allowed_filters, filters, util_instance, res) => {
        for (const key of Object.keys(filters)) {
          if (!allowed_filters.includes(key)) {
              const msg = `invalid filter '${key}'.`;
              util_instance.setError(400, msg);
              return util_instance.send(res)
          }
      }
    };

    return {
        getParams: params,
        checkForInvalidFilter: checkForInvalidFilter,
    }

})();
