import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('Main.db');

export const initializeDB = () => {
    db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +"Users "+"(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT);"
        ,[], ()=> {
            console.log('Table Created Successfully')
        }, () => {
            console.log('Error Creating Table')
        })
      })
}

export const addUser = (username, password,email) => {
    db.transaction((tx) => {
        try {
            tx.executeSql(
                "INSERT INTO Users (username, password, email) VALUES (?,?,?)", [username, password,email], () => {
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

export const updatePassword = (username,newPassword) => {
    db.transaction((tx) => {
        try {
            tx.executeSql('UPDATE Users SET password = ? WHERE username = ?',[newPassword,username],()=>{
                console.log("Password Changed")
            },(tx,e)=>{
                console.log(e)
            })
        } catch {
            console.log("Error updating password")
        }
    })
}

export const getPassword = (username,callback) => {
    db.transaction((tx) => {
        try {
            tx.executeSql("Select * from Users WHERE username = ?",[username],
            (_,{ rows }) => {
                if (rows.length === 0) 
                {
                    callback({ success: false, error: 'Invalid Password' }); 
                } else {
                    const user = rows.item(0);
                    callback({success: true, password: user.password})
                }
            },(tx,e)=>{
                console.log(e)
            })
        } catch {
            console.log("Error updating password")
        }
    })
}

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
