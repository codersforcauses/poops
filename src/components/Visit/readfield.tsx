type ReadFieldProps = {
  label: string
  value: string
}

const ReadField = ({ label, value }: ReadFieldProps) => {
  return (
    <div className='my-1 space-x-2'>
      <span className='font-bold'>{label}:</span>
      <span>{value}</span>
    </div>
  )
}

export default ReadField
