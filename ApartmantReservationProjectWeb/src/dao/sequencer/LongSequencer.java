package dao.sequencer;

public class LongSequencer implements ISequencer<Long> {

	private long NextId;

	@Override
	public void initialize(Long initId) {
		NextId = initId;
	}

	@Override
	public Long generateId() {
		return ++NextId;
	}

}
