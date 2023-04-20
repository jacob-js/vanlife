import { Link, Outlet, NavLink, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api";

export function loader({params}){
    return getHostVans(params.id)
}

export default function HostVanDetail() {
    const currentVan = useLoaderData();

    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            <Link
                to=".."
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        className={({isActive}) => isActive ? "active-link" : null}
                    >
                        Details
                    </NavLink>

                    <NavLink
                        to="pricing"
                        className={({isActive}) => isActive ? "active-link" : null}
                    >
                        Pricing
                    </NavLink>

                    <NavLink
                        to="photos"
                        className={({isActive}) => isActive ? "active-link" : null}
                    >
                        Photos
                    </NavLink>

                </nav>
                <Outlet context={{currentVan}} />
            </div>
        </section>
    )
}