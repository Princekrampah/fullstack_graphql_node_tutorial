import React from 'react'
import { FaCar, FaUserCircle} from 'react-icons/fa'
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_VEHICLES } from '../queries/vehicleQueries';
import { GET_CUSTOMERS } from '../queries/customerQueries';
import Spinner from './Spinner';

export default function AddCustomer() {


    // const [addVehicle] = useMutation(ADD_VEHICLE, {
    //     variables: { name, brand, model, rentalCost, isRented, clientId },
    //     update(cache, { data: { addVehicle } }) {
    //         const { vehicles } = cache.readQuery({ query: GET_VEHICLES });
      
    //         cache.writeQuery({
    //           query: GET_VEHICLES,
    //           data: { vehicles: [...vehicles, addVehicle] },
    //         });
    //       },
    // })

    const { loading, error, data } = useQuery(GET_CUSTOMERS);

    if (loading) return <Spinner />
    if (error) return console.log(error)



    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" class="btn btn-outline-success btn-sm mb-4 mt-4" data-bs-toggle="modal" data-bs-target="#addCustomer">
                        Add Customer <FaUserCircle className='ml-3' />
                    </button>

                    <div class="modal fade" id="addCustomer" tabindex="-1" aria-labelledby="addCustomerLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addCustomerLabel">Add Vehicle</h5>
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
                                                aria-describedby="model"
                                            />
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
