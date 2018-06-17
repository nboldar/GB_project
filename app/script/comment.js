class Comment {
    constructor(id_comment, user_email, user_name, text) {
        this.id_comment = id_comment;
        this.user_email = user_email;
        this.user_name = user_name;
        this.text = text;
    }

    render($Element) {
        let $commentConteiner = $('<div />', {
            class: 'comment',
            'data-id': this.id_comment,
        });
        let $commentText = $('<p />', {
            text: this.text,
            class: 'textcomment',
            'data-id': this.id_comment,
        });
        let $nameText = $('<p />', {
            text: this.user_name,
            class: 'user-name',
            'data-id': this.id_comment,
        });
        let $commentStatus = $('<p />', {
            text: 'Comment in process of moderation',
            class: 'status'
        });
        let $commentApproveBtn = $('<button />', {
            class: 'approve',
            'data-id': this.id_comment,
            text: 'Approve'
        });

        let $commentRejectBtn = $('<button />', {
            class: 'reject',
            'data-id': this.id_comment,
            text: 'Reject'
        });
        $nameText.appendTo($commentConteiner);
        $commentText.appendTo($commentConteiner);
        $commentStatus.appendTo($commentConteiner);
        $commentApproveBtn.appendTo($commentConteiner);
        $commentRejectBtn.appendTo($commentConteiner);

//         console.log($Element.children().length);
$Element.children().first().after($commentConteiner);
//         $Element.append($commentConteiner);


    }

    removeComment(id_comment) {
        $(`[data-id=${id_comment}]`).parent().remove();
    }

}