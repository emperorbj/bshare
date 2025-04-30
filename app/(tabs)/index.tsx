import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useAuthStore } from '@/store/authStore'
import api from '@/api/axios'
import { Image } from 'expo-image'
import { formatDate } from '@/lib/util'

import styles from '@/assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/constants'
import Loader from '@/components/Loader'



interface Book {
  _id: string;
  title: string;
  caption: string;
  image: string;
  rating: string;
  user: { _id: string; name: string, profileImage: string };
  createdAt: string | Date | undefined;
}

const Home = () => {
  const {user,token} = useAuthStore() as any

  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getBooks = async (pageNumber=1,refresh=false) => {
    try {
      if(refresh) {
        setRefreshing(true)
        setBooks([]); // Clear the books list
        setPage(1); // Reset page to 1
      pageNumber = 1;
      }
      else if(pageNumber === 1) setIsLoading(true)
      
        const response =await api.get(`/api/books?page=${pageNumber}&limit=2`)

        if(!response.data.books) throw new Error('No books found')
        if(response.data.books.length === 0) setHasMore(false)
        
          // Replace books on refresh, append otherwise
    setBooks((prevBooks) =>
      refresh || pageNumber === 1
        ? response.data.books
        : [...prevBooks, ...response.data.books]
    );
        
        setHasMore(pageNumber < response.data.totalPages)
        setPage(pageNumber)

    } catch (error) {
      console.log("error",error)
    } finally{
      if(refresh) setRefreshing(false)
      else setIsLoading(false)
    }
      
  }

  useEffect(()=>{
    getBooks()
  },[])


  const handleLoadMore = async () => {
    if(hasMore && !isLoading && !refreshing) {
      await getBooks(page + 1)
    }
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

  

  const renderItems= ({item}:{item:Book})=>{
    return (
      <View style={styles.bookCard}>
        {/* book header */}
        <View style={styles.bookHeader}>
          <View style={styles.userInfo}>
            <Image source={{uri:item.user.profileImage}} style={styles.avatar}/>
            <Text style={styles.username}>{item.user.name}</Text>
          </View>
        </View>

        {/* book image */}
        <View style={styles.bookImageContainer}>
          <Image source={item.image} style={styles.bookImage} contentFit='cover'/>
        </View>

        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.ratingContainer}>{renderRatingStars(Number(item.rating))}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.date}>shared on {formatDate(item.createdAt)}</Text>
        </View>
      </View>
    )
  }

  if(isLoading) return <Loader/>;
  
  return (
    <View style={styles.container}>
        <FlatList
        data={books}
        renderItem={renderItems}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item._id} 
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
          <Text style={styles.headerTitle}> Intelligentia 👨‍🎓</Text>
          <Text style={styles.headerSubtitle}>Discover great books here ✌️</Text>
        </View>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} color={COLORS.primary} />
          <Text style={styles.emptyText}> No books found</Text>
          <Text style={styles.emptySubtext}>Be the first to share a book</Text>
        </View>
        }

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}

        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator size="small" color={COLORS.primary} style={styles.footerLoader} />
          ) : (
            null
          )}

          refreshControl={<RefreshControl refreshing={refreshing}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary} 
          onRefresh={()=>getBooks(1,true)} />}
        />
    </View>
  )
}

export default Home