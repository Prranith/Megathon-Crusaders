import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const LocationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const getUserLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        sendCoordinates(latitude, longitude);
      },
      error => {
        Alert.alert('Error', error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const sendCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.post('http://your-flask-api-url/get_image', {
        latitude,
        longitude,
      });

      const { image_url, prediction } = response.data;
      setImageUrl(image_url);
      setPrediction(prediction);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch data from API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Flood Prediction App</Text>
      <Button title="Get My Location" onPress={getUserLocation} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && (
        <View>
          <Text>Prediction: {prediction}</Text>
          {imageUrl && <Text>Image URL: {imageUrl}</Text>}
        </View>
      )}
    </View>
  );
};

export default LocationScreen;
