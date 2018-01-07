using AngularTestApp.DAL;
using AngularTestApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularTestApp.Controllers
{
    public class CommentController : Controller
    {
        ArticleContext db = new ArticleContext();

        [HttpPost]
        public ActionResult AddComment(Comment comment)
        {
            Post post = db.Posts.SingleOrDefault(b => b.PostID == comment.PostID);
            post.Comments.Add(comment);
            return Json(new { status = db.SaveChanges() });
        }
    }
}