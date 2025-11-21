const { User } = require('../models');
const response = require('../utils/response');

exports.getProfile = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return response.error(res, 'Unauthorized', 401);
  }

  const user = await User.findByPk(userId, {
    attributes: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt']
  });

  if (!user) {
    return response.error(res, 'User not found', 404);
  }

  return response.success(res, { user }, 200);
};