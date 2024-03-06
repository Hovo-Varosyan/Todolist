const Joi = require("joi");
const userModel = require("../models/usermodel");
const schema = require("../validate/task");
class Task {

  static add = async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, { context: { isRequired: false } })
      if (error) {
        return next(error)
      }

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
      return res.json({ message: "Task added successfully" });
    } catch (error) {
      return next(error)
    }

  };

  static task = async (req, res, next) => {
    try {
      const userId = req.user.id
      const page = req.params.page !== "undefined" ? parseInt(req.params.page) : 1
      const idSchema = Joi.string().min(1).trim().required()
      const pageSchema = Joi.number().min(1).required().integer().positive()

      const userIdValidation = idSchema.validate(userId);
      const pageValidation = pageSchema.validate(page);

      if (userIdValidation.error) {
        return next(userIdValidation.error)
      }
      if (pageValidation.error) {
        return next(pageValidation.error)
      }

      const data = await userModel.findById({ _id: userId }).select('list -_id')
      if (data) {
        const limit = data.list.slice(((page - 1) * 50), page * 50)
        const list = limit.length > 0 ? limit : "empty";
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

        return res.json({ list, length: data.list.length });
      } else {
        return res.status(404).json({ err: "data not devined" });
      }
    } catch (error) {
      return next(error)
    }

  };

  static delete = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const listId = req.query.id;
 
      const schema = Joi.string().min(1).trim().required()

      const userIdValidation = schema.validate(userId);
      const listIdValidation = schema.validate(listId);

      if (userIdValidation.error) {
        return next(userIdValidation.error)
      }
      if (listIdValidation.error) {
        return next(listIdValidation.error)
      }


      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $pull: { list: { _id: listId } } },
        { new: true }
      );
console.log(1)
      if (!updatedUser) {
        return res.status(500).json({ message: "data false" });
      }

      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.log(error)
      return next(error)
    }

  };

  static done = async (req, res, next) => {


    try {
      const schema = Joi.object({
        id: Joi.string()
          .min(1)
          .trim()
          .required(),
        status: Joi.boolean()
      })
      const { error, value } = schema.validate(req.body)
      if (error) {
        return next(error)
      }
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
      return next(error)
    }

  }

  static getTask = async (req, res, next) => {
    try {
      const userId = req.user.id
      const listId = req.params.id
      const schema = Joi.string().min(1).trim().required()

      const userIdValidation = schema.validate(userId);
      const listIdValidation = schema.validate(listId);

      
      if (userIdValidation.error) {
        return next(userIdValidation.error)
      }
      if (listIdValidation.error) {
        return next(listIdValidation.error)
      }

      const data = await userModel.findOne({ _id: userId, 'list._id': listId }, { 'list.$': 1 })
      if (data) {
        return res.json({ data: data.list[0] })
      } else {
        return res.status(404).json({ message: 'not data' })
      }

    } catch (error) {
      return next(error)
    }

  }

  static edit = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { error, value } = schema.validate(req.body, { context: { isRequired: true } })
      if (error) {
        return next(error)
      }
      const { title, description, status, id: listId } = req.body

      const updateData = await userModel.findOneAndUpdate({ _id: userId, 'list._id': listId },
        { $set: { 'list.$.title': title, 'list.$.description': description, 'list.$.status': Boolean(status) } },
        { new: true })
      const newData = await userModel.findOne({ _id: userId, 'list._id': listId }, { 'list.$': 1 })
      const data = newData.list
      data.forEach(element => {
        if (element.title.length > 30) {
          element.title = element.title.substring(0, 30) + '...'
        }
        if (element.description.length > 100) {
          element.description = element.description.substring(0, 100) + '...';
        }
      })
      if (updateData) {
        return res.json({ message: 'Task edit successfully', data: data[0] })
      } else {
        res.status(404).json({ message: 'Document not found' })
      }
    } catch (error) {
      return next(error)
    }
  }

}

module.exports = Task;
