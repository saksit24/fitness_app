import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, H3, FooterTab, Footer, Icon, Button } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, StyleSheet, View, AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import { post, get, ip } from '../service/service';
import moment from 'moment'
import { Fonts } from '../font'
import DatePicker from 'react-native-datepicker';
import { user_token, user_token_decoded } from '../support/constance'



class book_train extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      name: '',
      phone_number: '',
      last_name: '',
      address: '',
      email: '',
      user_type: '',
      data: [],
      data2: [],
      image_profile: '',
      dob: '',
      gender: '',
      name_trainer: '',
      phone_number_trainer: '',
      email_trainer: '',
      date: '',
      a: "08.00-09.00",
      b: "12.00-13.00",
      c: "16.00-17.00",
      d: "20.00-21.00",

      e: "09.00-10.00 ",
      f: "13.00-14.00",
      g: "17.00-18.00",
      h: "21.00-22.00",

      i: "10.00-11.00 ",
      j: "14.00-15.00",
      k: "18.00-19.00",
      l: "22.00-23.00",

      m: "11.00-12.00 ",
      n: "15.00-16.00",
      o: "19.00-20.00",
      p: "23.00-00.00",

      date_book: '',
      time_book: '',

      price_train: '',
      time1: '',
      time2: '',
      time3: '',
      time4: '',
      time5: '',
      time6: '',
      time7: '',
      time8: '',
      time9: '',
      time10: '',
      time11: '',
      time12: '',
      time13: '',
      time14: '',
      time15: '',
      time16: '',
      mindate:new Date()


    }
    
  }
  state = {
    visibleModalId: null,
    value: null,
    activeButton: 'first',
    btnSelected: null
  };

  componentWillMount() {
    this.detail_train(),
      this.get_user_book(),
      this.get_book()
      // this.dd()
  }

  detail_train = async () => {
    let { navigation } = this.props;
    let param = navigation.getParam('itemId')
    let obj = {
      user_id: param
    }
    // console.log(obj)
    try {
      await post(obj, 'user_app/detail_train', null).then((result) => {
        if (result.success) {
          this.setState({
            data: result.result,
          })
          setTimeout(() => {
            console.log("detail_train", result.result)
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

  get_book = async () => {
    let { navigation } = this.props;
    let param = navigation.getParam('itemId')
    let obj = {
      user_id: param
    }
    console.log('sss', obj)
    try {
      await post(obj, 'app/get_book', null).then((result) => {
        if (result.success) {
          this.setState({
            ...result.result

          })

          setTimeout(() => {
            console.log("get_book", result.result)
          }, 500)
        } else {
          // window.location.href = "/";
          alert("user1" + result.error_message);
        }
      });

    } catch (error) {
      alert(error);
    }
  }

  get_user_book = async () => {
    // console.log('par',user_token)
    try {
      await AsyncStorage.getItem('user_token').then((token) => {
        get('course/get_user_book', token).then((result) => {
          // console.log("user_token")
          if (result.success) {
            this.setState({
              data2: result.result,
            })
            setTimeout(() => {
              console.log("user", result.result)
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
    // console.log('data',data2)
    let object = {
      date_book: this.state.date_book,
      time_book: this.state.time_book,
      price_book: this.state.price_train,
      user_train: this.state.data.user_id,
      user: this.state.data2.user,
      name: this.state.data2.name
    };
    console.log('test', object)
    try {
      await AsyncStorage.getItem('user_token').then((token) => { 
        post(object, "course/book", token).then(result => {
          console.log("book", result);
          if (result.success) {
            // swal("จองเทรนเนอร์สำเร็จ", "", "success");
            setTimeout(() => { alert('จองเทรนเนอร์สำเร็จ') }, 1000)
            this.gg()
          } else {
            alert('error ' + result.error_message);
          }
        });
      })
      
    } catch (error) {
      // alert('error :', error);
    }
    // console.log("Signup" + this.state);
  }

  oninput = (event, data) => {
    // console.log("event", event._dispatchInstances.value)

    this.setState({
      btnSelected: data,
      time_book: event.value,
      time_book: data
    });
  }

  onDate = (date) => {
    // console.log("date", date)

    this.setState({
      date: date,
      date_book: date
    })
  }

  dd = () => {
    this.setState({
      setdate: moment(this.state.date).format('DD-MM-YYYY')
    }
    )
  }

  gg = () => {
    this.setState({
      visibleModal: null,
      btnSelected: null
    })
    // NativeModules.DevSettings.reload();
  }
  renderModalContent = () => (
    <View style={{
      backgroundColor: 'white',
      // padding: 22,
      height: 650,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      borderColor: 'rgba(0, 0, 0, 0.1)'
    }}>
      <Container >
        <CardItem header >
          <Col /><Col><Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 25 }}>รายละเอียดการจอง</Text></Col>
          <Col><Text style={{ marginTop: -40, marginLeft: 100 }} onPress={this.gg}>
            <Icon name='close-circle'></Icon></Text></Col>
        </CardItem>
        <CardItem>
          <Card style={{ height: 'auto', width: 400 }}>
            <CardItem >
              <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 19 }}>เวลาที่เลือก :</Text>
              <Text style={{ fontFamily: Fonts.PrintAble4U, textAlign: 'center', fontSize: 18 }}> {this.state.btnSelected}</Text>
              <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 19 }}> วันที่ : </Text>
              <Text style={{ fontFamily: Fonts.PrintAble4U, textAlign: 'center', fontSize: 18 }}> {this.state.date}</Text>
            </CardItem>
            <CardItem >
              <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 19 }}>ราคา: </Text>
              <Text style={{ fontFamily: Fonts.PrintAble4U, textAlign: 'center', fontSize: 18 }}> {this.state.price_train} บาท</Text>
            </CardItem>

          </Card>
        </CardItem>
        <CardItem>

          <Card style={{ height: 400, width: 400 }}>
            <CardItem>
              {console.log('date', this.state.date)}

              <DatePicker
                style={{ width: 200 }}
                date={this.state.date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={this.state.mindate}

                maxDate="01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"

                // value={this.state.date}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.onDate(date) }}
              />
            </CardItem>

            <CardItem   >
              <Col>
                {
                  this.state.time1 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>08.00-09.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.a) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.a) }} name='time_book' value='08.00-09.00'><Text style={styles.textSelect}>08.00-09.00</Text></Button>
                }
                {
                  this.state.time2 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>12.00-13.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.b) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.b) }} name='time_book' value='12.00-13.00'><Text style={styles.textSelect}>12.00-13.00</Text></Button>
                }
                {
                  this.state.time3 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>16.00-17.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.c) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.c) }} name='time_book' value='16.00-17.00'><Text style={styles.textSelect}>16.00-17.00</Text></Button>
                }
                {
                  this.state.time4 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>20.00-21.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.d) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.d) }} name='time_book' value='20.00-21.00'><Text style={styles.textSelect}>20.00-21.00</Text></Button>
                }

              </Col>
              <Col>
                {
                  this.state.time5 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>09.00-10.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.e) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.e) }} name='time_book' value='09.00-10.00'><Text style={styles.textSelect}>09.00-10.00</Text></Button>
                }
                {
                  this.state.time6 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>13.00-14.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.f) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.f) }} name='time_book' value='13.00-14.00'><Text style={styles.textSelect}>13.00-14.00</Text></Button>
                }
                {
                  this.state.time7 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>17.00-18.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.g) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.g) }} name='time_book' value='17.00-18.00'><Text style={styles.textSelect}>17.00-18.00</Text></Button>
                }
                {
                  this.state.time8 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>21.00-22.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.h) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.h) }} name='time_book' value='21.00-22.00'><Text style={styles.textSelect}>21.00-22.00</Text></Button>

                }
              </Col>
              <Col>
                {
                  this.state.time9 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>10.00-11.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.i) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.i) }} name='time_book' value='10.00-11.00'><Text style={styles.textSelect}>10.00-11.00</Text></Button>
                }
                {
                  this.state.time10 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>14.00-15.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.j) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.j) }} name='time_book' value='14.00-15.00'><Text style={styles.textSelect}>14.00-15.00</Text></Button>
                }
                {
                  this.state.time11 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>18.00-19.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.k) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.k) }} name='time_book' value='18.00-19.00'><Text style={styles.textSelect}>18.00-19.00</Text></Button>
                }
                {
                  this.state.time12 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>22.00-23.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.l) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.l) }} name='time_book' value='22.00-23.00'><Text style={styles.textSelect}>22.00-23.00</Text></Button>
                }
              </Col>

              <Col>
                {
                  this.state.time13 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>11.00-12.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.m) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.m) }} name='time_book' value='11.00-12.00'><Text style={styles.textSelect}>11.00-12.00</Text></Button>
                }
                {
                  this.state.time14 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>15.00-16.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.n) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.n) }} name='time_book' value='15.00-16.00'><Text style={styles.textSelect}>15.00-16.00</Text></Button>
                }
                {
                  this.state.time15 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>19.00-20.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.o) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.o) }} name='time_book' value='19.00-20.00'><Text style={styles.textSelect}>19.00-20.00</Text></Button>
                }
                {
                  this.state.time16 != 1 ?
                    <Button disabled style={styles.disSelected}><Text style={styles.textSelect}>23.00-00.00</Text></Button>
                    :
                    <Button
                      style={(this.state.btnSelected == this.state.p) ? styles.btnSelected : styles.notSelected}
                      onPress={(e) => { this.oninput(e, this.state.p) }} name='time_book' value='23.00-00.00'><Text style={styles.textSelect}>23.00-00.00</Text></Button>
                }
              </Col>
            </CardItem>
          </Card>
        </CardItem>

      </Container>
      <Footer style={{}}>
        <FooterTab >
          <Button onPress={() => this.book()} style={{ backgroundColor: '#f9b40f' }} >
            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19, color: '#ffff', }}>ยืนยันการจอง</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>
  );
  render() {
    return (
      <Container>
        <Content padder>
          <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CardItem header bordered>
              <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 25 }}>ข้อมูลเทรนเนอร์</Text>
            </CardItem>
            <CardItem cardBody>
              <Image source={{ uri: ip + this.state.data.image_profile + '?code=' + new Date().getTime() }} style={{ height: 300, width: null, flex: 1 }} />
            </CardItem>
            <CardItem bordered>
              <Body>
                <Grid >
                  <Body>
                    <Row>
                      <Col ><H3 style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>ชื่อ</H3></Col >
                      <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.name}</Text></Col>
                    </Row>
                    <Row>
                      <Col ><H3 style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>เบอร์โทร</H3></Col>
                      <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.phone_number}</Text></Col>
                    </Row>
                    <Row>
                      <Col ><H3 style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>E-mail</H3></Col>
                      <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.email}</Text></Col>
                    </Row>
                    <Row>
                      <Col ><H3 style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>วันเกิด</H3></Col>
                      <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{moment(this.state.data.dob).format('DD/MM/YYYY')}</Text></Col>
                    </Row>
                    <Row>
                      <Col ><H3 style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>เพศ</H3></Col>
                      <Col ><Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 20 }}>{this.state.data.gender}</Text></Col>
                    </Row>
                  </Body>
                  <Row>

                  </Row>
                </Grid>
              </Body>
            </CardItem>
            <View style={{ backgroundColor: '#f9b40f' }}>
              <CardItem footer bordered button onPress={() => this.setState({ visibleModal: 'bottom' })} >
                <Modal
                  isVisible={this.state.visibleModal === 'bottom'}
                  onSwipeComplete={() => this.setState({ visibleModal: null })}
                  swipeDirection={['down']}
                  // swipeDirection={['up', 'left', 'right', 'down']}
                  style={styles.bottomModal}
                >
                  {this.renderModalContent()}
                </Modal>
                <Text style={{ fontFamily: Fonts.PrintAble4UBold, color: '#00000', fontSize: 25 }}>จองชั่วโมง</Text>
              </CardItem>
            </View>
          </Card>
        </Content >
      </Container >
    );
  }
}

export default book_train

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
  disSelected: {
    // color: 'red',
    marginTop: 10,
    // padding: 20,
    borderRadius: 15,
    backgroundColor: '#d2d2d2',
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
