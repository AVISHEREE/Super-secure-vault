const Router = require('router');
const { addVaultEntry, updateVaultEntry, getAllEntry , getSingleEntry , deleteEntry } = require('../controller/vault.controller');
const verifyToken = require('../middlewares/auth.middleware');

const vaultRouter = Router();

vaultRouter.route('/add-entry').post(verifyToken,addVaultEntry);
vaultRouter.route('/get-entry').post(verifyToken,getSingleEntry);
vaultRouter.route('/get-entrys').post(verifyToken,getAllEntry);
vaultRouter.route('/update-entry').patch(verifyToken,updateVaultEntry);
vaultRouter.route('/delete-entry').delete(verifyToken,deleteEntry);

module.exports = vaultRouter;