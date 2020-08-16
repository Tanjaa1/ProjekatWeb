package repository;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

import com.google.gson.JsonIOException;

public interface IRepository<T, ID> {
	
	public void init();
	
	public T save(T entity) throws JsonIOException, IOException;
	
	public void saveAll() throws JsonIOException, IOException;
	
	public void loadEntities(Type type) throws IOException;

	public Map<ID, T> getAll();

	public void delete(ID id) throws JsonIOException, IOException;

}
