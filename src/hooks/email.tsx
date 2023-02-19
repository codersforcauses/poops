import { addDoc,collection } from "firebase/firestore"; 

import { db } from '@/components/Firebase/init';


interface Message {
  subject: string
  text: string
}


const sendEmail = async (message: Message) => {

    // to: process.env.INCIDENT_EMAIL,

  // Add a new document with a generated id.
  await addDoc(collection(db, "mail"), {
    to: 'poops.cfc.testj2@gmail.com',
    message: message
  });
}

export default sendEmail