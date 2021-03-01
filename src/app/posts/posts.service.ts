import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { map } from 'rxjs/operators'

import { Post } from './post.model'
import { Router } from '@angular/router'

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient, private router: Router) {

  }

  getPosts() {
    // [...<obj name]
    // makes a copy of object, outside will not directly change array
    //return [...this.posts]

    /* before convert to _id
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts
        this.postsUpdated.next([...this.posts])
      });
    */

    // After convert to _id 
    this.http.get<{message: string, posts: any[]}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts
        this.postsUpdated.next([...this.posts])
      });
    }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    //return {...this.posts.find(p => p.id === id)}
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    )
  }

  addPost(title: string, content: string) {
    const post:  Post = {id: 'l', title: title, content: content}
    this.http
      .post<{message: string; postId: string}>(
        "http://localhost:3000/api/posts", 
        post
      )
      .subscribe((responseData) => {
        //console.log(responseData.message)
        const id = responseData.postId
        post.id = id
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
        this.router.navigate(["/"])
      })
    //this.posts.push(post)
    //this.postsUpdated.next([...this.posts])
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content};
    this.http.put("http://localhost:3000/api/posts/" + id, post)
      .subscribe( response => {
        const updatedPosts = [...this.posts]
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id)
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts
        this.postsUpdated.next([...this.posts])
        this.router.navigate(["/"])
      })
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log('Deleted!')
        const updatedPosts = this.posts.filter(post => post.id !== postId)
        this.posts = updatedPosts
        this.postsUpdated.next([...this.posts])
      })
  }

}