import { View, Text, KeyboardAvoidingView, Platform, ScrollView,
  TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from '@/assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/constants'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useAuthStore } from '@/store/authStore'
import api from '@/api/axios'


const create = () => {

  const { token,logout } = useAuthStore() as any

  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const pickImage = async () => {
    try {
      // seek permission to access the camera roll
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          // permission not granted, show an alert
          Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!")
          return;
        }

      }

      // launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      })

      if (!result.canceled) {
        // console.log("result", result.assets[0].uri);
        setImage(result.assets[0].uri)

        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64)
        }
        // else convert to base64 
        else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64)
        }
      } else {
        Alert.alert("You did not select any image")
      }
    } catch (error) {
      console.log("Error picking image: ", error)
      Alert.alert("Error picking image", "Please try again")
    }
  }

  const handleSubmit = async () => {
    if (!title || !caption || !rating || !image) {
      Alert.alert("Please fill all fields")
      return
    }
    try {
      setIsLoading(true)

      // getting file extension from uri
      const fileExtension = image.split('.')
      const fileType = fileExtension[fileExtension.length - 1]
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg"
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`

      const response = await api.post("/api/books", {
        title,
        caption,
        rating: rating.toString(),
        image: imageDataUrl
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 201) {
        Alert.alert("Book recommendation added successfully")
        setTitle("")
        setCaption("")
        setRating(0)
        setImage(null)
        setImageBase64(null)
        // navigate to the home page
        router.push("/(tabs)")
      } else {
        Alert.alert("Error adding book recommendation")
      }
      setIsLoading(false)
    } catch (error: any) {
      console.log("Auth token:", token);
      console.log("Error adding book recommendation: ", error.response?.data || error.message);
      Alert.alert(
        "Error adding book recommendation",
        error.response?.data?.message || "Please try again"
      );
      setIsLoading(false)
    }
  }
  const renderRatingPicker = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Ionicons key={i} name={i <= rating ? "star" : "star-outline"}
            size={20} color={i <= rating ? "#f4b400" : COLORS.textSecondary} onPress={() => setRating(i)} />
        </TouchableOpacity>
      )
    }

    return <View style={styles.ratingContainer}>
      {stars}
    </View>
  }


  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}>
        <View style={styles.card}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your thoughts on a book</Text>
          </View>

          {/* form */}

          <View style={styles.form}>
            {/* title */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="book-outline" size={20}
                  style={styles.inputIcon}
                  color={COLORS.primary} />
                <TextInput value={title}
                  style={styles.input}

                  placeholderTextColor={COLORS.placeholderText}
                  placeholder="Add title"
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* rating */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingPicker()}
            </View>


            {/* image  */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Add a cover image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.primary} />
                    <Text style={styles.placeholderText}>Tap to add a cover image</Text>
                  </View>
                )}

              </TouchableOpacity>
            </View>

            {/* caption */}
            <View style={styles.formGroup}>

              <Text style={styles.label}>Caption</Text>
              <TextInput value={caption}
                style={styles.textArea}
                placeholderTextColor={COLORS.placeholderText}
                placeholder="Add a caption"
                multiline
                onChangeText={setCaption}
              />

            </View>


            {/* submit button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
              {
                isLoading ? (
                  <ActivityIndicator size={25} color={COLORS.white} />
                ) : (
                  <>
                    <Ionicons name="cloud-upload-outline" style={styles.buttonIcon} size={24} color={COLORS.white} />
                    <Text style={styles.buttonText}>share</Text>
                  </>
                )
              }
            </TouchableOpacity>




            
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default create