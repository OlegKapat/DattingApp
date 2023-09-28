using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string KnowAs { get; set; }                      // added after completing datepicker we register our user knownAs
        public string Gender { get; set; }    
    }
}