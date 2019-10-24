import { fetchData } from './fetchdata';
import { GraphQLServer} from 'graphql-yoga';
import { response } from 'express';
import { FilterRootFields } from 'graphql-tools';


const url = 'https://swapi.co/api/people/';

const runApp = data => {


  const typeDefs = `
  type Query{
    personaje(name: String!): Personaje!
    personajes(gender: String!): Personaje!
    character(id: Int!): Personaje!
    personajess(page: Int!, numer: Int, url: String!): [Personaje]!
  } 
  type Personaje{
    name: String!
    gender: String!
    url: String!
  }
  `
  
  const resolvers = {
    Query: {
      personaje: (parent, args, ctx, info)=>{
        const result = data.find(obj => obj.name === args.name)
        return{
          name: result.name,
          gender: result.gender,
          url: result.url
        }
      },
      personajes: (parent, args, ctx, info)=>{
        const result = data.find(obj => obj.gender === args.gender)
        return{
          name: result.name,
          gender: result.gender,
          url: result.url
        }
      },
      personajess: (parent, args, ctx, info)=>{
        const page = args.page || 1;
        const number = args.number || 10;
        const filter = data.filter(elem => elem.name.includes(args.name || elem.name))
                           .filter(elem => elem.gender.includes(args.gender || elem.gender)).slice(init, end);
        
        return filter.map(obj => {
           return {
               name: obj.name,
               gender: obj.gender,
               url: obj.url,
          }                    
        })
      },
      character: (parent, args, ctx, info)=>{
        const result = data.find(obj => obj.id === args.id)
        return{
          name: result.name,
          gender: result.gender,
          url: result.url
        }
      }
    }
  }        
      

  const server = new GraphQLServer({typeDefs, resolvers})
  server.start({port: "3005"})
};
// main program
fetchData(runApp, url);