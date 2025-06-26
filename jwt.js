const jwt = require("jsonwebtoken");
const Audit = require("../models/AuditLog");

// …verifyToken & authorizeRoles exactly as you already added…

// Audit every mutating request (POST / PUT / DELETE)
exports.auditLogger = async (req, _res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    await Audit.create({
      user: req.user ? req.user.id : null,
      action: `${req.method} ${req.originalUrl}`,
      details: { body: req.body },
    });
  }
  next();
};
