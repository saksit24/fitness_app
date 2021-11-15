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
            user: '',
            name: '',
            phone_number: '',
            last_name: '',
            address: '',
            email: '',
            user_type: '',
            data: [],
            data2: [],
            name_eng: '',
            last_name_eng: '',
            personal_id: '',
            gender: '',
            dob: '',
            avatarSource: null
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.get_user()
    }
    get_user = async () => {

        try {
            await AsyncStorage.getItem('user_token').then((token) => {

                get('user_app/get_user_update', token).then((result) => {
                    console.log(result)
                    if (result.success) {
                        this.setState({
                            data: result.result,
                        })
                        setTimeout(() => {
                            console.log("get_user_update", result.result)
                        }, 500)
                    } else {
                        // window.location.href = "/";
                        alert("user1" + result.error_message);
                    }
                });
            })
        } catch (error) {
            alert(error);
        }
    }

    confirm = () => {
        Alert.alert(
            '',
            'คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่ ?',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'ยืนยัน', onPress: () => { this.edit() } },
            ],
            { cancelable: false },
        );
    }


    edit = async () => {
        let object = {
            name_eng: this.state.data.name_eng,
            last_name_eng: this.state.data.last_name_eng,
            personal_id: this.state.data.personal_id,
            gender: this.state.data.gender,
            dob: this.state.data.dob,
            user_id: this.state.data.user_id,
            user: this.state.data.user,
            name: this.state.data.name,
            last_name: this.state.data.last_name,
            phone_number: this.state.data.phone_number,
            email: this.state.data.email,
            address: this.state.data.address,
            user_type: this.state.data.user_type,
            image_profile: this.state.data.image_profile

        };
        console.log('op', object)



        try {
            await post(object, "user_app/update_user", null).then(result => {

                if (result.success) {
                    // console.log('saksit555')
                    // alert('บันทึกข้อมูลสำเร็จ'); 
                    this.props.navigation.push('data_user')



                    // AsyncStorage.setItem("user_token").then((token)=>{

                    //     this.props.navigation.navigate('data_user', { 'token':token })
                    //     console.log('im',token)

                    // })

                } else {
                    alert(res.error_message, "", "error");
                    // alert("edit_alert : " + res.error_message);

                }
            });
        } catch (error) {
            alert(error);
            console.log('error', error)

        }
    }


    confirm2 = () => {
        Alert.alert(
            '',
            'คุณต้องยกเลิกการเปลี่ยนแปลงแล้วกลับไปยังหน้าข้อมูลส่วนตัวหรือไม่ ?',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'ยืนยัน', onPress: () => { this.props.navigation.push('data_user') } },
            ],
            { cancelable: false },
        );
    }



    _onImagewPicker = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: 'data:image/jpeg;base64,' + response.data };


                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                let data = this.state.data
                data.image_profile = source

                this.setState({
                    avatarSource: source,
                    data: data
                });
            }
        });
    }

    onChangeData = (value, name) => {
        let data = this.state.data
        data[name] = value
        this.setState({
            data: data
        });
    }


    render() {
        return (
            <Container>
                <Content >
                    {console.log('thi', this.state.data.image_profile)}
                    {this.state.data.image_profile ? <TouchableOpacity onPress={this._onImagewPicker.bind(this)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (
                                <Image source={{ uri: ip + this.state.data.image_profile + '?code=' + new Date().getTime() }} style={styles.avatar} />
                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                        </View>
                    </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this._onImagewPicker.bind(this)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                                {this.state.avatarSource === null ? (
                                    <Image source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} style={styles.avatar} />
                                ) : (
                                        <Image style={styles.avatar} source={this.state.avatarSource} />
                                    )}
                            </View>
                        </TouchableOpacity>
                    }

                    <CardItem>
                    </CardItem>
                    <CardItem>
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อผู้ใช้</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกชื่อผู้ใช้"
                                value={this.state.data.user}
                                id="user"
                                name="user"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "user") }} />
                        </Item>
                    </CardItem>
                    {/* <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Item inlineLabel style={{ backgroundColor: '#d2d2d2' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อ</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกชื่อ"
                                value={this.state.data.name}
                                disabled
                                id="name"
                                name="name"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "name") }} />
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>นามสกุล</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกนามสกุล"
                                value={this.state.data.last_name}
                                disabled
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "last_name") }} />

                        </Item>
                    </CardItem> */}
                    {/* <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Item inlineLabel style={{ backgroundColor: '#d2d2d2' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อ (อังกฤษ)</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกชื่อภาษาอังกฤษ"
                                value={this.state.data.name_eng}
                                disabled
                                id="name_eng"
                                name="name_eng"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "name_eng") }} />
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>นามสกุล (อังกฤษ)</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกนามสกุลภาษาอังกฤษ"
                                value={this.state.data.last_name_eng}
                                disabled
                                id="last_name_eng"
                                name="last_name_eng"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "last_name_eng") }} />
                        </Item>
                    </CardItem> */}
                    <CardItem >
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>เบอร์โทรศัพท์</Label>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold,color:'red' }}>*</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                value={this.state.data.phone_number}
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "phone_number") }} />
                        </Item>

                    </CardItem>
                    {/* <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Item inlineLabel style={{ backgroundColor: '#d2d2d2' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>วันเกิด</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกวันเกิด"
                                value={moment(this.state.data.dob).format("D/M/Y")}
                                disabled
                                id="dob"
                                name="dob"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "dob") }} />
                        </Item>
                    </CardItem> */}
                    <CardItem>
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>E-mail</Label>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold,color:'red' }}>*</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกอีเมล"
                                value={this.state.data.email}
                                id="email"
                                name="email"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "email") }} />
                        </Item>
                    </CardItem>
                    {/* <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Item inlineLabel style={{ backgroundColor: '#d2d2d2' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ที่อยู่</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกที่อยู่"
                                value={this.state.data.address}
                                disabled
                                id="address"
                                name="address"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "address") }} />
                        </Item>
                    </CardItem> */}
                    {/* <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Item inlineLabel style={{ backgroundColor: '#d2d2d2' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>เพศ</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกเพศ"
                                value={this.state.data.gender}
                                disabled
                                id="gender"
                                name="gender"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "gender") }} />
                        </Item>
                    </CardItem> */}

                    {/* <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Item inlineLabel style={{ backgroundColor: '#d2d2d2' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>รหัสประจำตัวประชาชน</Label>

                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกบัตรประจำตัวประชาชน"
                                value={this.state.data.personal_id}
                                disabled
                                id="personal_id"
                                name="personal_id"
                                type="text"
                                onChangeText={(value) => { this.onChangeData(value, "personal_id") }} />
                        </Item>
                    </CardItem> */}
                    <Footer>
                        <FooterTab >
                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => this.confirm2()} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>ยกเลิก</Text>
                            </Button>
                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => this.confirm()} >
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