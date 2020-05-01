package app;

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

@WebServlet("/SyainServlet")
public class SyainServlet extends HttpServlet {


	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {

	/*	response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("login");
		String loginRequest = request.getParameter("loginRequest");
		PrintWriter pw = response.getWriter();

		if(status == null) {//未ログイン
			if(loginRequest != null &&  loginRequest.equals("login")) {
				session.setAttribute("login", "ok");
				pw.append(new ObjectMapper().writeValueAsString("ログイン完了。"));
			}else {
				pw.append(new ObjectMapper().writeValueAsString("ログインして下さい。"));
			}
		}else{//ログイン済み
				if (loginRequest != null && loginRequest.equals("logout")){
					session.removeAttribute("login");
					pw.append(new ObjectMapper().writeValueAsString("ログアウト完了。"));
			}
			else {
				pw.append(new ObjectMapper().writeValueAsString("ログイン済み"));
			}*/

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


					try (
							// データベースへ接続します
							Connection con = DriverManager.getConnection(url, user, pass);

							// SQLの命令文を実行するための準備をおこないます
							Statement stmt = con.createStatement();

							// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
							ResultSet rs1 = stmt.executeQuery(
									"select \n" +
											"SYAIN_NO \n" +
											",SYAIN_NAME \n" +
											"from MS_SYAIN_INF \n" );){


			List<Syain> SyainList=new ArrayList<Syain>();

			while(rs1.next()) {
				Syain syain = new Syain();

				syain.setSyainNo(rs1.getString("SYAIN_NO"));
				syain.setSyainName(rs1.getString("SYAIN_NAME"));


				SyainList.add(syain);
			}


			// アクセスした人に応答するためのJSONを用意する


			// JSONで出力する
			PrintWriter pw = response.getWriter();

			pw.append(new ObjectMapper().writeValueAsString(SyainList));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		}

		// -- ここまで --


	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		// TODO 任意機能「趣味投稿機能に挑戦する場合はこちらを利用して下さい」

		// -- ここまで --
	}

}
