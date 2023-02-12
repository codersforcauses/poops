import { useContext, useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
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
import PhoneField from '@/components/UI/FormComponents/PhoneField'
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
    const valid = await trigger?.('phoneNumber', { shouldFocus: true })
    const phoneNumber: string = getValues?.('phoneNumber')

    if (!valid)
      return setError?.('phoneNumber', { message: 'Invalid phone number' })

    if (recaptcha) {
      signInWithPhoneNumber(auth, phoneNumber, recaptcha)
        .then((confirmationResult) => {
          setOtpShown(true)
          setResult(confirmationResult)
        })
        .catch((error: FirebaseError) => {
          console.log(`Phone login failed with error code: ${error.code}`)

          if (error.code === 'auth/invalid-phone-number')
            setError?.('phoneNumber', { message: 'Invalid phone number' })
        })
    }
  }

  const verifyOTP = async () => {
    // grab otp from form values
    const otpCode: string = getValues?.('otpCode')
    try {
      await result?.confirm(otpCode)
    } catch (error) {
      setError?.('otpCode', { message: 'Incorrect code' })
    }
  }

  return (
    <>
      <div className='flex w-full flex-col gap-2 self-center'>
        <PhoneField
          name='phoneNumber'
          label='Phone Number:'
          placeholder='0412 345 678'
          rules={validationSchema.phoneNumber}
          isDisabled={otpShown}
        />
        {otpShown && (
          <TextField
            name='otpCode'
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
            id='recaptcha-container'
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
