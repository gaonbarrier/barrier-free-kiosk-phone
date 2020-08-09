import React, {Component} from 'react';
import {
  View,
  Content,
  Item,
  Input,
  Label,
  Text,
  Button,
  Icon,
} from 'native-base';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {List, FAB} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Ingred_Edit,
  MenuList,
  Option_Edit,
} from '../components/menu-components';

const MenuView = ({navigation}) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const [menu, setMenu] = React.useState({
    coffee: {},
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <List.Section title="메뉴">
        <List.Accordion
          title="커피"
          left={(props) => <List.Icon {...props} icon="equal-box" />}
          expanded={expanded}
          onPress={handlePress}>
          <MenuList menuName="아메리카노" />
        </List.Accordion>
        <List.Accordion
          title="디저트"
          left={(props) => <List.Icon {...props} icon="equal-box" />}>
          <MenuList menuName="아메리카노" />
          <MenuList menuName="아메리카노" />
        </List.Accordion>
      </List.Section>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('메뉴 추가')}
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

class MenuAdd extends Component {
  constructor() {
    super();
    this.state = {
      menu: '메뉴 이름',
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
    };
  }

  updateIngredients = (
    index = Object.keys(this.state.ingredients).length,
    name = '메뉴이름',
    thumbSource = {
      uri: null,
    },
  ) => {
    let obj = {};
    obj.name = name;
    obj.source = thumbSource;
    this.state.ingredients[index] = obj;
    this.setState({ingredients: this.state.ingredients});
  };

  updateOptions = (index, name = '옵션이름', price: 0) => {
    let _options = Object.keys(this.state.options);
    index = _options[_options.length - 1] + 1;
    let obj = {};
    obj.name = name;
    obj.price = price;
    this.state.options[index] = obj;
    this.setState({options: this.state.options});
  };

  deleteOption = (index) => {
    delete this.state.options[index];
    this.setState({options: this.state.options});
  };

  render() {
    const Ingreds = () => {
      let tag = [];
      for (let index in this.state.ingredients) {
        tag.push(
          <Ingred_Edit
            name={this.state.ingredients[index].name}
            key={index}
            compKey={index}
            thumbSource={this.state.ingredients[index].source}
            upIngred={this.updateIngredients}
          />,
        );
      }
      return tag;
    };

    const Options = () => {
      let tag = [];
      for (let index in this.state.options) {
        // 10진수로 파싱
        // index = parseInt(index, 10);
        let flag = false;
        let _options = Object.keys(this.state.options);
        if (index === _options[_options.length - 1]) {
          flag = true;
        }
        tag.push(
          <Option_Edit
            key={index}
            compKey={index}
            isLast={flag}
            name={this.state.options[index].name}
            price={this.state.options[index].price}
            updateEvent={this.updateOptions}
            deleteEvent={this.deleteOption}
          />,
        );
      }
      return tag;
    };

    return (
      <Content
        style={{paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
        <Item stackedLabel style={MenuStyle.item}>
          <Label>메뉴 이름</Label>
          <Input onEndEditing={(e) => this.setState({menu: e.nativeEvent.text})} />
        </Item>
        <Item stackedLabel style={MenuStyle.item}>
          <Label>메뉴 카테고리</Label>
          <Input onEndEditing={(e) => this.setState({category: e.nativeEvent.text})}  />
        </Item>
        <View style={{flexDirection: 'row'}}>
          <Item stackedLabel style={{flex: 1}}>
            <Label>가격</Label>
            <Input onEndEditing={(e) => this.setState({price_1: e.nativeEvent.text})}  />
          </Item>
          <Item stackedLabel style={{flex: 1}}>
            <Label>가격 2</Label>
            <Input onEndEditing={(e) => this.setState({price_2: e.nativeEvent.text})}  />
          </Item>
        </View>
        <Item stackedLabel style={{alignItems: 'space-between'}}>
          <Label>재료</Label>
          <ScrollView horizontal={true} style={{alignSelf: 'stretch'}}>
            <Ingreds />
            <Ingred_Edit
              is_dummy={true}
              name="재료이름"
              onPress={() => this.updateIngredients()}
            />
          </ScrollView>
        </Item>
        <Options />
        <Button
          primary
          style={{marginTop: 10}}
          onPress={() => Alert.alert('test', 'ttt')}>
          <Icon name="send" />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>추가</Text>
        </Button>
      </Content>
    );
  }
}

const Stack = createStackNavigator();
const _menu = () => (
  <Stack.Navigator>
    <Stack.Screen name="메뉴 보기" component={MenuView} />
    <Stack.Screen name="메뉴 추가" component={MenuAdd} />
  </Stack.Navigator>
);

const MenuStyle = StyleSheet.create({
  item: {
    margin: 5,
  },
  item_image: {
    margin: 10,
    flexDirection: 'row',
  },
  item_button: {
    marginBottom: 10,
    marginTop: 10,
  },
  test: {width: 80, height: 80, backgroundColor: 'red', margin: 10},
});

export default _menu;
