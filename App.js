import React, {Component} from 'react';
import {View, Button, Text} from 'native-base';
import {Image, TouchableOpacity, ScrollView} from 'react-native';
import {RunServer, RunClient} from './networks/Server';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      server: {
        ip: '192.168.0.78',
        port: 2002,
      },
      sendMenu: {
        action: 'NewMenu',
        menu: '메뉴 이름',
        category: '카테고리',
        image: null,
        price_1: 1300,
        price_2: 1500,
        ingredients: {
          0: {
            name: '커콩',
            image: null,
          },
          1: {
            name: '물',
            image: null,
          },
        },
        options: [
          {name: '샷', price: 400},
          {name: '크림', price: 300},
        ],
      },
      deleteCategory: {
        action: 'RemoveMenu',
        category: '라떼',
      },
      deleteMenu: {
        action: 'RemoveMenu',
        category: '라떼',
        menu: '녹차라떼',
      },
      modifyMenu: {
        action: 'ModifyMenu',
        category: '라떼',
        menu: '메뉴 이름',
        image: null,
        price_1: 1300,
        price_2: 1500,
        ingredients: {
          0: {
            name: '커콩',
            image: null,
          },
          1: {
            name: '물',
            image: null,
          },
        },
        options: [
          {name: '샷', price: 400},
          {name: '크림', price: 300},
        ],
      },
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
        //console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // const source = {uri: response.uri};
          // const source = {uri: 'data:image/jpeg;base64,' + response.data};

          this.state.sendMenu.image = 'data:image/jpeg;base64,' + response.data;
          this.setState({sendMenu: this.state.sendMenu});
        }
      },
    );
  }

  updateResponse(response) {
    this.setState({response: response});
  }

  render() {
    const MockupViwewr = () => {
      let obj = {...this.state.sendMenu};
      obj.image = '(base64 image)';
      return <Text>{JSON.stringify(obj, null, 4)}</Text>;
    };

    return (
      <View>
        <ScrollView horizontal style={{marginTop: 40}}>
          <Button
            onPress={() =>
              RunClient(
                JSON.stringify(this.state.sendMenu),
                this.state.server.ip,
                2002,
              )
            }>
            <Text>메뉴 전송</Text>
          </Button>
          <Button
            onPress={() =>
              RunClient(
                JSON.stringify(this.state.deleteMenu),
                this.state.server.ip,
                2002,
              )
            }>
            <Text>메뉴 삭제</Text>
          </Button>
          <Button
            onPress={() =>
              RunClient(
                JSON.stringify(this.state.modifyMenu),
                this.state.server.ip,
                2002,
              )
            }>
            <Text>메뉴 수정</Text>
          </Button>
          <Button
            onPress={() =>
              RunClient(
                JSON.stringify(this.state.deleteCategory),
                this.state.server.ip,
                2002,
              )
            }>
            <Text>카테고리 삭제</Text>
          </Button>
        </ScrollView>
        <TouchableOpacity onPress={() => this.updateImage()}>
          <Image
            style={{
              marginTop: 40,
              backgroundColor: 'gray',
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
            source={{uri: this.state.sendMenu.image}}
          />
        </TouchableOpacity>
        <Text>보낼 데이터</Text>
        <ScrollView vertical style={{height: 200}}>
          <MockupViwewr />
        </ScrollView>
      </View>
    );
  }
}
