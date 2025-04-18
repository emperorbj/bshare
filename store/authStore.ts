import {create} from "zustand"
import api from "../api/axios"
import { User } from "../types/data"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useAuthStore = create((set)=>({
    user:null,
    token:null,
    isLoading:false,
    error:null,

    
    register:async (formData:User)=>{
        set({isLoading:true,error:null})
        try {
            const response = await api.post("/api/auth/register",formData)
            // set({user:response.data.user,token:response.data.token})
            if(!response.data.user) throw new Error('Signup failed because')
            await AsyncStorage.setItem('authToken',response.data.token)
            await AsyncStorage.setItem('authUser',JSON.stringify(response.data.user))

            set({user:response.data.user,token:response.data.token,isLoading:false})

            return {success:true}
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || 'Signup failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
      
        }
    },

    checkAuth: async () => {
        try {
          const authToken = await AsyncStorage.getItem('authToken');
          const authUser = await AsyncStorage.getItem('authUser');
          if (authToken && authUser) {
            const user = JSON.parse(authUser);
            set({ user, token: authToken });
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
        }
    },
    
    login:async(formData:User)=>{
        set({isLoading:true,error:null})
      try{
      const response = await api.post('/api/auth/login',formData)
      if(!response.data.user){
            throw new Error('login failed')
        }
       await AsyncStorage.setItem('authToken',response?.data?.token)
       await AsyncStorage.setItem('user',JSON.stringify(response?.data?.user))
       set({user:response?.data?.user, token:response?.data?.token})
       return {success:true}
      }catch(error:any){
        const errorMessage = error.response?.data?.message || 'Login failed';
        set({ error: errorMessage, isLoading: false });
        return { success: false, error: errorMessage };
        
      }
    },

    logout:async()=>{
        await AsyncStorage.removeItem('authToken')
        await AsyncStorage.removeItem('user')
        set({user:null,token:null})
    }
}))