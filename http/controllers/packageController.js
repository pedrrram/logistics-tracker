const Package = require("../../models/Package");
const crypto = require("crypto");

exports.createPackage = async (req, res) => {
  try {
    const { destination, weight } = req.body;
    const trackingNumber = crypto.randomBytes(8).toString("hex");
    const package = new Package({
      trackingNumber,
      destination,
      weight,
      user: req.user.id,
    });
    await package.save();
    res.status(201).json({
      status: "success",
      data: {
        package,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getPackages = async (req, res) => {
  try {
    let packages;
    switch (req.user.role) {
      case "admin":
        packages = await Package.find()
          .populate("user", "username")
          .populate("driver", "username");
        break;
      case "customer":
        packages = await Package.find({ user: req.user.id })
          .populate("user", "username")
          .populate("driver", "username");
        break;
      case "driver":
        packages = await Package.find({ driver: req.user.id })
          .populate("user", "username")
          .populate("driver", "username");
        break;
      default:
        return res.status(403).json({ status: "error", message: "Forbidden" });
    }
    res.status(200).json({
      status: "success",
      data: {
        packages,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, driverId, destination, weight } = req.body;

    const package = await Package.findById(id);
    if (!package) {
      return res.status(404).json({
        status: "error",
        message: "Package not found",
      });
    }

    const role = req.user.role;

    if (
      role === "customer" &&
      package.user.toString() === req.user.id.toString()
    ) {
      package.destination = destination || package.destination;
      package.weight = weight || package.weight;
    } else if (
      role === "driver" &&
      package.driver.toString() === req.user.id.toString()
    ) {
      package.status = status || package.status;
    } else if (role === "admin") {
      if (status) package.status = status;
      if (driverId) package.driver = driverId;
      package.destination = destination || package.destination;
      package.weight = weight || package.weight;
    } else {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update this package",
      });
    }
    await package.save();
    res.status(201).json({
      status: "success",
      data: {
        package,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findById(id);
    if (!package) {
      return res.status(404).json({
        status: "error",
        message: "Package not found",
      });
    }

    const role = req.user.role;
    if (
      (role === "customer" &&
        package.user.toString() === req.user.id.toString()) ||
      role === "admin"
    ) {
      await Package.findByIdAndDelete(id);
      return res.status(204).json({
        status: "success",
        message: "Package deleted successfully",
      });
    } else {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this package" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
