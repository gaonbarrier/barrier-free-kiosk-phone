import React, {Component} from 'react';
import {
  View,
  Text,
  ListItem,
  Body,
  Right,
  Button,
  Thumbnail,
  Input,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

// 메뉴 보기에서의 메뉴 리스트
// 간단하게 메뉴 이름 확인하고 삭제 가능
// 메뉴 이름 터치하면 상세내용 확인 가능
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

// 메뉴 재료 추가 컴포넌트
export class Ingred_Edit extends Component {
  constructor(props) {
    super(props);
  }

  options = {
    title: '이미지 찾기',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  getImage = () =>
    ImagePicker.showImagePicker(this.options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.props.upIngred(this.props.key, this.props.name, source);
      }
    });

  render() {
    return (
      <View style={{alignItems: 'center', marginHorizontal: 10}}>
        <TouchableOpacity
          onPress={
            this.props.is_dummy ? this.props.onPress : () => this.getImage()
          }>
          <Thumbnail
            large
            source={this.state.thumbSource}
            style={{backgroundColor: '#dedede'}}
          />
        </TouchableOpacity>
        <Input onEndEditing={(e) => this.props.upIngred(this.props.key, e.nativeEvent.text, this.props.thumbSource)} style={{fontSize: 17}}>{this.props.name}</Input>
      </View>
    );
  }
}
