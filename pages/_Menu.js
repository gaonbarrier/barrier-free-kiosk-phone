import React, {Component} from 'react';
import {
  Right,
  Text,
  ListItem,
  Button,
  Body,
  View,
  Content,
  Item,
  Input,
  Label,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {List, FAB} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

const MenuList = (props) => (
  <ListItem>
    <Body style={{marginLeft: 40}}>
      <Text>{props.menuName}</Text>
    </Body>
    <Right>
      <Button danger>
        <Text>삭제</Text>
      </Button>
    </Right>
  </ListItem>
);

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
  <Content style={{paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
    <Item stackedLabel style={MenuStyle.item}>
      <Label>메뉴 이름</Label>
      <Input />
    </Item>
    <Item stackedLabel style={MenuStyle.item}>
      <Label>메뉴 설명</Label>
      <Input />
    </Item>
    <Button primary style={MenuStyle.item}>
      <Text>추가</Text>
    </Button>
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
    marginTop: 10,
  },
});

export default _Menu;
