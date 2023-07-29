var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

const fetchuser = (req, res, next) => {
    //  get the user from the jwt token and id to req object

    const token = req.header('auth-token');
    if (token.length === 0 || !token) {
        res.status(401).send({ error: "Token not valid" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Token not valid" })
    }
}

module.exports = fetchuser;