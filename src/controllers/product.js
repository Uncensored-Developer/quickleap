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
        const {uuid} = req.params;
        const PRODUCT = await ProductController.productService.get({ uuid });
        if (!PRODUCT) {
            const msg = `Product not found.`;
            util.setError(404, msg);
            return util.send(res);
        }

        const nameSlug = slugify(req.body.name, { lower: true });
        // let product = await ProductController.productService.get({ slug: nameSlug });
        // if (product) {
        //     const msg = `Product with this name already exists.`;
        //     util.setError(400, msg);
        // } else {
        const data = {
            name: req.body.name,
            slug: nameSlug,
            description: req.body.description,
            image: req.body.image,
            classification: req.body.classification,
        };
        let product = await ProductController.productService.update({uuid:uuid}, data);
        data.createdAt = product.createdAt;
        data.uuid = uuid;
        const msg = 'Product Updated.';
        util.setSuccess(201, msg, data);
        // }
        return util.send(res);
    }

    static async fetch(req, res) {
        return ProductController.baseController.fetch(req, res, ['id', 'updatedAt']);
    }

    static async get(req, res) {
        const { uuid } = req.params;
        const product = await ProductController.productService.get({ uuid: uuid });
        if (!product) {
            const msg = `Product not found.`;
            util.setError(404, msg);
        } else {
            const msg = `Product found.`;
            const data = {
                name: product.name,
                slug: product.slug,
                description: product.description,
                image: product.image,
                classification: product.classification,
                uuid: product.uuid,
                createdAt: product.createdAt
            };
            util.setSuccess(200, msg, data)
        }
        return util.send(res);
    }

};
