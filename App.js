import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Icon,
} from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import OrderList from './components/OrderList';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

function Test1() {
  return (
    <Content style={{backgroundColor: 'white'}}>
      <OrderList
        thumbnail={require('./images/coffee.jpg')}
        name="아메리카노"
        options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
      />
      <OrderList
        thumbnail={require('./images/coffee.jpg')}
        name="아메리카노"
        options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
      />
      <OrderList
        thumbnail={require('./images/coffee.jpg')}
        name="아메리카노"
        options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
      />
    </Content>
  );
}

function Test2() {
  return <Text>Test2</Text>;
}

function HomeScreen({navigation}) {
  return (
    <Container>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="md-notifications-off-sharp" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Test1} />
        <Tab.Screen name="Settings" component={Test2} />
      </Tab.Navigator>
    </Container>
  );
}

function NotificationsScreen({navigation}) {
  return <Text>Hello</Text>;
}

const Drawer = createDrawerNavigator();

export default class App extends Component {
  render() {
    return (
      <Container>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}
