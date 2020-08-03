import React, {Component} from 'react';
import {Container, Icon, Root} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import _main from './_main';
import _order from './_order';
import _menu from './_menu';
import _tablets from './_tablets';
import _settings from './_settings';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class DWrapper extends Component {
  render() {
    return (
      <Container>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TabWrapper} />
            <Drawer.Screen name="Setting" component={_settings} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}

class TabWrapper extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return getIcon(route.name);
          },
        })}
        tabBarOptions={{
          activeTintColor: '#D93820',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="메인" component={_main} />
        <Tab.Screen name="주문" component={_order} />
        <Tab.Screen name="메뉴" component={_menu} />
        <Tab.Screen name="키오스크" component={_tablets} />
      </Tab.Navigator>
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
