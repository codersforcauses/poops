import { useState } from 'react'
export interface InputFieldInterface {
  type: string
  placeHolder: string
  value?: string
}

function InputField({ type, placeHolder, value }: InputFieldInterface) {
  const [inputValue, setInputValue] = useState(value ?? undefined)

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <input
        className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
        // type='search'
        onChange={updateValue}
        value={inputValue}
        name={type}
        placeholder={placeHolder}
      />
    </>
  )
}
export default InputField
