import express from 'express';
const router = express.Router();
import model from '../models/index';
// GET users listing.
router.get('/', function (req, res, next) {});
// POST users
router.post('/', function (req, res, next) {});
// UPDATE users
router.patch('/:id', function (req, res, next) {});
// DELETE users
router.delete('/:id', function (req, res, next) {});

//get all users
router.get('/', async function (req, res, next) {
  try {
    const users = await model.users.findAll({});
    if (users.length !== 0) {
      res.json({
        status: 'OK',
        messages: '',
        data: users,
      });
    } else {
      res.json({
        status: 'ERROR',
        messages: 'EMPTY',
        data: {},
      });
    }
  } catch (err) {
    res.json({
      status: 'ERROR',
      messages: err.messages,
      data: {},
    });
  }
});

// create users
router.post('/', async function (req, res, next) {
  try {
    const { name, email, gender, phoneNumber } = req.body;
    const users = await model.users.create({
      name,
      email,
      gender,
      phone_number: phoneNumber,
    });
    if (users) {
      res.status(201).json({
        status: 'OK',
        messages: 'User berhasil ditambahkan',
        data: users,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'ERROR',
      messages: err.message,
      data: {},
    });
  }
});

//update users
router.patch('/:id', async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const { name, email, gender, phoneNumber } = req.body;
    const users = await model.users.update(
      {
        name,
        email,
        gender,
        phone_number: phoneNumber,
      },
      {
        where: {
          id: usersId,
        },
      }
    );
    if (users) {
      res.json({
        status: 'OK',
        messages: 'User berhasil diupdate',
        data: users,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'ERROR',
      messages: err.message,
      data: {},
    });
  }
});

//delete users
router.delete('/:id', async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const users = await model.Todo.destroy({
      where: {
        id: usersId,
      },
    });
    if (users) {
      res.json({
        status: 'OK',
        messages: 'User berhasil dihapus',
        data: users,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'ERROR',
      messages: err.message,
      data: {},
    });
  }
});

module.exports = router;
