import { useVisit } from '@/context/VisitContext/context'
import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import VisitForm from '@/components/Visit/visitform'

interface EditButtonProps {
  isEditable: boolean
  setIsEditable: (arg: boolean) => void
}

export const EditButton = (props: EditButtonProps) => {
  return (
    <div className='invisible absolute right-4 bottom-1 h-8 w-8 rounded-full bg-primary p-1 drop-shadow-default transition-all peer-checked:visible'>
      <button
        type='button'
        onClick={() => {
          props.setIsEditable(!props.isEditable)
        }}
      >
        {props.isEditable ? (
          <XIcon className='h-full w-full text-white' />
        ) : (
          <PencilIcon className='h-full w-full text-white' />
        )}
      </button>
    </div>
  )
}

export const AddButton = () => {
  const { setCurrentForm } = useVisit()
  return (
    <div className='align-center flex h-10 w-10 place-items-center self-center rounded-full bg-primary p-1 drop-shadow-default'>
      <button type='button' onClick={() => setCurrentForm(<VisitForm />)}>
        <PlusIcon className='flex h-full w-full self-center text-white' />
      </button>
    </div>
  )
}
