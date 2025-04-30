import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React,{useEffect, useState} from 'react'
import api from '@/api/axios';
import { useAuthStore } from '@/store/authStore'
import styles from '@/assets/styles/profile.styles';
import ProfileHeader from '@/components/profileHeader'
import LogOut from '@/components/LogOut';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/constants';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { formatDate } from '@/lib/util';
import { useRouter } from 'expo-router';
import Loader from '@/components/Loader';
interface Book {
  _id: string;
  title: string;
  caption: string;
  image: string;
  rating: string;
  user: { _id: string; name: string, profileImage: string };
  createdAt: string | Date | undefined;
}
const profile = () => {
  const {user,token} = useAuthStore() as any
  const router = useRouter()
    

   const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState<Book[]>([])
    const [deletedBook, setDeletedBook] = useState<string | null>(null)


    const getBooks = async () => {
      try {
          setIsLoading
        
          const response =await api.get(`/api/books/recommended`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
  
          if(!response.data.books) throw new Error('No books found')
          
          

      setBooks(response.data.books);
          
  
      } catch (error) {
        console.log("error",error)
      } finally{
      
        setIsLoading(false)
      }
        
    }

    const deleteBook = async(id:string) => {
      try {
        setIsLoading(true)
        setDeletedBook(id)
        const response = await api.delete(`/api/books/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if(!response.data.success) throw new Error('Unable to delete book')
        
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id))
        Alert.alert("Book deleted successfully")
        
      } catch (error) {
        console.log("error",error)
      } finally{
        setIsLoading(false)
        setDeletedBook(null)
      }
    }


    useEffect(()=>{
      getBooks()
    },[])


    const confirmDelete = (itemId:string)=>{
      Alert.alert("Are you Sure","you want to delete this",[
      {
        "text":"cancel",
        "style":"cancel"
      },
       {
        "text":"Delete",
        "style":"destructive",
        onPress:()=>deleteBook(itemId)
      }
      ])
    }


    const renderRatingStars = (rating: number) => {
      const stars = []
      for (let i = 1; i <= 5; i++) {
        stars.push(
          
            <Ionicons key={i} name={i <= rating ? "star" : "star-outline"}
              size={20} color={i <= rating ? "#f4b400" : COLORS.textSecondary}
              style={{marginRight: 2}} />
          
        )
      }
  
      return stars
    
    }

    const renderBookList = ({item}:{item:Book})=> (
      <View style={styles.bookItem}>
        <Image style={styles.bookImage} source={item.image}/>

        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            {renderRatingStars(parseInt(item.rating))}
          </View>
          <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
          <Text style={styles.bookDate}>{formatDate(item.createdAt)}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={()=>confirmDelete(item._id)}>
          {deletedBook === item._id ? (<ActivityIndicator size={25} color={COLORS.primary}/>)
          :(<Ionicons name="trash-outline" size={20} color={COLORS.primary}/>)}
        </TouchableOpacity>
      </View>
    )

    
  if(isLoading) {
    <Loader/>
  }

  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <LogOut/>

      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Recommended Books 📚</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList
      data={books}
      renderItem={renderBookList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.booksList}
      keyExtractor={(item)=> item._id}

      ListEmptyComponent={
        <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} color={COLORS.primary} />
          <Text style={styles.emptyText}> No recommended books found</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(tabs)/create')}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add a book</Text>
          </TouchableOpacity>
        </View>
      }
      />
    </View>
  )
}

export default profile