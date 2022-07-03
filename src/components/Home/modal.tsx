import React from 'react'

function Modal() {
  return (
    <div className='rounded-lg bg-grey p-3 py-2 px-5 text-center shadow-lg sm:py-4'>
      <h1 style={{ fontSize: 25, color: '#a52a2a' }}>
        <b>Visit Details</b>
      </h1>
      <hr
        style={{
          background: '#a52a2a',
          color: '#a52a2a',
          borderColor: '#a52a2a',
          height: '2px'
        }}
      />
      <br />
      <form style={{ fontSize: 20 }}>
        <label htmlFor='start'>Start : </label>
        <input type='text' id='start' name='start'></input>
        <br />
        <label htmlFor='start'>End : </label>
        <input type='text' id='start' name='start'></input>
        <br />
        <label htmlFor='start'>Total time : </label>
        <input type='text' id='start' name='start'></input>
        <br />
        <select id='pets' name='pets'>
          <option value='Willow'>Willow</option>
          <option value='Nala'>Nala</option>
          <option value='Coco'>Coco</option>
          <option value='Gigi'>Gigi</option>
        </select>
      </form>
    </div>
  )
}

export default Modal
