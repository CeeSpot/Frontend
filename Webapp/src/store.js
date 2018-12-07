// // import axios from 'axios'
// // import jwt_decode from 'jwt-decode'
// // import Vuex from 'vuex'
// // import { JSON_TOKEN } from './constants'
// // import { API_PORT} from "./constants";
// // import { API_URL} from "./constants";
// // // const store2 = new Vuex.Store({
// export const AUTH_STORE = {
//   state: {
//     jwt: localStorage.getItem(JSON_TOKEN),
//     endpoints: {
//       obtainJWT: API_URL + API_PORT + '/api/users/authenticate',
//       refreshJWT: API_URL + API_PORT + '/api/users/refresh'
//     }
//   },
//   mutations: {
//     updateToken(state, newToken){
//       localStorage.setItem(JSON_TOKEN, newToken);
//       state.jwt = newToken;
//     },
//     removeToken(state){
//       localStorage.removeItem(JSON_TOKEN);
//       state.jwt = null;
//     }
//   },
//   actions:{
//     obtainToken(username, password){
//       const payload = {
//         username: username,
//         password: password
//       };
//       axios.post(this.state.endpoints.obtainJWT, payload)
//         .then((response)=>{
//           this.commit('updateToken', response.data.token);
//         })
//         .catch((error)=>{
//           console.log(error);
//         });
//     },
//     refreshToken(){
//       const payload = {
//         token: this.state.jwt
//       };
//       axios.post(this.state.endpoints.refreshJWT, payload)
//         .then((response)=>{
//           this.commit('updateToken', response.data.token)
//         })
//         .catch((error)=>{
//           console.log(error)
//         });
//     },
//     inspectToken(){
//       const token = this.state.jwt;
//       if(token){
//         const decoded = jwt_decode(token);
//         const exp = decoded.exp;
//         const orig_iat = decode.orig_iat;
//         if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
//           this.dispatch('refreshToken')
//         } else if (exp -(Date.now()/1000) < 1800){
//           // DO NOTHING, DO NOT REFRESH
//         } else {
//           // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
//         }
//       }
//     }
//   }
// };
