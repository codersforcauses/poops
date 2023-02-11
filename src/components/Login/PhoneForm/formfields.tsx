import { useContext, useEffect, useState } from 'react'
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier
} from 'firebase/auth'
import { useSetAtom } from 'jotai'

import { panelAtom } from '@/atoms/login'
import validationSchema from '@/components/Login/PhoneForm/validation'
import Button from '@/components/UI/button'
import { FormContext } from '@/components/UI/FormComponents/Form/context'
import PhoneSelect from '@/components/UI/FormComponents/PhoneField'
import TextField from '@/components/UI/FormComponents/TextField'

export interface FormValues {
  phoneNumber: string
  smsCode?: string
}

const FormFields = () => {
  const auth = getAuth()
  const { trigger, setError, getValues } = useContext(FormContext)
  const setPanel = useSetAtom(panelAtom)
  const [otpShown, setOtpShown] = useState(false)
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier>()
  const [result, setResult] = useState<ConfirmationResult>()



  useEffect(() => {
    setRecaptcha(
      new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible'
        },
        auth
      )
    )
  }, [auth])
  
  const verifyPhone = () => {
    // grab the phone number using getValues.?(name)
    // validate it
  }

  const verifyOTP = () => {
    // grab otp from form values
    result
      ?.confirm(OTP)
      .then((result) => {
        // User signed in successfully.
        console.log(result.user)
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      })
  }



  return (
    <>
      <div id='recaptcha-container'></div>
      <div className='gap-2 flex flex-col self-center'>
        <PhoneSelect
          name='phoneNumber'
          label='Phone Number:'
          rules={validationSchema.phoneNumber}
        />
        {otpShown && (
          <TextField
            name='smsCode'
            label='SMS Code:'
            rules={validationSchema.smsCode}
          />
        )}

      <div className='flex flex-row justify-between gap-2'>

      <Button className='w-1/2' type='button' intent='secondary' onClick={() => setPanel('login')}>
        Back
      </Button>
        
      <Button
        className='w-1/2'
        type={otpShown ? 'submit' : 'button'}
        onClick={() => setOtpShown(true)}
        // some switch depending on form stage
      >
        {otpShown ? 'Submit' : 'Continue'}
      </Button>
      </div>
      </div>
    </>
  )
}

export type PhoneFormValues = keyof FormValues

export default FormFields
