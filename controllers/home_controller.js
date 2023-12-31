const db = require('../config/mongoose.js');
const Task = require('../models/taskSchema.js');

//home page renderer
module.exports.home = function(req, res){
    Task.find({}).then (taskList=>{
        return res.render('home', {
            title: 'To-Do',
            tasks: taskList
        })
    });
};

//add task method
module.exports.addTask = function(req, res){
    const newTask = new Task({
        description: req.body.description,
        dueDate: req.body.due_date,
        category: req.body.category
    });
    newTask.save();

    return  res.redirect('back');
}

//delete task method
module.exports.deleteTask = async(req, res)=>{
    if(typeof req.query.id === 'string'){
        await Task.findByIdAndDelete(req.query.id);
    } else {
        for(let key in req.query.id){
            await Task.findByIdAndDelete(req.query.id[key]);
        }
    }
}