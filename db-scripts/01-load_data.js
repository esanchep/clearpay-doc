/*****************************
 * DATABASE LOAD DATA SCRIPT *
 *****************************/

// Insert users
db.users.insert({"username": "terminator", "name": "John", "surname": "Connor"})
db.users.insert({"username": "the_mask", "name": "Jim", "surname": "Carrey"})
db.users.insert({"username": "iron_man", "name": "Tony", "surname": "Stark"})
db.users.insert({"username": "rambo", "name": "John James", "surname": "Rambo"})
db.users.insert({"username": "dr_strange", "name": "Stephen", "surname": "Strange"})
db.users.insert({"username": "solid_snake", "name": "David", "surname": "???"})
db.users.insert({"username": "big_boss", "name": "Jogn", "surname": "???"})

// Insert wallets
const INITIAL_BALANCE = 50
const NUM_WALLETS = 10
const numUsers = db.users.count()

db.users.find().forEach((insertedUser) => {
    for (let walletNum = 1; walletNum <= NUM_WALLETS; walletNum++) {
        db.wallets.insert({"userId": insertedUser._id.str, "alias": insertedUser.username + "_wallet_" + walletNum, "balance": INITIAL_BALANCE})
    }
})
