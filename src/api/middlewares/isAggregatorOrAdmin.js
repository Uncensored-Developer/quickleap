module.exports = (req, res, next) => {
    const userAccountType = req.user.account_type;
    console.log(userAccountType)
    if (userAccountType !== 'aggregator' && userAccountType !== 'admin') {
        return res.sendStatus(401);
    }
    return next();
}