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

@WebServlet("/BushoServlet")
public class BushoServlet extends HttpServlet {


	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {

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
											"* \n" +
											"from \n" +
											"MS_BUSHO \n"  );){


			List<Busho> BushoList=new ArrayList<Busho>();

			while(rs1.next()) {
				Busho busho = new Busho();

				busho.setBushoId(rs1.getString("BUSHO_ID"));
				busho.setBushoName(rs1.getString("BUSHO_NAME"));


				BushoList.add(busho);
			}


			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString(BushoList));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}



		// -- ここまで --
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		// TODO 任意機能「趣味投稿機能に挑戦する場合はこちらを利用して下さい」

		// -- ここまで --
	}

}
