const express = require('express');
const Task = require('../models/task');

const router = new express.Router();


router.post('/tasks', async(req, res) => {

    const task = new Task(req.body);
    try{
        await task.save();
        res.send(task)
    }catch{
        res.status(400).send(e);

    }

    // const task = new Task(req.body);
    // task.save().then(()=> {
    //     res.send(task);
    // }).catch((e)=> {
    //     console.log(e);
    //     res.status(400).send(e);
    // })
    
})



router.get('/tasks', async(req, res) => {

    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(e){
        res.status(500).send();

    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
                              
})





router.get('/tasks/:id', async(req, res) => {
    const _id  = req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send()
        }else{
            res.send(task)
        }
    }catch(e){
        res.status(500).send();

    }
    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }else{
    //         res.send(task)
    //     }
    // }).catch((e) => {
    //     res.status(500).send();

    // })
})



router.patch('/tasks/:id', async(req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({error: "Invalid Updates!"})
    }

    try{
        const id = req.params.id;
        const task = await Task.findById(id);
        updates.forEach((update)=> task[update] = req.body[update]);
        await task.save();
        if(!task){
            return res.status(404).send()
        }
        res.send(task);
    }catch(e){
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id', async(req, res) => {

    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send("Task not found")
        }
        res.send(task)
    }catch{
        res.status(500).send()
    }

})



module.exports = router