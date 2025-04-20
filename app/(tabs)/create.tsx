import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from '@/assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/constants'

const create = () => {

  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [rating, setRating] = useState(3)
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const pickImage = async () => { }

  const handleSubmit = async () => { }

  const renderRatingPicker = ()=> {
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
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default create