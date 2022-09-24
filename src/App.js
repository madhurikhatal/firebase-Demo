
import './App.css';
import { useEffect, useState } from "react";
import { db } from './config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"



function App() {
  const [demo, setDemo] = useState([]);
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState(0);
  const demoCollectionRef = collection(db, "demo");

  // ADD INFORMATION
  const add = async () => {
    await addDoc(demoCollectionRef, { name: language, code: Number(code) });
  }
  // UPDATE INFORMATION
  const update = async (id, code) => {
    const demoDoc = doc(db, "demo", id)
    const newFields = { code: code + 1 }
    await updateDoc(demoDoc, newFields)
  }
  const dec = async (id, code) => {
    const demoDoc = doc(db, "demo", id)
    const newField = { code: code - 1 }
    await updateDoc(demoDoc, newField)
  }

  // DELETE INFORMATION
  const deleteInfo = async (id) => {
    const demoDoc = doc(db, "demo", id);
    await deleteDoc(demoDoc);
  }

  useEffect(() => {
    const getDemo = async () => {
      const data = await getDocs(demoCollectionRef);
      setDemo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getDemo()
  }, [])

  return (
    <div>
      <div className="add">

        <input placeholder='Subject' onChange={(e) => { setLanguage(e.target.value) }}></input>
        <input placeholder='Subject Code' onChange={(e) => { setCode(e.target.value) }}></input>
        <button  className='btn btn-outline-success'  onClick={add}>Add</button>
      </div>
      {demo.map((demo) => {
        return (
          <div className="container">
            <h4>{demo.name}</h4>
            <h5>{demo.code}</h5>

            <button className='btn btn-outline-warning up' onClick={() => { update(demo.id, demo.code) }}> ↑ </button>
            <button className='btn btn-outline-warning down ' onClick={() => { dec(demo.id, demo.code) }}>↓</button>

            <button className='btn btn-outline-danger' onClick={() => { deleteInfo(demo.id) }}>
              Delete
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
