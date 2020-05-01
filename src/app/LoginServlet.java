package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
    	response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("login");
		String loginRequest = request.getParameter("loginRequest");
		PrintWriter pw = response.getWriter();
		if(status == null) {
			if(loginRequest != null &&  loginRequest.equals("login")) {
				session.setAttribute("login", "ok");
				pw.append(new ObjectMapper().writeValueAsString("ログイン完了。"));
			}else {
				pw.append(new ObjectMapper().writeValueAsString("ログインして下さい。"));
			}
		}else {
			if (loginRequest != null && loginRequest.equals("logout")){
				session.removeAttribute("login");
				pw.append(new ObjectMapper().writeValueAsString("ログアウト完了。"));
			}else {
				pw.append(new ObjectMapper().writeValueAsString("ログイン済み"));
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String EmpId=request.getParameter("EmpId");
		String Pass=request.getParameter("Pass");

		PrintWriter pw = response.getWriter();

		prepareConnectToDB();


		String url = "jdbc:log4jdbc:oracle:thin:@localhost:1521:XE";
		String user = "wt2";
		String pass = "wt2";

		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				PreparedStatement stmt = createPreparedStatement(con,EmpId,Pass);

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery();){
			Map <String,String> responseData=new HashMap<>();
			if(rs1.next()){
				responseData.put("result", "ok");
				responseData.put("EmpId",rs1.getString("EMP_ID"));
				responseData.put("EmpPass",rs1.getString("Pass"));
			}else{
				responseData.put("result", "ng");
			}
			pw.append(new ObjectMapper().writeValueAsString(responseData));
		}catch (Exception e){
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

private void prepareConnectToDB(){
	try {
		// JDBCドライバのロード
		Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
		// ドライバが設定されていない場合はエラーになります
		throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}
}
	private PreparedStatement createPreparedStatement(Connection con,String userId,String pass){
		System.out.println("userId="+userId);
		System.out.println("pass="+pass);
		return stmt;
	}
		//doGet(request, response);
	}

	}


