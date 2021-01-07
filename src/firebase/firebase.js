import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import FirebaseConfig from './config'


class Firebase{
  constructor(){
    app.initializeApp(FirebaseConfig)
    this.db = app.firestore()
    this.storage = app.storage()
  }
}

const firebase = new Firebase()
export default firebase