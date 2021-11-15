import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';
import login from './user/login';
import notifications from './trainer/notifications'
import home from './member/home'
import gym_detail from './gym/gym_detail'
import data_user from './user/data_user'
import get_promotion from './gym/get_promotion'
import course from './gym/course_train'
import detail_promotion from './gym/detail_promotion'
import book from './trainer/book'
import book_train from './trainer/book_train'
import manage_train from './trainer/manage_train'
import update_user from './user/update_user'
import change_password from './user/change_password'
import train_check from './trainer/train_check'
import check_detail from './trainer/check_detail'
import notifications_mem from './member/notification_mem'
import gym_mem from './gym/gym_mem'
import account from './trainer/account'
import account_update from './trainer/account_update'
import upload_slip from './member/upload_slip'
import detail_book from './member/detail_book'
import check_notificate from './trainer/check_notificate'
// const AppDrawerNavigation = createDrawerNavigator({
//   Home:HomeScreen,
//   Settings:SettingsScreen
// })

const AppNavigator = createStackNavigator({

  // HomeScreen:{
  //   screen:HomeScreen
  // },

  login: {
    screen: login,
    // navigationOptions: () => ({
    //   title: `login`,
    //   headerBackTitle: 'A much too long text for back button from B to A',
    // }),
  },
  check_detail: {
    screen: check_detail
  },

  Home: {
    screen: home,
    navigationOptions: () => ({
      title: "Fitness App",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#f9b40f',
      },
      headerTintColor: '#fff',
    }),
  },

  update_user: {
    screen: update_user
  },

  change_password: {
    screen: change_password
  },

  notifications: {
    screen: notifications
  },

  check_notificate: {
    screen: check_notificate
  },
  gym_detail: {
    screen: gym_detail
  },
  data_user: {
    screen: data_user,
    navigationOptions: () => ({

      title: 'ข้อมูลส่วนตัว',
      headerStyle: {
        backgroundColor: '#f9b40f',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignItems: "center",
        alignContent: "center"
      },

    }),
  },
  course: {
    screen: course
  },
  get_promotion: {
    screen: get_promotion,
    navigationOptions: () => ({
      title: 'ข่าวสาร',
      headerStyle: {
        backgroundColor: '#f9b40f',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }),

  },
  detail_promotion: {
    screen: detail_promotion
  },
  book: {
    screen: book
  },
  book_train: {
    screen: book_train,
    navigationOptions: () => ({
      title: 'ข้อมูลเทรนเนอร์',
      headerStyle: {
        backgroundColor: '#f9b40f',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }),
  },
  manage_train: {
    screen: manage_train
  },
  train_check: {
    screen: train_check
  },
  notifications_mem: {
    screen: notifications_mem
  },
  gym_mem: {
    screen: gym_mem
  },
  account: {
    screen: account
  },
  account_update: {
    screen: account_update
  },
  upload_slip: {
    screen: upload_slip
  },
  detail_book: {
    screen: detail_book
  }

})
const RouteNavigation = createAppContainer(AppNavigator);
// const RouteNavigation = createAppContainer(AppDrawerNavigation);
export default class App extends React.Component {


  render() {
    return (

      <RouteNavigation />
      // <AppDrawerNavigation/>
    );
  }
}



