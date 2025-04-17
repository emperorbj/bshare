import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import styles from '@/assets/styles/login.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/constants'
import { Link } from 'expo-router'


export default function login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleLogin = () => {
        console.log(formData);
    }
    return (
        <KeyboardAvoidingView style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
            {/* top illustration */}
            <View style={styles.topIllustration}>
                <Image source={require("@/assets/images/books.png")}
                    style={styles.illustrationImage}
                    contentFit="contain"
                />
            </View>

            {/* card for the form*/}
            <View style={styles.card}>
                <View style={styles.formContainer}>
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

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <Link href={"/signup"} asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>Signup</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>

    )
}