import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCategory, setFoodCategory] = useState([]);
    const [foodData2, setFoodData2] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();

        // console.log(response[0], response[1]);
        setFoodData2(response[0]);
        setFoodCategory(response[1]);
    }

    useEffect(() => {
        loadData()
    }, []);


    return (
        <div>
            <div><Navbar /></div>

            {/* Carousel */}
            <div>
                <p>Home Page</p>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center" >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>


            <div className='container'>
                {
                    foodCategory !== []
                        ? foodCategory.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodData2 !== []
                                        ? foodData2.filter((item) => 
                                            (item.CategoryName === data.CategoryName) &&
                                            (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                                            .map((filterItems) => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card 
                                                    // foodname = {filterItems.name} 
                                                    foodItems = {filterItems}
                                                    options = {filterItems.options[0]}
                                                    // imgSrc = {filterItems.img}
                                                    />
                                                </div>
                                            )
                                        })

                                        : <div>No Such data found</div>
                                    }
                                </div>
                            )
                        })
                        : ""
                }
            </div>

            <div><Footer /></div>
        </div>
    )
}
