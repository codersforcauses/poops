import { useRouter } from 'next/router'
import { updateProfile } from 'firebase/auth'
import { SubmitHandler } from 'react-hook-form'

import Form from '@/components/UI/FormComponents/Form'
import FormFields, {
  FormValues
} from '@/components/UpdateDetails/UpdateDetailsForm/formfields'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser, { useMutateUser } from '@/hooks/user'

const UpdateDetailsForm = () => {
  const router = useRouter()
  const { currentUser: firebaseUser } = useAuth()
  const { data: appUser } = useUser()
  const { mutate: mutateAppUser } = useMutateUser()

  if (appUser?.info.name && appUser?.info.email && appUser?.info.phone) {
    router.replace('/')
  }

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firebaseUser) {
      console.error('No current user. Somehow...')
      return
    }
    if (!appUser) return

    // update user doc
    mutateAppUser({ ...appUser.info, ...data })

    // update firebase profile
    await updateProfile(firebaseUser, { displayName: data.name })

    router.reload()
  }
  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      defaultValues={
        {
          name: appUser?.info.name,
          email: appUser?.info.email,
          phone: appUser?.info.phone
        } as FormValues
      }
    >
      <FormFields />
    </Form>
  )
}

export default UpdateDetailsForm
