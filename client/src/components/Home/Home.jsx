import React from 'react'
import './Home.css'
import Card from '../Card/Card'

const Home = () => {
    return (
        <div className='home-container'>
            <div className="search-filters">

            </div>
            <div className="matching-jobs">
                <Card/>
            </div>
        </div>
    )
}

export default Home
