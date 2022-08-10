
const Person = require('../model/model');

const searchPerson = async(req, res)=>{
    const person = await Person.find({
        email: req.params.email}, {__v:false});
    if(person.lenght > 0){
        res.status(200).send(person);
    }else{
        res.status(401).send('User not found');
    }
}; 

const getPerson = async(req, res)=>{
    const person = await Person.find({}, {_id:false, __v:false});
    res.status(200).send(person);
};

const addPerson = async(req, res)=>{
    const person = new Person(req.body);
    person.save().then(()=>{
        res.status(200).send('User save sucess');
    }).catch(error=>{
        res.status(401).send(
            'Error when saving, check Database');
    })
};

const updatePerson = async(req, res)=>{
    const result = await Person.updateOne({email:req.body.email},
        {$set:{name:req.body.name}, 
        $set:{last_name:req.body.last_name}});
        if(result.modifiedCount > 0){
            res.status(200).send('User update sucess');
        }else{
            res.status(401).send('Error when update');
        }
};

const deletePerson = async(req, res)=>{
    const result = await Person.deleteOne({email:req.body.email});
    if(result.deletedCount > 0){
        res.status(200).send('User delete sucess');
    }else{
        res.status(401).send('User not delete');
    }
};

module.exports = {
    getPerson, addPerson, searchPerson, updatePerson, deletePerson
}
