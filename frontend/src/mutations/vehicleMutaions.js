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


export { DELETE_VEHICLE_MUTATION };
