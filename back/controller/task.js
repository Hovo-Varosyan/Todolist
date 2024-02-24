const userModel = require("../models/usermodel");
class Task {
  static add = async (req, res, next) => {

    try {

      const updateTask = await userModel.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            list: {
              ...req.body,
            },
          },
        },
        { new: true }
      );
      return res.json({ message: "successful" });
    } catch (e) {
      return res.json({ err: e.message || e });
    }

  };

  static task = async (req, res, next) => {
    const userId = req.user.id
    try {
      const data = await userModel.findById({ _id: userId }).select('list -_id');
      if (data) {
        const list = data.list.length > 0 ? data.list : "empty";
        if (list !== 'empty') {
          list.forEach(element => {
            if (element.title.length > 30) {
              element.title = element.title.substring(0, 30) + '...'
            }
            if (element.description.length > 100) {
              element.description = element.description.substring(0, 100) + '...';
            }
          });
        }

        return res.json({ list });
      } else {
        return res.status(404).json({ err: "user not devined" });
      }
    } catch (e) {
      return res.status(500).json({ err: e.message || e });
    }

  };

  static delete = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const listId = req.query.id;

      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $pull: { list: { _id: listId } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(500).json({ message: "data false" });
      }

      return res.status(200).json({ message: true });
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }

  };

  static done = async (req, res, next) => {


    try {

      const userId = req.user.id;
      const { id: listId, status } = req.body

      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId, 'list._id': listId },
        { $set: { "list.$.status": Boolean(status) } },
        { new: true }
      );
      if (!(updatedUser)) {
        return res.status(500).json({ message: "db update false" })
      }

      return res.status(200).json({ message: 'Task status changed successfully' });

    } catch (error) {
      return res.status(500).json({ err: error.message });
    }

  }

  static getTask = async (req, res, next) => {

    try {
      const userId = req.user.id
      const listId = req.params.id
      const data = await userModel.findOne({ _id: userId, 'list._id': listId }, { 'list.$': 1 })
      if (data) {
        return res.json({ data: data.list[0] })
      } else {
        return res.status(404).json({ message: 'not data' })
      }

    } catch (err) {
      return res.status(500).json({ err: err.message || err });

    }

  }

  static edit = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { title, description, status, id: listId } = req.body

      const updateData = await userModel.findOneAndUpdate({ _id: userId, 'list._id': listId },
        { $set: { 'list.$.title': title, 'list.$.description': description, 'list.$.status': Boolean(status) } },
        { new: true })
      if (updateData) {
        return res.json({ message: 'Update successful' })
      } else {
        res.status(404).json({ message: 'Document not found' })
      }
    } catch (err) {
      return res.status(500).json({ err: err.message || err });

    }
  }

}

module.exports = Task;