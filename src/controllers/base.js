const Util = require('../utils/utils');
const helpers = require('../utils/helpers');


const util = new Util();


module.exports = class BaseController {

  constructor(service, noun, image_service) {
      this.service = service;
      this.noun = noun;
      this.image_service = image_service;
  }


  async update(req, res) {
    const {id} = req.params;
    const images = req.body.images;
    
    if (!Number(id)) {
        const msg = 'Please input a valid numeric id.';
        util.setError(400, msg);
        return util.send(res);
    }
    const obj = await this.service.get({id: id});

    if (!obj) {
        const msg = `${this.noun} not found.`;
        util.setError(404, msg);
    } else {
        if (obj.UserId !== req.user.id) {
            const msg = `You are not permitted to update this ${this.noun}.`;
            util.setError(403, msg);
            return util.send(res);
        }

        delete req.body.images;

        const updatedObj = await this.service.update({id: id}, req.body);
        if (this.image_service) {
            // save attached images
            let img_arr = []
            for (const img of images) {
                const key = `${this.noun}Id`;
                img_arr.push({[key]: id, image: img})
            }
            const saved_images = await this.image_service.create(img_arr);
            if (saved_images.length == 0) {
                const msg = `Images not saved.`;
                util.setError(400, msg);
                return util.send(res);
            }
            img_arr = []
            for (const img of saved_images) {
                img_arr.push({id: img.id, image: img.image})
            }

            updatedObj.images = img_arr
            
        }
        const msg = `${this.noun} updated.`;
        util.setSuccess(200, msg, updatedObj);
    }

    return util.send(res);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
        const msg = 'Please input a valid numeric id.';
        util.setError(400, msg);
        return util.send(res);
    }
    const obj = await this.service.get({ id: id });

    if (!obj) {
        const msg = `${this.noun} not found.`;
        util.setError(404, msg);
    } else {
        if (obj.UserId !== req.user.id) {
            const msg = `You are not permitted to update this ${this.noun}.`;
            util.setError(403, msg);
            return util.send(res);
        }

        delete req.body.images;

        await this.service.delete({ id: id });
        
        const msg = `${this.noun} removed.`;
        util.setSuccess(204, msg, {});
    }

    return util.send(res);
  }

  async fetch(req, res, exclude, return_results) {
    const params = helpers.getParams(req);

    const allowed_filters = await this.service.get_attrs();

    helpers.checkForInvalidFilter(allowed_filters, params.fields, util, res);

    params.exclude = exclude;
    const results = await this.service.fetch(params);

    if(!return_results) {
        if (results.length > 0) {
            const msg = `${this.noun}s retrieved.`;
            util.setSuccess(200, msg, results)
        } else {
            const msg = `No ${this.noun}s found.`;
            util.setSuccess(200, msg);
        }
        return util.send(res);
    }
    return results
  }

  async get(req, res) {
      const {id} = req.params;

      if (!Number(id)) {
          const msg = 'Please input a valid numeric value';
          util.setError(400, msg);
          return util.send(res);
      }

      const farmer = await this.service.get({id: id});
      if (!farmer) {
          const msg = `${this.noun} not found.`;
          util.setError(404, msg);
      } else {
          if (this.image_service) {
            //   fetch and attach related images to results
            const images = await this.image_service.fetch(id);
            let img_arr = []
            for (const img of images) {
                img_arr.push({ id: img.id, image: img.image })
            }
            
            farmer.dataValues.images = img_arr;
          }

          const msg = `${this.noun} found.`;
          util.setSuccess(200, msg, farmer)
      }
      return util.send(res);
  }

};
