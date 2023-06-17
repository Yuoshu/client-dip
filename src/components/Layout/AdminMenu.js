import React from 'react'
import {Link} from "react-router-dom"

function AdminMenu() {
  return (
    <>
    <div className='text-center'>
        <div className="list-group">
            <h4>Панель Адміністратора</h4>
            <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Створити категорію</Link>
            <Link to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Створити продукт</Link>
            <Link to="/dashboard/admin/products" className="list-group-item list-group-item-action">Продукти</Link>
            <Link to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Замовлення</Link>
            {/* <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">Користувачі</Link> */}
        </div>
    </div>
    </>
  )
}

export default AdminMenu