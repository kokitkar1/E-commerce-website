import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import '../../styles/Userdashboard.css'

const Dashboard = () => {

  const [auth] = useAuth()


  return (
    <Layout title={"Dashboard - E-wish"}>

        <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">

                <div className="col-md-3 dashboard1">
                    <UserMenu />
                </div>

                <div className="col md-9">
                  <div className="card w-75 p-3 column">
                  <h1 className='text-center'> Welcome</h1>
                    <h4 >{auth?.user?.name}</h4>
                    <h6>{auth?.user?.phone}</h6>
                    <h6>{auth?.user?.email}</h6>
                    <h6>{auth?.user?.address}</h6>
                  </div>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Dashboard