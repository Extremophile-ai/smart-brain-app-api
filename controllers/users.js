
const getUsers = (db) =>(req, res) =>{
    db.select('*').from('users').orderBy('id', 'asc')
    .then(users=>{
        // console.log(users)
        res.json(users);
    })
    .catch(err =>res.status(400).json('Unable to get users'))
}

// export default getUsers;

module.exports={
    getUsers:getUsers
}