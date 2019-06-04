using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using UnityEngine;

public class tcp_client : MonoBehaviour
{
    public GameObject Camera;
    #region private members 	
    private TcpClient socketConnection;
    private Thread clientReceiveThread;
    #endregion
    // Use this for initialization 	
    void Start()
    {
        ConnectToTcpServer();
        
    }

    // Update is called once per frame
    void Update()
    {
        ClientData cd = new ClientData();

        //Head Position
        Vector3 campos = Camera.gameObject.transform.position;
        //Debug.Log(campos.x.ToString());
        cd.User.x = campos.x;
        cd.User.y = campos.y;
        cd.User.z = campos.z;
        
        //Find and Update Machines
        var ms =  FindObjectsOfType<Machine>();
        for(int i = 0; i < ms.Length; i++)
        {
            Vector3 mpos = ms[i].gameObject.transform.position;
            cd.Machines[i].x = mpos.x;
            cd.Machines[i].y = mpos.y;
            cd.Machines[i].z = mpos.z;
            cd.Machines[i].id = ms[i].ID;

            //TODO Waypoints to be defined in Unity
            cd.Machines[i].waypoint_ids = new List<int> { 1, 2, 3 };
        }

        //Waypoint Data
        var wps = FindObjectsOfType<Waypoint>();
        for(int i = 0; i < wps.Length; i++)
        {
            Vector3 wpos = wps[i].gameObject.transform.position;
            cd.Waypoints[i].x = wpos.x;
            cd.Waypoints[i].y = wpos.y;
            cd.Waypoints[i].z = wpos.z;

            cd.Waypoints[i].id = wps[i].Id;

            //TODO Find children to Waypoint
            cd.Waypoints[i].children = new List<int> { 1, 2, 3 };

            cd.Waypoints[i].is_exit = wps[i].is_exit;
            cd.Waypoints[i].is_machine = wps[i].is_machine;
        }
        
        String ClientDataJson = JsonUtility.ToJson(cd);
        Debug.Log(ClientDataJson);
    }


    int[] findMachines()
    {
        int[] wpoints = new int[100];
        var foundMachines = FindObjectsOfType<Machine>();
        // Create Waypoints
       /* for (int i = 0; i < 10; i++)
        {
            for (int j = 0; j < 10; j++)
            {
                wpoints[] = i * 10 + j;
            }
        }
        */

        for (int k = 0; k < foundMachines.Length; k++)
        {
            Vector3 pos = foundMachines[k].gameObject.transform.position;
            wpoints[(int)((pos.x + 5) * 10 + pos.y + 5)] = 1;
        }
        Debug.Log("Lenght: " + foundMachines.Length.ToString());
        return wpoints;
    }

    /// <summary> 	
    /// Setup socket connection. 	
    /// </summary> 	
    private void ConnectToTcpServer()
    {
        try
        {
            clientReceiveThread = new Thread(new ThreadStart(ListenForData));
            clientReceiveThread.IsBackground = true;
            clientReceiveThread.Start();
        }
        catch (Exception e)
        {
            Debug.Log("On client connect exception " + e);
        }
    }
    /// <summary> 	
    /// Runs in background clientReceiveThread; Listens for incomming data. 	
    /// </summary>     
    private void ListenForData()
    {
        try
        {
            //socketConnection = new TcpClient("localhost", 8052);
            socketConnection = new TcpClient("10.0.4.248" , 9000);
            Byte[] bytes = new Byte[1024];
            while (true)
            {
                // Get a stream object for reading 				
                using (NetworkStream stream = socketConnection.GetStream())
                {
                    int length;
                    // Read incomming stream into byte arrary. 					
                    while ((length = stream.Read(bytes, 0, bytes.Length)) != 0)
                    {
                        var incommingData = new byte[length];
                        Array.Copy(bytes, 0, incommingData, 0, length);
                        // Convert byte array to string message. 						
                        string serverMessage = Encoding.ASCII.GetString(incommingData);
                        Debug.Log("server message received as: " + serverMessage);
                    }
                }
            }
        }
        catch (SocketException socketException)
        {
            Debug.Log("Socket exception: " + socketException);
        }
    }
    /// <summary> 	
    /// Send message to server using socket connection. 	
    /// </summary> 	
    private void SendMessage(string message)
    {
        if (socketConnection == null)
        {
            return;
        }
        try
        {
            // Get a stream object for writing. 			
            NetworkStream stream = socketConnection.GetStream();
            if (stream.CanWrite)
            {
                
                string m = message;
                // Convert string message to byte array.                 
                byte[] clientMessageAsByteArray = Encoding.ASCII.GetBytes(m);
                // Write byte array to socketConnection stream.                 
                stream.Write(clientMessageAsByteArray, 0, clientMessageAsByteArray.Length);
                Debug.Log("Sent message: " + message);
            }
        }
        catch (SocketException socketException)
        {
            Debug.Log("Socket exception: " + socketException);
        }
    }
}