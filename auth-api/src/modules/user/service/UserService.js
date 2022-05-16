import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as secrets from "../../../config/constants/secrets.js";

class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            const { authUser} = req;
            this.validarDadosRequisicao(email);
            let user = await UserRepository.findByEmail(email);
            this.validaUserNotFound(user);
            this.validateAuthenticatedUser(user, authUser);
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }
        }
    }

    async getToken(req) {
        try {
            const {transactionid, serviceid } = req.headers;
            console.info(
                `Request to POST login with data ${JSON.stringify(req.body)} 
                            | transactionId: ${transactionid} | serviceId: ${serviceid}`);
            const { email, password } = req.body;
            this.validateAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validaUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: '1d'});
            let response = {
                status: httpStatus.SUCCESS,
                accessToken,
            };
            console.info(
                `Request to POST login with data ${JSON.stringify(req.body)} 
                            | transactionId: ${transactionid} | serviceId: ${serviceid}`);
            return response;
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }
        }
    }

    validateAccessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Email or password must be informed.");
        }
    }

    validarDadosRequisicao(email) {
        if (!email) {
            throw new UserException(httpStatus.BAD_REQUEST, 'User email was not informed');
        }
    }

    validaUserNotFound(user) {
        if (!user) {
            throw new UserException(httpStatus.BAD_REQUEST, 'User was not found');

        }
    }

    async validatePassword(password, hashpassword) {
        if (!await bcrypt.compare(password, hashpassword)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match!");
        }
    }

    validateAuthenticatedUser(user, authUser) {
        if (!authUser || user.id !== authUser.id) {
            throw new UserException(httpStatus.FORBIDDEN, "You cannot see this user data.");    
        }
    }
}

export default new UserService();