import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    NativeModules,
    TouchableOpacity,
    View,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import Modal from 'react-native-modal';
import { Container, Header, Content, Card, Title, CardItem, Text, Body, Button, FooterTab, Footer, Icon, Item, Label, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Fonts } from '../font'
import { user_token } from '../support/constance'
import { post, get, ip } from '../service/service';

export default class Example extends Component {
    state = {
        visibleModalId: null,
        value: null,
        activeButton: 'first',
        price_train: '',
        time1: false,
        time2: false,
        time3: false,
        time4: false,
        time5: false,
        time6: false,
        time7: false,
        time8: false,
        time9: false,
        time10: false,
        time11: false,
        time12: false,
        time13: false,
        time14: false,
        time15: false,
        time16: false,
        data_user: '',
        data: ''
    };


    componentWillMount() {
        this.get_book(),
        this.get_trainer_book()
    }

    get_book = async () => {
        try {
            await AsyncStorage.getItem('user_token').then((token) => {
                get('user_app/get_book', token).then((result) => {
                    if (result.success) {
                        this.setState({
                            ...result.result[0]


                        })
                        setTimeout(() => {
                            console.log("get_book", this.state)
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


    get_trainer_book = async () => {
        try {
            await AsyncStorage.getItem('user_token').then((token) => {

                get('user_app/get_trainer_book', token).then((result) => {
                    console.log(result)
                    if (result.success) {
                        this.setState({
                            data_user: result.result,
                        })
                        setTimeout(() => {
                            console.log("data_user", result.result)
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



    book = async () => {
        let data = {}
            data.user_id= this.state.data_user.user_id,
            data.price_train= this.state.price_train,
            data.time1= this.state.time1 ? 1 : 0,
            data.time2= this.state.time2? 1 : 0,
            data.time3= this.state.time3? 1 : 0,
            data.time4= this.state.time4? 1 : 0,
            data.time5= this.state.time5? 1 : 0,
            data.time6= this.state.time6? 1 : 0,
            data.time7= this.state.time7? 1 : 0,
            data.time8= this.state.time8? 1 : 0,
            data.time9= this.state.time9? 1 : 0,
            data.time10= this.state.time10? 1 : 0,
            data.time11= this.state.time11? 1 : 0,
            data.time12= this.state.time12? 1 : 0,
            data.time13= this.state.time13? 1 : 0,
            data.time14= this.state.time14? 1 : 0,
            data.time15= this.state.time15? 1 : 0,
            data.time16= this.state.time16? 1 : 0,
        
        console.log('test', data)
            try {
                // console.log('5555')
              await post(data, "user_app/trainer_book", null).then(result => {
                console.log("book", result);
                if (result.success) {
                  alert('บันทึกเรียบร้อย')
                  setTimeout(() => { this.props.navigation.push('Home') }, 1000)
                } else {
                  alert('error ' + result.error_message);
                }
              });
            } catch (error) {
              // alert('error :', error);
            }
            // console.log("Signup" + this.state);
    }

    onChangeData = (value, name) => {

        let data = this.state
        data[name] = value
        this.setState({
            data: data
        });
    }

    oninput = (event, data) => {
        this.setState({
            btnSelected: data,
            time_book: event.value,
            time_book: data
        });
    }


    // gg = () => {

    //     this.setState({
    //         visibleModal: null,
    //         btnSelected: null
    //     })
    //     // NativeModules.DevSettings.reload();
    // }


    // toggleSwitch = (value) => {
    //     //onValueChange of the switch this function will be called
    //     this.setState({ switchValue: value });
    //     console.log('checkkk', this.state.switchValue)
    //     //state changes according to switch
    //     //which will result in re-render the text
    // };

    render() {
        // { console.log('checkkk', this.state.switchValue) }
        return (
            <Container>
                <CardItem style={{ height: 'auto', width: 400 }}>
                    <Item inlineLabel style={{}}>
                        <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ราคา</Label>
                        <Input style={{ fontFamily: Fonts.PrintAble4U }}
                            placeholder="กรุณาใส่จำนวนเงิน"
                            value={this.state.price_train ? this.state.price_train : null}
                            id="price_train"
                            name="price_train"
                            type="number"
                            onChangeText={(value) => { this.onChangeData(value, "price_train") }}
                        />

                        <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>บาท</Label>
                    </Item>
                </CardItem>
                <CardItem >
                    <Col>
                            <Button
                                style={this.state.time1 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time1 }) => ({ time1: !time1 }))}><Text style={styles.textSelect}>10.00-11.00</Text></Button>
                        
                            <Button
                                style={this.state.time2 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time2 }) => ({ time2: !time2 }))} ><Text style={styles.textSelect}>12.00-13.00</Text></Button>
                        
                        
                            <Button
                                style={this.state.time3 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time3 }) => ({ time3: !time3 }))} ><Text style={styles.textSelect}>16.00-17.00</Text></Button>
                        
                            <Button
                                style={this.state.time4 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time4 }) => ({ time4: !time4 }))} ><Text style={styles.textSelect}>20.00-21.00</Text></Button>
                       

                    </Col>
                    <Col>
                            <Button
                                style={this.state.time5 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time5 }) => ({ time5: !time5 }))} ><Text style={styles.textSelect}>09.00-10.00</Text></Button>
                        
                       
                            <Button
                                style={this.state.time6 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time6 }) => ({ time6: !time6 }))} ><Text style={styles.textSelect}>13.00-14.00</Text></Button>
                       
                            <Button
                                style={this.state.time7 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time7 }) => ({ time7: !time7 }))} ><Text style={styles.textSelect}>17.00-18.00</Text></Button>
                        
                            <Button
                                style={this.state.time8 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time8 }) => ({ time8: !time8 }))} ><Text style={styles.textSelect}>21.00-22.00</Text></Button>
                        
                    </Col>
                    <Col>
                        
                            <Button
                                style={this.state.time9 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time9 }) => ({ time9: !time9 }))} ><Text style={styles.textSelect}>10.00-11.00</Text></Button>
                       
                            <Button
                                style={this.state.time10 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time10 }) => ({ time10: !time10 }))} ><Text style={styles.textSelect}>14.00-15.00</Text></Button>
                        
                            <Button
                                style={this.state.time11 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time11 }) => ({ time11: !time11 }))} ><Text style={styles.textSelect}>18.00-19.00</Text></Button>
                        
                            <Button
                                style={this.state.time12 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time12 }) => ({ time12: !time12 }))} ><Text style={styles.textSelect}>22.00-23.00</Text></Button>
                        
                    </Col>
                    <Col>
                        
                            <Button
                                style={this.state.time13 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time13 }) => ({ time13: !time13 }))} ><Text style={styles.textSelect}>11.00-12.00</Text></Button>
                       
                            <Button
                                style={this.state.time14 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time14 }) => ({ time14: !time14 }))} ><Text style={styles.textSelect}>15.00-16.00</Text></Button>
                        
                            <Button
                                style={this.state.time15 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time15 }) => ({ time15: !time15 }))} ><Text style={styles.textSelect}>19.00-20.00</Text></Button>
                        
                            <Button
                                style={this.state.time16 ? styles.btnSelected : styles.notSelected}
                                onPress={() => this.setState(({ time16 }) => ({ time16: !time16 }))} ><Text style={styles.textSelect}>23.00-00.00</Text></Button>
                        
                    </Col>
                </CardItem>
                <CardItem>
                    <Button disabled style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: '#f9b40f' }}><Text></Text></Button>
                    <Text style={{ fontFamily: Fonts.PrintAble4U }}>  เวลาที่เปิดให้บริการ   </Text>
                    <Button disabled style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: '#FFF1A3' }}><Text></Text></Button>
                    <Text style={{ fontFamily: Fonts.PrintAble4U }}>  เวลาที่ปิดให้บริการ</Text>
                </CardItem>
                <CardItem>
                    <Row style={{ justifyContent: 'center' }}>
                        <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => this.book()} >
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff', }}>บันทึก</Text>
                        </Button>
                        <Text>   </Text>
                        <Button style={{ backgroundColor: '#f9b40f' }} onPress={()=>{this.props.navigation.push('Home')}}>
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff', }}>ยกเลิก</Text>
                        </Button>
                    </Row>
                </CardItem>
            </Container>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9b40f',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 16
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#794F9B',
    },
    btnSelected: {
        // color: 'red',
        marginTop: 10,
        // padding: 20,
        borderRadius: 15,
        backgroundColor: '#f9b40f',
        width: 70,
        height: 50,
        // fontSize: 

    },
    notSelected: {
        // color: 'red',
        marginTop: 10,
        // padding: 20,
        borderRadius: 15,
        backgroundColor: '#FFF1A3',
        width: 70,
        height: 50,
        // fontSize: 2
    },
    textSelect: {
        fontSize: 11.5,
        textAlign: 'center',
        color: "black"
    },

});



