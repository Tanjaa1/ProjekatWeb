package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Comment;
import dao.sequencer.LongSequencer;

public class CommentsDAO extends AbstractLongDAO<Comment> {

	public CommentsDAO(String path) {
		super(path, new LongSequencer());

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
