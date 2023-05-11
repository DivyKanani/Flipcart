import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('project.db');

export const initializeDB = () => {
    db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +"Users "+"(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);"
        ,[], ()=> {
            console.log('Table Created Successfully')
        }, () => {
            console.log('Error Creating Table')
        })
      })
}

export const addUser = (username, password) => {
    db.transaction((tx) => {
        try {
            tx.executeSql(
                "INSERT INTO Users (username, password) VALUES (?,?)", [username, password], () => {
            console.log('inserted contact')
          },
          (tx,e) => {
            console.log(e)
          }
        );
        }
        catch {
            console.log('error while adding the user')
        }
    }
)}

export const verifyUser = (username, password, callback) => {
    db.transaction((tx) => {
        try {
            tx.executeSql(
                "Select * from Users WHERE username = ?",[username],
                (_,{ rows }) => {
                    if (rows.length === 0) 
                    {
                        callback({ success: false, error: 'Invalid Username' }); 
                    } else {
                        const user = rows.item(0);
                        if(user.password === password) {
                            callback({ success: true, user });
                        } else {
                            callback({ success: false, error: 'Invalid Password' });
                        }
                    }
                },
                (_, e) => {
                    console.log(e)
                })
        } catch {
            console.log("Error verifying the user")
        }
    })

}
