package org.wcci.apimastery.entities;

import org.wcci.apimastery.Embeddables.Comment;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;

@Entity
public class Album {
    @Id
    @GeneratedValue
    private long id;
    private String title;
    private String imageUrl;
    private String recordLabel;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Song> songs;

    //make sure to test out deleting an album and making sure comments are removed
    @ElementCollection
    private Collection<Comment> comments;
    private int averageAlbumRating;



    public Album(String title, String imageUrl, String recordLabel, Comment... comments) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.recordLabel = recordLabel;
        this.comments = Arrays.asList(comments);
    }

    public Album() {
    }

    public void setSongs(Collection<Song> songs) {
        this.songs = songs;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getRecordLabel() {
        return recordLabel;
    }

    public Collection<Song> getSongs() {
        return songs;
    }

    public Collection<Comment> getComments() {
        return comments;
    }

    public int getAverageAlbumRating() {
        return averageAlbumRating;
    }

    public void updateTitle(String newTitle){
        title= newTitle;
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void setAverageAlbumRating(int averageRating) {
        this.averageAlbumRating = averageRating;
    }

}
