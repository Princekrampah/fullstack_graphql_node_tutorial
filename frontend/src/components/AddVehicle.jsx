import React from 'react'
import { FaCar } from 'react-icons/fa'

export default function AddVehicle() {
    return (
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
                            <form>
                                <div className='mb-3'>
                                    <label for="name" className='form-label'>Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        aria-describedby="vehicle name"
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label for="brand" className='form-label'>Brand</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="brand"
                                        aria-describedby="brand"
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label for="model" className='form-label'>Model</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="model"
                                        aria-describedby="model"
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label for="isRented" className='form-label'>Is Rented</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
