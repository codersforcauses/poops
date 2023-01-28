import { MouseEvent, useRef } from 'react'

import Button from '@/components/UI/button'

export interface fileUploaderInterface {
  label: string
  handleFile(f: File): void
}
const FileUploader = ({ label, handleFile }: fileUploaderInterface) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    }
    // click.preventDefault()
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const fileUploaded = e.currentTarget.files[0]
      handleFile(fileUploaded)
    }
  }

  return (
    <>
      <Button type='button' size='small' onClick={handleClick}>
        {label}
      </Button>
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        className='hidden'
      />
    </>
  )
}

export default FileUploader
