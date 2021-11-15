import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet, PixelRatio, TouchableOpacity, Alert } from 'react-native';
import {
    Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,
    Icon, Left, Body, Title, H1, H3, View, Footer, FooterTab, Input, Item, Label, Badge
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { Fonts } from '../font'
import { post, get, ip } from '../service/service';
import { user_token, user_token_decoded } from '../support/constance'
import ImagePicker from 'react-native-image-picker';


class update_user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            new_password: null,
            c_new_password: null
        }

    }




    handleSubmit = () => {
        if (this.state.new_password !== this.state.c_new_password) {
            alert("รหัสผ่านใหม่ไม่ตรงกัน");
        } else {
            this.edit();
        }

    }

    edit = async () => {
        let object = {
            password: this.state.password,
            new_password: this.state.new_password
        };
        console.log("55555 ", object)
        try {
            await AsyncStorage.getItem('user_token').then((token) => {
                post(object, "user_app/update_password", token).then(res => {
                    console.log("res", res)
                    if (res.success) {
                        alert('เปลี่ยนรหัสผ่านสำเร็จ')
                        setTimeout(() => { this.props.navigation.push('data_user') }, 1000)

                    } else {
                        alert(res.error_message, "", "error");
                    }
                });
            }
            )
        } catch (error) {
            alert("error3" + error);
        }

    }


    onChangeData = (value, name) => {
        let data = this.state
        data[name] = value
        this.setState({
            data: data
        });
    }


    render() {
        return (
            <Container>
                <Content >
                    <CardItem>
                    </CardItem>
                    <CardItem>
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>รหัสผ่านเดิม</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                secureTextEntry={true}
                                placeholder="กรุณากรอกรหัสผ่านเดิม"
                                id="password"
                                name="password"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "password") }} />
                        </Item>
                    </CardItem>
                    <CardItem >
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>รหัสผ่านใหม่</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกรหัสผ่านใหม่"
                                secureTextEntry={true}
                                id="new_password"
                                name="new_password"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "new_password") }} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ยืนยันรหัสผ่านใหม่</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณายืนยันรหัสผ่านใหม่"
                                secureTextEntry={true}
                                id="c_new_password"
                                name="c_new_password"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "c_new_password") }} />
                        </Item>
                    </CardItem>
                    <Footer>
                        <FooterTab >
                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.push('data_user') }} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>ยกเลิก</Text>
                            </Button>
                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => this.handleSubmit()} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>บันทึก</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Content>
            </Container>
        );
    }
}

export default update_user;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 150,
        width: 300,
        height: 300,
    },
});