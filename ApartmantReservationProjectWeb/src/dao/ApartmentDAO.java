package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.print.attribute.standard.DateTimeAtCompleted;

import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import dao.sequencer.LongSequencer;

public class ApartmentDAO extends AbstractLongDAO<Apartment> {

	public ApartmentDAO(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Apartment>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	public Collection<String> getAvailableDate(Apartment apartment) {
		  DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss"); 

			Collection<Date> availableDate=(ArrayList<Date>) apartment.getAvailableDates();

			Collection<String> availableDateString=new ArrayList<String>();
			if(availableDate==null)
				return null;
			for(Date d:availableDate){
				String strDate = dateFormat.format(d);
				String[] s=strDate.split(" ");
				availableDateString.add(s[0]);
			}
			return availableDateString;
	}





}
