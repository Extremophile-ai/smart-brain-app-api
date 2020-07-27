import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '203ada3476814a199357484e55133ff3'
   });

const handleApiCall = (req, res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err => res.status(400).json('API error!'))
}
   



const handleEntries = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}


export  {
     handleEntries,
     handleApiCall
}