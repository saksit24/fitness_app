import React, { Component } from 'react';
import { StyleSheet, View,  TextInput, Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { post } from '../service/service';
import { get_user_token } from '../support/constance'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            user: null,
            password: null,

        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      

    sing_in = async () => {
        let object = {
            user: this.state.user,
            password: this.state.password
        };
        console.log('ob',object)
        try {
            await post(object, "user_app/app_login", null).then((result) => {
                if (result.success) {
                    AsyncStorage.setItem("user_token", result.token).then(()=>{

                        this.props.navigation.push('Home', { 'token':result.token })
                    alert('Login Success');

                    console.log('tk',result.token)

                    })


                    
                } else {
                    alert(result.error_message);
                }
            });
        } catch (error) {
            alert('sing_in'+error);
        }
        // console.log("Signin",error);
    }


    login_train = async () => {
        let object = {
            user: this.state.user,
            password: this.state.password
        };
        console.log('ob',object)
        try {
            await post(object, "user_app/app_login", null).then((result) => {
                if (result.success) {
                    AsyncStorage.setItem("user_token", result.token).then(()=>{
                        this.props.navigation.navigate('home_train', { 'token':result.token })
                    alert('Login Success');

                    console.log('tk',result.token)
                    })
                } else {
                    alert(result.error_message);
                }
            });
        } catch (error) {
            alert('sing_in'+error);
        }
        // console.log("Signin",error);
    }


    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.TextInputStyle}
                    textAlign={'center'}
                    placeholder="Username"
                    secureTextEntry={false}
                    // name='user'
                    onChangeText={(user) => this.setState({ user })}
                />
        {/* {console.log('user',this.state.user)} */}
                <TextInput style={styles.TextInputStyle}
                    textAlign={'center'}
                    placeholder="Password"
                    // name='password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                 {/* {console.log('password',this.state.password)} */}
                <Button style={styles.Buttons}  onPress={() => {this.sing_in() }} title="Login" />
                {/* <Button style={styles.Buttons}  onPress={() => {this.login_train() }} title="Login Train" /> */}
              
            </View>

        );
    }
}

export default Login;

const styles = StyleSheet.create({

    TextInputStyle: {

        textAlign: 'center',
        height: 50,
        width: '70%',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#f9b40f',
        marginBottom: 15
    },

    Herders: {
        textAlign: 'center',
        color: '#333333',
        margin: 2
    },

    Buttons: {
        paddingTop: 23,
        width: 90,
        height: 50,
        backgroundColor: '#f9b40f',



    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 15,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 15,
    },
    Br: {
        margin: 0.5,
    },
});