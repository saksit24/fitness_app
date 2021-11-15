import React, { Component } from 'react';
import {
    Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Title, Left, Body, Right, CardItem, Card, View,
    Thumbnail, Badge, Item, Label
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, AsyncStorage, Alert } from 'react-native';
import { post, get, ip } from '../service/service';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Fonts } from '../font'
import { user_token } from '../support/constance';



class home extends Component {
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
            data: []

        };
    }
    componentWillMount() {
        this.get_user(),
            this.get_promotion()

    }

    get_promotion = async () => {
        try {
            await get('app_pro/img_promotiotion_app', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_promotion: result.result,
                    })
                    setTimeout(() => {
                        console.log("img_promotiotion_app", result.result)
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


    get_user = async () => {
        try {
            await AsyncStorage.getItem('user_token').then((token) => {
                get('user_app/get_user', token).then((result) => {
                    if (result.success) {
                        this.setState({
                            data: result.result,
                        })
                        setTimeout(() => {
                            console.log("data_suer", result.result)
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
            'คุณต้องการจะออกจากระบบหรือไม่ ?',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'ยืนยัน', onPress: () => { this.logout() } },
            ],
            { cancelable: false },
        );
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem('user_token');
            this.props.navigation.push('login')
            return true;
        }
        catch (exception) {
            return false;
        }
    };




    render_show = (user_type) => {
        let return_show
        switch (user_type) {
            case '3': return_show =
                <Container style={{ backgroundColor: '#d2d2d2' }} >
                    <Header style={{ backgroundColor: '#f9b40f' }}>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }} >

                            <Button transparent>
                                <Icon name='person' onPress={() => { this.props.navigation.navigate('data_user') }} />
                            </Button>
                        </Col>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Title style={{ fontFamily: Fonts.PrintAble4U }}>Fitness App</Title>
                        </Col>
                        <Col>
                            <Button transparent>
                                <Icon name='log-out' onPress={() => { this.confirm() }} />
                            </Button>
                        </Col>
                    </Header>
                    {console.log('ss', this.state.data_promotion)}
                    {/* <View style={{paddingTop:'10'}}></View> */}
                    <Card style={{}}>
                        <CardItem style={{ width: '100%', height: 100 }}>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('book') }}>
                                    <Icon name="time" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>จองชั่วโมง</Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('get_promotion') }}>
                                    <Icon name="paper" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>ข่าวสาร</Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('course') }}>
                                    <Icon name="bookmarks" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>คอร์ส</Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('detail_book') }}>
                                    <Icon name="search" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>ตรวจสอบ</Text>
                            </Col>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem active style={{ width: '100%', height: 160, justifyContent: 'center' }}>
                            <Image source={require('../image/member.jpg')} style={{ width: 405, height: 160 }} />
                            {/* <Image style={{ width: '100%', height: 150 }} source={{ uri: '/image/member.jpg' }} /> */}
                        </CardItem>
                    </Card>
                    <Item style={{ justifyContent: 'center' }}>
                        <Label color="#fffff" style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>ข่าวสารใหม่</Label>
                    </Item>

                    {this.state.data_promotion.map((element, index) => {
                        console.log(ip + element.image_promotion)
                        for (var i = 0; index < 2; i++)
                            return (
                                // <View><Image source={{ uri: ip + element.image_promotion }} />{console.log('saksit', ip + element.image_promotion)}</View>
                                <SwipeListView
                                    data={this.state.free}
                                    renderItem={data => (
                                        <Card>
                                            <CardItem active style={{ width: '100%', height: 150 }} button onPress={() => { this.props.navigation.navigate('detail_promotion', { 'itemId': element.id_promotion }) }}>
                                                <Image
                                                    style={{ width: '100%', height: 150 }}
                                                    source={{ uri: ip + element.image_promotion }}
                                                />
                                                <Text>{"\n"}</Text>
                                            </CardItem>

                                        </Card>

                                    )}
                                    renderHiddenItem={() => (
                                        <View style={styles.rowBack}>

                                        </View>
                                    )}
                                    leftOpenValue={0}
                                    rightOpenValue={0}
                                />
                            )
                    }
                    )
                    }
                    <Content />
                    <Footer >
                        <FooterTab style={{ backgroundColor: '#f9b40f' }}>
                            <Button vertical active style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.push('Home') }}>
                                <Icon name="home" active />
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>หน้าหลัก</Text>
                            </Button>
                            <Button vertical onPress={() => { this.props.navigation.push('gym_mem') }}>
                                <Icon name="pin" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
                                <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>ข้อมูลยิม</Text>
                            </Button>
                            <Button vertical badge onPress={() => { this.props.navigation.push('notifications_mem') }}>
                                {/* <Badge><Text>2</Text></Badge> */}
                                <Icon name="md-notifications-outline" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
                                <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>แจ้งเตือน</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>

                break;
            case '4': return_show =

                <Container style={{ backgroundColor: '#d2d2d2' }} >
                    <Header style={{ backgroundColor: '#f9b40f' }}>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }} >

                            <Button transparent>
                                <Icon name='person' onPress={() => { this.props.navigation.navigate('data_user') }} />
                            </Button>
                        </Col>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Title style={{ fontFamily: Fonts.PrintAble4U }}>Fitness App</Title>
                        </Col>
                        <Col>
                            <Button transparent>
                                <Icon name='log-out' onPress={() => { this.confirm() }} />
                            </Button>
                        </Col>
                    </Header>
                    {console.log('ss', this.state.data_promotion)}
                    {/* <View style={{paddingTop:'10'}}></View> */}
                    <Card style={{}}>
                        <CardItem style={{ width: '100%', height: 100 }}>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('manage_train') }}>
                                    <Icon name="time" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>จัดการการจอง</Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('get_promotion') }}>
                                    <Icon name="paper" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>ข่าวสาร</Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Button rounded info style={{ height: 50, width: 50 }} onPress={() => { this.props.navigation.navigate('train_check') }}>
                                    <Icon name="bookmarks" />
                                </Button>
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>ตรวจสอบ</Text>
                            </Col>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem active style={{ width: '100%', height: 160, justifyContent: 'center' }}>
                            <Image source={require('../image/trainer.jpg')} style={{ width: 405, height: 160 }} />
                            {/* <Image style={{ width: '100%', height: 150 }} source={{ uri: '../image/trainer.jpg' }} /> */}
                        </CardItem>
                    </Card>
                    <Item style={{ justifyContent: 'center' }}>
                        <Label color="#fffff" style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>ข่าวสารใหม่</Label>
                    </Item>
                    {this.state.data_promotion.map((element, index) => {
                        console.log(ip + element.image_promotion)
                        for (var i = 0; index < 2; i++)
                            return (
                                // <View><Image source={{ uri: ip + element.image_promotion }} />{console.log('saksit', ip + element.image_promotion)}</View>
                                <SwipeListView
                                    data={this.state.free}
                                    renderItem={data => (
                                        <Card>
                                            <CardItem active style={{ width: '100%', height: 150 }} button onPress={() => { this.props.navigation.navigate('detail_promotion', { 'itemId': element.id_promotion }) }}>
                                                <Image
                                                    style={{ width: '100%', height: 150 }}
                                                    source={{ uri: ip + element.image_promotion }}
                                                />
                                                <Text>{"\n"}</Text>
                                            </CardItem>

                                        </Card>

                                    )}
                                    renderHiddenItem={() => (
                                        <View style={styles.rowBack}>

                                        </View>
                                    )}
                                    leftOpenValue={0}
                                    rightOpenValue={0}
                                />
                            )
                    }
                    )
                    }
                    <Content />
                    <Footer >
                        <FooterTab style={{ backgroundColor: '#f9b40f' }}>
                            <Button vertical active style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.push('Home') }}>
                                <Icon name="home" active />
                                <Text style={{ fontFamily: Fonts.PrintAble4U }}>หน้าหลัก</Text>
                            </Button>
                            <Button vertical onPress={() => { this.props.navigation.push('gym_detail') }}>
                                <Icon name="pin" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
                                <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>ข้อมูลยิม</Text>
                            </Button>
                            <Button vertical badge onPress={() => { this.props.navigation.push('notifications') }}>
                                {/* <Badge><Text>2</Text></Badge> */}
                                <Icon name="md-notifications-outline" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
                                <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>แจ้งเตือน</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>

                break;
            default: return_show =

                // <Text style={{ fontSize: 12 }}>เกิดข้อผิดพลาด</Text>

                <Container>

                </Container>
                break;
        }
        return return_show
    }



    render() {
        return (this.render_show(this.state.data.user_type));
    }
}

export default home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 5,
        justifyContent: 'center',
        height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#d2d2d2',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    test: {
        fontFamily: 'PrintAble4U'
    }
});

