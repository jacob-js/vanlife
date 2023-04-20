import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { getVans } from '../../api';

export function loader({params}) {
    return getVans(params.id)
}

function VanDetails() {
    const location = useLocation();
    const van = useLoaderData();
    const filterState = location.state?.search;
    const vansType = filterState && (new URLSearchParams(filterState)).get('type');

  return (
    <div className="van-detail-container">
        <Link
            to={{ pathname: '..', search: filterState }}
            relative='path'
            className="back-button"
        >&larr; <span>Back to {vansType || "all"} vans</span></Link>
        {van ? (
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        ) : <h2>Loading...</h2>}
    </div>
  )
}

export default VanDetails