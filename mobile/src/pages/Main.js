import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null)

  useEffect(() => {
    async function loadInitialPosition() {
       const { granted } = await requestPermissionsAsync()

       if(granted) {
         const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true   
        })

         const { latitude, longitude } = coords

         setCurrentRegion({
           latitude,
           longitude,
           latitudeDelta: 0.04,
           longitudeDelta: 0.04
         })
       }
    }

    loadInitialPosition()
  }, [])

  if(!currentRegion){
    return null
  }

  return (
    <>
      <MapView initialRegion={currentRegion} style={styles.map} >
        <Marker coordinate={{ latitude: 2.82383186, longitude: -60.69584292 }} >
          <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/9284873?s=460&v=4' }} />
          <Callout onPress={() => {
            // Navegação
            navigation.navigate('Profile', { github_username: 'kennedyrs' })
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Kennedy Rodrigues</Text>
              <Text style={styles.devBio}>Software Developer at @defensoriarr Node.JS, PHP, Postgres, Mysql, React Native</Text>
              <Text style={styles.devTechs}>Node, PHP, ReactJs</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}

          >

        </TextInput>

      </View>
    </>
    )

}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5,

  }

})

export default Main