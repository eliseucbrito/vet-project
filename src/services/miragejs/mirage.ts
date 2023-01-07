// import { createServer, Factory, Model } from 'miragejs'
// import { faker } from '@faker-js/faker'

// type Patient = {
//   id: string
//   patientImage: string
//   species: string
//   owner: string
//   phoneNumber: string
//   city: string
//   lastService: Date
//   status: 'Not Initialized' | 'In Progress' | 'Completed'
// }

// export function makeServer() {
//   const server = createServer({
//     models: {
//       // eslint-disable-next-line prettier/prettier
//       patient: Model.extend<Partial<Patient>>({}),
//     },

//     factories: {
//       patient: Factory.extend({
//         id(i: number) {
//           return `TD ${i + 1}`
//         },
//         patientImage() {
//           return faker.image.animals()
//         },
//         species() {
//           return faker.animal.dog()
//         },
//         owner() {
//           return faker.name.firstName() + ' ' + faker.name.lastName()
//         },
//         phoneNumber() {
//           return faker.phone.number()
//         },
//         city() {
//           return faker.address.cityName()
//         },
//         lastService() {
//           return faker.date.recent()
//         },
//         status() {
//           return 'Not Initialized'
//         },
//       }),
//     },

//     seeds(server) {
//       server.createList('patient', 50)
//     },

//     routes() {
//       this.namespace = 'api'
//       // this.timing = 750

//       this.get('/patients')
//       this.get('/patients/:id') // create a router to list users by id
//       this.post('/patients')

//       this.namespace = ''
//       this.passthrough()
//     },
//   })

//   return server
// }
