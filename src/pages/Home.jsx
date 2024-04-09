import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/displayData", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response_json = await response.json();

        setfoodCat(response_json[1]);
        setfoodItem(response_json[0]);

    }
    useEffect(() => {
        loadData()
    }, []);

    return (
        <div>
            <Navbar />
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption d-none d-md-block" style={{ zIndex: 3 }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="carousel-item active" style={{ objectFit: "contain" }}>
                        <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" style={{ objectFit: "contain" }}>
                        <img src="https://source.unsplash.com/random/900x700?pizza" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" style={{ objectFit: "contain" }}>
                        <img src="https://source.unsplash.com/random/900x700?sandwich" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>{
                foodCat.length > 0
                    ? foodCat.map((data) => {
                        return <div className='row mb-3'><div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                            <hr />
                            {foodItem.length > 0
                                ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                    .map((filtered_item) => {
                                        return (<div key={filtered_item} className='col-12 col-md-6 col-lg-3'><Card title={filtered_item.name} image={filtered_item.img}
                                            options={filtered_item.options[0]} desc={filtered_item.description} /></div>)
                                    })
                                : <div> No such data found</div>
                            }
                        </div>
                    })
                    : <div>""</div>
            }</div>
            <Footer />
        </div>
    )
}
