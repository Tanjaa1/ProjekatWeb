package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;

import beans.IIdentifiable;

public abstract class AbstractDAO<T extends IIdentifiable<ID>, ID> implements IDAO<T, ID> {
	private Gson Gson;
	private Map<ID, T> EntityMap;
	private String FilePath;

	public AbstractDAO(String path) {
		Gson = new Gson();
		EntityMap = new HashMap<ID, T>();
		FilePath = path;
		init();
	}

	@Override
	public T save(T entity) throws JsonIOException, IOException {
		EntityMap.put(entity.getId(), entity);
		saveAll();
		return null;
	}

	@Override
	public void saveAll() throws JsonIOException, IOException {
		FileWriter file = new FileWriter(FilePath);
		file.write(Gson.toJson(EntityMap.values()));
		file.close();
	}

	@Override
	public void loadEntities(Type type) throws IOException {
		File file = new File(FilePath);

		if (!file.exists()) {
			FileWriter newFile = new FileWriter(FilePath);
			newFile.close();
		}

		Reader reader = Files.newBufferedReader(Paths.get(FilePath));
		List<T> entities = Gson.fromJson(reader, type);

		if (entities != null) {
			for (T entity : entities) {
				EntityMap.put(entity.getId(), entity);
			}
		}

	}

	@Override
	public Map<ID, T> getAll() {
		return EntityMap;
	}

	@Override
	public void delete(ID id) throws JsonIOException, IOException {
		EntityMap.remove(id);
		saveAll();
	}
	@Override
	public void update(T entity) throws JsonIOException, IOException {
		EntityMap.replace(entity.getId(), entity);
	}

}
