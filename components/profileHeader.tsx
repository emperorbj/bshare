import { View, Text } from 'react-native'
import React from 'react'
import styles from '@/assets/styles/profile.styles'
import { useAuthStore } from '@/store/authStore'
import { Image } from 'expo-image'
import COLORS from '@/constants/constants'
import { formatDate } from '@/lib/util'

const ProfileHeader = () => {

  

    const {user} = useAuthStore() as any


  return (
    <View style={styles.profileHeader}>
      <Image source={{uri:user?.profileImage}} style={styles.profileImage}/>

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>joined on {formatDate(user?.createdAt)}</Text>
      </View>
    </View>
  )
}

export default ProfileHeader