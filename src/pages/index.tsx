import Header from '@/components/Header'
import Modal from '@/components/Home/modal'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import { useMutateContacts } from '@/hooks/contacts'
import useUser from '@/hooks/user'

const Home = () => {
  const { isSuccess, data: currentUser } = useUser()
  const { mutate: mutateContacts } = useMutateContacts()

  const welcomeMessage = isSuccess
    ? `Welcome, ${currentUser?.name}!`
    : 'Welcome!'

  return (
    <>
      <Header pageTitle='Home' />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='py-3 text-center text-3xl'>{welcomeMessage}</h1>
            <Button
              onClick={() => {
                mutateContacts({
                  name: 'Bob Jane',
                  email: '',
                  desc: '',
                  notes: '',
                  phone: '',
                  streetAddress: '',
                  region: [''],
                  tags: ['Client'],
                  pets: 'pets'
                })
              }}
            >
              New Contact
            </Button>
            <Button
              onClick={() => {
                mutateContacts({
                  docId: '4DC4lHhLgecYsqemMBfh',
                  name: 'Bob Jane',
                  email: '',
                  desc: '',
                  notes: '',
                  phone: '',
                  streetAddress: '',
                  region: [''],
                  tags: ['Client'],
                  pets: 'pets'
                })
              }}
            >
              Edit Contact
            </Button>
            <Summary />
            <br />
            <div className='flex justify-center overscroll-none'>
              <Modal />
            </div>
            <br />
            <br />
          </div>
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default Home
