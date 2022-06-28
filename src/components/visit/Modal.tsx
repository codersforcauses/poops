import React from 'react'

interface ModalViewProps {
  openFunc: () => void
}

const ModalView: React.FC<ModalViewProps> = ({ openFunc }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 '>
      <div className='flex-initial rounded-sm bg-white py-10 px-10 shadow '>
        <div className=''>
          <button onClick={openFunc}> X </button>
          <div className=''>
            <h1> Add Your Visit</h1>
          </div>
          <div className=''>
            <input placeholder='Pet Name' />
            <input placeholder='Date' />
          </div>
          <div className=''>
            <button onClick={openFunc} className=''>
              Cancel
            </button>
            <button onClick={openFunc} className=''>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalView
