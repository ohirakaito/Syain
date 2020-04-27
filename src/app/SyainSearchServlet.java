package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class SyainSearchServlet
 */
@WebServlet("/SyainSearchServlet")
public class SyainSearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Object ItemList = null;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SyainSearchServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException {
    		// アクセス元のHTMLでitemNameに設定された値を取得して、String型の変数itemNameに代入
         	String itemBusho = request.getParameter("itemBusho");
    	    String itemId = request.getParameter("itemId");
    		String itemName = request.getParameter("itemName");

    		// JDBCドライバの準備
    		try {
    		// JDBCドライバのロード
    		Class.forName("oracle.jdbc.driver.OracleDriver");
    		} catch (ClassNotFoundException e) {
    		// ドライバが設定されていない場合はエラーになります
    		throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]",
    		e.getMessage()), e);
    		}
    		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
    		String url = "jdbc:oracle:thin:@localhost:1521:XE";
    		String user = "wt2";
    		String pass = "wt2";
    		// 実行するSQL文
    		String sql ="select \n" +
    				"SYAIN_NO \n" +
    				",SYAIN_NAME \n" +
    				"from \n" +
    				"MS_SYAIN_INF,MS_BUSHO \n" +
    				"where \n" +
    				" SYAIN_NO='"+itemId+"' AND SYAIN_NAME like '%"+itemName+"%'  AND BUSHO_NAME='"+itemBusho+"' \n"; {

    		// エラーが発生するかもしれない処理はtry-catchで囲みます
    		// この場合はDBサーバへの接続に失敗する可能性があります
    					List<Item> ItemList=new ArrayList<Item>();

    		try (
    		// データベースへ接続します
    		Connection con = DriverManager.getConnection(url, user, pass);
    		// SQLの命令文を実行するための準備をおこないます
    		Statement stmt = con.createStatement();
    		// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
    		ResultSet rs1 = stmt.executeQuery(sql);) {


    			if (rs1.next()) {
    				Item item = new Item();
    			item.setSyainNo(rs1.getString("SYAIN_NO"));
    			item.setSyainName(rs1.getString("SYAIN_NAME"));

    			ItemList.add(item);
    			}
    			} catch (Exception e) {
    			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細:[%s]", e.getMessage()), e);
    			}
    			// アクセスした人に応答するためのJSONを用意する
    			PrintWriter pw = response.getWriter();
    			// JSONで出力する
    			pw.append(new ObjectMapper().writeValueAsString(ItemList));
    			}
    }
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