{/* <Col>
    <Button
        style={this.state.time1 ? styles.btnSelected : styles.notSelected}
        onPress={() => this.setState(({ time1 }) => ({ time1: !time1 }))} ><Text style={styles.textSelect}>10.00-11.00</Text></Button>
    <Button
        style={this.state.time1 ? styles.btnSelected : styles.notSelected}
        onPress={() => this.setState(({ time1 }) => ({ time1: !time1 }))} ><Text style={styles.textSelect}>10.00-11.00</Text></Button>
    <Button
        style={this.state.time2 ? styles.btnSelected : styles.notSelected}
        onPress={() => this.setState(({ time2 }) => ({ time2: !time2 }))} ><Text style={styles.textSelect}>12.00-13.00</Text></Button>
    <Button
        style={this.state.time3 ? styles.btnSelected : styles.notSelected}
        onPress={() => this.setState(({ time3 }) => ({ time3: !time3 }))} ><Text style={styles.textSelect}>16.00-17.00</Text></Button>
    <Button
        style={this.state.time4 ? styles.btnSelected : styles.notSelected}
        onPress={() => this.setState(({ time4 }) => ({ time4: !time4 }))} ><Text style={styles.textSelect}>20.00-21.00</Text></Button>
</Col> */}
//     <Col>
//         <Button
//             style={this.state.time5 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time5 }) => ({ time5: !time5 }))} ><Text style={styles.textSelect}>09.00-10.00</Text></Button>
//         <Button
//             style={this.state.time6 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time6 }) => ({ time6: !time6 }))} ><Text style={styles.textSelect}>13.00-14.00</Text></Button>
//         <Button
//             style={this.state.time7 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time7 }) => ({ time7: !time7 }))} ><Text style={styles.textSelect}>17.00-18.00</Text></Button>
//         <Button
//             style={this.state.time8 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time8 }) => ({ time8: !time8 }))} ><Text style={styles.textSelect}>21.00-22.00</Text></Button>
//     </Col>
//     <Col>
//         <Button
//             style={this.state.time9 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time9 }) => ({ time9: !time9 }))} ><Text style={styles.textSelect}>10.00-11.00</Text></Button>
//         <Button
//             style={this.state.time10 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time10 }) => ({ time10: !time10 }))} ><Text style={styles.textSelect}>14.00-15.00</Text></Button>
//         <Button
//             style={this.state.time11 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time11 }) => ({ time11: !time11 }))} ><Text style={styles.textSelect}>18.00-19.00</Text></Button>
//         <Button
//             style={this.state.time12 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time12 }) => ({ time12: !time12 }))} ><Text style={styles.textSelect}>22.00-23.00</Text></Button>
//     </Col>
//     <Col>
//         <Button
//             style={this.state.time13 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time13 }) => ({ time13: !time13 }))} ><Text style={styles.textSelect}>11.00-12.00</Text></Button>
//         <Button
//             style={this.state.time14 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time14 }) => ({ time14: !time14 }))} ><Text style={styles.textSelect}>15.00-16.00</Text></Button>
//         <Button
//             style={this.state.time15 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time15 }) => ({ time15: !time15 }))} ><Text style={styles.textSelect}>19.00-20.00</Text></Button>
//         <Button
//             style={this.state.time16 ? styles.btnSelected : styles.notSelected}
//             onPress={() => this.setState(({ time16 }) => ({ time16: !time16 }))} ><Text style={styles.textSelect}>23.00-00.00</Text></Button>
//     </Col>
