const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req, next }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        // console.log('req.body.token', req.body.token);
        // console.log('req.query.token', req.query.token);
        // console.log('req.headers.authorizatioin', req.headers.authorization);
        // console.log('req.headers', req.headers);

        if (req.headers.authorization) {

            console.log('token', token);

            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
    
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};