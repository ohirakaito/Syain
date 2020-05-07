package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	//response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("SyainNo");
		String loginRequest = request.getParameter("loginRequest");
		PrintWriter pw = response.getWriter();
		Map<String,String> responseData=new HashMap<>();
		if(status == null) {
			/*if(loginRequest != null &&  loginRequest.equals("login")) {
				session.setAttribute("SyainNo", "ok");
				pw.append(new ObjectMapper().writeValueAsString("success"));
			}else {*/
				responseData.put("json", "needLogin");
				//pw.append(new ObjectMapper().writeValueAsString("ログインして下さい。"));

		}else {
			if (loginRequest != null && loginRequest.equals("logout")){
				session.removeAttribute("SyainNo");
				session.removeAttribute("SyainName");
				session.removeAttribute("ROLE");
				responseData.put("json", "Logout");
				//pw.append(new ObjectMapper().writeValueAsString("ログアウト完了。"));
			}else {
				//pw.append(new ObjectMapper().writeValueAsString("ログイン済み"));

				responseData.put("SyainNo",(String)session.getAttribute("SyainNo"));
				responseData.put("SyainName",(String)session.getAttribute("SyainName"));
				responseData.put("ROLE",(String)session.getAttribute("ROLE"));
			}
		}
		pw.append(new ObjectMapper().writeValueAsString(responseData));
	}


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String SyainNo=request.getParameter("SyainNo");
		String Pass=request.getParameter("Pass");

		try {
			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");
			} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
			}

		String url = "jdbc:log4jdbc:oracle:thin:@localhost:1521:XE";
		String user = "wt2";
		String pass = "wt2";

		String sql="select SI.SYAIN_NO,SI.SYAIN_NAME,SL.ROLE \n" +
				"from MS_LOGIN  SL, \n" +
				"MS_SYAIN_INF SI \n" +
				"where 1=1 \n" +
				"and SI.SYAIN_NO='"+SyainNo+"' \n" +
				"and SL.PASS='"+Pass+"' \n" +
				"and SI.SYAIN_NO=SL.SYAIN_NO";
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);) {



			Map<String,String> responseLog = new HashMap<>();

			HttpSession session = request.getSession(true);

			if (rs1.next()) {
				responseLog.put("result", "ok");
				session.setAttribute("SyainNo",rs1.getString("SYAIN_NO"));
				session.setAttribute("SyainName",rs1.getString("SYAIN_NAME"));
				session.setAttribute("ROLE",rs1.getString("ROLE"));

				System.out.println(session.getAttribute("SyainNo"));
				System.out.println(session.getAttribute("SyainName"));
				System.out.println(session.getAttribute("ROLE"));

			}else{
				responseLog.put("result", "ng");
			}

			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString(responseLog));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}


	}
}

