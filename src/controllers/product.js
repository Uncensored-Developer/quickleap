const typedi = require('typedi');
const uid = require('rand-token').uid
const slugify = require('slugify');
const Util = require('../utils/utils');
const productService = require('../services/product');
const productInfoService = require('../services/productInfo');
const BaseController = require('./base');
const getMaxMarkedUpProductPrice = require('../utils/helpers').getMaxMarkedUpProductPrice;


const util = new Util();


module.exports = class ProductController {

    static get productService() { return typedi.Container.get(productService); }
    static get productInfoService() { return typedi.Container.get(productInfoService); }

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
        const results = await ProductController.baseController.fetch(req, res, ['updatedAt'], true);
        const getProducts = async () => {
            let products = []
            for (let product of results) {
                products.push({
                    name: product.name,
                    slug: product.slug,
                    uuid: product.uuid,
                    price: await getMaxMarkedUpProductPrice(product.id, 'grade1')
                });
            }

            return products
        }
        if (results.length > 0) {
            const msg = 'Products Retrieved.'
            util.setSuccess(200, msg, await getProducts());
        } else {
            const msg = 'No Products found.';
            util.setSuccess(200, msg);
        }
        return util.send(res);
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
                createdAt: product.createdAt,
                prices: await getMaxMarkedUpProductPrice(product.id)
            };
            util.setSuccess(200, msg, data)
        }
        return util.send(res);
    }

};
