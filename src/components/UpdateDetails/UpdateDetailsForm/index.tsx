import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RecaptchaVerifier, updateProfile } from 'firebase/auth'
import { SubmitHandler } from 'react-hook-form'

import Form from '@/components/UI/FormComponents/Form'
import FormFields, {
  FormValues
} from '@/components/UpdateDetails/UpdateDetailsForm/formfields'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser, { useMutateUser } from '@/hooks/user'

const UpdateDetailsForm = () => {
  const router = useRouter()
  const { currentUser: firebaseUser, auth } = useAuth()
  const { data: appUser } = useUser()
  const { mutate: mutateAppUser } = useMutateUser()

  const [error, setError] = useState('')
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier>()

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firebaseUser) {
      console.error('No current user. Somehow...')
      return
    }
    if (!appUser) return

    try {
      await recaptcha?.verify()
    } catch (error) {
      console.error(error)
      setError('Error verifying recaptcha. Please try again.')
    }

    // update user doc
    mutateAppUser({ ...appUser.info, ...data })

    // update firebase profile
    await updateProfile(firebaseUser, { displayName: data.name })

    router.reload()
  }

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

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      defaultValues={
        {
          name: firebaseUser?.displayName,
          email: firebaseUser?.email,
          phone: firebaseUser?.phoneNumber
        } as FormValues
      }
    >
      <FormFields />
      {error && <>{error}</>}
    </Form>
  )
}

export default UpdateDetailsForm
