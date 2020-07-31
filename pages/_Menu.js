import React, {Component} from 'react';
import {View, Content, Item, Input, Label} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {List, FAB, Menu} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {MenuItemEditor, MenuList} from '../components/MenuItem';

const MenuView = ({navigation}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

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

const MenuAdd = () => (
  <Content
    style={{paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
    <Item stackedLabel style={MenuStyle.item}>
      <Label>메뉴 이름</Label>
      <Input />
    </Item>
    <Item stackedLabel style={MenuStyle.item}>
      <Label>메뉴 설명</Label>
      <Input />
    </Item>
    <View style={{flexDirection: 'row'}}>
      <Item stackedLabel style={{flex:1}}>
        <Label>가격</Label>
        <Input />
      </Item>
      <Item stackedLabel style={{flex:1}}>
        <Label>가격 2</Label>
        <Input />
      </Item>
    </View>
    <Item stackedLabel style={{alignItems: 'space-between'}}>
      <Label>재료</Label>
      <ScrollView horizontal={true} style={{alignSelf: 'stretch'}}>
        <MenuItemEditor />
        <MenuItemEditor />
      </ScrollView>
    </Item>
  </Content>
);

const Stack = createStackNavigator();

const _Menu = () => (
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

export default _Menu;
