/************************
 * DATABASE INIT SCRIPT *
 ************************/

// Script variables
const user = "clearpayAdmin"
const password = "h6rU2xWjT@=StU+s"

// Create connection
const db = connect("127.0.0.1:27017/clearpay", user, password)

// Make sure the clearpay database is clean
db.users.drop()
db.wallets.drop()
db.transactions.drop()

// Create collections
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "name", "surname"],
            properties: {
                username: {
                    bsonType: "string",
                    minLength: 8,
                    maxLength: 32,
                    description: "The username, unique field."
                },
                name: {
                    bsonType: "string",
                    minLength: 1,
                    maxLength: 64,
                    description: "The username of the user."
                },
                surname: {
                    bsonType: "string",
                    minLength: 1,
                    maxLength: 64,
                    description: "The surname of the user."
                },
            }
        }
    }
});

db.createCollection("wallets", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "alias", "balance"],
            properties: {
                userId: {
                    bsonType: "string",
                    description: "The ID of the uses who this wallet belongs to. userId + alias combination must be unique."
                },
                alias: {
                    bsonType: "string",
                    minLength: 8,
                    maxLength: 64,
                    description: "The alias of the wallet. userId + alias combination must be unique."
                },
                balance: {
                    bsonType: "double",
                    minimum: 0,
                    description: "The balance of the wallet. Balance cannot be negative."
                }
            }
        }
    }
});

db.createCollection("transactions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["sourceWalletId", "destinationWalletId", "amount", "date"],
            properties: {
                sourceWalletId: {
                    bsonType: "string",
                    description: "The id of the wallet that performed the transaction."
                },
                destinationWalletId: {
                    bsonType: "string",
                    description: "The id of the destination wallet."
                },
                amount: {
                    bsonType: "double",
                    minimum: 1,
                    description: "The amount to be transferred. Minimum is 1."
                },
                date: {
                    bsonType: ["date", "timestamp"],
                    description: "The date the transaction was performed."
                },
                comment: {
                    bsonType: "string",
                    maxLength: 50,
                    description: "[Optional] Just a brief comment."
                }
            }
        }
    }
});
