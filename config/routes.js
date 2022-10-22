const express = require("express");
const controllers = require("../app/controllers");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./openapi.yaml");
const apiRouter = express.Router();

apiRouter.get(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize(1, 2, 3),
  controllers.api.v1.carsController.list
);
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize(1, 2),
  controllers.api.v1.carsController.create
);
apiRouter.get(
  "/api/v1/deletedcars",
  controllers.api.v1.authController.authorize(1),
  controllers.api.v1.carsController.showDeleted
);
apiRouter.get(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize(1, 2, 3),
  controllers.api.v1.carsController.getById
);
apiRouter.put(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize(1, 2),
  controllers.api.v1.carsController.update
);
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize(1, 2),
  controllers.api.v1.carsController.destroy
);

apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);

apiRouter.post("/api/v1/member/add", controllers.api.v1.userController.createMember);

apiRouter.post(
  "/api/v1/admin/add",
  controllers.api.v1.authController.authorize(1),
  controllers.api.v1.userController.createAdmin
);

apiRouter.get(
  "/api/v1/whoami",
  controllers.api.v1.authController.authorize(1, 2, 3),
  controllers.api.v1.authController.whoAmI
);

apiRouter.post(
  "/api/v1/typeuser",
  controllers.api.v1.authController.authorize(1),
  controllers.api.v1.userController.createType
);

apiRouter.get("/api/v1/docs/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

apiRouter.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;