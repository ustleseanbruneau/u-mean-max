import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import { Post } from  '../post.model'
import { PostsService } from '../posts.service'
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  isLoading = false
  totalPosts = 0
  postsPerPage = 2
  currentPage = 1
  pageSizeOptions = [1,2,5,10]
  userIsAuthenticated = false
  userId: string = ""
  private postsSub?: Subscription
  private authStatusSub?: Subscription

  constructor(public postsService: PostsService, private authService: AuthService) {
  }

  ngOnInit() {
    //this.posts = this.postsService.getPosts()
    this.isLoading = true
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
    this.userId = this.authService.getUserId()
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false
        this.totalPosts = postData.postCount
        this.posts = postData.posts
      })
    
    this.userIsAuthenticated = this.authService.getIsAuth()

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
      })


    /*
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false
        this.posts = posts
      })
    */
  }

  onChangedPage(pageData: PageEvent) {
    //console.log(pageData)
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  onDelete(postId: string) {
    this.isLoading = true
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    }, () => {
      this.isLoading = false
    })
  }

  ngOnDestroy() {
    if(this.postsSub) {
      this.postsSub.unsubscribe()
    }

    if(this.authStatusSub) {
      this.authStatusSub.unsubscribe()
    }
  }
}