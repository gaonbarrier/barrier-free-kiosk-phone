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
  Thumbnail,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {List, FAB} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: '이미지 찾기',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
    <View style={MenuStyle.item}>
      <ScrollView horizontal={true}>
        <Thumbnail style={{marginRight:5, backgroundColor: '#dbdbdb'}} square />
        <Thumbnail style={{marginLeft:5, marginRight:5, backgroundColor: '#dbdbdb'}} square />
        <Thumbnail style={{marginLeft:5, marginRight:5, backgroundColor: '#dbdbdb'}} square />
        <Thumbnail style={{marginLeft:5, marginRight:5, backgroundColor: '#dbdbdb'}} square />
        <Thumbnail style={{marginLeft:5, marginRight:5, backgroundColor: '#dbdbdb'}} square />
        <Thumbnail style={{marginLeft:5, marginRight:5, backgroundColor: '#dbdbdb'}} square />
        <Thumbnail style={{marginLeft:5, backgroundColor: '#dbdbdb'}} square />
      </ScrollView>
      <View>
        <Button style={MenuStyle.item_button} onPress={() => getImage()}>
          <Text>이미지</Text>
        </Button>
      </View>
    </View>
  </Content>
);

const getImage = () =>
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source,
      });
    }
  });

const Stack = createStackNavigator();

const _Menu = () => (
  <Stack.Navigator>
    <Stack.Screen name="메뉴 보기" component={MenuView} />
    <Stack.Screen name="메뉴 추가" component={MenuAdd} />
  </Stack.Navigator>
);

const MenuStyle = StyleSheet.create({
  item: {
    margin: 10,
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
