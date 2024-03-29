import conf from "../conf/conf"
import { Client, Databases, Storage, Query, ID } from "appwrite"

export class DatabaseService {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, featureImage, content, status, userid }) {
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featureImage, userid, status
            })
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, { title, featureImage, content, status }) {
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featureImage, status
            })
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.database.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            return
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            return false
        }
    }

    // file upload services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } catch (error) {
            return false
        }
    }
    async getFilePreveiw(fileId) {
        try {
            return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
        } catch (error) {
            return error
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService