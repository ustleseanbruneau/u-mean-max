import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { Post } from './post.model'

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) {

  }

  getPosts() {
    // [...<obj name]
    // makes a copy of object, outside will not directly change array
    //return [...this.posts]

    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts
        this.postsUpdated.next([...this.posts])
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post:  Post = {id: 'l', title: title, content: content}
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message)
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])    
      })
    //this.posts.push(post)
    //this.postsUpdated.next([...this.posts])
  }

}