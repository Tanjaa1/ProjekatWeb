package dao;

import java.io.IOException;
import java.util.Collection;

import com.google.gson.JsonIOException;

import beans.IDelete;
import beans.IIdentifiable;
import dao.sequencer.LongSequencer;

public abstract class AbstractLongDAO<T extends IIdentifiable<Long> & IDelete> extends AbstractDAO<T, Long> {

	private LongSequencer Sequencer;

	public AbstractLongDAO(String path, LongSequencer sequencer) {
		super(path);
		Sequencer = sequencer;
		initializeId();
	}
	
	@Override
	public T save(T newEntity) throws JsonIOException, IOException {
		T entity = getAll().get(newEntity.getId());
		if (entity == null) {
			newEntity.setId(Sequencer.generateId());
		}
		getAll().put(newEntity.getId(), newEntity);
		saveAll();
		return newEntity;
	}


	private long getMaxId(Collection<T> entities) {
		long maxId = 0;
		for (T entity : entities) {
			if (entity.getId() > maxId) {
				maxId = entity.getId();
			}
		}
		return maxId;
	}

	private void initializeId() {
		Sequencer.initialize(getMaxId(getAll().values()));
	}
	
	
}
