import { Await, Link, defer, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { Suspense } from "react";

export function loader(){
    return defer({vans: getHostVans()})
}

export default function HostVans() {
    const loaderData = useLoaderData();

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <Suspense fallback={<>Loading...</>}>
                <Await resolve={loaderData.vans}>
                    {vans =>(
                        <div className="host-vans-list">
                            <section>
                                {
                                    vans.map(van => (
                                        <Link
                                            to={van.id}
                                            key={van.id}
                                            className="host-van-link-wrapper"
                                        >
                                            <div className="host-van-single" key={van.id}>
                                                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                                                <div className="host-van-info">
                                                    <h3>{van.name}</h3>
                                                    <p>${van.price}/day</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </section>
                        </div>
                    )}
                </Await>
            </Suspense>
        </section>
    )
}