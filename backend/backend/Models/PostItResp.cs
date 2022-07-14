using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class PostItResp
    {
        public string status { get; set; }
        public bool success { get; set; }
        public string message { get; set; }
        public int message_code { get; set; }
        public int total { get; set; }
        public Data[] data { get; set; }
        public class Data
        {
            public string post_code { get; set; }
            public string address { get; set; }
            public string street { get; set; }
            public string number { get; set; }
            public string only_number { get; set; }
            public string housing { get; set; }
            public string city { get; set; }
            public string municipality { get; set; }
            public string post { get; set; }
            public string mailbox { get; set; }
        }
    }
}
