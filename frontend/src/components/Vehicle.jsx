import React from 'react'
import { FaTrash, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { DELETE_VEHICLE_MUTATION } from '../mutations/vehicleMutaions';
import { useMutation } from '@apollo/client';
import { GET_VEHICLES } from '../queries/vehicleQueries';

export default function Vehicle({ vehicle }) {

    const [deleteMutation] = useMutation(DELETE_VEHICLE_MUTATION, {
        variables: { id: vehicle.id },
        refetchQueries: [{query: GET_VEHICLES}]
    })

    return (
        <tr>
            <td>{vehicle.name}</td>
            <td>{vehicle.brand}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.rentalCost}</td>
            <td>{vehicle.isRented ? <span className='btn btn-sm btn-success'><FaCheckCircle className='' /></span> : <span className='btn btn-sm btn-danger'><FaTimes /></span>}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={deleteMutation}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
