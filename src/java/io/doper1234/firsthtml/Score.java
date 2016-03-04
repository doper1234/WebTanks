/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package io.doper1234.firsthtml;

/**
 *
 * @author Chris
 */
public class Score {
    private final String playerName;
    private final int playerScore;
    private final String dateScoreAchieved;
    public Score(String name, int score, String date){
        playerName = name;
        playerScore = score;
        dateScoreAchieved = date;
    }
    public String getPlayerName(){
        return playerName;
    }
    public int getPlayerScore(){
        return playerScore;
    }
    public String getDate(){
        return dateScoreAchieved;
    }
}