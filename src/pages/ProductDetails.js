import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useCart();
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
        const { data } = await axios.get(
            `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
        console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
        const { data } = await axios.get(
            `/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <Layout>
        <div className="row container product-details m-5">
            <div className="col-md-6">
            <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                height="500"
                width={"200px"}
            />
            </div>
            <div className="col-md-6 product-details-info">
            <h1 className="text-center">Опис товару</h1>
            <hr />
            <h6>Назва : {product.name}</h6>
            <h6>Опис : {product.description}</h6>
            <h6>
                Ціна :
                {product?.price
                // .toLocaleString("en-US", {
                // style: "currency",
                // currency: "USD",
                // })
                }
            </h6>
            <h6>Категорія : {product?.category?.name}</h6>
            <button 
            class="btn btn-secondary ms-1"
                    onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                    }}
            >Додати до кошика</button>
            </div>
        </div>
        <hr />
        <div className="row container similar-products">
            <h4>Схожі товари</h4>
            {relatedProducts.length < 1 && (
            <p className="text-center">Схожих товарів не знайдено</p>
            )}
            <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
                <div className="card m-2" key={p._id}>
                <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                />
                <div className="card-body">
                    <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                        {p.price
                        // .toLocaleString("en-US", {
                        // style: "currency",
                        // currency: "USD",
                        // }
                        // )
                        }
                    </h5>
                    </div>
                    <p className="card-text ">
                    {p.description.substring(0, 60)}...
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
        </div>
        </Layout>
    );
};

export default ProductDetails;