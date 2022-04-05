import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialData() {

    try {
        await User.sync({force: true});

        let password = await bcrypt.hash('123456', 10);
    
        await User.create({
            name: 'User test1',
            email: 'test1@hotmail.com',
            password: password
        });

        await User.create({
            name: 'User test 2',
            email: 'test2@hotmail.com',
            password: password
        });
        
    } catch (err) {
        console.log(err);
    }
}