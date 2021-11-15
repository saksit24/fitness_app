import React, { Component } from 'react';
import { View, Text, Footer, FooterTab, Button, Icon, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Row, Col, Card, } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { StyleSheet } from 'react-native'
import { Fonts } from '../font'
import { post, get, ip } from '../service/service';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            listViewData: '1',
            show: true,
            status: '0',
            status1: '1',
            data: [],
        };
    }



    componentWillMount() {
        this.check_payment()
    }

    check_payment = async () => {
        try {
            await get('app/check_payment', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data: result.result,
                    })
                    setTimeout(() => {
                        console.log("check_payment", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert(error);
        }
    }



    render() {
        return (
            <Container>
                {/* <Header style={{ backgroundColor: '#f9b40f' }} /> */}
                <Content>
                    {
                        this.state.data.map((element, index) => {
                            return (
                                <SwipeListView
                                    data={this.state.listViewData}
                                    renderItem={(data, rowMap) => (
                                        <List style={{ height: 160 }}  >
                                            <ListItem avatar style={{ height: 150 }} button onPress={() => { this.props.navigation.push('upload_slip', { 'itemId': element.id_book, 'ID2': element.user_train }) }}>
                                                <Card style={{ height: 150, width: '95%' }}>
                                                    <Row></Row>
                                                    <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center' }}>วันเวลาที่คุณได้ทำการจอง</Text>
                                                    <Row></Row>
                                                    <Body style={{}}>
                                                        <Text note style={{ fontFamily: Fonts.PrintAble4U }}>วันที่: {element.date_book}</Text>
                                                        <Text note style={{ fontFamily: Fonts.PrintAble4U }}>เวลา: {element.time_book}</Text>
                                                    </Body>
                                                    <Row></Row>
                                                    <Right>

                                                        {element.status_mem == '1' ?
                                                            element.status_payment == '1' ?
                                                                <Row>
                                                                    <Button style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: 'green' }}><Text> </Text></Button>
                                                                    <Text style={{ fontFamily: Fonts.PrintAble4U }}>  ได้รับการืนยันการชำระเงินแล้ว</Text>
                                                                </Row>
                                                                :
                                                                <Row>
                                                                    <Button style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: 'yellow' }}><Text> </Text></Button>
                                                                    <Text style={{ fontFamily: Fonts.PrintAble4U }}>  รอการตรวจหลักฐานการโอน</Text>
                                                                </Row>
                                                            :
                                                            <Row>
                                                                <Button style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: 'red' }}><Text> </Text></Button>
                                                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>  ยังไม่ได้เพิ่มหลักฐานการโอน</Text>
                                                            </Row>
                                                        }


                                                    </Right>
                                                </Card>
                                            </ListItem>
                                        </List>
                                    )}
                                    renderHiddenItem={(data, rowMap) => (
                                        <View style={styles.rowBack}>

                                        </View>
                                    )}
                                    leftOpenValue={0}
                                    rightOpenValue={0}
                                />
                            )
                        })
                    }


                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
});