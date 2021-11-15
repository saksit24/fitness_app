import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, View, Accordion, Card, CardItem, Body, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { post, get, ip } from '../service/service';
import moment from 'moment'
import { Fonts } from '../font'





class course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all_data: [],
      day_sup: '',
      location_sup: '',
      time_start_sup: '',
      time_end_sup: '',
      course_sup: '',
      all_course: [],
      name_main: '',
      detail_main: '',
      price_main: ''
    }
  }


  UNSAFE_componentWillMount() {
    this.get_all(),
      this.all_course()
  }



  get_all = async () => {
    try {
      await get('course/get_all', null).then((result) => {
        if (result.success) {
          this.setState({
            all_data: result.result,
          })
          setTimeout(() => {
            // console.log("data1", result.result)
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



  all_course = async () => {
    try {
      await get('course/all_course', null).then((result) => {
        if (result.success) {
          this.setState({
            all_course: result.result,
          })
          setTimeout(() => {
            // console.log("data1", result.result)
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
      <Tabs >
        <Tab heading={<TabHeading style={{ backgroundColor: '#f9b40f' }}><Text style={{ color: "#FFFF", fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>รายละเอียดคอร์ส</Text></TabHeading>}>
          <Container style={{ backgroundColor: '#aaaaaa' }}>
            <Content padder>
              {this.state.all_course.map((all_element) => {
                return (
                  <Card>
                    <CardItem header bordered>
                      <Text style={{ color: "#FF9614", fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>{all_element.name_main}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={{ color: "#000000", fontFamily: Fonts.PrintAble4U, fontSize: 25 }}>
                          ราคา: {all_element.price_main} บาท
                      </Text>
                        <Text style={{ color: "#000000", fontFamily: Fonts.PrintAble4U, fontSize: 25 }}>
                          {all_element.detail_main}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                )
              }
              )}

            </Content>
          </Container>
        </Tab>
        <Tab heading={<TabHeading style={{ backgroundColor: '#f9b40f', color: "#FFF1BC" }} ><Text style={{ color: "#FFFF", fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>คอร์สเสริม</Text></TabHeading>}>
          <Container style={{}}>
            <Content padder>
              {
                this.state.all_data.map((course_element) => {
                  return (
                    < Grid style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>

                      <Row style={{borderBottomWidth:1}}>
                        <Col>
                          <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 25 }}>{course_element.day}
                          </Text>

                        </Col>
                      </Row>
                      <Row >
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 21 }}>เวลา</Text>
                        </Col>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 21 }}>คอร์ส</Text>
                        </Col>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: Fonts.PrintAble4UBold, fontSize: 21 }}>สถานที่</Text>
                        </Col>
                      </Row>
                      {course_element.course_result.map((element, index) => {
                        return (
                          <Row>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 18 }}>{moment(element.time_start_sup, "HHmmss").format("HH:mm")}-{moment(element.time_end_sup, "HHmmss").format("HH:mm")}</Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 18 }}>{element.course_sup} </Text>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ fontFamily: Fonts.PrintAble4U, fontSize: 18 }}>{element.location_sup}</Text>
                            </Col>
                          </Row>
                        )
                      })}

                    </Grid>
                  )
                })
              }



            </Content>
          </Container>
        </Tab>

      </Tabs >

    );
  }
}

export default course;