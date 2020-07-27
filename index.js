import express        from 'express';
import bodyParser     from 'body-parser';
import bcrypt         from 'bcrypt-nodejs';
import cors           from 'cors';
import pg             from 'pg';
import knex           from 'knex';
import handleRegister       from './controllers/register';
import handleLogin          from './controllers/login';
import handleProfileId      from './controllers/profileId';
import { handleEntries,
        handleApiCall}    from './controllers/entries';
import getUsers       from './controllers/users';
import dotenv         from 'dotenv';

dotenv.config();

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'postgres',
//       password : 'Power1050',
//       database : 'smart_brain'
//     }
//   });

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public']
  }); 

const app = express();
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());

app.get('/', (req, res) =>{res.send('Welcome!')});
app.get('/users', getUsers(db));
app.post('/login', handleLogin( db, bcrypt)); 
app.post('/register', handleRegister( db, bcrypt));
app.get('/profile/:id', handleProfileId(db));   
app.put('/entries', handleEntries( db));  
app.post('/imageUrl', (req, res)=>{handleApiCall(req, res)});

app.listen(process.env.PORT || 3005, ()=> {
    console.log('Server started!!')
});    
