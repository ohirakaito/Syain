package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ChangeSyainServlet
 */
@WebServlet("/ChangeSyainServlet")
public class ChangeSyainServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeSyainServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
    	String itemNo = request.getParameter("itemNo");
		String itemName = request.getParameter("itemName");
		String itemAge = request.getParameter("itemAge");
		String itemGender = request.getParameter("itemGender");
		String itemPic = request.getParameter("itemPic");
		String itemPost = request.getParameter("itemPost");
		String itemPref = request.getParameter("itemPref");
		String itemAddres = request.getParameter("itemAddres");
		String itemBushoName = request.getParameter("itemBushoName");



		// JDBCドライバの準備
		try {
			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "wt2";
		String pass = "wt2";

		// 実行するSQL文
		String sql ="UPDATE \n" +
				"MS_SYAIN_INF \n" +
				"SET \n" +
				"SYAIN_NO='"+itemNo+"', \n" +
				"SYAIN_NAME='"+itemName+"', \n" +
				"AGE='"+itemAge+"', \n" +
				"GENDER='"+itemGender+"', \n" +
				"PHOTO_ID='"+itemPic+"', \n" +
				"ADRES='"+itemPost+" "+itemPref+" "+itemAddres+"', \n" +
				"BUSHO_NAME='"+itemBushoName+"' \n" +
				"WHERE \n" +
				"SYAIN_NO = '"+itemNo+"' \n" ;
		boolean result=true;

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);
				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();
			) {
			// SQLの命令文を実行し、その件数をint型のresultCountに代入します
			int resultCount = stmt.executeUpdate(sql);
			if(resultCount!=1){
				result=true;
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(result));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

}