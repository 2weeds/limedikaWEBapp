using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using System.Net;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly IConfiguration _configuration;
        public static IWebHostEnvironment _environment;
        public ClientController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }
        [HttpGet]
        public JsonResult GetClients()
        {
            string query = @"
                    select * from dbo.Clients";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public async Task<IActionResult> GetPostCode([FromForm] string address)
        {
            string postItURL = _configuration.GetSection("PostItAPI:BaseURL").Value;
            string key = _configuration.GetSection("PostItAPI:Key").Value;
            var url = postItURL + "term=" + address + "&key=" + key;
            var httpRequest = (HttpWebRequest)WebRequest.Create(url);
            httpRequest.Accept = "application/json";
            var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
            string result = "";
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }
            PostItResp dataObj = JsonConvert.DeserializeObject<PostItResp>(result);
            Console.WriteLine(dataObj.data[0].post_code);
            UpdateDB(address, dataObj.data[0].post_code);
            return Ok("pavyko");
        }
        void UpdateDB(string address, string postCode)
        {
            string query = @"UPDATE dbo.AuditClients SET LastModifiedDate = GETDATE() WHERE ClientAddress = " + "\'" + address + "\' " +
                "UPDATE dbo.Clients SET ClientPostCode = "+postCode+" WHERE ClientAddress = " + "\'" + address + "\'";
            Console.WriteLine(query);
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                try
                {
                    SqlCommand myCommand = new SqlCommand(query, myCon);
                    myCon.Open();
                    IAsyncResult result = myCommand.BeginExecuteNonQuery();
                    while (!result.IsCompleted)
                    {
                        System.Threading.Thread.Sleep(100);
                    }
                    myCommand.EndExecuteNonQuery(result);
                    myCon.Close();
                }
                catch (SqlException ex)
                {
                    Console.WriteLine("Error: {0}", ex.Message);
                }
                catch (InvalidOperationException ex)
                {
                    Console.WriteLine("Error: {0}", ex.Message);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: {0}", ex.Message);
                }
            }
        }
    }
}
