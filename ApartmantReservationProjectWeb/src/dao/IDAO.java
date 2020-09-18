package dao;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

import com.google.gson.JsonIOException;

public interface IDAO<T, ID> {

	public void init();

	public T save(T entity) throws JsonIOException, IOException;

	public void saveAll() throws JsonIOException, IOException;

	public  Map<ID, T> loadEntities(Type type) throws IOException;

	public Map<ID, T> getAll();
	
	public void update(T entity) throws JsonIOException, IOException;
	
	public T getById(ID id);
	
	public T deleteLogical(ID id) throws JsonIOException, IOException;


}
