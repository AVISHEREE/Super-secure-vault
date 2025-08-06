const Router = require('router')
const { signup, signin } = require('../controller/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');
const { deleteUser, updateUser } = require('../controller/user.controller');
const userRouter = Router()

userRouter.route('/signup').post(signup);
userRouter.route('/signin').post(signin);

userRouter.route('/update-user').patch(verifyToken,updateUser);
userRouter.route('/delete-user').delete(verifyToken,deleteUser);


module.exports = userRouter