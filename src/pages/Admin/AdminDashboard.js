import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

function AdminDashboard() {
    const [auth] = useAuth()
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'> 
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                        <h3> Ім'я Адміністратора {auth?.user?.name}</h3>
                        <h3> Пошта Адміністратора {auth?.user?.email}</h3>
                        <h3> Контакти Адміністратора {auth?.user?.phone}</h3>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard