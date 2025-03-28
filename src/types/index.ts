export interface Post {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }