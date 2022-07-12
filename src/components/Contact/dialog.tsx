import { Dispatch, SetStateAction } from 'react'

type DialogProp = {
  setDialogPrompt: Dispatch<SetStateAction<boolean>>
}

const Dialog = ({ setDialogPrompt }: DialogProp) => {
  return (
    <div className='fixed inset-x-0 bottom-0 z-10'>
      <div className='border border-grey bg-white p-5'>
        <h1 className='mb-5 text-center text-2xl'>Are you sure?</h1>

        <div className='flex justify-center'>
          <div className='flex flex-col space-y-2'>
            {/* TODO: 
                  Make delete request to firebase on click
                  Navigate back to contacts page */}
            <button
              type='button'
              className='w-80 rounded bg-primary py-1 font-bold text-white hover:bg-dark-red'
            >
              Delete
            </button>
            <button
              type='button'
              className='w-80 rounded bg-grey py-1 font-bold text-black hover:bg-grey'
              onClick={() => setDialogPrompt(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
