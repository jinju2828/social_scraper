//setup the db
import FileSync from "lowdb/adapters/FileSync";
import low from "lowdb";


const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ twitter: [], instagram: []}).write();
// db.get('posts')
//     .push({ id:1, title: 'lowdb is running'})
//     .write();
export default db;

