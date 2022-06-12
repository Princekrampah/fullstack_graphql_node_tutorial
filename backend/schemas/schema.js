const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLNonNull } = require("graphql");
const customer = require("../models/customer");
const Customer = require("../models/customer");
const Vehicle = require("../models/vehicle");


const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        location: { type: GraphQLString },
        rating: { type: GraphQLFloat }
    })
})


const VehicleType = new GraphQLObjectType({
    name: "Vehicle",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        rentalCost: { type: GraphQLFloat },
        isRented: { type: GraphQLBoolean },
        clientId: { type: GraphQLID },
        client: {
            type: CustomerType,
            resolve(parentValue, args){
                return Customer.findById(parentValue.clientId);
            }
        }
    })
})

// REMEMBER TO EXPORT queries
const Queries = new GraphQLObjectType({
    name: "Queries",
    fields: {
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return Customer.find();
            }
        },
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args){
                return Customer.findById(args.id)
            }
        },
        vehicles: {
            type: new GraphQLList(VehicleType),
            resolve(parentValue, args){
                return Vehicle.find();
            }
        },
        vehicle: {
            type: VehicleType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args){
                return Vehicle.findById(args.id);
            }
        }
    }
})

// create mutations here  >> REMEMBER TO EXPORT MUTATION
const mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
                location: { type: GraphQLNonNull(GraphQLString) },
                rating: { type: GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parentValue, args){
                const customer = new Customer({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    location: args.location,
                    rating: args.rating
                });
                return customer.save();
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args){
                return Customer.findByIdAndRemove(args.id);
            }
        },
        updateCustomer: {
            type: CustomerType,
            args: { 
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
                location: { type: GraphQLNonNull(GraphQLString) },
                rating: { type: GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parentValue, args){
                return Customer.findOneAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            email: args.email,
                            phone: args.phone,
                            location: args.location,
                            rating: args.rating
                        }
                    },
                    { new: true }
                );
            }
        },
        addVehicle: {
            type: VehicleType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                brand: { type: GraphQLNonNull(GraphQLString) },
                model: { type: GraphQLNonNull(GraphQLString) },
                rentalCost: { type: GraphQLNonNull(GraphQLFloat) },
                isRented: { type: GraphQLNonNull(GraphQLBoolean) },
                clientId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args){
                const vehicle = new Vehicle({
                    name: args.name,
                    brand: args.brand,
                    model: args.model,
                    rentalCost: args.rentalCost,
                    isRented: args.isRented,
                    clientId: args.clientId
                });
                return vehicle.save();
            }
        },
        deleteVehicle: {
            type: VehicleType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, args){
                return Vehicle.findByIdAndRemove(args.id);
            }
        },
        updateVehicle: {
            type: VehicleType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                brand: { type: GraphQLNonNull(GraphQLString) },
                model: { type: GraphQLNonNull(GraphQLString) },
                rentalCost: { type: GraphQLNonNull(GraphQLFloat) },
                isRented: { type: GraphQLNonNull(GraphQLBoolean) },
                clientId: { type: GraphQLNonNull(GraphQLID) } 
            },
            resolve(parentValue, args){
                return Vehicle.findOneAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            brand: args.brand,
                            model: args.model,
                            rentalCost: args.rentalCost,
                            isRented: args.isRented,
                            clientId: args.clientId
                        }
                    },
                    { new: true }
                );
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: Queries,
    mutation
});