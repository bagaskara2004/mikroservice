const db = require("../models");

const User = db.User;

const axios = require("axios");

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    const user = await User.create(req.body);
    await axios.post("http://localhost:4005/events", {
      type: "UserCreated",
      data: { id, name, email, password },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated === 0)
      return res.status(404).json({ error: "User tidak ditemukan" });

    await axios.post("http://localhost:4005/events", {
      type: "UserUpdated",
      data: {
        id: req.params.id,
        data: req.body,
      },
    });
    res.json({ message: "User diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 0)
      return res.status(404).json({ error: "User tidak ditemukan" });

    res.json({ message: "User dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
