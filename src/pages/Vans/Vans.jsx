import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api';

const TYPES = ["simple", "luxury", "rugged"];

function Vans() {
    const [vans, setVans] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const typeParams = searchParams.get('type');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            const data = await getVans()
            setVans(data)
            setLoading(false)
        }
        
        loadVans()
    }, [])

  return (
    <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            {
                TYPES.map(type => <button onClick={() => setSearchParams({type})} className={`van-type ${type} ${typeParams === type ? 'selected': ''}`} key={type}>{type}</button>)
            }
            {
                typeParams && <button className='van-type clear-filters' onClick={() =>setSearchParams({})}>Clear filter</button>
            }
        </div>
        {
            loading ?
            <div>Loading...</div>:
            <div className="van-list">
                {
                    vans.map(van => (
                        <div key={van.id} className="van-tile">
                            <Link to={van.id} state={{search: searchParams.toString()}}>
                                <img src={van.imageUrl} />
                                <div className="van-info">
                                    <h3>{van.name}</h3>
                                    <p>${van.price}<span>/day</span></p>
                                </div>
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                            </Link>
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default Vans