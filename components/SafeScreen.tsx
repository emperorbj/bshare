import { View, StyleSheet} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '../constants/constants'

export default function SafeScreen({children}:{children:React.ReactNode}) {

    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom:insets.top}]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.background
    }
})