import React, {Component} from 'react';
import {View, Button, Text} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import {RunServer, RunClient} from './networks/Server';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    RunServer();
  }

  updateImage() {
    ImagePicker.showImagePicker(
      {
        title: '이미지 선택',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // const source = {uri: response.uri};

          // You can also display the image using data:
          // const source = {uri: 'data:image/jpeg;base64,' + response.data};
          this.setState({image: 'data:image/jpeg;base64,' + response.data});
        }
      },
    );
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button onPress={() => RunClient('Test', '192.168.0.2', 2002)}>
            <Text>메뉴 전송</Text>
          </Button>
          <Button onPress={() => RunClient('Test', '192.168.0.2', 2002)}>
            <Text>메뉴 삭제</Text>
          </Button>
          <Button onPress={() => RunClient('Test', '192.168.0.2', 2002)}>
            <Text>메뉴 수정</Text>
          </Button>
        </View>
        <TouchableOpacity onPress={() => this.updateImage()}>
          <Image
            style={{
              backgroundColor: 'gray',
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
            source={{uri: this.state.image}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
