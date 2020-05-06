const typedi = require('typedi');
const Util = require('../utils/utils');
const productService = require('../services/product');
const cartService = require('../services/cart');
const BaseController = require('./base');


const util = new Util();


module.exports = class CartController {

    static get productService() { return typedi.Container.get(productService); }
    static get cartService() { return typedi.Container.get(cartService); }

    static get baseController() {
        return new BaseController(CartController.cartService, 'Cart');
    }

    static async create(req, res) {
        const PRODUCT = await CartController.productService.get({ uuid: req.body.productUUID });
        const CART_ITEM = await CartController.cartService.get({
            ProductId: PRODUCT.id,
            UserId: req.user.id
        });
        if (!PRODUCT) {
            const msg = `Product not found.`;
            util.setError(404, msg);
        } else if(CART_ITEM) {
            const msg = `Product already in cart.`;
            util.setError(400, msg);
        } else {
            const data = {
                ProductId: PRODUCT.id,
                UserId: req.user.id,
                quantity: req.body.quantity,
            }

            const cart = await CartController.cartService.create(data);
            const msg = 'Added to cart.';
            util.setSuccess(201, msg, cart);
        }
        return util.send(res);
    }

    static async update(req, res) {
        return CartController.baseController.update(req, res);
    }

    static async fetch(req, res) {
        return CartController.baseController.fetch(req, res, ['id', 'updatedAt']);
    }

    static async get(req, res) {

    }

};
