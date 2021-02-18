import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent {

    enteredValue = '';
    newPost = 'NO CONTENT';

    /*/
    onAddPost(postInput: HTMLTextAreaElement) {
        //alert('Post added!')
        //this.newPost = 'The user\'s post'
        //console.dir(postInput)
        this.newPost = postInput.value;
    }
    */

    onAddPost() {
        this.newPost = this.enteredValue
    }

} 