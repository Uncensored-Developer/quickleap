module.exports = (req, res, next) => {
    const userAccountType = req.user.account_type;
    if (userAccountType !== 'aggregator' && userAccountType !== 'admin' && userAccountType !== 'trader') {
        return res.sendStatus(401);
    }
    return next();
}