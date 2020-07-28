

const handleRegister = (db, bcrypt) => (req, res)=>{
    const {email, name, password, entries}= req.body;
    if(!email ||!name || !password){
        return res.status(400).json('Please fill the required fields');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date(),
                    entries: entries
                })
                .then(user=>{
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }) 
    .catch(err =>  res.status(400).json('Unable to register'));
}

export default handleRegister;

// module.exports={
//     handleRegister:handleRegister
// }