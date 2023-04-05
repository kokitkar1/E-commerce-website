import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'



const Categories = () => {

    const categories = useCategory();


  return (
    <Layout title={'All Categories - E wish'}>
        <div className='container' style={{ marginTop: "5vh" }}>
            <div className="row container">
                {categories.map((c) => (
                    <div className="col-md-3 mt-3 mb-3 gx-3 gy-3" key={c.id }>
                            <Link to={`/category/${c.slug}`} className='btn cat-btn' > {c.name} </Link>
                        </div>
                    ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories