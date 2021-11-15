import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import {
  Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,
  Icon, Left, Body, Title, H1, H3, View, Footer, FooterTab, List, ListItem, Right
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { Fonts } from '../font'
import { user_token, user_token_decoded } from '../support/constance'
import { post, get, ip } from '../service/service';
import ImagePicker from 'react-native-image-picker';




class data_user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDuration: '',
      user: '',
      name: '',
      phone_number: '',
      last_name: '',
      address: '',
      email: '',
      user_type: '',
      data: [],
      name_eng: '',
      last_name_eng: '',
      personal_id: '',
      gender: '',
      dob: '',
      image_profile: '',
      user_id: '',
      account: [],
      name_ac: '',
      number_ac: '',
      bank_ac: '',
      branch_ac: '',
      user_id: '',
      data2: []
    }
  }
  //   UNSAFE_componentWillMount() {
  //     this.get_promotion()
  // }
  get_user = async () => {
    let { navigation } = this.props;
    let url = JSON.stringify(navigation.getParam('token', 'NO-ID'))
    // let param = queryString.parse(url)
    console.log('par', url)
    try {
      await AsyncStorage.getItem('user_token').then((token) => {
        get('user_app/get_user', token).then((result) => {
          if (result.success) {
            this.setState({
              data: result.result,
            })
            setTimeout(() => {
              console.log("get_promotion", result.result)
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


  get_member = async () => {
    try {
      await AsyncStorage.getItem('user_token').then((token) => {
        get('user_app/get_member', token).then((result) => {
          if (result.success) {
            this.setState({
              data2: result.result,
            })
            setTimeout(() => {
              console.log("get_member", this.state.account)
            }, 500)
          } else {
            alert("user1" + result.error_message);
          }
        });
      })
    } catch (error) {
      alert(error);
    }
  }

  account = async () => {
    try {
      await AsyncStorage.getItem('user_token').then((token) => {
        get('app/show_account', token).then((result) => {
          if (result.success) {
            this.setState({
              account: result.result,
            })
            setTimeout(() => {
              console.log("account", this.state.account)
            }, 500)
          } else {
            alert("user1" + result.error_message);
          }
        });
      })
    } catch (error) {
      alert(error);
    }
  }

  componentDidMount() {
    this.get_user(),
      this.account(),
      this.get_member()
  }


  //   componentDidMount() {
  //     this.get_user();
  //     var that = this;
  //     var tt = '2019-10-24 04:00:45'; //
  //     var date = moment()
  //       .utcOffset('+05:30')
  //       .format('YYYY-MM-DD hh:mm:ss');
  //     var expirydate = tt; //
  //     var diffr = moment.duration(moment(expirydate).diff(moment(date)));
  //     var hours = parseInt(diffr.asHours());
  //     var minutes = parseInt(diffr.minutes());
  //     var seconds = parseInt(diffr.seconds());
  //     var d = hours * 60 * 60 + minutes * 60 + seconds;
  //     that.setState({ totalDuration: d });
  //   }
  // <CountDown
  //                     until={this.state.totalDuration}
  //                     timetoShow={('M', 'S')}
  //                     onFinish={() => alert('หมดเวลา')}
  //                     onPress={() => alert('วันที่ 2019-10-24 เวลา 04:00:45')}
  //                     size={20}
  //                   />



  render_show = (user_type) => {
    let return_show
    switch (user_type) {
      case '3': return_show =
        <Container>
          <Content>
            <Card style={{ flex: 0, justifyContent: 'center', alignItems: 'center', }}>
              <CardItem style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <H1 >  </H1>
                </Body>
              </CardItem >
              <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.state.data.image_profile ? <Image source={{ uri: ip + this.state.data.image_profile + '?code=' + new Date().getTime() }} style={styles.avatar} />
                  :
                  <Image source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} style={styles.avatar} />
                }
              </CardItem>
              <CardItem>
                <Body>
                  <Grid style={{}}>
                    <Body>
                      <Row >
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ชื่อผู้ใช้งาน</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.user}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ชื่อ (th)</Text></Col >
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.name}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ชื่อ (eng)</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.name_eng}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เบอร์โทร</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.phone_number}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ที่อยู่</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.address}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>E-mail</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.email}</Text></Col>
                      </Row>
                      {/* <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เลขประจำตัวประชาชน</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.personal_id}</Text></Col>
                      </Row> */}
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันเกิด</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data.dob).format("D/M/Y")}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เพศ</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.gender}</Text></Col>
                      </Row>
                    </Body>
                  </Grid>
                </Body>
              </CardItem>
              <CardItem>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontFamily: Fonts.PrintAble4U, textAlign: 'center', fontSize: 25 }}>วันหมดอายุสมาชิก</Text>
                </View>
              </CardItem>
              <CardItem>
                <Body>
                  <Grid>{
                    this.state.data2.status == 1 ?
                      <Body>
                        <Row>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ประเภทสมาชิก</Text></Col>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>รายครั้ง</Text></Col>
                        </Row>
                        <Row>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันที่สมัคร</Text></Col>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data2.status_date).format('DD-MM-YYYY')}</Text></Col>
                        </Row>
                        <Row>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันหมดอายุ</Text></Col>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data2.date_end).format('DD-MM-YYYY')}</Text></Col>
                        </Row>
                        <Row>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>จำนวนครั้งที่เหลือ</Text></Col>
                          <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data2.amount+' ครั้ง'}</Text></Col>
                        </Row>
                      </Body>
                      :
                      this.state.data2.status == 2 ?
                        <Body>
                          <Row>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ประเภทสมาชิก</Text></Col>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>รายเดือน</Text></Col>
                          </Row>
                          <Row>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันที่สมัคร</Text></Col>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data2.status_date).format('DD-MM-YYYY')}</Text></Col>
                          </Row>
                          <Row>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันหมดอายุ</Text></Col>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data2.date_end).format('DD-MM-YYYY')}</Text></Col>
                          </Row>
                        </Body>
                        :
                        <Body>
                          <Row>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ประเภทสมาชิก</Text></Col>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>รายปี</Text></Col>
                          </Row>
                          <Row>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันที่สมัคร</Text></Col>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data2.status_date).format('DD-MM-YYYY')}</Text></Col>
                          </Row>
                          <Row>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันหมดอายุ</Text></Col>
                            <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data2.date_end).format('DD-MM-YYYY')}</Text></Col>
                          </Row>
                        </Body>
                  }

                  </Grid>
                </Body>
              </CardItem>
            </Card>
            <Footer>
              <FooterTab >
                <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('update_user') }} >
                  <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>แก้ไขข้อมูลส่วนตัว</Text>
                </Button>
              </FooterTab>
            </Footer>
            <Text style={{ fontSize: 1 }}> </Text>
            <Footer>
              <FooterTab >
                <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('change_password') }} >
                  <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>แก้ไขรหัสผ่าน</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Content>
        </Container>

        break;

      case '4': return_show =

        <Container>
          <Content>
            <Card style={{ flex: 0, justifyContent: 'center', alignItems: 'center', }}>
              <CardItem style={{ justifyContent: 'center', alignItems: 'center', }}>

                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <H1 >  </H1>

                </Body>

              </CardItem >

              <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.state.data.image_profile ? <Image source={{ uri: ip + this.state.data.image_profile + '?code=' + new Date().getTime() }} style={styles.avatar} />
                  :
                  <Image source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} style={styles.avatar} />

                }
              </CardItem>
              <CardItem>
                <Body>
                  <Grid style={{}}>
                    <Body>
                      <Row >
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ชื่อผู้ใช้งาน</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.user}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ชื่อ (ไทย)</Text></Col >
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.name}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ชื่อ (อังกฤษ)</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.name_eng}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เบอร์โทร</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.phone_number}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>ที่อยู่</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.address}</Text></Col>
                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>E-mail</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.email}</Text></Col>
                      </Row>
                      {/* <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เลขประจำตัวประชาชน</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.personal_id}</Text></Col>
                      </Row> */}
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>วันเกิด</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data.dob).format("D/M/Y")}</Text></Col>

                      </Row>
                      <Row>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 20 }}>เพศ</Text></Col>
                        <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.gender}</Text></Col>
                      </Row>
                    </Body>
                  </Grid>
                </Body>
              </CardItem>
            </Card>

            <CardItem>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 25 }}>บัญชีธนาคาร</Text>
              </View>
            </CardItem>
            <List>
              {this.state.account[0] ?
                this.state.account.map((element) => {
                  return (
                    <ListItem avatar onPress={() => { this.props.navigation.navigate('account_update', { 'itemId': element.id_ac }) }}>
                      <Body>
                        <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>เลขที่บัญชี {element.number_ac}</Text>
                        <Text note style={{ fontFamily: Fonts.PrintAble4U, fontSize: 23 }}>ชื่อบัญชี {element.name_ac}</Text>
                        <Text note style={{ fontFamily: Fonts.PrintAble4U, fontSize: 23 }}>ธนาคาร {element.bank_ac}</Text>
                        <Text note style={{ fontFamily: Fonts.PrintAble4U, fontSize: 23 }}>สาขา {element.branch_ac}</Text>
                      </Body>
                    </ListItem>
                  )
                })
                :
                <CardItem>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: Fonts.PrintAble4U, textAlign: 'center', fontSize: 20 }}>กรุณาเพิ่มบัญชีธนาคาร</Text>
                  </View>
                </CardItem>
              }
            </List>
            <CardItem>
            </CardItem>
            <CardItem></CardItem>
            <Footer>
              <FooterTab >
                <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('update_user') }} >
                  <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>แก้ไขข้อมูลส่วนตัว</Text>
                </Button>
              </FooterTab>
            </Footer>
            <Text style={{ fontSize: 1 }}> </Text>
            <Footer>
              <FooterTab >
                <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('change_password') }} >
                  <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>แก้ไขรหัสผ่าน</Text>
                </Button>
              </FooterTab>
            </Footer>
            <Text style={{ fontSize: 1 }}> </Text>
            <Footer>
              <FooterTab >
                <Button style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('account', { 'itemId': this.state.data.user_id }) }}>
                  <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff' }}>เพิ่มบัญชีธนาคาร</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Content>
        </Container>

        break;

      default: return_show =
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


export default data_user;


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