import UserRepository  from "../repository/userRepository";
import * as httpStatus from "../../../config/constants/httpStatus";

class UserService {
    async findByEmail(req) {
        try {
            const {email} = req.params;
            this.validarDadosRequisicao(email);
            let user = UserRepository.findByEmail(email);
            if (!user) {

            }
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        } catch (err) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.status,
            }
        }
    }

    validarDadosRequisicao(email) {
        if (!email) {
            throw new Error('User email null!');
        }
    }
}

export default new UserService();