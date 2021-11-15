import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, FooterTab, Footer, Icon, Button, Input, Item, Label, Picker } from "native-base";
import { Fonts } from '../font'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, StyleSheet, View, AsyncStorage, TextInput, Alert } from 'react-native';
import { post, get, ip } from '../service/service';

class account_update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name_ac: '',
            number_ac: '',
            bank_ac: '',
            branch_ac: '',
            user_id: '',
            delete_id: null,
            index_delete: null,
        }
    }

    componentWillMount() {
        this.get_update_account()
    }

    get_update_account = async () => {
        let { navigation } = this.props;
        let param = navigation.getParam('itemId')
        let object = {
            id_ac: param
        };
        console.log('op', object)
        try {
            await post(object, "app/get_update_account", null).then(result => {
                if (result.success) {
                    this.setState({
                        ...result.result
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

    update_account = async () => {
        let { navigation } = this.props;
        let param = navigation.getParam('itemId')
        let object = {
            name_ac: this.state.name_ac,
            number_ac: this.state.number_ac,
            bank_ac: this.state.bank_ac,
            branch_ac: this.state.branch_ac,
            id_ac: param
        };
        console.log('op', object)
        try {
            await post(object, "app/update_account", null).then(res => {
                if (res.success) {
                    alert('อัพเดทบัญชีธนาคารสำเร็จ !')
                    setTimeout(() => { this.props.navigation.push('data_user') }, 1000)
                } else {
                    alert(res.error_message, "", "error");
                }
            });
        } catch (error) {
            alert("error3" + error);
        }
    }


    delete_array = (delete_id) => {
        let account_data_array = {
            name_ac: this.state.name_ac,
            number_ac: this.state.number_ac,
            bank_ac: this.state.bank_ac,
            branch_ac: this.state.branch_ac,
            id_ac: this.state.id_ac,
            user_id: this.state.user_id
        }

        let index = account_data_array.findIndex((element) => {
            return element.id_ac === delete_id
        })
        account_data_array.splice(index, 1)
        this.setState({ account_data_array: account_data_array })

        // this.setState({ result: 'confirmed', open: false })
    }


    delete = async (delete_id) => {
        let object = {
            id_ac: this.state.id_ac
        }
        console.log('id', object)
        try {
            await post(object, 'app/delete_account', null).then((res) => {
                if (res.success) {
                    alert('ลบบัญชีธนาคารเรียบร้อย')
                    setTimeout(() => { this.props.navigation.push('data_user') }, 1000)
                    this.delete_array(delete_id)
                } else {
                    console.log(res.error_message)
                }
            })
        } catch (err) {
            console.log(object)
        }
    }


    confirm = () =>{
        Alert.alert(
            '',
            'คุณต้องการจะลบบัญชีธนาคารนี้หรือไม่ ?',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'ยืนยัน', onPress: () => {this.delete()} },
            ],
            { cancelable: false },
        );
    }



    render() {
        return (
            <Container>
                <Content >
                    <CardItem>
                    </CardItem>
                    <CardItem>
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ธนาคาร</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณาเลือกธนาคาร"
                                // id="bank_ac"
                                // name="bank_ac"
                                value={this.state.bank_ac}
                                type="text"
                                onChangeText={(bank_ac) => this.setState({ bank_ac })}
                            // onChangeText={(value) => { this.onChangeData(value, "bank_ac") }}
                            />
                        </Item>
                    </CardItem>
                    <CardItem style={{}}>
                        <Item inlineLabel style={{}}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>เลขบัญชี</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกเลขบัญชี"
                                keyboardType='numeric'
                                value={this.state.number_ac}
                                onChangeText={(number_ac) => this.setState({ number_ac })}
                            />
                        </Item>
                    </CardItem>
                    <CardItem style={{}}>
                        <Item inlineLabel style={{}}>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ชื่อบัญชี</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกชื่อบัญชี"
                                // value={this.state.data.name_eng}
                                id="name_ac"
                                name="name_ac"
                                type="text"
                                value={this.state.name_ac}
                                onChangeText={(name_ac) => this.setState({ name_ac })}
                            // onChangeText={(value) => { this.onChangeData(value, "name_ac") }}
                            />
                        </Item>
                    </CardItem>
                    <CardItem >
                        <Item inlineLabel>
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>สาขา</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณากรอกสาขาธนาคาร"
                                // value={this.state.data.phone_number}
                                id="branch_ac"
                                name="branch_ac"
                                type="text"
                                value={this.state.branch_ac}
                                onChangeText={(branch_ac) => this.setState({ branch_ac })}
                            // onChangeText={(value) => { this.onChangeData(value, "branch_ac") }}
                            />
                        </Item>
                    </CardItem>
                    <CardItem>
                    </CardItem>
                    <CardItem>
                    </CardItem>
                    <CardItem style={{justifyContent:'center'}}>
                        <Button style={{ backgroundColor: '#FF0000' ,width:80,justifyContent:'center'}} onPress={() => this.confirm()} >
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>ลบ</Text>
                        </Button>
                    </CardItem>
                    <Footer>
                        <FooterTab >

                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => this.update_account()} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>บันทึก</Text>
                            </Button>

                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.push('data_user') }} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>ยกเลิก</Text>
                            </Button>

                        </FooterTab>
                    </Footer>
                </Content>
            </Container>
        );
    }
}

export default account_update;