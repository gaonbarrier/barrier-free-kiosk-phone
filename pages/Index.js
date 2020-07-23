import React, {Component} from 'react';
import {Container, Icon, Root} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import _Main from './_Main';
import _Order from './_Order';
import _Menu from './_Menu';
import _Monitoring from './_Monitoring';
import _Option from './_Option';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class DWrapper extends Component {
  render() {
    return (
      <Container>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TabWrapper} />
            <Drawer.Screen name="Setting" component={_Option} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}

class TabWrapper extends Component {
  render() {
    return (
      <Container>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              return getIcon(route.name);
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="메인" component={_Main} />
          <Tab.Screen name="주문" component={_Order} />
          <Tab.Screen name="메뉴" component={_Menu} />
          <Tab.Screen name="키오스크" component={_Monitoring} />
        </Tab.Navigator>
      </Container>
    );
  }
}

function getIcon(tabName) {
  let name;
  switch (tabName) {
    case '메인':
      name = 'md-home';
      break;
    case '주문':
      name = 'md-cafe';
      break;
    case '메뉴':
      name = 'md-document-text';
      break;
    case '키오스크':
      name = 'md-desktop-outline';
      break;
  }
  return <Icon style={{fontSize: 17}} name={name} />;
}
