using System;

namespace AngularTestApp.Models
{
    public class Comment
    {
        public int CommentID { get; set; }
        public int PostID { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public virtual Post Post { get; set; }
    }
}