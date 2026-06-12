// get user profile based on user data from token
const getProfile = async (req, res) => {
    res.json({
      message: "Profile fetched",
      user: req.user,
    });
  };
  
  module.exports = {
    getProfile,
  };