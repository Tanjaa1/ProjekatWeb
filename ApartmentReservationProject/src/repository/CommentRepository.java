package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Comment;

public class CommentRepository extends AbstractRepository<Comment, Long>{

	public CommentRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Comment>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
