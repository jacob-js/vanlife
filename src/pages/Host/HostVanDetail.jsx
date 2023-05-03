import { Link, Outlet, NavLink, useLoaderData, defer, Await } from "react-router-dom"
import { getVan } from "../../api";
import { Suspense } from "react";

export function loader({params}){
    return defer({van: getVan(params.id)})
}

export default function HostVanDetail() {
    const loaderData = useLoaderData();

    return (
        <section>
            <Link
                to=".."
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            <div className="host-van-detail-layout-container">
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Await resolve={loaderData.van}>
                        {currentVan =>(
                            <>
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
                            </>
                        )}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}