import { Component, EventEmitter, Output } from "@angular/core";
//import { Post } from  '../post.model'
import { NgForm } from '@angular/forms'
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {

    //enteredValue = '';
    //newPost = 'NO CONTENT';

    enteredTitle = ''
    enteredContent = ''

    // @Output - pre-Angular service code
    //@Output() postCreated = new EventEmitter();

    constructor(public postsService: PostsService) {}

    /*/
    onAddPost(postInput: HTMLTextAreaElement) {
        //alert('Post added!')
        //this.newPost = 'The user\'s post'
        //console.dir(postInput)
        this.newPost = postInput.value;
    }
    */

    onAddPost(form: NgForm) {
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
       this.postsService.addPost(form.value.title,form.value.content)
       form.resetForm()
    }

} 