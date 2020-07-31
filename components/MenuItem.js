import React, {Component} from 'react';
import {
  View,
  Text,
  ListItem,
  Body,
  Right,
  Button,
  Thumbnail,
  Item,
  Input,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const MenuList = (props) => (
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

export class MenuItemEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbSource: {
        uri: null,
      },
    };
  }
  render() {
    return (
      <View style={{alignItems: 'center', marginHorizontal: 10}}>
        <TouchableOpacity onPress={() => getImage(this)}>
          <Thumbnail
            large
            source={this.state.thumbSource}
            style={{backgroundColor: '#dedede'}}
          />
        </TouchableOpacity>
        <Input style={{fontSize: 17, height: 27}}>재료</Input>
      </View>
    );
  }
}

const options = {
  title: '이미지 찾기',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const getImage = (menuItem) =>
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      menuItem.setState({
        thumbSource: source,
      });
    }
  });
