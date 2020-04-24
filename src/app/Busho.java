package app;

import java.io.Serializable;

public class Busho implements Serializable {

	private String bushoId;
	private String bushoName;


	public String getBushoId() {
		return bushoId;
	}
	public void setBushoId(String bushoId) {
		this.bushoId = bushoId;
	}
	public String getBushoName() {
		return bushoName;
	}
	public void setBushoName(String bushoName) {
		this.bushoName = bushoName;
	}


}
