/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package io.doper1234.firsthtml;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.MessageHandler;
import javax.websocket.*;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Chris
 */
@ServerEndpoint("/")
public class Endpoint {
    
    int playerNumber = 0;
    static List<Endpoint> clients = new CopyOnWriteArrayList<>();
    Session session;
    
    @OnOpen
    public void onOpen(Session session, EndpointConfig eC){
        this.session = session;
        clients.add(this);
        playerNumber = clients.size();
        try {
            if(playerNumber > 4){
               session.getBasicRemote().sendText("Server is full!");
               clients.remove(this);
                    try {
                        session.close();
                    } catch (IOException ex1) {
                        ex1.printStackTrace();
                    }
               
            }else{
               session.getBasicRemote().sendText(playerNumber +"");
               if(playerNumber == 1){
                   session.getBasicRemote().sendText("host");
               }
               if(clients.size() >= 2){
                   broadcast("start game");
               }
            }
        } catch (IOException ex) {
            
        }
        //broadcast("someone joined");
    }
    
    @OnClose
    public void onClose(Session session, CloseReason reason){
        System.out.println("socket closed: " + reason.getReasonPhrase());
        playerNumber--;
        clients.clear();
    }
    
    @OnMessage
    public void onMessage(String message){
        System.out.println(message);
        if(message.startsWith("score")){
            saveScore(message);
        }else if(message.startsWith("request")){
            sendScores();
        }else{
            broadcast(message);
        }
        
    }
    
    private void broadcast(String message){
        String[] result = message.split(" ");
        
        int number = 0;
        
        try{
            number = Integer.parseInt(result[0]);
            System.out.println(message);
        
            for(Endpoint client : clients){
                if(clients.get(number-1) != client){
                    try {
                        client.session.getBasicRemote().sendText(/*playerNumber + " " +*/message);
                    } catch (IOException ex) {
                        clients.remove(this);
                        playerNumber--;
                        try {
                            client.session.close();
                        } catch (IOException ex1) {
                            ex1.printStackTrace();

                        }
                    } catch(IllegalStateException e){
                        e.printStackTrace();
                    }
                }//else{
    //               try {
    //                    client.session.getBasicRemote().sendText("You are moving?");
    //                } catch (IOException ex) {
    //                    
    //                } 
    //            }
            }
        }catch(NumberFormatException e){
           for(Endpoint client : clients){
               try {
                   client.session.getBasicRemote().sendText(/*playerNumber + " " +*/message);
               } catch (IOException ex) {
                   Logger.getLogger(Endpoint.class.getName()).log(Level.SEVERE, null, ex);
               }
           } 
        }
        //System.out.println(number + "p is moving right?");
        
    }
    
    private void saveScore(String message){
        String[] result = message.split(" ");
        String name = result[1];
        int score = Integer.parseInt(result[2]);
        SQLDatabaseReader reader = new SQLDatabaseReader();
        reader.saveScore(name, score);
    }
    
    private void sendScores(){
        SQLDatabaseReader reader = new SQLDatabaseReader();
        ArrayList<Score> scores = reader.getScores();
        String scoresToSend = "";
        
        for (int i = 0; i < scores.size(); i++) {
            if(i < scores.size()-1){
                scoresToSend = scoresToSend + "" + scores.get(i).getPlayerName() + " " + scores.get(i).getPlayerScore() + " ";
            }else{
                scoresToSend = scoresToSend + "" + scores.get(i).getPlayerName() + " " + scores.get(i).getPlayerScore();
            }
            
            //scoresToSend = Integer.toString(scores.get(i).getPlayerScore());
        }
        broadcast("scores " + scoresToSend);
        System.out.println(scoresToSend);
    }
}
