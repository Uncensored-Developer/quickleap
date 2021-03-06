const typedi = require('typedi');
const Util = require('../utils/utils');
const productService = require('../services/product');
const cartService = require('../services/cart');
const BaseController = require('./base');
const getMaxMarkedUpProductPrice = require('../utils/helpers').getMaxMarkedUpProductPrice;


const util = new Util();


module.exports = class CartController {

    static get productService() { return typedi.Container.get(productService); }
    static get cartService() { return typedi.Container.get(cartService); }

    static get baseController() {
        return new BaseController(CartController.cartService, 'Cart Item');
    }

    static async create(req, res) {
        const PRODUCT = await CartController.productService.get({ uuid: req.body.productUUID });
        const CART_ITEM = await CartController.cartService.get({
            ProductId: PRODUCT.id,
            grade: req.body.grade,
            UserId: req.user.id
        });
        if (!PRODUCT) {
            const msg = 'Product not found.';
            util.setError(404, msg);
        } else if(CART_ITEM) {
            const msg = 'Product already in cart.';
            util.setError(400, msg);
        } else {
            const data = {
                ProductId: PRODUCT.id,
                UserId: req.user.id,
                quantity: req.body.quantity,
                grade: req.body.grade
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
        const params = {
            limit: 100,
            offset: undefined,
            order_by: 'id',
            sort: 'ASC',
            fields: {UserId: req.user.id},
            exclude: ['updatedAt', 'UserId']
        };

        const items = await CartController.cartService.fetch(params);

        const getItems = async () => {
            let products = []
            for (let item of items) {
                const product = await CartController.productService.get({id: item.ProductId});
                products.push({
                    id: item.id,
                    quantity: item.quantity,
                    createdAt: item.createdAt,
                    grade: item.grade,
                    product: {
                        name: product.name,
                        uuid: product.uuid,
                        price: await getMaxMarkedUpProductPrice(product.id, item.grade)
                    }
                });
            }

            return products
        }

        if (items.length > 0) {
            const msg = 'Cart items retrieved.';
            util.setSuccess(200, msg, await getItems())
        } else {
            const msg = 'Cart is empty.';
            util.setSuccess(200, msg, []);
        }
        return util.send(res);
    }

    static async remove(req, res) {
        if (req.params.id) {
            return CartController.baseController.delete(req, res);
        }

        await CartController.cartService.delete({ UserId: req.user.id });
        const msg = 'Cart Cleared.'
        util.setSuccess(200, msg);
        return util.send(res);
    }

};
