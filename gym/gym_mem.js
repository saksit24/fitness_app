import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, Icon, H3, Footer, FooterTab, Button } from "native-base";
import { View, StyleSheet } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather'
import call from 'react-native-phone-call';
import {get ,post, ip} from '../service/service'
import { Fonts } from '../font'

class gym_detail extends Component {
  constructor(props){
    super(props)
    this.state={
      data:[],
      name_gym:'',
      address_gym:'',
      phone_1:'',
      phone_2:'',
      fb_gym:'',
      email_gym:''
    }
  }

  componentWillMount() {
    this.detail_train()
  }

  detail_train = async () => {
  
    try {
      await get('app/get_gym', null).then((result) => {
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

  call = () => {
    const args = {
      number: this.state.data.phone_1,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  call2 = () => {
    const args = {
      number: this.state.data.phone_2,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  render() {
    return (
      <Container style={{backgroundColor:'#d2d2d2'}}>

        <Content padder>
          <Card>
            <CardItem header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#aaaaaa' }}>
              <Text style={{fontFamily:Fonts.PrintAble4UBold,fontSize: 25}}>ข้อมูลยิม</Text>
            </CardItem>
            <CardItem bordered>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <H3 style={{fontFamily:Fonts.PrintAble4UBold,fontSize: 23}}>{this.state.data.name_gym}</H3>
                <Text style={{ fontSize: 14 ,fontFamily:Fonts.PrintAble4U, fontSize: 20}}><Icon name="pin" style={{ color: "#f9b40f" }} /> {this.state.data.address_gym}</Text>
              </Body>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#aaaaaa' }} >
              <Text style={{fontFamily:Fonts.PrintAble4UBold,fontSize: 25}}>การติดต่อ</Text>
            </CardItem>
            {this.state.data.phone_1 ?
            <CardItem bordered>
              <Button rounded info onPress={this.call} style={{ backgroundColor: '#FFFFFF', height: 56, width: 56 }}>
                <Icon name="call" style={{ color: "#f9b40f",fontSize:33 }} />
              </Button>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontFamily:Fonts.PrintAble4U, fontSize: 20}}>{this.state.data.phone_1}</Text>
              </Body>
            </CardItem> : null
            }
            {this.state.data.phone_2 ?
            <CardItem bordered>
              <Button rounded info onPress={this.call2} style={{ backgroundColor: '#FFFFFF', height: 56, width: 56 }}>
                <Icon name="call" style={{ color: "#f9b40f",fontSize:33 }} />
              </Button>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontFamily:Fonts.PrintAble4U, fontSize: 20}}>{this.state.data.phone_2}</Text>
              </Body>
            </CardItem> : null
            }
            {this.state.data.fb_gym ? <CardItem bordered>
            <Button rounded info style={{ backgroundColor: '#FFFFFF', height: 56, width: 56 }}>
                <Icon name="logo-facebook" style={{ color: "#f9b40f" ,fontSize:33 }} />
              </Button>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontFamily:Fonts.PrintAble4U, fontSize: 20}}>{this.state.data.fb_gym}</Text>
              </Body>
            </CardItem>: null
          }
            {this.state.data.email_gym ? 
             <CardItem bordered>
            <Button rounded info style={{ backgroundColor: '#FFFFFF', height: 56, width: 56 }}>
                <Icon name="mail" style={{ color: "#f9b40f" ,fontSize:28 }} />
              </Button>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontFamily:Fonts.PrintAble4U, fontSize: 20}}>{this.state.data.email_gym}</Text>
              </Body>
            </CardItem>:null
          }
           

          </Card>

        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:'#f9b40f'}}>
            <Button vertical onPress={() => { this.props.navigation.push('Home') }}>
              <Icon name="home" style={{backgroundColor:'#f9b40f', color:"#FFF1BC"}}/>
              <Text style={{color:"#FFF1BC", fontFamily:Fonts.PrintAble4U}}>หน้าหลัก</Text>
            </Button>
            <Button vertical active style={{backgroundColor:'#f9b40f'}} onPress={() => { this.props.navigation.push('gym_mem') }}>
              <Icon active name="pin" />
              <Text style={{fontFamily:Fonts.PrintAble4U}}>ข้อมูลยิม</Text>
            </Button>
            <Button vertical onPress={() => { this.props.navigation.push('notifications_mem') }}>
              <Icon name="md-notifications-outline" style={{backgroundColor:'#f9b40f', color:"#FFF1BC"}} />
              <Text style={{color:"#FFF1BC",fontFamily:Fonts.PrintAble4U}}>แจ้งเตือน</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default gym_detail;