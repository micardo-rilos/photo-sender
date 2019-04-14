import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image, View, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker'

export default class App extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      title: "Wybierz zdjęcie",
      cancelButtonTitle: "Zamknij",
      takePhotoButtonTitle: "Zrób zdjęcie...",
      chooseFromLibraryButtonTitle: "Wybierz zdjęcie...",
      mediaType: "photo"
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  handleUploadPhoto = () => {
    fetch("http://192.168.43.57:3000/api/upload", {
      method: "POST",
      body: this.createFormData(this.state.photo)
    })
      .then(response => {
        alert("Zdjęcie wysłane!");
        this.setState({ photo: null });
      })
      .catch(error => {
        alert(error);
      });
  };

  createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri
    });

    return data;
  };

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 92 }}>
          {photo && (
              <Image source={{ uri: photo.uri }} style={{ flex: 1 }}/>
          )}
        </View>

        <View style={ styles.container }>
          <View style={ styles.buttonContainer }>
            <Button title="Wybierz zdjęcie" onPress={this.handleChoosePhoto} />
          </View>
          {photo && (
            <View style={ styles.buttonContainer }>
              <Button title="Wyślij" onPress={this.handleUploadPhoto} />
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonContainer: {
      flex: 1,
  }
});