import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {List, FAB} from 'react-native-paper';
import {decode as base64decode, encode as base64encode} from 'base-64';
import {createStackNavigator, useCardAnimation} from '@react-navigation/stack';
import {encode as utf8encode, decode as utf8decode} from 'utf8';
import MenuAdd from './_menuAdd';

import {MenuList} from '../components/menu-components';

const MenuView = ({navigation}) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const [menuObject, setMenuObject] = React.useState({
    JUVDJUJCJUE0JUVEJTk0JUJD: [
      {
        menuName: '아메리카노',
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
        menuName: '무슨무슨커피',
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
    JUVCJTlEJUJDJUVCJTk2JUJD: [
      {
        menuName: '녹차라떼',
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
        menuName: '무슨무슨라떼',
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
      categoryName = decodeURIComponent(categoryName);
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

  const DeleteMenuList = (category, menuName) => {
    for (let index in menuObject[category]) {
      if (menuObject[category][index].menuName === menuName) {
        menuObject[category].splice(index, 1);
        if (menuObject[category].length === 0) {
          delete menuObject[category];
        }
        setMenuObject(Object.assign({}, menuObject));
      }
    }
  };

  const UpdateMenuList = (inputObject) => {
    let base64encodedCategory = base64encode(
      encodeURIComponent(inputObject.category),
    );
    if (menuObject[base64encodedCategory] == null) {
      menuObject[base64encodedCategory] = [];
    }
    menuObject[base64encodedCategory].push(inputObject);
    setMenuObject(Object.assign({}, menuObject));
  };

  const MakeMenuList = (props) => {
    let tag = [];
    menuObject[props.category].forEach((menu) => {
      // console.log(menu.menuName);
      tag.push(
        <MenuList
          onDelete={DeleteMenuList}
          menuName={menu.menuName}
          menuCategory={props.category}
        />,
      );
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
        onPress={() =>
          navigation.navigate('메뉴 추가', {
            updateMenu: UpdateMenuList,
          })
        }
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
