import { gql } from "@apollo/client";


const DELETE_VEHICLE_MUTATION = gql`
    mutation deleteVehicle($id: ID!){
        deleteVehicle(id: $id){
            id
            name
            model
            brand
        }
    }
`;

const ADD_VEHICLE = gql`
    mutation addVehicle($name: String!, $brand: String!, $model: String!, $rentalCost: Float!, $isRented: Boolean!,  $clientId: ID!){
        addVehicle(name: $name, brand: $brand, model: $model, rentalCost: $rentalCost, isRented: $isRented, clientId: $clientId){
            id
            name
            brand
            model
            rentalCost
            isRented
            client{
                id
                name
                email
                phone
                location
            }
        }
    }
`;


export { DELETE_VEHICLE_MUTATION, ADD_VEHICLE };
