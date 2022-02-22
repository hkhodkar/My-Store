using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                400 => "A Bad Request, You have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Server Error",
                _ => null
            };
        }
    }
}