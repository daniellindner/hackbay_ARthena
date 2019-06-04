using System.Collections.Generic;

public class ClientData
{
    public UserData User;

    public MachineData[] Machines;

    public WaypointData[] Waypoints;

    public class UserData
    {
        public float x { get; set; }
        public float y { get; set; }
        public float z { get; set; }
    }

    public class MachineData
    {
        public float x { get; set; }
        public float y { get; set; }
        public float z { get; set; }

        public int id { get; set; }

        public List<int> waypoint_ids;
    } 

    public class WaypointData
    {
        public int id { get; set; }

        public float x { get; set; }
        public float y { get; set; }
        public float z { get; set; }

        public List<int> children { get; set; }

        public bool is_exit { get; set; }
        public bool is_machine { get; set; }
    }
}
