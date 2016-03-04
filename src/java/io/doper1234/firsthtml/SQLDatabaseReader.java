/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package io.doper1234.firsthtml;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.swing.JOptionPane;
/**
 *
 * @author Chris
 */
public class SQLDatabaseReader {
    
    ArrayList<Score> scores;
    
    public static void main(String[] args) {
        SQLDatabaseReader reader = new SQLDatabaseReader();
        reader.getScores();
        String name = "";
        int score = -1;
        reader.saveScoreByInput(name, score);
        reader.saveScore("MRD", 50000);
        reader.getScores();
        
        
    }
    
    public void saveScoreByInput(String name, int score){
        boolean tryAgain;
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        
        do{
            String result = JOptionPane.showInputDialog("enter name to add"); 
            if(result != null){
                name = result.toUpperCase();
            }
        }while(name.length()!= 3 || name.equals(""));
           
        do{
            try{
                score = Integer.parseInt(JOptionPane.showInputDialog("enter score to add"));
                tryAgain = false;
            }catch(NumberFormatException e){
                tryAgain = true;
                JOptionPane.showMessageDialog(null, "Invalid input");
            }
        }while(tryAgain);
        saveScore(name, score, dateFormat.format(date));
        
    }
    
    private Connection connectToDataBase() throws SQLException{
        try {
            // The newInstance() call is a work around for some
            // broken Java implementations
            Class.forName("com.mysql.jdbc.Driver").newInstance();
        } catch (Exception ex) {
            // handle the error
        }
        Connection conn = null;
        String databaseName = "tanks_scores";
        String url = "jdbc:mysql://localhost:3306/" + databaseName +"?autoReconnect=true&useSSL=false";
        String username = "root";
        String password = "hoffman";
        scores = new ArrayList<>();
        conn = DriverManager.getConnection(url, username, password);
        System.out.println("Successful connection.");
        return conn;
    }
    
    public ArrayList<Score> getScores(){
        try {
            // Do something with the Connection
            Connection conn = connectToDataBase();
            Statement m_Statement = conn.createStatement();
            String query = "SELECT * FROM high_scores";
            ResultSet m_ResultSet = m_Statement.executeQuery(query);
            while (m_ResultSet.next()) {
                scores.add(new Score(m_ResultSet.getString(1), Integer.parseInt(m_ResultSet.getString(2)), m_ResultSet.getString(3)));
                //System.out.println(m_ResultSet.getString(1) + " " + m_ResultSet.getString(2));
            }
            for (Score score : scores) {
                System.out.println(score.getPlayerName() + " " + score.getPlayerScore() + " " + score.getDate());
            }
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
        
        return scores;
    }
    
    public void saveScore(String name, int score, String date){
        try {
            // Do something with the Connection
            Connection conn = connectToDataBase();
            Statement m_Statement = conn.createStatement();
            m_Statement.executeUpdate("INSERT INTO high_scores " + "VALUES ('"+ name + "', " + score + ", '"+ date +"')");
            
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
    }
    
    public void saveScore(String name, int score){
        try {
            // Do something with the Connection
            Connection conn = connectToDataBase();
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            Statement m_Statement = conn.createStatement();
            m_Statement.executeUpdate("INSERT INTO high_scores " + "VALUES ('"+ name + "', " + score + ", '"+ dateFormat.format(date) +"')");
            
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
    }
}
