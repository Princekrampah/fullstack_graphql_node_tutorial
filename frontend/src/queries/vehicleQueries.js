import { gql } from '@apollo/client';

const GET_VEHICLES = gql`
    query getVehicles{
        vehicles{
            id
            name
            brand
            model
            rentalCost
            isRented
            client{
                id
                name
            }
        }
    }
`;

export { GET_VEHICLES };