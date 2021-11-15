import React, { Component } from 'react';
import {
    Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Title, Left, Body, Right, CardItem, Card, View,
    Thumbnail, Badge, List, ListItem, Label, Item
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, AsyncStorage, StyleSheet, PixelRatio, TouchableOpacity, Alert } from 'react-native';
import { post, get, ip } from '../service/service';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Fonts } from '../font'
import { user_token } from '../support/constance';
import call from 'react-native-phone-call';
import ImagePicker from 'react-native-image-picker';


class check_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_promotion: [],
            name_promotion: '',
            index_delete: null,
            image_promotion: null,
            date_promotion: '',
            detail_promotion: '',
            get_promotion: null,
            free: '1',
            show: 0,
            im: '1',
            phone: '0951878718',
            data: '',
            data2: '',
            box: '',
            img_payment: '',
            account: '',
        };
    }




    componentWillMount() {
        this.get_payment(),
            this.get_payment_detail(),
            this.account()
    }

    get_payment = async () => {
        let { navigation } = this.props;
        let param = navigation.getParam('itemId')
        let param2 = navigation.getParam('ID2')

        let object = {
            id_book: param,
        };
        console.log('op', object)
        try {
            await post(object, "app/get_payment", null).then(result => {
                if (result.success) {
                    this.setState({
                        data: result.result
                    })
                    console.log('data', result.result)
                } else {
                    // alert(res.error_message, "", "error");
                }
            });
        } catch (error) {
            alert("error3" + error);
        }
    }

    get_payment_detail = async () => {
        let { navigation } = this.props;
        let param = navigation.getParam('itemId')
        let param2 = navigation.getParam('ID2')

        let object = {
            user_id: param2
        };
        console.log('op', object)
        try {
            await post(object, "app/get_payment_detail", null).then(result => {
                if (result.success) {
                    this.setState({
                        data2: result.result
                    })
                    console.log('data2', result.result)
                } else {
                    // alert(res.error_message, "", "error");
                }
            });
        } catch (error) {
            alert("error3" + error);
        }
    }


    account = async () => {
        let { navigation } = this.props;
        let param2 = navigation.getParam('ID2')

        let ob = {
            user_id: param2
        };
        try {
            await post(ob, 'app/get_account', null).then((result) => {
                if (result.success) {
                    this.setState({
                        account: result.result,
                    }) 
                        console.log("account", this.state.account)
                } else {
                    alert("user1" + result.error_message);
                }
            });

        } catch (error) {
            alert(error);
        }
    }



    render_show = (show) => {
        let return_show
        switch (show) {
            case 0: return_show =
                <Row style={{ justifyContent: 'center' }}>
                    <Button style={{ width: 200, height: 50, justifyContent: 'center', backgroundColor: '#f9b40f' }} onPress={() => { this.setState({ show: 1 }) }}>
                        <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 15 }}>เพิ่มหลักฐานการโอน</Text>
                    </Button>
                </Row>

                break;
            case 1: return_show =
                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เพิ่มหลักฐานการโอนแล้ว</Text>
                break;
            default: return_show =

                <Text style={{ fontSize: 12 }}>เกิดข้อผิดพลาด</Text>

                break;
        }
        return return_show
    }





    add_payment = async () => {
        let object = {
            id_book: this.state.data.id_book,
            img_payment: this.state.box.img_payment
        };
        console.log('op', object)
        try {
            await post(object, "app/add_img_payment", null).then(result => {
                if (result.success) {
                    this.props.navigation.push('detail_book')
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



    call = () => {
        const args = {
            number: this.state.data2.phone_number,
            prompt: false,
        };
        call(args).catch(console.error);
    };


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

                // let data = this.state.data
                // data.image_profile = source

                let box = this.state
                box.img_payment = source

                this.setState({
                    avatarSource: source,
                    box: box

                });
            }
        });
    }




    render() {


        return (
            <Container  >
                <Content>
                    <Card>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>ตรวจสอบข้อมูล</Label>
                        </CardItem>
                        <CardItem>

                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ข้อมูลการจอง</Label>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>วันที่</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data.date_book}</Text>
                                </Item>
                            </Col>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>เวลา</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data.time_book}</Text>
                                </Item>
                            </Col>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ข้อมูลเทรนเนอร์</Label>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อผู้ใช้</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data2.user}</Text>
                                </Item>
                            </Col>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อ-นามสกุล (th)</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data2.name} {this.state.data2.last_name}</Text>
                                </Item>
                            </Col>

                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อ-นามสกุล (eng)</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data2.name_eng} {this.state.data2.last_name_eng}</Text>

                                </Item>
                            </Col>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }} button onPress={() => { this.call() }}>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>เบอร์โทร</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data2.phone_number}</Text>
                                    <Right>
                                        <Icon name="call" button onPress={() => { this.call() }} />
                                    </Right>
                                </Item>
                            </Col>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Col>
                                <Item inlineLabel >
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>E-mail</Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data2.email}</Text>
                                </Item>
                            </Col>
                        </CardItem>
                        <CardItem>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 20 }}>บัญชีธนาคาร</Text>
                            </View>
                        </CardItem>
                        <List>
                            {this.state.account[0] ?
                                this.state.account.map((element) => {
                                    return (
                                        <ListItem avatar>
                                            <Body>
                                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 18 }}>เลขที่บัญชี {element.number_ac}</Text>
                                                <Text note style={{ fontFamily: Fonts.PrintAble4U, fontSize: 18 }}>ชื่อบัญชี {element.name_ac}</Text>
                                                <Text note style={{ fontFamily: Fonts.PrintAble4U, fontSize: 18 }}>ธนาคาร {element.bank_ac}</Text>
                                                <Text note style={{ fontFamily: Fonts.PrintAble4U, fontSize: 18 }}>สาขา {element.branch_ac}</Text>
                                            </Body>
                                        </ListItem>
                                    )
                                })
                                :
                                <CardItem>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: Fonts.PrintAble4U, textAlign: 'center', fontSize: 20 }}>ไม่พบบัญชีธนาคาร</Text>
                                    </View>
                                </CardItem>
                            }
                        </List>

                        <CardItem style={{ justifyContent: 'center' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}> หลักฐานการโอนเงิน</Label>
                        </CardItem>
                        {console.log('img', this.state.data.img_payment)}

                        {this.state.data.img_payment ?
                            <View style={styles.container}>
                                <Image source={{ uri: ip + this.state.data.img_payment + '?code=' + new Date().getTime() }} style={styles.avatar} />
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={this._onImagewPicker.bind(this)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                                        {this.state.avatarSource == null ? (
                                            <Text>
                                                แตะเพื่ออัพโหลดรูป
                                </Text>
                                        ) : (
                                                <Image style={styles.avatar} source={this.state.avatarSource} />
                                            )}
                                    </View>
                                </TouchableOpacity>
                                <Col>
                                    <CardItem style={{ justifyContent: 'center', }}>
                                        <Row style={{ justifyContent: 'center' }}>
                                            <Button style={{ width: 200, height: 50, justifyContent: 'center', backgroundColor: '#f9b40f' }} onPress={() => { this.add_payment() }}>
                                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 15 }}>เพิ่มหลักฐานการโอน</Text>
                                            </Button>
                                        </Row>
                                    </CardItem>
                                </Col>
                            </View>
                        }

                    </Card>
                </Content>
            </Container>
        );
    }
}

export default check_detail;

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
        // borderRadius: 150,
        width: 300,
        height: 300,
    },
});