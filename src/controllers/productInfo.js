const typedi = require('typedi');
const uid = require('rand-token').uid
const slugify = require('slugify');
const Util = require('../utils/utils');
const productService = require('../services/product');
const productInfoService = require('../services/productInfo');
const BaseController = require('./base');


const util = new Util();


module.exports = class ProductInfoController {

    static get productService() { return typedi.Container.get(productService); }
    static get productInfoService() { return typedi.Container.get(productInfoService); }

    static get baseController() {
        return new BaseController(ProductController.productService, 'Product');
    }

    static async create(req, res) {
        const PRODUCT = await ProductInfoController.productService.get({ uuid: req.body.productUUID });
        if (!PRODUCT) {
            const msg = `Product not found.`;
            util.setError(404, msg);
        } else {
            const data = {
                ProductId: PRODUCT.id,
                UserId: req.user.id,
                price: req.body.price,
                grade: req.body.grade,
                location: req.body.location,
                quantity: req.body.quantity,
                month: req.body.month,
                year: req.body.year || new Date().getFullYear()
            }

            const productInfo = await ProductInfoController.productInfoService.create(data);
            const msg = 'Product Info Added.';
            util.setSuccess(201, msg, productInfo);
        }
        return util.send(res);
    }

    static async update(req, res) {
        
    }

    static async fetch(req, res) {
        return ProductController.baseController.fetch(req, res, ['id', 'updatedAt']);
    }

    static async get(req, res) {
        
    }

};
