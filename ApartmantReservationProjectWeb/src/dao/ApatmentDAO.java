package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;

import beans.Apartment;

public class ApatmentDAO {

private HashMap<String, Apartment> apartments = new HashMap<String, Apartment>();
	
	public ApatmentDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	public ApatmentDAO(String contextPath) {
		loadApartments(contextPath);
	}

	/***
	 * Vraæa sve proizvode.
	 * @return
	 */
	public Collection<Apartment> findAll() {
		return apartments.values();
	}

	/***
	 *  Vraca proizvod na osnovu njegovog id-a. 
	 *  @return Proizvod sa id-em ako postoji, u suprotnom null
	 */
	public Apartment findApartment(String id) {
		return apartments.containsKey(id) ? apartments.get(id) : null;
	}
	
	/***
	 * Dodaje proizvod u mapu proizvoda. Id novog proizvoda æe biti postavljen na maxPostojeciId + 1.
	 * @param product
	 */
	public Apartment save(Apartment apartment) {
		long maxId = -1;
		for (String id : apartments.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		apartment.setId(maxId);
		apartments.put(Long.toString(apartment.getId()), apartment);
		return apartment;
	}

	/**
	 * Uèitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Kljuè je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadApartments(String contextPath) {
//		BufferedReader in = null;
//		try {
//			File file = new File(contextPath + "/apartment.txt");
//			System.out.println(file.getCanonicalPath());
//			in = new BufferedReader(new FileReader(file));
//			String line, id = "", name = "", price = "";
//			StringTokenizer st;
//			while ((line = in.readLine()) != null) {
//				line = line.trim();
//				if (line.equals("") || line.indexOf('#') == 0)
//					continue;
//				st = new StringTokenizer(line, ";");
//				while (st.hasMoreTokens()) {
//					id = st.nextToken().trim();
//					name = st.nextToken().trim();
//					price = st.nextToken().trim();
//				}
//				apartments.put(id, new Apartment());
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			if ( in != null ) {
//				try {
//					in.close();
//				}
//				catch (Exception e) { }
//			}
//		}
		
	}
}
