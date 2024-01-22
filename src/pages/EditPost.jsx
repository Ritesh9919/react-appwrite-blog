import React,{useEffect, useState} from 'react'
import {Container, PostForm} from '../components/index';
import appwriteService from '../appwrite/config';
import {useParams, useNavigate} from 'react-router-dom';

function EditPost() {

const navigate = useNavigate();
const {slug} = useParams();

const [post, setPost] = useState(null);


useEffect(()=> {
  if(slug) {
    appwriteService.getPost(slug)
    .then((post)=> {
        if(post) {
            setPost(post);
        }
        
    })
    
  }else{
    navigate('/');
  }
},[navigate, slug])


  return post ? (
   <div className='py-8'>
   <Container>
    <PostForm post={post}/>
   </Container>
   </div>
  ):null
}

export default EditPost
