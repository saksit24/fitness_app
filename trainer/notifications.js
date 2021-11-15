import React, { Component } from 'react';
import { View, Text, Footer, FooterTab, Button, Icon, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Row, Col, } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { StyleSheet } from 'react-native'
import { Fonts } from '../font'
import { post, get, ip } from '../service/service';
import moment from 'moment';


class notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: '1',
      show: 0,
      data_book: [],
      date_book: '',
      time_book: '',
      user: '',
      name: '',
      last_name: '',
      test: '12-5-2019',
      status: ''
    }
  }




  componentWillMount() {
    this.notification_book()
  }

  notification_book = async () => {
    try {
      await get('app/notification_book', null).then((result) => {
        if (result.success) {
          this.setState({
            data_book: result.result,
          })
          setTimeout(() => {
            console.log("bookdata", result.result)
          }, 500)
        } else {
          alert(res.error_message, "", "error");
        }
      });
    } catch (error) {
      alert(error);
    }
  }


  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#f9b40f' }} />
        <Content>


          {this.state.data_book.map((element, index) => {
            return (
              element.status_train == 0 ?
                <SwipeListView
                  data={this.state.listViewData}
                  renderItem={(data, rowMap) => (
                    <List>
                      <ListItem avatar>
                        <Left>
                          <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                        </Left>
                        <Body>
                          <Text style={{ fontFamily: Fonts.PrintAble4UBold }}>{element.user_name}</Text>
                          <Text note style={{ fontFamily: Fonts.PrintAble4U }}>{element.name} </Text>
                          <Text note style={{ fontFamily: Fonts.PrintAble4U }}>วันที่: {element.date_book}</Text>
                          <Text note style={{ fontFamily: Fonts.PrintAble4U }}>เวลา: {element.time_book}</Text>
                          {/* {/* {console.log('tst', this.state.id_book)} */}
                          {console.log('ww22', element.id_book)}
                        </Body>
                        <Right>
                          <Text note>{moment().startOf('day').fromNow()}</Text>
                          <Row>
                            <Text>  </Text>
                            <Button style={{ width: 70, height: 35 }} onPress={() => this.props.navigation.navigate('check_notificate', { 'itemId': element.id_book, 'ID2': element.user_mem })}><Text style={{ fontSize: 9 }}>ตรวจสอบ</Text></Button>
                          </Row>
                        </Right>
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
                :
                element.status_train == 1 ?
                  element.status_payment == 0 ?
                    <SwipeListView
                      data={this.state.listViewData}
                      renderItem={(data, rowMap) => (
                        <List>
                          <ListItem avatar button onPress={() => { this.props.navigation.push('check_detail', { 'itemId': element.id_book, 'ID2': element.user_mem }) }}>
                            <Left>
                              <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                            </Left>
                            <Body>
                              <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22 }}>ยืนยันการให้บริการแล้ว</Text>
                              <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19 }}>(รอการชำระเงิน)</Text>
                              <Text note style={{ fontFamily: Fonts.PrintAble4U }}>แตะเพื่อตรวจสอบข้อมูล </Text>
                            </Body>
                            <Right>
                              <Text note>{moment().startOf('day').fromNow()}</Text>
                              {/* {this.render_show(this.state.show)} */}
                              <Row>
                                {/* <Button style={{ width: 60, height: 35 }} onPress={() => this.run_status()}><Text style={{ fontSize: 9 }}>ยืนยัน</Text></Button> */}
                                <Text>  </Text>
                              </Row>
                            </Right>
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
                    :
                    <SwipeListView
                      data={this.state.listViewData}
                      renderItem={(data, rowMap) => (
                        <List>
                          <ListItem avatar button onPress={() => { this.props.navigation.push('check_detail', { 'itemId': element.id_book, 'ID2': element.user_mem }) }}>
                            <Left>
                              <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                            </Left>
                            <Body>
                              <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22 }}>ยืนยันการให้บริการแล้ว</Text>
                              <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 19 }}>(ชำระเงินเรียบร้อยแล้ว)</Text>
                              <Text note style={{ fontFamily: Fonts.PrintAble4U }}>แตะเพื่อตรวจสอบข้อมูล </Text>
                            </Body>
                            <Right>
                              <Text note>{moment().startOf('day').fromNow()}</Text>
                              {/* {this.render_show(this.state.show)} */}
                              <Row>
                                {/* <Button style={{ width: 60, height: 35 }} onPress={() => this.run_status()}><Text style={{ fontSize: 9 }}>ยืนยัน</Text></Button> */}
                                <Text>  </Text>
                              </Row>
                            </Right>
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

                  :
                  <SwipeListView
                    data={this.state.listViewData}
                    renderItem={(data, rowMap) => (
                      <List>
                        <ListItem avatar button onPress={() => { alert('เมื่อสมาชิกยอมรับแล้ว คำร้องร้องนี้จะถูกลบ') }}>
                          <Left>
                            <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                          </Left>
                          <Body>
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22 }}>คุณได้ปฎิเสธการให้บริการแล้ว</Text>
                            <Text note style={{ fontFamily: Fonts.PrintAble4U }}>แตะเพื่อตรวจสอบข้อมูล </Text>
                          </Body>
                          <Right>
                            <Text note>{moment().startOf('day').fromNow()}</Text>
                            {/* {this.render_show(this.state.show)} */}
                            <Row>
                              {/* <Button style={{ width: 60, height: 35 }} onPress={() => this.run_status()}><Text style={{ fontSize: 9 }}>ยืนยัน</Text></Button> */}
                              <Text>  </Text>
                            </Row>
                          </Right>
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
          })}



        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: '#f9b40f' }}>
            <Button vertical onPress={() => { this.props.navigation.navigate('Home') }}>
              <Icon name="home" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
              <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>หน้าหลัก</Text>
            </Button>
            <Button vertical onPress={() => { this.props.navigation.navigate('gym_detail') }}>
              <Icon name="pin" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
              <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>ข้อมูลยิม</Text>
            </Button>
            <Button vertical active style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.navigate('notifications') }}>
              <Icon active name="md-notifications-outline" />
              <Text style={{ fontFamily: Fonts.PrintAble4U }}>แจ้งเตือน</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default notifications;



const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
});








