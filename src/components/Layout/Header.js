import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from "../../context/cart";
import { Badge } from "antd";

function Header() {
    const [auth, setAuth] = useAuth()
    const categories = useCategory()
    const [cart] = useCart();


    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,token:''
        })
        localStorage.removeItem('auth')
    }
    return (
        
    <>
    {
        console.log(auth?.user?.role)
    }
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link to='/' class="navbar-brand"> <HiOutlineDesktopComputer/> CompHeaven</Link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput/>
            <li class="nav-item">
            <Link to='/' class="nav-link" >Головна</Link>
            </li>
            <li className="nav-item dropdown">
                <Link
                    className="nav-link dropdown-toggle"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                    >
                    Категорії
                    </Link>
                    <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" to={"/categories"}>
                        Всі категорії
                        </Link>
                    </li>
                    {categories?.map((c) => (
                        <li>
                        <Link
                            className="dropdown-item"
                            to={`/category/${c.slug}`}
                        >
                            {c.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </li>
            {
                !auth.user ? (
                    <>
                        <li class="nav-item">
                        <Link to='/register' class="nav-link" href="#">Реєстрація</Link>
                        </li>
                        <li class="nav-item">
                        <Link to='/login' class="nav-link" href="#">Вхід</Link>
                        </li>
                    </>
                ) : (
                    <>
                    <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {auth?.user?.name}
                    </Link>
                        <ul class="dropdown-menu">
                            <li><Link to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                        }`
                    }
                            class="dropdown-item" >Dashboard</Link></li>
                            <li><Link onClick={handleLogout} to='/login' class="dropdown-item" href="#">Вихід</Link></li>
                        </ul>
                    </li>
                            <li class="nav-item">
                            
                        </li>
                    </>
                )
            }
                <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                    <Badge count={cart?.length} showZero offset={[10, -5]}>
                        Кошик
                    </Badge>
                    </NavLink>
                </li>
        </ul>

        </div>
    </div>
    </nav>
    </>
  )
}

export default Header