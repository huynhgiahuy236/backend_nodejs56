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
         const response = responseSuccess(true, `Get all modules successfully`);

         res.cookie("accessToken", result.accessToken)
         res.cookie("refreshToken", result.refreshToken)
         res.status(response.statusCode).json(response);
         // const responsev2 = responseSuccess(
         //    result.accessToken,"login success"
         // )
         // res.status(responsev2.statusCode).json(responsev2);

      } catch (err) {
         next(err);
      }
   },
   async getInfo(req, res, next) {
      try {
         const result = await authService.getInfo(req)
         const response = responseSuccess(result, "getInfo success")
         res.status(response.statusCode).json(response);
      } catch (error) {
         next(error)
      }
   },
   async refreshToken(req, res, next) {
      try {
         const result = await authService.refreshToken(req)
         const response = responseSuccess(result, "refreshToken success")
         res.cookie("accessToken", result.accessToken)
         res.cookie("refreshToken", result.refreshToken)
         res.status(response.statusCode).json(response);
      } catch (error) {
         next(error)
      }
   }

};