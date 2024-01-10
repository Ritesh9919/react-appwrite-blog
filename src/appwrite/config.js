import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Service {
  client = new Client()
  databases;
  storage;

  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);

  }

  async createPost({title, content, slug, featuredImage, status, userId}) {
     try {
        return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
            title,
            content,
            featuredImage,
            status,
            userId

        })
     } catch (error) {
        console.log('appwrite service :: createPost :: error', error);
     }
  }

  async updatePost(slug, {title, content, featuredImage, status}) {
    try {
        return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
            title,
            content,
            featuredImage,
            status,
            
        })
    } catch (error) {
        console.log('appwrite service :: updatePost :: error', error);
    }
  }

  async deletePost(slug) {
     try {
        await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        return true;
     } catch (error) {
        console.log('appwrite service :: deletePost :: error', error);
        return false;
     }
  }

  async getPost(slug) {
    try {
        return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug);
    } catch (error) {
        console.log('appwrite service :: getPost :: error', error);
        return false;
    }
  }

  async getPosts(queries=[Query.equal('status', 'active')]) {
    try {
        return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
    } catch (error) {
        console.log('appwrite service :: getPosts :: error', error);
        return false;
    }
  }

  // File upload service
  async uploadFile(file) {
   try {
     return await this.storage.createFile(conf.appwriteBucketId, ID.unique(),file);
   } catch (error) {
    console.log('appwrite service :: fileUpload :: error', error);
    return false;
   }
  }

  async deleteFile(fileId) {
    try {
        await this.storage.deleteFile(conf.appwriteBucketId,fileId);
        return true;
    } catch (error) {
        console.log('appwrite service :: deleteFile :: error', error);
        return false;
    }
  }

  getFilePreview(fileId) {

 return this.storage.getFilePreview(conf.appwriteBucketId, fileId);

  }
  
}


const service = new Service();

export default service;