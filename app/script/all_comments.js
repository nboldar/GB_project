class Comments {
    constructor(idAllComments) {
        this.id = idAllComments;
        this.allComments = [];
        this.getAllComments();
    }


    getAllComments() {
        let self = this;
        $.ajax({
            url: './json/getReview.json',
            type: 'GET',
            success: function (data) {
                data.comments.forEach(function (elem) {
                    let id=elem.id_comment;
                    let email=elem.user_email;
                    let name=elem.user_name;
                    let text=elem.text;
                    let new_comment=new Comment(id,email,name,text);
                    new_comment.render($(`#${self.id}`));
                    self.allComments.push(new_comment);
                });
            },
            error: function (data) {
                console.log(`${data.error_message}`);
            },
            dataType: 'json'
        });
    }

    // render($QueryElement) {
    //     let $commentsTitle = $('<h1 />', {
    //         text: 'Comments'
    //     });
    //     $commentsTitle.appendTo($QueryElement);
    //     console.log(this.commentsItemsId);
    //     // console.log(self.commentsItemsText);//сам массив виден, а отдельный его элемент underfined
    // }

    isCommentsGet() {
        // for(let i=0;i<this.allComments)
        if (this.allComments.length > 0) {
            return true;
        } else {
            return false;
        }

    }

    addComment(obj) {
        let new_comment = new Comment(obj.id_comment, obj.user_email, obj.user_name, obj.text);
        this.allComments.push(new_comment);
    }

    removeComment(id) {
        let self = this;
        self.allComments.forEach(function (elem, i) {
            if (elem.id_comment ===parseInt(id)) {
                self.allComments.splice(i,1);
            }
        });
    }

    refresh() {
        let $commetntsData = $(`#${this.id}`);
        $commetntsData.empty();
        this.getAllComments();
    }
}