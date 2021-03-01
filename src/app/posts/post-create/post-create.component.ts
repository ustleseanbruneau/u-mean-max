import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from  '../post.model'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

    //enteredValue = '';
    //newPost = 'NO CONTENT';

    enteredTitle = ''
    enteredContent = ''
    post?: Post
    isLoading = false;
    private mode = 'create'
    private postId: any

    // @Output - pre-Angular service code
    //@Output() postCreated = new EventEmitter();

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit'
          this.postId = paramMap.get('postId')
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = { id: postData._id, title: postData.title, content: postData.content } 
          })
        } else {
          this.mode = 'create'
          this.postId = null
        }
      });
    }

    /*/
    onAddPost(postInput: HTMLTextAreaElement) {
        //alert('Post added!')
        //this.newPost = 'The user\'s post'
        //console.dir(postInput)
        this.newPost = postInput.value;
    }
    */

    onSavePost(form: NgForm) {
        //this.newPost = this.enteredValue
        if (form.invalid) {
          return;
        }
        /* postCreated.emit - pre-Angular service code
        const post: Post = {
          title: form.value.title,
          content: form.value.content
        }
        this.postCreated.emit(post)
        */
       this.isLoading = true;
       if (this.mode === 'create') {
        this.postsService.addPost(form.value.title,form.value.content)
       } else {
        this.postsService.updatePost(this.postId, form.value.title,form.value.content)
       }
       
       form.resetForm()
    }

} 