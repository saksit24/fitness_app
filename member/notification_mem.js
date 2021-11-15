import React, { Component } from 'react';
import { View, Text, Footer, FooterTab, Button, Icon, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Row, Col, } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Image, AsyncStorage, StyleSheet, PixelRatio, TouchableOpacity, Alert } from 'react-native';
import { Fonts } from '../font'
import { post, get, ip } from '../service/service';
import moment from 'moment'


class notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: '1',
      show: 0,
      data: [],
      date_book: '',
      time_book: '',
      user: '',
      name: '',
      last_name: '',
      delete_id: null,
      index_delete: null,
    }
  }



  componentWillMount() {
    this.notification_mem()
  }

  notification_mem = async () => {
    try {
      await get('app/notification_mem', null).then((result) => {
        if (result.success) {
          this.setState({
            data: result.result,
          })
          setTimeout(() => {
            console.log("notification_mem", result.result)
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


  delete_array = (delete_id) => {
    let request_data_array = this.state.data

    let index = request_data_array.findIndex((element) => {
      return element.id_book === delete_id
    })
    request_data_array.splice(index, 1)
    this.setState({ request_data_array: request_data_array })
  }


  delete = async (delete_id) => {
    let object = {
      id_book: delete_id
    }
    console.log('id', object)
    try {
      await post(object, 'app/delete_request', null).then((res) => {
        if (res.success) {
          alert('ลบคำร้องนี้แล้ว')
          setTimeout(() => { this.props.navigation.push('notification_mem') }, 500)
          this.delete_array(delete_id)
        } else {
          console.log(res.error_message)
        }
      })
    } catch (err) {
      console.log(object)
    }
  }



  onChangeData = (value, name) => {
    let data = this.state.data
    data[name] = value
    this.setState({
      data: data
    });
  }



  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#f9b40f' }} />
        <Content>

          {this.state.data.map((element, index) => {
            return (
              element.status_train === 1 ?
                element.status_payment == 1 ?
                  <SwipeListView
                    data={this.state.listViewData}
                    renderItem={(data, rowMap) => (
                      <List>
                        <ListItem avatar button onPress={() => { this.props.navigation.push('upload_slip', { 'itemId': element.id_book, 'ID2': element.user_train }) }}>
                          <Left>
                            <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                          </Left>
                          <Body>
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22 }}>คำขอของคุณถูกยอมรับแล้ว</Text>
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22 }}>(ยืนยันการชำระเงินแล้ว)</Text>
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
                        <ListItem avatar button onPress={() => { this.props.navigation.push('upload_slip', { 'itemId': element.id_book, 'ID2': element.user_train }) }}>
                          <Left>
                            <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                          </Left>
                          <Body>
                            <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 22 }}>คำขอของคุณถูกยอมรับแล้ว</Text>
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
                      <ListItem avatar button onPress={() => {this.delete(element.id_book)}}>
                        <Left>
                          <Thumbnail source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} />
                        </Left>
                        <Body>
                          <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 23 }}>คำร้องของคุณถูกปฎิเสธ</Text>
                          <Text note style={{ fontFamily: Fonts.PrintAble4U }}>แตะเพื่อยอมรับและลบคำร้อง </Text>
                          {/* {/* {console.log('tst', this.state.id_book)} */}
                        </Body>
                        <Right>
                          <Text note>{moment().startOf('day').fromNow()}</Text>
                          <Row>
                            <Text></Text>
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
            <Button vertical onPress={() => { this.props.navigation.push('Home') }}>
              <Icon name="home" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
              <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>หน้าหลัก</Text>
            </Button>
            <Button vertical onPress={() => { this.props.navigation.push('gym_mem') }}>
              <Icon name="pin" style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} />
              <Text style={{ color: "#FFF1BC", fontFamily: Fonts.PrintAble4U }}>ข้อมูลยิม</Text>
            </Button>
            <Button vertical active style={{ backgroundColor: '#f9b40f' }} onPress={() => { this.props.navigation.push('notifications_mem') }}>
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








