import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, FooterTab, Footer, Icon, Button, Input, Item, Label, Picker } from "native-base";
import { Fonts } from '../font'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, StyleSheet, View, AsyncStorage, TextInput } from 'react-native';
import { post, get, ip } from '../service/service';

class account extends Component {
    constructor(props) {
        super(props);
        this.state = {

            name_ac: '',
            number_ac: '',
            bank_ac: '',
            branch_ac: '',
            user_id: '',
            
        }
    }

    // componentWillMount() {
    //     this.edit()
    //   }

    add_account = async () => {
        let { navigation } = this.props;
        let param = navigation.getParam('itemId')
        console.log('par', param)
        let object = {
            name_ac: this.state.name_ac,
            number_ac: this.state.number_ac,
            bank_ac: this.state.bank_ac,
            branch_ac: this.state.branch_ac,
            user_id: param
        };
        console.log('op', object)
        try {
            await post(object, "app/add_account", null).then(res => {
                if (res.success) {
                    alert('เพิ่มบัญชีธนาคารสำเร็จ !')
                    setTimeout(() => { this.props.navigation.push('data_user') }, 1000)
                } else {
                    alert(res.error_message, "", "error");
                }
            });
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
                            <Label style={{ fontFamily: Fonts.PrintAble4UBold }}>ธนาคาร</Label>
                            <Input style={{ fontFamily: Fonts.PrintAble4U }}
                                placeholder="กรุณาเลือกธนาคาร"
                                // id="bank_ac"
                                // name="bank_ac"
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
                                onChangeText={(branch_ac) => this.setState({ branch_ac })}
                            // onChangeText={(value) => { this.onChangeData(value, "branch_ac") }}
                            />
                        </Item>
                    </CardItem>
                    <CardItem>
                    </CardItem>
                    <CardItem>
                    </CardItem>
                    <Footer>
                        <FooterTab >
                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => this.add_account()} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>บันทึก</Text>
                            </Button>
                            <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('data_user') }} >
                                <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>ยกเลิก</Text>
                            </Button>

                        </FooterTab>
                    </Footer>
                </Content>
            </Container>
        );
    }
}

export default account;