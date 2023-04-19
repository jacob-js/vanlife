import { useEffect, useState } from 'react'
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api';

export async function vansLoader(){
    return getVans()
}

const TYPES = ["simple", "luxury", "rugged"];

function Vans() {
    const vans = useLoaderData();
    const [displayedVans, setDisplayedVans] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const typeParams = searchParams.get('type');

    useEffect(() =>{
        (() =>{
            if(typeParams) setDisplayedVans(vans.filter(van => van.type === typeParams));
            else setDisplayedVans(vans)
        })()
    }, [vans, typeParams])

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
        <div className="van-list">
            {
                displayedVans?.map(van => (
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
    </div>
  )
}

export default Vans