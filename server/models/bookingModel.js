import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle',
    },
    driverDetails: {
      driverFirstName: { type: String, required: true },
      driverLastName: { type: String, required: true },
      driverEmail: { type: String, required: true },
      driverContactNumber: { type: Number, required: true },
      driverAddress: { type: String, required: true },
      driverNIC: { type: String, required: true },
      driverLicenseNumber: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    tax: {
      type: Number,
      required: true,
      default: 0.0,
    },
    numberOfDays: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
