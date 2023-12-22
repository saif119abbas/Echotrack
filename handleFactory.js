exports.addDocument = (model, data, res, next) => {
  model
    .create(data)
    .then((record) => {
      console.log("The record", record);
      return res.status(201).json({
        status: "success",
        message: "created successfully",
      });
    })
    .catch((err) => {
      console.log("error", err);
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(400).json({
          status: "failure",
          message: "already created",
        });
      return res.status(500).json({
        status: "failure",
        message: err.message,
      });
    });
};
exports.updateDocument = (model, data, condition, res, next) => {
  console.log("The res", condition);
  model
    .update(data, { where: condition })
    .then((count) => {
      if (count[0] === 1)
        return res.status(200).json({
          status: "success",
          message: "updated successfully",
        });
      else if (count[0] === 0)
        return res.status(404).json({
          status: "failure",
          message: "not found",
        });
      else if (count[0] > 1)
        return res.status(403).json({
          status: "failure",
          message: "not allowed",
        });
    })
    .catch((err) => {
      console.log("In update document the err:", err);
      if (err.name === "SequelizeUniqueConstraintError") {
        console.log(err.name);
        return res.status(400).json({
          status: "failure",
          message: "already created",
        });
      }
      return res.status(500).json({
        status: "failure",
        message: err.message,
      });
    });
};
exports.deleteDocument = (model, condition, res, next) => {
  console.log("The res", condition);
  model
    .destroy({ where: condition })
    .then((count) => {
      if (count === 1)
        return res.status(204).json({
          status: "success",
          message: "deleted successfully",
        });
      else if (count === 0)
        return res.status(404).json({
          status: "failure",
          message: "not found",
        });
      else if (count[0] > 1)
        return res.status(403).json({
          status: "failure",
          message: "not allowed",
        });
    })
    .catch((err) => {
      console.log("In update document the err:", err);
      if (err.name === "SequelizeUniqueConstraintError") {
        console.log(err.name);
        return res.status(400).json({
          status: "failure",
          message: "already created",
        });
      }
      return res.status(500).json({
        status: "failure",
        message: err.message,
      });
    });
};
