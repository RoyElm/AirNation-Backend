const mongoose = require("mongoose");

const OrderFlightSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "UserModel"
        },
        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Missing Flight Id."],
            ref: "FlightModel"
        },
        ticketsAmount: {
            type: Number,
            required: [true, "Missing tickets Amount."],
            min: [1, "Tickets Amount can't be below 1."],
            max: [10, "Tickets Amount can't exceed 10."]
        },
        totalPrice: {
            type: Number,
            required: [true, "Missing total price."],
            min: [0.4, "total Price can't be below 0.4$."],
            max: [100000, "total Price can't exceed 100000$."]
        },
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    }
);

OrderFlightSchema.virtual("flight", {
    ref: "FlightModel",
    localField: "flightId",
    foreignField: "_id",
    justOne: true
});

const OrderFlightModel = mongoose.model("OrderFlightModel", OrderFlightSchema, "OrderFlights");

module.exports = OrderFlightModel;

