
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes');

class AuthMiddleware{

    authMiddleware = async (req, res, next) => {
        const token = req.headers['authorization'] || '';
        console.log(token)
        if (!token) {
          next(
                res.status(UNAUTHORIZED).json({
                status: 'error',
                message:'UNAUTHORIZED'
            }));
          return;
        }
      
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          //console.log(payload);
          req.user = payload.user;
          next();
        } catch (err) {
          next(err);
        }
      };
}

module.exports = AuthMiddleware;