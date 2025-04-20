const express = require("express");
const authMiddleware = require("../http/middlewares/auth.middleware");
const restrictTo = require("../http/middlewares/permission.guard");
const {
  createPackageSchema,
  validate,
  updatePackageSchema,
} = require("../http/validators/packageValidator");
const {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
} = require("../http/controllers/packageController");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  restrictTo("customer"),
  validate(createPackageSchema),
  createPackage
);
router.get("/", getPackages);
router.put("/:id", validate(updatePackageSchema), updatePackage);
router.delete("/:id", restrictTo("customer", "admin"), deletePackage);

module.exports = router;
