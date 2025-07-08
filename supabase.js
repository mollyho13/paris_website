import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Save a blog post
async function saveBlogPost(postData) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([postData])
  
  if (error) console.log('Error:', error)
  else console.log('Saved!', data)
}

// Load blog posts
async function loadBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
  
  return data
}

// Save photo layout
async function savePhotoLayout(photos) {
  const { data, error } = await supabase
    .from('photos')
    .insert(photos)
    
  if (error) console.log('Error:', error)
}

// Save mood board state
async function saveMoodBoard(items) {
  // First clear existing items
  await supabase.from('mood_items').delete().neq('id', 0)
  
  // Then save new ones
  const { data, error } = await supabase
    .from('mood_items')
    .insert(items)
}

// Upload image
async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file)
    
  if (data) {
    return supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl
  }
}