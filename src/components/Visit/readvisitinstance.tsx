import { Dispatch } from 'react'

import { VisitInstanceProps } from '@/components/Visit/visitinstance'

interface _ReadOnlyVisitInstanceProps extends VisitInstanceProps {
  setIsEditable: Dispatch<React.SetStateAction<boolean>>
}

const ReadOnlyVisitInstance = () => {
  return <></>
}

export default ReadOnlyVisitInstance
