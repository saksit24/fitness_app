import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Thumbnail, Left, Title } from 'native-base';
import { post, get, ip } from '../service/service';
import { Image } from 'react-native'
import { Fonts } from '../font'

class book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: '',
      last_name: '',
      image_profile: '',
    }
  }


  UNSAFE_componentWillMount() {
    this.get_train()
  }



  get_train = async () => {
    try {
      await get('user_app/get_train', null).then((result) => {
        if (result.success) {
          this.setState({
            data: result.result,
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
      <Container>
        <Header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9b40f' }} >
          <Title style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 26 }}>รายชื่อเทรนเนอร์</Title>
        </Header>
        <Content>
          <Image source={{ uri: ip + this.state.data.image_profile }} />
          {console.log("Img_url" + ip + this.state.data.image_profile)}

          {this.state.data.map((element) => {
            return (
              <Card style={{ flex: 0, marginLeft: 10, marginRight: 10, marginTop: 10 }}>

                <CardItem bordered button onPress={() => { this.props.navigation.navigate('book_train', { 'itemId': element.user_id }) }}>
                  <Left>{element.image_profile ? <Thumbnail square large source={{ uri: ip + element.image_profile + '?code=' + new Date().getTime() }} style={{ width: 100, height: 100 }} /> :
                    <Thumbnail square large source={{ uri: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }} style={{ width: 100, height: 100 }} />}
                  </Left>
                  {console.log('dasdads', ip + element.image_profile)}
                  <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: Fonts.PrintAble4UBold, textAlign: 'center', fontSize: 19 }}>{element.name} {element.last_name}
                    </Text>
                  </Body>
                  <Text>{'\n'}</Text>
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>
    );
  }
}
export default book;


// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity,Button } from 'react-native'
// import MenuDrawer from 'react-native-side-drawer'

// class Example extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false
//     };
//   }

//   toggleOpen = () => {
//     this.setState({ open: !this.state.open });
//   };

//   drawerContent = () => {
//     return (
//       <TouchableOpacity  onPress={this.toggleOpen} style={styles.animatedBox}>
//         <Text>Close</Text>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <MenuDrawer 
//           open={this.state.open} 
//           drawerContent={this.drawerContent()}
//           drawerPercentage={50}
//           animationTime={300}
//           overlay={true}
//           opacity={0.4}

//         >
//           <Button onPress={this.toggleOpen} style={styles.body} title='saksit'>
//             <Text>Open</Text>
//           </Button>
//         </MenuDrawer>
//       </View>
//     );
//   }
// }

// export default Example

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//     zIndex: 0.5
//   },
//   animatedBox: {
//     flex: 1,
//     backgroundColor: "#3EEE3E",
//     padding: 50

//   },
//   body: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: '#FFFFFF'
//   }
// })