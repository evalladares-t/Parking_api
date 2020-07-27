
const jwt = require('jsonwebtoken');
const {UserDTO} = require('../dtos');
const mapper = require('automapper-js');
const { UNAUTHORIZED } = require('http-status-codes');

class AuthMiddleware{

    constructor({UserService}) {
      this.UserService = UserService;
      this._DTO = UserDTO;
    }

    authMiddleware = async (req, res, next) => {
        const token = req.headers['authorization'] || '';
        //console.log(token)
        if (!token) {
          next(
                res.status(UNAUTHORIZED).json({
                status: 'error',
                message:'UNAUTHORIZED'
            }));
          return;
        }
      
        try {
          const bearerToken = token.split(" ");
          const bearer = jwt.verify(bearerToken[1], process.env.JWT_SECRET);
          console.log(bearer)
          let result = await this.UserService.show(bearer);
          
          result = mapper(this._DTO,result);
          console.log(result)
          next();
        } catch (err) {
          next(
            res.status(UNAUTHORIZED).json({
            status: 'error',
            data: err
        }));
        }
      };
}

module.exports = AuthMiddleware;