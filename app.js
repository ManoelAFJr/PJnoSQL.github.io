require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
const controll = require('./APP/controller/modelController');

app.get('/person', controll.getPerson);
app.post('/person', controll.addPerson);

app.get('/person/:email', controll.searchPerson);
app.put('/person/:email', controll.updatePerson);
//delete form, use method post
app.post('/delete', controll.deletePerson);

app.listen(process.env.API_PORT, ()=>{
    console.log(`API loading port ${process.env.API_PORT}`);
})
