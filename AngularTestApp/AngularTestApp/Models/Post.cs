using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularTestApp.Models
{
    public class Post
    {
        public int PostID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}