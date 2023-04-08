import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios";
import {Checkbox,Radio} from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import {useCart} from "../context/cart"
import { toast } from 'react-hot-toast';
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [cart, setCart] = useCart();


  const navigate = useNavigate();


    // Getting All category

    const getAllCategory = async ()=>{
      try {
          const {data} = await axios.get('/api/v1/category/get-category')
            if(data?.success){
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
        }
    }


    // For getting save data we use useEffect hook

    useEffect(()=>{
        getAllCategory();
        getTotal();
    }, []);





  // Get All product
  const getAllProducts = async () =>{
    try {
      setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  

  // Get total for pagination call the api

  const getTotal = async ()=>{
    try {
      const {data} = await axios.get('/api/v1/product/product-count')
          setTotal(data?.total)
        } catch (error) {
          console.log(error)
        }
      }


      useEffect(()=>{
        if(page === 1) return;
        loadMore();
      },[page])


  //load More
  const loadMore = async()=>{
    try {
      setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }


  const handleFilter = (value,id) =>{
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all)
  };


  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts();
  },[checked.length,radio.length])

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[checked,radio])





  // Get Filtered Product
  const filterProduct = async () =>{
    try {
      const {data} = await axios.post('/api/v1/product/product-filters', {checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Layout title={"All Products - Best Offers E wish"}>
      {/* banner image */}
      {/* <img src="/images/banner.png" className="banner-img" alt="banner_image" width={"100%"} /> */}
      {/* banner image */}

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="/images/ban1.jpg" className="d-block w-100" alt="..." style={{width: 100, height: 500}}/>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="/images/ban2.jpg" className="d-block w-100" alt="..." style={{width: 100, height: 500}} />
            </div>
            <div className="carousel-item" >
              <img src="/images/ban3.jpg" className="d-block w-100" alt="..." style={{width: 100, height: 500}} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
        </button>
        </div>


        <div className="container-fluid row mt-3 home-page">
          <div className="col-md-3 filters">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} >
                {c.name}
              </Checkbox>
            ))}
            </div>

            {/*------ Price Filter -------*/}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) =>(
                <div key={p._id} >
                   <Radio value={p.array} > { p.name } </Radio>
                </div>
              ))}
            </Radio.Group>
            </div>

            <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={() => window.location.reload()} >RESET FILTERS</button>
            </div>


          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
                        <div className="card m-2" key={p._id}>
                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                            <div className="card-name-price">
                                <h5 className="card-title">{p.name}</h5>
                                <h5 className="card-title card-price">{p.price.toLocaleString("en-IN", {style: "currency",currency: "INR",})}</h5>
                            </div>    
                                <p className="card-text">{p.description.substring(0,60)}...</p>
                                {/* <p className="card-text">$ {p.price}</p> */}
                                <div className="card-name-price">
                                  <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p.slug}`)}> More Details</button>
                                  <button className="btn btn-dark ms-1" onClick={() => {setCart([...cart, p]);localStorage.setItem("cart",JSON.stringify([...cart, p]));toast.success("Item Added to cart");}}>ADD TO CART</button>
                                </div>    
                                {/* <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)} >More Details</button>
                                <button class="btn btn-secondary ms-1" onClick={() => {setCart([...cart,p]); localStorage.setItem('cart', JSON.stringify([...cart,p])); toast.success('Item Added To Cart')}} >ADD TO CART</button> */}
                            </div>
                        </div>
                    ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length < total && (
                <button className='btn loadmore' onClick={(e)=>{e.preventDefault(); setPage(page+1);}}>
                  {loading ? ("Loading..." ):(<> {" "} Loadmore <AiOutlineReload /> </>)}
                </button>
              )}
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage