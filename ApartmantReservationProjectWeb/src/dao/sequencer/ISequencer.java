package dao.sequencer;

public interface ISequencer<T> {

	void initialize(T initId);

	T generateId();

}
