package org.wcci.apimastery.Embeddables;

import javax.persistence.Embeddable;

@Embeddable
public class Comment {
    private String comment;
    private String author;
    private int rating;

    public Comment() {
    }

    public Comment(String comment, String author, int rating) {
        this.comment = comment;
        this.author = author;
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public String getAuthor() {
        return author;
    }

    public int getRating() {
        return rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
