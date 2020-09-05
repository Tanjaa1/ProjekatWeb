package dao;

import java.util.Collection;

import beans.IIdentifiable;
import dao.sequencer.LongSequencer;

public abstract class AbstractLongDAO<T extends IIdentifiable<Long>> extends AbstractDAO<T, Long> {

	private LongSequencer Sequencer;

	public AbstractLongDAO(String path, LongSequencer sequencer) {
		super(path);
		Sequencer = sequencer;
		initializeId();
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
