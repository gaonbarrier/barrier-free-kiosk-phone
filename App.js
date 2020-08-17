import React, {Component} from 'react';
import {View, Button, Text, Input} from 'native-base';
import {Image, TouchableOpacity, ScrollView} from 'react-native';
import {RunServer, RunClient} from './networks/Server';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {moveFile, unlink} from 'react-native-fs';
import utf8 from 'utf8';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      server: {
        ip: '192.168.0.78',
        port: 2002,
      },
      sendMenu: {
        Action: 'NewMenu',
        Name: '테스트',
        Category: '카테고리',
        Price_1: 2000,
        Price_2: 2400,
        Images: ['이미지'],
        Ingredients: ['재료1', '재료2'],
        Options: {
          Option1: '?',
          Option2: '?',
        },
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
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // const source = {uri: response.uri};
          // const source = {uri: 'data:image/jpeg;base64,' + response.data};
          console.log('URI=' + response.uri);
          ImageResizer.createResizedImage(
            response.uri,
            400,
            400,
            'PNG',
            90,
            0,
          ).then(({uri}) => {
            console.log('Resized URI=' + uri);
            let movedUri = uri.replace(
              uri.split('/').pop(),
              this.state.sendMenu.Category +
                '_' +
                this.state.sendMenu.Name +
                '.PNG',
            );
            console.log('Moved=' + movedUri);
            unlink(movedUri);
            moveFile(uri, movedUri);
            this.state.sendMenu.Images[0] = null;
            this.setState({sendMenu: this.state.sendMenu});
            this.state.sendMenu.Images[0] = movedUri;
            this.setState({sendMenu: this.state.sendMenu});
          });
        }
      },
    );
  }

  updateResponse(response) {
    this.setState({response: response});
  }

  updateServerInfo(ip, port) {
    let obj = {};
    obj.ip = ip;
    obj.port = port;
    this.setState({server: obj});
  }

  render() {
    const MockupViewer = () => {
      let obj = {...this.state.sendMenu};
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
          <Button onPress={() => RunClient('file', this.state.server.ip, 2002)}>
            <Text>테스트</Text>
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
        <View style={{backgroundColor: '#c4c4c4', height: 100, marginTop: 70}}>
          <Input
            style={{fontSize: 20}}
            onEndEditing={(e) =>
              this.updateServerInfo(e.nativeEvent.text, this.state.server.port)
            }>
            {this.state.server.ip}
          </Input>
          <Input
            style={{fontSize: 20}}
            onEndEditing={(e) =>
              this.updateServerInfo(
                this.state.server.ip,
                parseInt(e.nativeEvent.text, 10),
              )
            }>
            {this.state.server.port}
          </Input>
        </View>
        <TouchableOpacity onPress={() => this.updateImage()}>
          <Image
            style={{
              marginTop: 40,
              backgroundColor: 'gray',
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
            source={{uri: this.state.sendMenu.Images[0]}}
          />
        </TouchableOpacity>
        <Text>보낼 JSON 데이터</Text>
        <ScrollView vertical style={{height: 200}}>
          <MockupViewer />
        </ScrollView>
      </View>
    );
  }
}
