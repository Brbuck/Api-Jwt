const User = require("../models/User");
const generateToken = require("../utils/generateToken");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async create(req, res) {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ error: "Usuário já existe!!" });
    }
    try {
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Usuário não existe!!" });
    }

    if (await user.matchPassword(password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "E-mail ou senha inválidos" });
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
