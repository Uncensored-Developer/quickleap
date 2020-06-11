module.exports = class AbstractBasePayment {

    async getUrl(obj) {
        throw new Error('You have to implement this method.')
    }

}