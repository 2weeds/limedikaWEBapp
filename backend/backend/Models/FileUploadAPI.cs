using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class FileUploadAPI
    {
        [Required]
        [DataType(DataType.Upload)]
        public IFormFile Files { get; set; }
    }
}
