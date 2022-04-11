package org.wcci.apimastery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.wcci.apimastery.Embeddables.Comment;
import org.wcci.apimastery.entities.Album;
import org.wcci.apimastery.entities.Song;
import org.wcci.apimastery.repos.AlbumRepository;
import org.wcci.apimastery.repos.SongRepository;

import java.util.Collection;

@RestController
public class AlbumController {
    @Autowired
    private AlbumRepository albumRepo;
    @Autowired
    private SongRepository songRepo;


    @GetMapping("/albums")
    public Iterable<Album> getAlbums(){
        return albumRepo.findAll();
    }

    @GetMapping("/albums/{id}")
    public Album getAlbum(@PathVariable long id){
        return albumRepo.findById(id).get();
    }

    @PostMapping("/albums/{id}/addSong")
    public Album getAlbum(@PathVariable long id, @RequestBody Song newSong){
        Album album = albumRepo.findById(id).get();
        newSong.setAlbum(album);
        songRepo.save(newSong);
        return album;
    }

    @PostMapping("/albums/addAlbum")
    public Iterable<Album> addAlbum(@RequestBody Album newAlbum){
        albumRepo.save(newAlbum);
        return albumRepo.findAll();
    }

    @PostMapping("/albums/{id}/addComment")
    public Album addCommentToAlbum(@PathVariable long id, @RequestBody Comment newComment) {
        Album newAlbum = albumRepo.findById(id).get();
        newAlbum.addComment(newComment);
        albumRepo.save(newAlbum);

        float sum = 0;
        for(Comment currentComment: newAlbum.getComments()){
            sum += currentComment.getRating();
        }
        newAlbum.setAverageAlbumRating(Math.round(sum/newAlbum.getComments().size()));
        albumRepo.save(newAlbum);
        return newAlbum;
    }

    @DeleteMapping("/albums/{id}")
    public Iterable<Album> deleteAlbum(@PathVariable long id){
        albumRepo.delete(albumRepo.findById(id).get());
        return albumRepo.findAll();
    }

    @PatchMapping("/albums/{id}")
    public Iterable<Album> updateAlbum(@PathVariable long id, @RequestBody String title){
        Album album = albumRepo.findById(id).get();
        album.updateTitle(title);
        albumRepo.save(album);
        return albumRepo.findAll();
    }

}
