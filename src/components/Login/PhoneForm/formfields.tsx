import { useContext, useEffect, useState } from 'react'
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
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
  otpCode?: string
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

  const verifyPhone = async () => {
    const valid = await trigger?.('phoneNumber')
    if (!valid) return

    const phoneNumber: string = getValues?.('phoneNumber')

    if (recaptcha) {
      signInWithPhoneNumber(auth, phoneNumber, recaptcha)
        .then((confirmationResult) => {
          setOtpShown(true)
          setResult(confirmationResult)
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error)
        })
    }
    setOtpShown(true)
  }

  const verifyOTP = () => {
    // grab otp from form values
    const otpCode: string = getValues?.('otpCode')
    result
      ?.confirm(otpCode)
      .then((result) => {
        // User signed in successfully.
        console.log(result.user)
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error)
        setError?.('smsCode', { message: 'Incorrect code' })
      })
  }

  return (
    <>
      <div id='recaptcha-container'></div>
      <div className='flex flex-col gap-2 self-center'>
        <PhoneSelect
          name='phoneNumber'
          label='Phone Number:'
          rules={validationSchema.phoneNumber}
        />
        {otpShown && (
          <TextField
            name='smsCode'
            label='SMS Code:'
            rules={validationSchema.otpCode}
          />
        )}

        <div className='flex flex-row justify-between gap-2'>
          <Button
            className='w-1/2'
            type='button'
            intent='secondary'
            onClick={() => setPanel('login')}
          >
            Back
          </Button>

          <Button
            className='w-1/2'
            type={otpShown ? 'submit' : 'button'}
            onClick={otpShown ? verifyOTP : verifyPhone}
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
