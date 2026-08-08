import { responseSuccess } from "../common/helpers/response.helper.js";
import { authService } from "../services/auth.services.js";

export const authController = {
   async register(req, res, next) {
      try {
         const result = await authService.register(req);
         const response = responseSuccess(result, `Create module successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   async login(req, res, next) {
      try {
         const result = await authService.login(req);
         const response = responseSuccess(result, `Get all modules successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};