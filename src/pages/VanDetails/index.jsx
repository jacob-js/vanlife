import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

function VanDetails() {
    const params = useParams()
    const location = useLocation();
    const [van, setVan] = useState(null);
    const filterState = location.state?.search;
    const vansType = filterState && (new URLSearchParams(filterState)).get('type');

    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

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