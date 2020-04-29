const typedi = require('typedi');
const uid = require('rand-token').uid
const slugify = require('slugify');
const Util = require('../utils/utils');
const productService = require('../services/product');
const BaseController = require('./base');


const util = new Util();


module.exports = class ProductController {

    static get productService() { return typedi.Container.get(productService); }

    static get baseController() {
        return new BaseController(ProductController.productService, 'Product');
    }

    static async create(req, res) {
        const nameSlug = slugify(req.body.name, { lower: true });
        let product = await ProductController.productService.get({slug: nameSlug});
        if (product) {
            const msg = `Product with this name already exists.`;
            util.setError(400, msg);
        } else {
            const data = {
                name: req.body.name,
                slug: nameSlug,
                description: req.body.description,
                image: req.body.image,
                classification: req.body.classification,
                uuid: uid(10).toLowerCase()
            };
            product = await ProductController.productService.create(data);
            data.createdAt = product.createdAt;
            const msg = 'Product Created.';
            util.setSuccess(201, msg, data);
        }
        return util.send(res);
    }

    static async update(req, res) {
        return ProductController.baseController.update(req, res);
    }

    static async fetch(req, res) {
        return ProductController.baseController.fetch(req, res);
    }

    static async get(req, res) {
        return ProductController.baseController.get(req, res);
    }

};
