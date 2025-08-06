import Router from 'router';
import { addVaultEntry, updateVaultEntry, getAllEntry, getSingleEntry, deleteEntry } from '../controller/vault.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const vaultRouter = Router();

vaultRouter.route('/add-entry').post(verifyToken, addVaultEntry);
vaultRouter.route('/get-entry').post(verifyToken, getSingleEntry);
vaultRouter.route('/get-entrys').post(verifyToken, getAllEntry);
vaultRouter.route('/update-entry').patch(verifyToken, updateVaultEntry);
vaultRouter.route('/delete-entry').delete(verifyToken, deleteEntry);

export default vaultRouter;
