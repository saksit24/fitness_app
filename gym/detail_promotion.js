import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Icon, H3, Label } from 'native-base';
import moment from 'moment'
import { post, get, ip } from '../service/service';
import { Fonts } from '../font'
import { Col, Row, Grid } from 'react-native-easy-grid';


class detail_promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_promotion: [],
            name_promotion: '',
            delete_id: null,
            index_delete: null,
            image_promotion: null,
            date_promotion: '',
            detail_promotion: '',
            get_promotion: null,
            id_promotion: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
    }

    UNSAFE_componentWillMount() {
        this.get_promotion()
    }

    get_promotion = async () => {
        let { navigation } = this.props;
        let param = navigation.getParam('itemId')
        let obj = {
            id_promotion: param
        }
        console.log(obj)
        try {
            await post(obj, 'app_pro/get_promotion_app', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_promotion: result.result,
                    })
                    setTimeout(() => {
                        console.log("get_promotion_app", result.result)
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
        const { navigation } = this.props;
        return (
            <Container>
                <Content style={{ backgroundColor: '#d2d2d2' }}>
                    <CardItem style={{ borderBottomWidth: 1, backgroundColor: '#bebebe', borderBottomColor: '#aaaaaa' }}>
                        <Row>
                            <Col>
                                <Label style={{ color: "#FF9614", fontFamily: Fonts.PrintAble4UBold }}>admin </Label>
                            </Col>
                            <Col>
                                <Row>
                                    <Text style={{ color: "#000000", fontFamily: Fonts.PrintAble4U, fontSize: 15 }}>
                                       เมื่อ {moment(this.state.data_promotion.date_promotion).format('DD/MM/YYYY HH:mm')}
                                    </Text>
                                </Row>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </CardItem>
                    <CardItem style={{ backgroundColor: '#d2d2d2' }}>
                        <Body>
                            <H3 style={{ color: "#FF9614", fontFamily: Fonts.PrintAble4U }}>{'\n'}
                                {this.state.data_promotion.name_promotion}{'\n'}
                            </H3>
                            <Text style={{ fontFamily: Fonts.PrintAble4U }}>{this.state.data_promotion.detail_promotion}{'\n'}</Text>
                        </Body>
                    </CardItem>

                    <CardItem style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ flex: 1, alignSelf: 'stretch', width: 50, height: 400 }} source={{ uri: ip + this.state.data_promotion.image_promotion }} />
                    </CardItem>


                </Content>
            </Container>
        );
    }
}



export default detail_promotion;


// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backgroundImage: {
//         flex: 1,
//         resizeMode: 'cover', // or 'stretch'
//     },
//     loginForm: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0
//     },
// });