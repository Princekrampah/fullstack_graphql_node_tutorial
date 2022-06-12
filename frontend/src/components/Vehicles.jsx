import { GET_VEHICLES } from "../queries/vehicleQueries"
import { useQuery } from "@apollo/client"
import Vehicle from "./Vehicle";
import React from "react";
import Spinner from "./Spinner";


export default function () {
    const { loading, error, data } = useQuery(GET_VEHICLES);

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong...:(</p>

  return (
    <>  
    {!loading && !error && (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Rental Cost</th>
                    <th>Is Rented</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { data.vehicles.map(vehicle => (
                    <Vehicle key={vehicle.id} vehicle={vehicle} />
                )) }
            </tbody>
        </table>
    )}
    </>
  )
}
