import { View, Text, KeyboardAvoidingView, Platform, TextInput, 
  TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React,{useState} from 'react'
import styles from '@/assets/styles/signup.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/constants'
import { Link } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import { User, RegisterProps } from '@/types/data'




export default function signup() {

  const {isLoading, register, error, user} = useAuthStore() as RegisterProps
  // const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })


  const handleChange=(name: string, value: string)=> {
    setFormData({...formData,
      [name]: value
    })
  }


  const handleSignUp = async () => {
      const results = await register(formData)

      if(!results.success) {
        Alert.alert('Signup failed',results.error)
      }

      if(results.success) Alert.alert('Signup successful',`Welcome ${user.name}`) 
      
    }

  return (
    <KeyboardAvoidingView style={{flex:1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* form */}
          <View style={styles.formContainer}>
            {/* header */}
              <View style={styles.header}>
                <Text style={styles.title}> Intelligentia 👨‍🎓</Text>
                <Text style={styles.subtitle}>we love books</Text>
              </View>
              {/* fullname */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your name</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person" size={20} color={COLORS.primary} />
                  <TextInput
                  value={formData.name} 
                  placeholder='enter your name'
                  keyboardType='default'
                  placeholderTextColor={COLORS.primary}
                  onChangeText={(text)=>handleChange('name',text)}/>
                </View>
              </View>

              {/* email */}
              <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20}
                                style={styles.inputIcon}
                                color={COLORS.primary} />
                            <TextInput value={formData.email}
                                style={styles.input}
                                keyboardType='email-address'
                                placeholderTextColor={COLORS.placeholderText}
                                placeholder="Email"
                                onChangeText={(text) => handleChange('email', text)}
                            />
                        </View>
                    </View>

                    {/* pasword */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed" size={20}
                                style={styles.inputIcon}
                                color={COLORS.primary} />
                            <TextInput value={formData.password}
                                style={styles.input}
                                secureTextEntry={!showPassword}
                                placeholderTextColor={COLORS.placeholderText}
                                placeholder="password"
                                onChangeText={(text) => handleChange('password', text)}
                            />

                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    style={styles.inputIcon}
                                    color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        {
                            isLoading ? (
                                <ActivityIndicator size={20} color={COLORS.primary} />
                            ) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )
                        }
                    </TouchableOpacity>

                    {/* footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Do you have an account?</Text>
                        <Link href={"/(auth)"} asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}