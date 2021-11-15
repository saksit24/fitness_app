import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3, Title } from 'native-base';
import { post, get, ip } from '../service/service';
import moment from 'moment'
import {Fonts} from '../font'
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { Col, Row, Grid } from 'react-native-easy-grid';

class get_promotion extends Component {
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
            id_promorion: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"

        };
    }

    UNSAFE_componentWillMount() {
        this.get_promotion()
    }

    get_promotion = async () => {

        try {
            await get('app_pro/get_all_promotion_app', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_promotion: result.result,
                    })
                    setTimeout(() => {
                        console.log("get_all_promotion_app", result.result)
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
                 
                {/* <Header><Title>ข่าวสาร</Title></Header> */}
                <Content>
                    {this.state.data_promotion.map((element, index) => {
                        return (
                            <CardItem button  style={{backgroundColor:'#d2d2d2'}}  onPress={() => { this.props.navigation.navigate('detail_promotion', { 'itemId': element.id_promotion }) }}>

                                <Card style={{ flex: 0, marginLeft: 10, marginRight: 10, marginTop: 10 }} >
                                    <CardItem bordered >
                                        <Image
                                            style={{ width: '100%', height: 130 }}
                                            source={{ uri: ip + element.image_promotion }}
                                        />
                                        {console.log('shoelele',ip + element.image_promotion)}
                                    </CardItem>
                                    <CardItem bordered  >
                                        <Body>
                                            <H3 style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22, color:'#FF8C0A' }}>{element.name_promotion}</H3>
                                            <Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>
                                                {element.detail_promotion}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Left>
                                            <H3 style={{fontFamily: Fonts.PrintAble4U, color: "#FF8C0A" }}>saksit singthong 
                                            <Text style={{fontFamily: Fonts.PrintAble4U,fontSize: 18}}> โพสต์เมื่อ {moment(element.date_promotion).format('DD/MM/YYYY')}</Text></H3>
                                        </Left>
                                    </CardItem>
                                </Card>
                            </CardItem>
                        )
                    })}
                </Content>
            </Container>
        );
    }

    // style={{ justifyContent: 'center', alignItems: 'center' }}
}

export default get_promotion;