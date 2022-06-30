import React, { useEffect, useState } from 'react'
import { poopsRef } from 'databaseIntigration'
import { getDocs } from 'firebase/firestore'

export default function ListVisits() {
  const [visits, setVisits] = useState([])

  useEffect(() => {
    getVisits()
    alert(visits)
  }, [visits])

  function getVisits() {
    getDocs(poopsRef).then((response) => {
      const vis = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id
      }))
      setVisits(vis)
    })
  }

  return (
    <div>
      <h4>ListUser</h4>
    </div>
  )
}
