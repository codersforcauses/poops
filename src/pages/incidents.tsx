import Header from '@/components/Header'

const Incidents = () => {
  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Incidents' />

      <main>
        <p>Incidents Page</p>

        <div>
          <form>
            <label>
              User Email:
              <input type='text' name='email' />
            </label>

            <label>
              User Name:
              <input type='text' name='name' />
            </label>

            <input type='submit' value='Submit' />
          </form>
        </div>
      </main>
    </>
  )
}

export default Incidents
