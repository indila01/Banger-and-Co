import bcrypt from 'bcryptjs'

const users = [
  {
    firstName: 'Indila',
    lastName: 'Dineth',
    email: 'indiladineth@yahoo.com',
    contactNumber: 772955859,
    address: 'castle street',
    NIC: 123,
    licenseNumber: 123,
    birthday: 1999 - 2 - 19,
    password: bcrypt.hashSync('indila', 10),
    isAdmin: true,
  },
  {
    firstName: 'Sajani',
    lastName: 'Ganegoda',
    email: 'sajani@yahoo.com',
    contactNumber: 22333223432,
    address: 'sajani street',
    NIC: 1212233,
    licenseNumber: 3232,
    birthday: 1998 - 6 - 19,
    password: bcrypt.hashSync('sajani', 10),
    isAdmin: false,
  },
  {
    firstName: 'Binuka',
    lastName: 'Amarasinghe',
    email: 'binuka@yahoo.com',
    contactNumber: 22333232,
    address: 'binuka street',
    NIC: 1212233,
    licenseNumber: 3232,
    birthday: 1999 - 4 - 19,
    password: bcrypt.hashSync('binuka', 10),
    isAdmin: false,
  },
]

export default users
