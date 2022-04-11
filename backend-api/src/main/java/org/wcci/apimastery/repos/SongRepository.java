package org.wcci.apimastery.repos;


import org.springframework.data.repository.CrudRepository;
import org.wcci.apimastery.entities.Song;

public interface SongRepository extends CrudRepository<Song, Long> {

}
