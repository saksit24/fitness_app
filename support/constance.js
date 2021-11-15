import { AsyncStorage } from 'react-native';
let user_token_encode = null
export const get_user_token = async () => {
    await AsyncStorage.getItem('user_token').then((result) => {

     
        return result
    })
}



export const user_token = get_user_token()




var jwt_decode = require('jwt-decode');
export const delete_token = () => {
    AsyncStorage.removeItem('user_token')

}


const decode_token = async () => {
    await AsyncStorage.getItem('user_token').then((user_token_decoded_func) => {
        let decoded

        if (user_token_decoded_func) {
            decoded = jwt_decode(user_token_decoded_func);

        } else {
            decoded = { id: null, type: null }
        }
        return decoded;
    })

}
export const user_token_decoded = decode_token()