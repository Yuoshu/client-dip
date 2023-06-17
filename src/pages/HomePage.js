import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data?.success) {
            setCategories(data?.category);
        }
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/product/get-product`);
        setLoading(false);
        console.log(data.products)
        setProducts(data.products);
        } catch (error) {
        setLoading(false);
        console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
        const { data } = await axios.get("/api/v1/product/product-count");
        setTotal(data?.total);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts([...products, ...data?.products]);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
        all.push(id);
        } else {
        all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
        const { data } = await axios.post("/api/v1/product/product-filters", {
            checked,
            radio,
        });
        setProducts(data?.products);
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <Layout title={"Всі товари "}>
        {/* banner image */}
        {/* <img
            src="/images/banner.png"
            className="banner-img"
            alt="bannerimage"
            width={"100%"}
        /> */}
        {/* banner image */}
        <div className="container-fluid row mt-3 home-page">
            <div className="col-md-3 filters">
            <h4 className="text-center">Відсортувати за категорією</h4>
            <div className="d-flex flex-column">
                {categories?.map((c) => (
                <Checkbox
                    className="m-2"
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                    {c.name}
                </Checkbox>
                ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">Відсортувати за ціною</h4>
            <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                    <div key={p._id}>
                    <Radio className="m-2" value={p.array}>{p.name}</Radio>
                    </div>
                ))}
                </Radio.Group>
            </div>
            <div className="d-flex flex-column">
                <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
                >
                Скинути фільтри
                </button>
            </div>
            </div>
            <div className="col-md-9 ">
            <h1 className="text-center">Всі товари</h1>
            <div className="d-flex flex-wrap">
                {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                    <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name.substring(0, 10)}
                    />
                    <div className="card-body">
                    <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                    </div>
                    <div>
                        <h5 className="card-title card-price">
                        {p.price
                        // .toLocaleString("en-US", {
                            //     style: "currency",
                            //     currency: "USD",
                            // })
                        }
                        </h5>
                    </div>
                    <p className="card-text ">
                        {p.description.substring(0, 30)}...
                    </p>
                    <div className="card-name-price">
                        <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        >
                        Детальніше
                        </button>
                        <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                        }}
                        >
                        ДО КОШИКА
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            {/* <div className="m-2 p-3">
                {products && products.length < total && (
                <button
                    className="btn loadmore"
                    onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    }}
                >
                    {loading ? (
                    "Loading ..."
                    ) : (
                    <>
                        {" "}
                        Завантажити <AiOutlineReload />
                    </>
                    )}
                </button>
                )}
            </div> */}
            </div>
        </div>
        </Layout>
    );
};

export default HomePage;





// import React, {useState, useEffect} from 'react'
// import Layout from '../components/Layout/Layout'
// import { useAuth } from '../context/auth'
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Radio, Checkbox } from 'antd';
// import { Prices } from "../components/Prices";


// function HomePage() {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [checked, setChecked] = useState([]);
//     const [radio, setRadio] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);

//      //get all cat
//     const getAllCategory = async () => {
//         try {
//         const { data } = await axios.get("/api/v1/category/get-category");
//         if (data?.success) {
//             setCategories(data?.category);
//             console.log(data.category)
//         }
//         } catch (error) {
//         console.log(error);
//         }
//     };
    
//     useEffect(() => {
//         getAllCategory();
//         getTotal();
//     }, [])

//       //get products
//     const getAllProducts = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(`/api/v1/product/get-product`);
//             setLoading(false);
//             setProducts(data.products);
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//         }
//     };

//     //getTOtal COunt
//     const getTotal = async () => {
//         try {
//         const { data } = await axios.get("/api/v1/product/product-count");
//         setTotal(data?.total);
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     // filter by cat
//     const handleFilter = (value, id) => {
//         let all = [...checked];
//         if (value) {
//         all.push(id);
//         } else {
//         all = all.filter((c) => c !== id);
//         }
//         setChecked(all);
//     };

//     useEffect(() => {
//         if (!checked.length || !radio.length) getAllProducts();
//     }, [checked.length, radio.length]);

//     useEffect(() => {
//         if (checked.length || radio.length) filterProduct();
//     }, [checked, radio]);

//         //get filterd product
//     const filterProduct = async () => {
//         try {
//         const { data } = await axios.post("/api/v1/product/product-filters", {
//             checked,
//             radio,
//         });
//         setProducts(data?.products);
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (page === 1) return;
//         loadMore();
//         }, [page]);
//         //load more
//         const loadMore = async () => {
//             try {
//             setLoading(true);
//             const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//             setLoading(false);
//             setProducts([...products, ...data?.products]);
//             } catch (error) {
//             console.log(error);
//             setLoading(false);
//             }
//         };


//     return (
//     <Layout title={'CompShop'}>
//         {console.log(categories)}
//         <div className='row mt-3'>
//             <div className=' col-md-2'>
//                 <h4 className='text-center'>Filter By Category</h4>
//                     <div className="d-flex flex-column m-3">
//                     {
//                         categories?.map((c) => (
//                             <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
//                                 {c.name}
//                             </Checkbox>
//                         ))
//                     }
//                     </div>
//                 <h4 className='text-center mt-4'>Filter By Price</h4>
//                     <div className="d-flex flex-column m-3">
//                     <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//                         {Prices?.map((p) => (
//                             <div key={p._id}>
//                             <Radio value={p.array}>{p.name}</Radio>
//                             </div>
//                         ))}
//                     </Radio.Group>
//                     </div>
//                     <div className="d-flex flex-column m-3">
//                             <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
//                     </div>
//             </div>
//             <div className=' col-md-9'>
//                 {JSON.stringify(radio,null,4)}
//                 <h1 className='text-center'>All products</h1>
//                 <div className='d-flex flex-wrap'>
//                     {products?.map((p) => (
//                         // <Link
//                         //     key={p._id}
//                         //     to={`/dashboard/admin/product/${p.slug}`}
//                         //     className="product-link"
//                         // >
//                             <div className="card m-2" style={{ width: "18rem" }}>
//                             <img
//                                 src={`/api/v1/product/product-photo/${p._id}`}
//                                 className="card-img-top"
//                                 alt={p.name}
//                             />
//                             <div className="card-body">
//                                 <h5 className="card-title">{p.name}</h5>
//                                 <p className="card-text">{p.description.substring(0, 30)}</p>
//                                 <p className="card-text">{p.price}</p>
//                                 <button href="#" className="btn btn-primary ms-1">More Details</button>
//                                 <button href="#" className="btn btn-primary ms-1">ADD TO CART</button>
//                             </div>
//                             </div>
//                         // </Link>
//                     ))}
//                 </div>
//                 {/* <div className='m-2 p-3'>
//                     {
//                         products && products.length < total && (
//                             <button className='btn btn-warning' onClick={(e) => {
//                                 e.preventDefault();
//                                 setPage(page + 1);
//                             }}>
//                                 {
//                                     loading ? 'Loading...' : "Load more"
//                                 }
//                             </button>
//                         )
//                     } 
//                 </div> */}
//             </div>
//         </div>
//     </Layout>
//     )
// }

// export default HomePage