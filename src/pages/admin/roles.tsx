import router from 'next/router'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'

import ROLES_DATA from '../../../mockData/ROLES_DATA.json'

//current: table consists of mockdata
//todo: update firebase schema and use that data

const Roles = () => {
  return (
    <>
      <Header pageTitle='Roles' />
      <div className='main-style'>
        <div className='m-auto flex h-14 w-full flex-row'>
          <div className='m-auto flex-1 text-center'>
            <Button
              type='button'
              size='medium'
              onClick={() => router.push('/admin')}
            >
              Back
            </Button>
          </div>
          <h1 className='m-3 flex-1 text-center text-2xl'>Roles</h1>

          <div className='flex-1'></div>
        </div>

        <div className='flex max-h-screen'>
          <table className='m-auto flex border-spacing-3 flex-row'>
            <tbody>
              {ROLES_DATA.map((roles, i) => (
                <div key={i} className='border-slate-700 flex flex-row border'>
                  <tr className='flex flex-col text-left'>
                    <th>Id:</th>
                    <th>Role:</th>
                    <th>Assigned By:</th>
                    <th>Created At:</th>
                  </tr>
                  <tr className='mr-1 flex flex-1 flex-col text-right'>
                    <td>{roles.id}</td>
                    <td>{roles.roles}</td>
                    <td>{roles.assigned_by}</td>
                    <td>{roles.created_at}</td>
                  </tr>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NavBar />
    </>
  )
}

export default Roles
