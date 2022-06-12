import React from 'react'
import { FaCar } from 'react-icons/fa'
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_VEHICLE } from '../mutations/vehicleMutaions';
import { GET_VEHICLES } from '../queries/vehicleQueries';
import { GET_CUSTOMERS } from '../queries/customerQueries';
import Spinner from './Spinner';

export default function AddVehicle() {

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [isRented, setIsRented] = useState(false);
    const [rentalCost, setRentalCost] = useState(0.0);
    const [clientId, setClientId] = useState("");

    const [addVehicle] = useMutation(ADD_VEHICLE, {
        variables: { name, brand, model, rentalCost, isRented, clientId },
        update(cache, { data: { addVehicle } }) {
            const { vehicles } = cache.readQuery({ query: GET_VEHICLES });
      
            cache.writeQuery({
              query: GET_VEHICLES,
              data: { vehicles: [...vehicles, addVehicle] },
            });
          },
    })

    const { loading, error, data } = useQuery(GET_CUSTOMERS);

    if (loading) return <Spinner />
    if (error) return console.log(error)



    const onSubmit = (e) => {
        e.preventDefault();
        console.log(name, brand, model, rentalCost, isRented, clientId);

        // add to db
        addVehicle(name, brand, model, rentalCost, Boolean(isRented), clientId);

        setName("");
        setBrand("");
        setModel("");
        setIsRented("");
        setRentalCost(0.0);
        setClientId("");
    }

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" class="btn btn-outline-success btn-sm mb-4" data-bs-toggle="modal" data-bs-target="#addVehicle">
                        Add Vehicle <FaCar className='ml-3' />
                    </button>

                    <div class="modal fade" id="addVehicle" tabindex="-1" aria-labelledby="addVehicleLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addVehicleLabel">Add Vehicle</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className='mb-3'>
                                            <label htmlFor="name" className='form-label'>Name</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                placeholder='Vehicle Name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                aria-describedby="vehicle name"
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="brand" className='form-label'>Brand</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="brand"
                                                placeholder='Vehicle Brand'
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                                aria-describedby="brand"
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="model" className='form-label'>Model</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="model"
                                                placeholder='Vehicle Model'
                                                value={model}
                                                onChange={(e) => setModel(e.target.value)}
                                                aria-describedby="model"
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="cost" className='form-label'>Cost</label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="cost"
                                                placeholder='Vehicle Cost'
                                                value={rentalCost}
                                                onChange={(e) => setRentalCost(parseFloat(e.target.value))}
                                                aria-describedby="cost"
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="isRented" className='form-label'>Is Rented</label>
                                            <select
                                                className="form-select"
                                                id='isRented'
                                                value={isRented}
                                                onChange={(e) => (setIsRented(e.target.value)
                                                )}
                                            >
                                                <option value={false}>False</option>
                                                <option value={true}>True</option>
                                            </select>
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="customer" className='form-label'>Customer</label>
                                            <select
                                                className="form-select"
                                                id='customer'
                                                value={clientId}
                                                onChange={(e) => setClientId(e.target.value)}
                                            >
                                                <option value="">Select client</option>
                                                { data.customers.map((customer) => (
                                                    <option key={customer.id} value={customer.id}>
                                                        {customer.name}
                                                    </option>
                                                )) }
                                            </select>
                                        </div>

                                        <div class="modal-footer">
                                            <button
                                                type="submit"
                                                class="btn btn-outline-primary btn-sm"
                                                data-bs-dismiss="modal"
                                            >
                                                Submit
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
