const Group = require("../models/Group");

const checkGroupRole = (requiredRoles = ["admin"]) => {
  return async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const uid = req.user.uid;

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

      const member = group.members.find(m => m.uid === uid);

      if (!member || !requiredRoles.includes(member.role)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      req.group = group;
      next();
    } catch (err) {
      res.status(500).json({ message: "Role check failed" });
    }
  };
};

module.exports = checkGroupRole;
