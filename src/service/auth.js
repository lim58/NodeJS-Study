const signup = (req, res) => {
  const { id, password } = req.body;

  return req.status(201).json({
    id,
    password,
  });
};

const login = (req, res) => {};

const logout = (req, res) => {};

const cancelAccount = (req, res) => {}

module.exports = {
  signup,
  login,
  logout, 
  cancelAccount
};
