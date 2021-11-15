import React, { Component } from 'react';
import {
    Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Title, Left, Body, Right, CardItem, Card, View,
    Thumbnail, Badge, List, ListItem, Label, Item
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, AsyncStorage, Alert } from 'react-native';
import { post, get, ip } from '../service/service';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Fonts } from '../font'
import { user_token } from '../support/constance';
import call from 'react-native-phone-call';


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
            status_payment:'',
        };
    }



    componentWillMount() {
        this.get_payment(),
            this.get_payment_detail()
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


    add_status = async () => {

        let object = {
            id_book: this.state.data.id_book
        };
        console.log('test', object)
        try {
            await post(object, "app/add_status_payment", null).then(result => {
                if (result.success) {
                    setTimeout(() => { alert('ยืนยันการชำระเงินแล้ว') }, 300)
                    this.props.navigation.push('train_check')
                } else {
                    alert('error ' + result.error_message);
                }
            });


        } catch (error) {
        }
    }

    render_show = (status_payment) => {
        let return_show
        switch (status_payment) {
            case 0: return_show =
                <Row style={{ justifyContent: 'center' }}>
                    <Button style={{ width: 200, height: 50, justifyContent: 'center', backgroundColor: '#f9b40f' }} onPress={() => { this.add_status() }}>
                        <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 15 }}>ยืนยันการชำระเงิน</Text>
                    </Button>
                </Row>

                break;
            case 1: return_show =

                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ยืนยันหลักฐานการให้บริการเรียบร้อยแล้ว</Text>

                break;
            default: return_show =

                <Text style={{ fontSize: 12 }}>เกิดข้อผิดพลาด</Text>

                break;
        }
        return return_show
    }


    call = () => {
        const args = {
            number: this.state.phone,
            prompt: false,
        };
        call(args).catch(console.error);
    };



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
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ข้อมูลผู้จอง</Label>
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
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>เบอร์โทร </Label>
                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold,fontSize:19 }}>{this.state.data2.phone_number}</Text>
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
                        <CardItem style={{ justifyContent: 'center' }}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}> หลักฐานการโอนเงิน</Label>
                        </CardItem>
                        {this.state.data.img_payment
                            ?
                            <Col>

                                <CardItem style={{ justifyContent: 'center', }}>
                                    <Image source={{ uri: ip + this.state.data.img_payment + '?code=' + new Date().getTime() }} style={{ width: 350, height: 500 }} />
                                </CardItem>
                                <CardItem style={{ justifyContent: 'center', }}>
                                    {this.render_show(this.state.data.status_payment)}
                                </CardItem>
                            </Col>
                            :
                            <CardItem style={{ justifyContent: 'center', height: 300 }}>
                                <Item inlineLabel>
                                    <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ไม่พบหลักฐานการโอนเงิน</Label>
                                </Item>
                            </CardItem>
                        }
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default check_detail;
