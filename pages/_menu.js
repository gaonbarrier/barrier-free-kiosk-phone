import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {List, FAB} from 'react-native-paper';
import {decode as base64decode, encode as base64encode} from 'base-64';
import {createStackNavigator} from '@react-navigation/stack';
import {encode as utf8encode, decode as utf8decode} from 'utf8';
import MenuAdd from './_menuAdd';

import {MenuList} from '../components/menu-components';

const MenuView = ({navigation}) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const [menuObject, setMenuObject] = React.useState({
    '7Luk7ZS8': [
      {
        name: '아메리카노',
        category: '카테고리',
        price_1: 1300,
        price_2: 1500,
        ingredients: {
          0: {
            name: 'Bean',
            source: {
              uri: null,
            },
          },
          1: {
            name: 'Water',
            source: {
              uri: null,
            },
          },
        },
        options: {
          0: {name: '샷', price: 400},
          1: {name: '크림', price: 300},
        },
      },
      {
        name: '무슨무슨커피',
        category: '카테고리',
        price_1: 1300,
        price_2: 1500,
        ingredients: {
          0: {
            name: 'Bean',
            source: {
              uri: null,
            },
          },
          1: {
            name: 'Water',
            source: {
              uri: null,
            },
          },
        },
        options: {
          0: {name: '샷', price: 400},
          1: {name: '크림', price: 300},
        },
      },
    ],
    '652865a8': [
      {
        name: '녹차라떼',
        category: '카테고리',
        price_1: 1300,
        price_2: 1500,
        ingredients: {
          0: {
            name: 'Bean',
            source: {
              uri: null,
            },
          },
          1: {
            name: 'Water',
            source: {
              uri: null,
            },
          },
        },
        options: {
          0: {name: '샷', price: 400},
          1: {name: '크림', price: 300},
        },
      },
      {
        name: '무슨무슨라떼',
        category: '카테고리',
        price_1: 1300,
        price_2: 1500,
        ingredients: {
          0: {
            name: 'Bean',
            source: {
              uri: null,
            },
          },
          1: {
            name: 'Water',
            source: {
              uri: null,
            },
          },
        },
        options: {
          0: {name: '샷', price: 400},
          1: {name: '크림', price: 300},
        },
      },
    ],
  });

  const MakeMenuAccordion = () => {
    let tag = [];
    let count = 0;
    Object.keys(menuObject).forEach((base64CategoryName) => {
      let categoryName = base64decode(base64CategoryName);
      categoryName = utf8decode(categoryName);
      if (count > 0) {
        tag.push(
          <List.Accordion
            title={categoryName}
            left={(props) => <List.Icon {...props} icon="equal-box" />}>
            <MakeMenuList category={base64CategoryName} />
          </List.Accordion>,
        );
      } else {
        tag.push(
          <List.Accordion
            expanded={expanded}
            onPress={handlePress}
            title={categoryName}
            left={(props) => <List.Icon {...props} icon="equal-box" />}>
            <MakeMenuList category={base64CategoryName} />
          </List.Accordion>,
        );
      }
      count++;
    });
    return tag;
  };

  const MakeMenuList = (props) => {
    let tag = [];
    menuObject[props.category].forEach((menu) => {
      console.log(menu.name);
      tag.push(<MenuList menuName={menu.name} />);
    });
    return tag;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <List.Section title="메뉴">
        <MakeMenuAccordion />
      </List.Section>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('메뉴 추가', {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#d9534f',
  },
});

const Stack = createStackNavigator();
const _menu = () => (
  <Stack.Navigator>
    <Stack.Screen name="메뉴 보기" component={MenuView} />
    <Stack.Screen name="메뉴 추가" component={MenuAdd} />
  </Stack.Navigator>
);

export default _menu;
