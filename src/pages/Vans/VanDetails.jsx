import { Await, Link, defer, useLoaderData, useLocation } from 'react-router-dom'
import { getVan } from '../../api';
import { Suspense } from 'react';

export function loader({params}) {
    return defer({van: getVan(params.id)})
}

function VanDetails() {
    const location = useLocation();
    const loaderData = useLoaderData();
    const filterState = location.state?.search;
    const vansType = filterState && (new URLSearchParams(filterState)).get('type');

  return (
    <div className="van-detail-container">
        <Link
            to={{ pathname: '..', search: filterState }}
            relative='path'
            className="back-button"
        >&larr; <span>Back to {vansType || "all"} vans</span></Link>
        <Suspense fallback={<>Loading...</>}>
            <Await resolve={loaderData.van}>
                {van =>(
                     <div className="van-detail">
                        <img src={van.imageUrl} />
                        <i className={`van-type ${van.type} selected`}>{van.type}</i>
                        <h2>{van.name}</h2>
                        <p className="van-price"><span>${van.price}</span>/day</p>
                        <p>{van.description}</p>
                        <button className="link-button">Rent this van</button>
                    </div>
                )}
            </Await>
        </Suspense>
    </div>
  )
}

export default VanDetails