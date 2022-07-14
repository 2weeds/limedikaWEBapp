using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private readonly IConfiguration _configuration;
        public static IWebHostEnvironment _environment;
        public FileController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }
        [HttpPost]
        public async Task<IActionResult> ImportFile([FromForm] IFormFile file)
        {
            if (!Directory.Exists(_environment.WebRootPath + "\\Upload\\"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "\\Upload\\");
            }
            if (System.IO.File.Exists(_environment.WebRootPath + "\\Upload\\" + file.FileName))
            {
                System.IO.File.Delete(_environment.WebRootPath + "\\Upload\\" + file.FileName);
                FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "\\Upload\\" + file.FileName);
                file.CopyTo(fileStream);
                fileStream.Dispose();
                UpdateDB(_environment.WebRootPath + "\\Upload\\" + file.FileName);
                System.IO.File.Delete(_environment.WebRootPath + "\\Upload\\" + file.FileName);
            }
            else
            {
                FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "\\Upload\\" + file.FileName);
                file.CopyTo(fileStream);
                fileStream.Dispose();
                UpdateDB(_environment.WebRootPath + "\\Upload\\" + file.FileName);
                System.IO.File.Delete(_environment.WebRootPath + "\\Upload\\" + file.FileName);
            }
            return Ok(file.FileName);
        }
        void UpdateDB(string filePath)
        {
            List<Client> clients = new List<Client>();
            if (System.IO.File.Exists(filePath))
            {
                using (StreamReader r = new StreamReader(filePath))
                {
                    string json = r.ReadToEnd();
                    clients = JsonConvert.DeserializeObject<List<Client>>(json);
                }
            }
            foreach (var client in clients)
            {
                string query = @"BEGIN 
                            IF NOT EXISTS (SELECT * FROM dbo.Clients 
                            WHERE ClientName = " + "\'" + client.Name.ToString() + "\'" +
                            " AND ClientAddress = " + "\'" + client.Address.ToString() + "\'" +
                            " AND ClientPostCode = " + "\'" + client.PostCode.ToString() + "\'" +
                            ") BEGIN INSERT INTO dbo.Clients (ClientName, ClientAddress, ClientPostcode) VALUES (" +
                            "\'" + client.Name.ToString() + "\', " + "\'" + client.Address.ToString() + "\', " +
                            "\'" + client.PostCode.ToString() + "\'" + ") END END " +
                            "BEGIN IF NOT EXISTS(SELECT * FROM dbo.AuditClients " +
                            "WHERE ClientName = " + "\'" + client.Name.ToString() + "\')" +
                            "BEGIN INSERT INTO dbo.AuditClients(ClientName, ClientAddress, CreatedDate) " +
                            "VALUES(" + "\'" + client.Name.ToString() + "\', "+"\'"+ client.Address.ToString() + "\' " + ", GETDATE()) END END";
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
}
